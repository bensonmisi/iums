<template>
  <div>
       <v-btn depressed color="success">Pay fee</v-btn>
                          
  </div>
</template>

<script>
export default {
 props:['id'],methods:{

    async addItem(){
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
</script>

<style>

</style>