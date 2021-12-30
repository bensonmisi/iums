<template>
  <div>
      <v-btn x-small rounded depressed color="success" :loading="loading" :disabled="loading" @click="getReceipts">receipts</v-btn>
      <v-dialog v-model="showModel" max-width="800">
          <v-card>
              <v-card-title>
                  Suspense receipts
                  <v-spacer/>
                  <v-btn icon @click="showModel=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                 <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Receiptnumber</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr>
                            </thead>                       
                        <tbody>
                            <template v-if="receipts.length>0">
                            <tr v-for="receipt in receipts" :key="receipt.id">
                                <td>
                                    {{receipt.created_at | formatDate}}
                                </td>
                                <td>
                                    {{receipt.receiptnumber}}
                                </td>
                                <td>
                                    {{receipt.currency}}{{receipt.amount}}
                                </td>
                                <td>
                                 <receiptdetail :receiptnumber="receipt.receiptnumber"/>
                                </td>
                            </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="4" class="red--text text-center">No Receipts Found</td>
                                </tr>
                            </template>

                        </tbody>
                        </template>
                    </v-simple-table>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
import receiptdetail from './detail.vue'
export default {
name:"suspsenreceipts",
props:['id'],
components:{receiptdetail},
data(){
    return{
        receipts:[],
        showModel:false,
        loading:false
    }
},methods:{

    async getReceipts(){
          this.loading= true
        try {
            this.$axios.get('api/admin/suspensereceipts/'+this.id).then(res=>{
              this.receipts = res.data
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