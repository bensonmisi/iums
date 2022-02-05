<template>
    <v-btn icon depressed color="error" @click="deleteRecord"><v-icon>mdi-trash-can</v-icon></v-btn>
</template>

<script>
export default {
  name:"noticefeeUpdate",
  props:['fee'],
  methods:{
      async deleteRecord(){
          this.$swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
      this.$store.dispatch('noticefee/deleteData',this.fee)
  }
})
      }
  }
}
</script>

<style>

</style>