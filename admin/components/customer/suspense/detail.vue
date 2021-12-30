<template>
  <div>
      <v-btn x-small rounded depressed color="success" :loading="loading" :disabled="loading" @click="getReceipt">view</v-btn>
      <v-dialog v-model="showModel" max-width="600">
          <v-card>
              <v-card-title>
                  Receipt
                  <v-spacer/>
                  <v-btn icon @click="showModel=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                 <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>invoice number</th>
                                     <th>Description</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>                       
                        <tbody>
                            
                            <tr>
                                <td>
                                    {{receipt.created_at | formatDate}}
                                </td>
                                <td>
                                    {{receipt.invoicenumber}}
                                </td>
                                 <td>
                                    {{receipt.description}}
                                </td>
                                <td>
                                    {{receipt.currency ? receipt.currency.name :''}}{{receipt.amount}}
                                </td>
                                <td>

                                </td>
                            </tr>

                        </tbody>
                        </template>
                    </v-simple-table>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
name:"receiptdetail",
props:['receiptnumber'],
data(){
    return{
        receipt:{},
        showModel:false,
        loading:false
    }
},methods:{

    async getReceipt(){
          this.loading= true
        try {
            this.$axios.get('api/admin/receipts/'+this.receiptnumber).then(res=>{
              this.receipt = res.data
              this.loading = false
              this.showModel = true
          })
        } catch (error) {
            this.loading = false
          this.$swal("error",error.response.data.message,"error")   
        }
          
    }
}
}
</script>

<style>

</style>