<template>
  <div>
             <v-btn color="primary" x-small rounded @click="useAccount">USE</v-btn> 
  </div>
</template>

<script>
export default {
props:['application','bankdetail'],
methods:{
    async useAccount(){
        this.$swal({
  title: 'Are you sure?',
  text: "You want to use account number: "+this.bankdetail.accountnumber,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes!'
}).then(async (result) => {
  if (result.isConfirmed) {
    var payload ={applicationId:this.application.id,accountId:this.application.accountId,tendernumber:this.application.tendernumber,bankdetailId:this.bankdetail.id}
     await this.$store.dispatch('bidbondrefunds/addRefundlist',payload)
   
  }
})
    }
}

}
</script>

<style>

</style>