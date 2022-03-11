<template>
  <div>
      <v-btn icon depressed color="primary" @click="addPermModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Threshold
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                
                                         
                    <v-select 
                         label="Section"
                         outlined
                         v-model="form.sectionId"
                         :rules="sectionRule"
                         :items="sections"
                         item-text="name"
                         item-value="id"
                         />
                     <v-select 
                         label="Reach"
                         outlined
                         v-model="form.reach"
                         :rules="reachRule"
                         :items="reachlist"
                         />


                           <v-select 
                         label="Currency"
                         outlined
                         v-model="form.currencyId"
                         :rules="currencyRule"
                         :items="currency"
                         item-text="name"
                         item-value="id"
                         />
                           <v-text-field
                            label="Value"
                            outlined
                            v-model="form.value"
                            :rules="valueRule"
                        />
                            <v-text-field
                            label="Fee"
                            outlined
                            v-model="form.fee"
                            :rules="feeRule"
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
    props:['item'],
    async fetch(){
       await this.$store.dispatch('sections/getSections')
       await this.$store.dispatch('currency/getCurrency')

    },
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              sectionId:this.item.sectionId,
              reach:this.item.reach,
              procurementclassId:this.item.procurementclassId,
              currencyId:this.item.currencyId,
              value:this.item.value,
              fee:this.item.fee
         },
         sectionRule:[v=>!!v || 'Section is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         valueRule:[v=>!!v || 'Value is required'],
         feeRule:[v=>!!v || 'fee is required'],
         reachlist:['LOCAL','INTERNATIONAL'],
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
          const payload ={id:this.item.id,data:this.form}
          await this.$store.dispatch('procurementthreshold/editData',payload)
          this.loading=false
       }
     }
 },computed:{
  sections(){
         return this.$store.state.sections.sections
     },
     procurementclass(){
         return this.$store.state.procurementclass.data
     },
     currency(){
         return this.$store.state.currency.currency
     }

 }
}
</script>

<style>

</style>