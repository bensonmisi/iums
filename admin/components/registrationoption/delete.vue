<template>
  <div>
      <v-btn icon depressed color="error" @click="submit"><v-icon>mdi-trash-can</v-icon></v-btn>
   
    
  </div>
</template>

<script>
export default {
    props:['record'],
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
      
          this.loading=true
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
                            this.$store.dispatch('registrationoptions/deleteData',this.record.id)
                        }
                        })
       
     }
 }
}
</script>

<style>

</style>