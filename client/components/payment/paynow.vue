<template>
  <div>
      <v-btn rounded small depressed color="primary" class="mt-2" @click="mobileDialog=true">USE</v-btn>
      <v-dialog v-model="mobileDialog" width="300">
            <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>PAYNOW<v-spacer/><v-btn icon @click="mobileDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text>                
                 <v-text-field v-model="form.amount" label="Amount" outlined :rules="amountRule"/>
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
 props:['mode'],
 data(){
     return{
         mobileDialog:false,
         overlay:false,
         valid:false,
         form:{
             amount:''
         },
         amountRule:[v=>!!v || 'Amount required'],
     

     }
 },methods:{
     async submit(){
              if(this.$refs.form.validate()){
                  this.valid = false               
                   let chargeamount = Number(this.form.amount)+(Number(this.form.amount) *0.035)+0.5
                     this.$swal({
                            title: 'Service Charge',
                            text: "Please note PAYNOW charges a service fee of 3.5% + 50c Amount that will be charge to your phone will be ZWL"+chargeamount,
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {

                                   try{
                                       this.overlay = true
                                        await this.$axios.post('/api/bidder/paynow-payment',this.form).then(res=>{
                                        if(res.data.status=="success"){
                                           window.location=res.data.redirectlink
                                        }
                                    })
                                    }catch(error){
                                        this.overlay = false
                                        this.$swal('error',error.message,'error')
                                }
                            
                            }
                            })
               
                  

              }
     }
 }
}
</script>

<style>

</style>