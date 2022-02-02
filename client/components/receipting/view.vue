<template>
        <div>
          <v-card v-if="receiptData && receiptData.totalinvoice>0">
                 <v-toolbar dense color="indigo" dark>
     

      <v-toolbar-title>Receipting</v-toolbar-title>
     
    </v-toolbar>
      
              <v-card-text>
                <v-row class="blue--text mt-3 headline">
                    <v-col md="8" >Total Invoice</v-col><v-col md="4" class="text-right" >{{receiptData.currency}}{{receiptData.totalinvoice}}</v-col>
                </v-row>
                <v-row class="green--text headline">
                    <v-col md="8">Total Paid</v-col><v-col md="4" class="text-right">{{receiptData.currency}}{{receiptData.totalreceipts}}</v-col>
                </v-row>
                <v-divider/>
                <v-row class="red--text headline mt-2 mb-2">
                    <v-col md="8">Balance</v-col><v-col md="4" class="text-right">{{receiptData.currency}}{{receiptData.totalinvoice - receiptData.totalreceipts}}</v-col>
                </v-row>
                <v-divider/>

                 <v-row class="headline mt-1 mb-2">
                   <v-col md="12">
                       <v-card dark :class="walletbalance>0 ? 'teal' : 'red'">
                           <v-card-text>
                               <div  class="d-flex justify-space-between">
                               <div class="headline">Wallet balance</div>
                               <div class="headline">{{receiptData.currency}}{{walletbalance}}</div>
                               </div>

                                  </v-card-text>
                       </v-card>
                      
                       </v-col>
                </v-row>
                 <v-alert
                  v-if="walletbalance==0"
                        dense
                        outlined
                        type="error"
                        >
                        You have insufficient  funds in your wallet  please use options below to topup wallet
                </v-alert>

                <v-card v-if="walletbalance==0"> 
                    <v-card-title>TopUp Options</v-card-title>
                    <v-card-text>
                        <v-row v-if="receiptData.currency=='ZWL'">
                            <v-col md="12" class="d-flex justify-space-between"><img src="/ecocash.jpg"  width="120px" />
                           <PaymentMobile mode="ECOCASH"/></v-col>
                        </v-row>
                        <v-divider class="mt-2"/>
                         <v-row v-if="receiptData.currency=='ZWL'">
                            <v-col md="12" class="d-flex justify-space-between"><img src="/onemoney.jpg"  width="120px" />
                           <PaymentMobile mode="ONEMONEY"/></v-col>
                        </v-row>
                        <v-divider class="mt-2"/>
                         <v-row v-if="receiptData.currency=='USD'">
                            <v-col md="12" class="d-flex justify-space-between"><img src="/visa.jpg"  width="120px" />
                            <PaymentPaynow/></v-col>
                        </v-row>
                          <v-divider class="mt-2"/>
                         <v-row>
                            <v-col md="12" class="d-flex justify-space-between"><img src="/bank.jpg"  width="120px" />
                           <PaymentBank/></v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <v-card v-else>
                    <v-card-title>Wallet breakdown</v-card-title>
                    <v-card-text>
                        <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                 Source
                                </th>
                                <th>Amount</th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="receiptData.balances.length>0">
                                <tr v-for="bal in receiptData.balances" :key="bal.id">
                                 <td>{{bal.source}}</td>
                                 <td>{{bal.currency}}{{bal.amount}}</td>
                                 <td>
                                     <v-btn v-if="bal.amount>0" small rounded depressed class="success" @click="settleInvoice(bal.id)">Settle Invoice</v-btn>
                   
                                 </td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>

              </v-card-text>
          </v-card>
          <v-card v-else>
              <v-card-text class="text-center">
                  <v-icon color="success" x-large>mdi-check-circle-outline</v-icon>
                  <div>{{status}}</div>
                  <div class="headline mt-2">{{message}} </div>
                  <v-btn depressed rounded color="success" to="/dashboard">Goto Dashboard</v-btn>
              </v-card-text>

          </v-card>


        </div>
   
</template>

<script>
export default {
layout:"user",
name:'SupplierReceipting',
data(){
    return{
        paymentDialog:true,
        status:"",
        message:"",
    
    }
},
async fetch(){
 await this.$store.dispatch('receipting/getData')
},
methods:{
async settleInvoice(id){
            this.$swal({
  title: 'Are you sure?',
  text: "You want to utilize your wallet balance to pay off invoice balance",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(async (result) => {
  if (result.isConfirmed) {
    var formdata = {suspenseId:id}
 await this.$axios.post('/api/bidder/receipting/settle',formdata).then(async(res)=>{
     this.$swal(res.data.status,res.data.message,res.data.status)
     this.status = res.data.status
     this.message = res.data.message
     await this.$store.dispatch('receipting/getData')
     
     
 })
   }
})
}
},
computed:{
    receiptData(){
        return this.$store.state.receipting.data
    },
    walletbalance(){
        let balance = 0
        const receiptData = this.$store.state.receipting.data
        if(receiptData.wallet){
      balance = receiptData.wallet[0].balance
        }
      return balance
    },
    getBalance(){
    let data = this.$store.state.receipting.data
    return  data.totalinvoice - data.totalreceipt
    }
}
}
</script>

<style>

</style>