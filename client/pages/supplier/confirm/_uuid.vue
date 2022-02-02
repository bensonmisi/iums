<template>
  <v-row>
      <v-col md="4" offset-md="4">
          <v-card>
              <v-card-text class="text-center">
               <div class="headling"> Welcome Back..</div>  
               <p>Please wait while we check if your payment went through..</p> 
                 <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                    ></v-progress-circular>
              </v-card-text>
          </v-card>
      </v-col>
  </v-row>
</template>

<script>
export default {
 layout:"plain",
 async fetch(){
     let uuid = this.$route.params.uuid
     await this.$axios.get('/api/bidder/paynow-payment/'+uuid).then((res)=>{
         if(res.data.status=='success'){
             this.$swal(res.data.success,res.data.message,res.data.status)
             this.$router.push('/supplier/receipting')
         }
     }).catch(error=>{
         this.$swal(error.response.data.success,error.response.data.message,error.response.data.status)
             this.$router.push('/supplier/receipting')
     })


 }
}
</script>

<style>

</style>