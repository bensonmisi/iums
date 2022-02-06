<template>
  <div>
       <v-btn depressed color="success" @click="addItem">Pay fee</v-btn>
                          
  </div>
</template>

<script>
export default {
  name:'NewTenderInvoice',
 props:['id'],methods:{

    async addItem(){
      await this.$store.dispatch('tenderinvoicing/addData',this.id)
       await this.$store.dispatch('tenderinvoicing/getData')
    }
 }
}
</script>

<style>

</style>