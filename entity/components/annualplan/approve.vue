<template>
    <v-btn rounded depressed color="success" class="mr-2" @click="approve">Approve Plan</v-btn>
</template>

<script>
export default {

methods:{
    async approve(){
           const { value: accept } = await this.$swal({

  title: 'Annual Plan Approval',
  html:'This is to confirm that you have revised your plan ',
  input: 'checkbox',
  inputValue: 0,
  inputPlaceholder:
    'I confirm',
  confirmButtonText:
    'Continue <i class="fa fa-arrow-right"></i>',
  inputValidator: (result) => {
    return !result && 'You need to agree with T&C'
  }
})

if (accept) 
{
 this.loading=true
 await this.$store.dispatch('annualplan/approveData')
 this.loading = false
}
    }
}
}
</script>

<style>

</style>