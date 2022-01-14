<template>
  <div>
      <v-btn rounded small depressed color="primary" @click="add()">Add Task</v-btn>
     
  </div>
</template>

<script>
export default {
props:['accountId','identifier','type'],
methods:{
    async add(){
       this.$swal({
  title: 'Are you sure?',
  text: "You want to add item your tasks",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(async(result) => {
  if (result.isConfirmed) {
      const formdata = {accountId:this.accountId,identifier:this.identifier,type:this.type}
    await  this.$store.dispatch('taskmanager/addTask',formdata)
  }
})

    }
}
}
</script>

<style>

</style>