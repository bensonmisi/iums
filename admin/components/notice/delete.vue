<template>
  <div>
      <v-btn icon depressed color="error" @click="submit()"><v-icon>mdi-trash-can</v-icon></v-btn>
   
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
                            text: "You are about to cancel tender number "+this.notice.tendernumber,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {
                               await this.$store.dispatch('notice/deleteData',this.notice.uuid)
                            }
                            })
                           
       
     }
 }
}
</script>

<style>

</style>