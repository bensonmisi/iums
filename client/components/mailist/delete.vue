<template>
    <v-btn icon depressed color="error" @click="deleteRecord"><v-icon>mdi-trash-can</v-icon></v-btn>
</template>

<script>
export default {
  name:"DeleteMail",
  props:['mailist'],
  methods:{
      async deleteRecord(){
          this.$swal({
  title: 'Are you sure?',
  text: "You want to Permanently remove email from mailing list: ",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async (result) => {
  if (result.isConfirmed) {
         await this.$axios.delete('api/bidder/mailist/'+this.mailist.id).then(async(res)=>{
           this.$swal("success",res.data.message,"success")
           this.loading= false
            await this.$store.dispatch('dashboard/getDashboard')
          }).catch(err=>{
            this.$swal("error",err.response.data.message,"error")
            this.loading = false
          })
  }
})
      }
  }
}
</script>

<style>

</style>