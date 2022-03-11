<template>
  <div>
      <v-btn rounded small depressed color="error" @click="submit()"><v-icon>mdi-close</v-icon> Cancel Notice</v-btn>
   
  </div>
</template>

<script>
export default {
    props:['notice'],
 data(){
     return{
         addPermModel:false,
         valid:false,
        snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
             this.$swal({
                            title: 'Tender Cancellation',
                            text: "You are about to cancel your notice , this means it wont be visible to the public and our system will automatically initiate bidbond refund to all bidders how had participated ",
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {
                               await this.$store.dispatch('notice/cancelData',this.notice.uuid)
                            }
                            })
                           
       
     }
 }
}
</script>

<style>

</style>