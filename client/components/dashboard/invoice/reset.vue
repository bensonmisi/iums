<template>
  <v-btn rounded  class="error" @click="resetInvoice()">Reset Invoice</v-btn>
</template>

<script>
export default {
name:'invReset',
props:['invoicenumber'],
methods:{
   async resetInvoice(){
            this.$swal({
                            title: 'Invoice Reset',
                            text: "You are about to reset your invoice back to PENDING status. This will allow you to use another payment method",
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {
                                    await this.$axios.get('/api/bidder/supplierinvoicing/reset/'+this.invoicenumber).then((res)=>{
                                        this.$swal(res.data.status,res.data.message,res.data.status)
                                        this.$router.push('/supplier/receipting')
                                    }).catch(error=>{
                                         this.$swal('error',error.response.data.message,'error')  
                                    })
                            }
                            })
                           
   }
}
}
</script>

<style>

</style>