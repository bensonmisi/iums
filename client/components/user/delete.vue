<template>
    <v-btn icon depressed color="error" @click="deleteRecord"><v-icon>mdi-trash-can</v-icon></v-btn>
</template>

<script>
export default {
  name:"DeleteUser",
  props:['user'],
  methods:{
      async deleteRecord(){
          this.$swal({
  title: 'Are you sure?',
  text: "You want to Permanently delete user: "+this.user.name,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
      this.$store.dispatch('users/deleteData',this.user.id)
  }
})
      }
  }
}
</script>

<style>

</style>