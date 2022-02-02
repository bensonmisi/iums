<template>
<div>
  <v-btn rounded  class="primary" @click="updateDialog=true"> Update Reference number</v-btn>
  <v-dialog v-model="updateDialog" width="300">
      <v-form v-model="valid" ref="form" lazy-validation>
      <v-card>
          <v-card-title>
              Enter bank reference
              <v-spacer/>
              <v-btn icon>
                  <v-icon>mdi-close</v-icon>
              </v-btn>
          </v-card-title>
          <v-card-text>
                  <v-text-field outlined v-model="form.referencenumber" label="Source Reference" :rules="referencenumberRule"/>
          </v-card-text>
          <v-card-actions>
              <v-btn rounded color="primary" block @click="submit">Submit</v-btn>
          </v-card-actions>
      </v-card>
      </v-form>
  </v-dialog>
  </div>


</template>

<script>
export default {
name:'invUpdate',
props:['invoicenumber'],
data(){
    return{
        form:{
            referencenumber:'',
            invoicenumber:this.invoicenumber
            },
        valid:false,
        updateDialog:false,
        referencenumberRule:[v=>!!v || 'Reference number not found']
    }
},methods:{
    async submit(){
         if(this.$refs.form.validate()){
             this.valid = true
        await this.$axios.patch('/api/bidder/bidder/bank-payment',this.form).then(res=>{
             this.$swal(res.data.status,res.data.message,res.data.status)
             this.$router.push('/supplier/receipting')
        }).catch(error=>{
          this.$swal('error',error.response.data.message,'error')  
        })
         }
    }
}
}
</script>

<style>

</style>