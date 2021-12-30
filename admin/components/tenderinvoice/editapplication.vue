<template>
  <div>
    <v-btn x-small color="info" rounded icon depressed @click="showDialog"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-dialog v-model="editModel" width="600">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Edit Application
               <v-spacer/>
               <v-btn icon @click="editModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>      
            <v-card-text> 
                        <v-text-field
                            label="Tender Number"
                            outlined
                            v-model="form.tendernumber"
                            :rules="tendernumberRule"
                        />
                 <v-text-field
                            label="Validity Period"
                            outlined
                            v-model="form.validityperiod"
                           />
                      <v-text-field
                            label="Amount"
                            outlined
                            v-model="form.amount"
                             :rules="amountRule"
                           />  

                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="closingdate"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="closingdate"
                                label="Closing Date"
                               prepend-inner-icon="mdi-calendar"
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="closingdate"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(closingdate)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>           
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="editModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
    
  </div>
</template>

<script>
export default {
    props:['application','id'],
 data(){
     return{
         loading:false,
         editModel:false,
         valid:true,
         closingdate:this.application.closingDate,
          menu:false,         
         tendernumberRule:[v=>!!v || 'tender number is required'],
         amountRule:[v=>!!v || 'Amount is required'],
         form:{
             id:this.application.id,
             tendernumber:this.application.tendernumber,
             validityperiod:this.application.validityperiod,
             amount:this.application.amount,
             closingdate:this.closingdate
             
         }

     }
 },methods:{
     showDialog(){
         this.editModel=true
     },
    async submit(){
      if(this.$refs.form.validate())
       {
        if(this.application.type=='BIDBOND'){
            if(!this.closingdate){
                this.$swal("error","Tender Closing Date is required","error")
            }
        }     
          this.valid = true
          this.loading=true
          await this.$store.dispatch('awaitingtenderinvoices/editApplication',{data:this.form,invoiceId:this.id})
       }



     }
 }
}
</script>

<style>

</style>