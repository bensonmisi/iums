<template>
  <div>
      <v-btn rounded depressed color="primary" @click="approveApplication">Approve</v-btn>
  </div>
</template>

<script>
export default {
 name:'supplierapproval',
 props:['id'],
 methods:{
   async  approveApplication(){
this.$swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Approve'
}).then(async(result) => {
  if (result.isConfirmed) {
    
        await this.$store.dispatch('suppliers/approve',this.id)    
    
   
  }
})
     }
 }
}
</script>

<style>

</style>