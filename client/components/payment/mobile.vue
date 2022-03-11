<template>
  <div>
      <v-btn rounded small depressed color="primary" class="mt-2" @click="mobileDialog=true">USE</v-btn>
      <v-dialog v-model="mobileDialog" width="300">
            <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>{{mode}}<v-spacer/><v-btn icon @click="mobileDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text>
                 <v-text-field v-model="form.phone" label="Phone number" outlined :rules="phoneRule"/>
                 <v-text-field v-model="form.amount" label="Amount" outlined :rules="amountRule"/>
              </v-card-text>
              <v-card-actions>
                  <v-btn color="primary" depressed block @click="submit">Submit</v-btn>
              </v-card-actions>
          </v-card>
            </v-form>
      </v-dialog>
      <v-dialog v-model="confirmDialog" width="300" persistent>
          <v-card>
             
              <v-card-text class="text-center">
                   
              <p class="text-lg font-weight-bold">PLEASE CHECK YOUR PHONE AND ENTER YOUR PIN TO AUTHORIZE THIS TRANSACTION</p>
            <p class="text-lg ">Do not close this window  our system will check if your transaction was successfully once the time  reaches zero</p>
                  <v-progress-circular
                    :rotate="0"
                    :size="100"
                    :width="15"
                    :value="counter"
                    color="primary"
                    >
                    {{ counter }}
                    </v-progress-circular>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
 props:['mode','invoicenumber'],
 data(){
     return{
         mobileDialog:false,
         confirmDialog:false,
         valid:false,
         form:{
             phone:'',
             amount:'',
             mode:this.mode
         },
         phoneRule:[v=>!!v || 'Phone number required'],
         amountRule:[v=>!!v || 'Amount required'],
         counter:50,
         id:''

     }
 },methods:{
     async submit(){
              if(this.$refs.form.validate()){
                  this.valid = false               
                   let chargeamount = Number(this.form.amount)+(Number(this.form.amount) *0.025)
                     this.$swal({
                            title: 'Service Charge',
                            text: "Please note PAYNOW charges a service fee of 2.5%. Amount that will be charge to your phone will be ZWL"+chargeamount,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {

                                   try{
                                        await this.$axios.post('/api/bidder/mobilepayment',this.form).then(res=>{
                                        if(res.data.status=="success"){
                                            this.id = res.data.data.id
                                            this.confirmDialog=true
                                            this.mobileDialog = false
                                            this.startCounter()
                                        }
                                    })
                                    }catch(error){
                                        this.$swal("error",error.response.data.message,"error")
                                    
                                }
                            
                            }
                            })
               
                  

              }
     },
     async startCounter(){
         
         if(this.counter>0){
             setTimeout(()=>{
                 this.counter -=1
                 this.startCounter()
             },1000)    
         }else{
              await this.$axios.get('/api/bidder/mobilepayment/'+this.id).then(async(res)=>{
                 if(res.data.status=='success'){
                         if(this.invoicenumber){
                           await this.$store.dispatch('tenderreceipting/getData',this.invoicenumber)  
                         }else{
                        await this.$store.dispatch('receipting/getData')
                         }
                        this.$swal(res.data.status,res.data.message,res.data.status)
                        this.confirmDialog = false
                 }
              }).catch(error=>{
                 this.$swal('error',error.response.data.message,'error')
                 this.counter=50
                 this.confirmDialog=false  
              })
          
         }
     }
 },
 computed:{
     mobilepayment(){
         return this.$store.status.mobilepayment.data
     }
 }
}
</script>

<style>

</style>