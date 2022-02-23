<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Fee
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-select
                            label="Select Class"
                            outlined
                            :items="procurementclass"
                            item-value="id"
                            item-text="name"
                            v-model="form.procurementclassId"
                            :rules="procurementclassRule"
                        />
                  <v-select
                            label="Select Currency"
                            outlined
                            :items="currency"
                            item-value="id"
                            item-text="name"
                            v-model="form.currencyId"
                            :rules="currencyRule"
                        />

                    <v-text-field label="Cost" outlined v-model="form.cost" :rules="costRule"/>
                      
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
    props:['id'],
    async fetch(){
         await this.$store.dispatch('currency/getCurrency')
         await this.$store.dispatch('procurementclass/getData')
    },
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              cost:'',
              currencyId:'',
              procurementclassId:''
         },
         costRule:[v=>!!v || 'Cost is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         procurementclassRule:[v=>!!v || 'Procurement classis required'],       
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          await this.$store.dispatch('authorityfee/addData',this.form)
          this.loading=false
       }
     }
 },computed:{
     currency(){
         return this.$store.state.currency.currency
     },
     procurementclass(){
         return this.$store.state.procurementclass.data
     }

 }
}
</script>

<style>

</style>