<template>
  <div>
      <v-btn rounded small depressed color="primary" class="mt-2" @click="mobileDialog=true">USE</v-btn>
      <v-dialog v-model="mobileDialog" width="400">
            <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>Bank Payments<v-spacer/><v-btn icon @click="mobileDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text> 
                 <v-text-field v-model="form.name" label="Bank Name" outlined :rules="nameRule"/>   
                 <v-text-field v-model="form.referencenumber" label="Referene number" outlined :rules="referencenumberRule"/>            
                 <v-text-field v-model="form.amount" label="Amount" outlined :rules="amountRule"/>
                  <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="From date"
                               prepend-inner-icon="mdi-calendar"
                                outlined
                                readonly
                                :rules="dateRule"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            no-title
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
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
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                   <v-file-input
                    label="Click here to attach POP"
                    outlined
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                      
              </v-card-text>
              <v-card-actions>
                  <v-btn color="primary" depressed block @click="submit">Submit</v-btn>
              </v-card-actions>
          </v-card>
            </v-form>
      </v-dialog>
       <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
 props:['mode','invoicenumber'],
 data(){
     return{
         mobileDialog:false,
         overlay:false,
         valid:false,
         file:null,
         menu:false,
         date:null,
         form:{
             amount:'',
             name:'',
             referencenumber:'',
             paymentdate:'',

         },
          nameRule:[v=>!!v || 'Name required'],
         referencenumberRule:[v=>!!v || 'Reference number is required'],
         amountRule:[v=>!!v || 'Amount is required'],
         dateRule:[v=>!!v || 'Transfer date required'],
         fileRule:[v=>!!v || 'Please Attache Proof of payment'],



     

     }
 },methods:{
     async submit(){
              if(this.$refs.form.validate()){              
                  this.valid = true

           const formData = new FormData();
          formData.append('name',this.form.name)
          formData.append('file',this.file)
          formData.append('referencenumber',this.form.referencenumber)
          formData.append('amount',this.form.amount)
          formData.append('paymentdate',this.date)
          formData.append('invoicenumber',this.invoicenumber)
         
          let config = { headers: {'content-type': 'multipart/form-data'}} 
 
        try {
            await this.$axios({
                method:"POST",
                url:'api/bidder/bank-payment',
                data:formData,
                config:config
            }).then(async(res)=>{
                      if(this.invoicenumber){
                           await this.$store.dispatch('tenderreceipting/getData',this.invoicenumber)  
                         }else{
                        await this.$store.dispatch('receipting/getData')
                         }
           
            this.$swal(res.data.status,res.data.message,res.data.status)
            this.mobileDialog =false
          })  
        } catch (error) {
            this.$swal("error",error,"error") 
        }
               
                  

              }
     }
 }
}
</script>

<style>

</style>