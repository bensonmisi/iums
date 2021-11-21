<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Exchange Rate
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-select
                            label="Primary Currency"
                            outlined
                            v-model="form.primaryId"
                            :rules="primaryRule"
                               :items="currencylist"
                            item-text="name"
                            item-value="id"
                        />
                    <v-select
                            label="Secondary Currency"
                            outlined
                            v-model="form.secondaryId"
                            :rules="secondaryRule"
                             :items="currencylist"
                            item-text="name"
                            item-value="id"
                        />
                             <v-select
                            label="Type"
                            outlined
                            v-model="form.type"
                            :rules="typeRule"
                            :items="types"
                         
                        />
                           <v-text-field
                            label="Value"
                            outlined
                            v-model="form.value"
                            :rules="valueRule"
                        />
                      
                          
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
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              primaryId:'',
              secondaryId:'',
              value:'',
              type:''
         },
         primaryRule:[v=>!!v || 'Primary Currency is required'],
         secondaryRule:[v=>!!v || 'Secondary Currency is required'],
          valueRule:[v=>!!v || 'Value is required'],
           typeRule:[v=>!!v || 'Type is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         types:['INTERNAL','BANK']
     }
 },
async fetch(){
    this.overlay=true
   await this.$store.dispatch('currency/getCurrency') 
   this.overlay = false
},computed:{
    currencylist(){
        return this.$store.state.currency.currency
    }
} ,methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.post('api/admin/exchangerate',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('rates/getRates')
                        this.$refs.form.reset()
                        this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
     }
 }
}
</script>

<style>

</style>