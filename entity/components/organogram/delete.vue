<template>
  <div>
         <v-btn icon color="error" @click="deleteItem">
                                           <v-icon>mdi-trash-can</v-icon>
            </v-btn>
  </div>
</template>

<script>
export default {
props:['id'],
methods:{
    async deleteItem(){
                   this.$swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async (result) => {
  if (result.isConfirmed) {
     await this.$store.dispatch('organograms/deleteData',this.id)
  }
})
    }
}
}
</script>

<style>

</style>