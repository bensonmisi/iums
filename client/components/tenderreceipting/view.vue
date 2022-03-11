<template>
        <div>
          <v-card v-if="receiptData.invoice">
           <v-toolbar dense color="indigo" dark>
             <v-toolbar-title>Tender Receipting</v-toolbar-title>
           </v-toolbar>
              <v-card-text>
                <template v-if="(receiptData.invoice.amount-totalreceipts)>0">
                <v-row class="blue--text mt-3 headline">
                    <v-col md="8" >Total Invoice</v-col><v-col md="4" class="text-right" >{{receiptData.invoice.currency.name}}{{receiptData.invoice.amount}}</v-col>
                </v-row>
                <v-row class="green--text headline">
                    <v-col md="8">Total Paid</v-col><v-col md="4" class="text-right">{{receiptData.invoice.currency.name}}{{totalreceipts}}</v-col>
                </v-row>
                <v-divider/>
                <v-row class="red--text headline mt-2 mb-2">
                    <v-col md="8">Balance</v-col><v-col md="4" class="text-right">{{receiptData.invoice.currency.name}}{{receiptData.invoice.amount-totalreceipts}}</v-col>
                </v-row>
                <v-divider/>
                 <v-row class="headline mt-1 mb-2">
                   <v-col md="12">
                       <v-card dark :class="walletbalance> 0 ? 'teal' : 'red'">
                           <v-card-text>
                               <div  class="d-flex justify-space-between">
                               <div class="headline">Wallet balance</div>
                               <div class="headline">{{receiptData.invoice.currency.name}}{{walletbalance}}</div>
                               </div>

                                  </v-card-text>
                       </v-card>
                      
                       </v-col>
                </v-row>
                <template v-if="walletbalance==0">
                   <v-alert
                        dense
                        outlined
                        type="error"
                        >
                        You have insufficient  funds in your wallet  please use options below to topup wallet
                </v-alert>
                  <v-card class="mt-2"> 
                    <v-card-title>TopUp Options</v-card-title>
                    <v-card-text>
                      <template v-if="receiptData.invoice.type=='NONREFUNDABLE'">
                        <v-row v-if="receiptData.invoice.currency.name=='ZWL'">
                            <v-col md="12" class="d-flex justify-space-between"><img src="/ecocash.jpg"  width="120px" />
                           <PaymentMobile mode="ECOCASH" :invoicenumber="invoicenumber"/></v-col>
                        </v-row>
                        <v-divider class="mt-2"/>
                         <v-row v-if="receiptData.invoice.currency.name=='ZWL'">
                            <v-col md="12" class="d-flex justify-space-between"><img src="/onemoney.jpg"  width="120px" />
                           <PaymentMobile mode="ONEMONEY" :invoicenumber="invoicenumber"/></v-col>
                        </v-row>
                      </template>
                        <v-divider class="mt-2"/>
                         <v-row v-if="receiptData.invoice.currency.name=='USD'">
                            <v-col md="12" class="d-flex justify-space-between"><img src="/visa.jpg"  width="120px" />
                            <PaymentPaynow/></v-col>
                        </v-row>
                          <v-divider class="mt-2"/>
                         <v-row>
                            <v-col md="12" class="d-flex justify-space-between"><img src="/bank.jpg"  width="120px" />
                           <PaymentBank :invoicenumber="invoicenumber"/></v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                </template>
                <template v-else>
                   <v-card>
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
                                     <v-btn v-if="bal.amount>0" small rounded depressed class="success" @click="settle(bal.id)">Settle Invoice</v-btn>
                   
                                 </td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
                </template>
                </template>
                <template v-else>
                    <v-card>
              <v-card-text class="text-center">
                  <v-icon color="success" x-large>mdi-check-circle-outline</v-icon>
                  <div>SETTLED</div>
                  <div class="headline mt-2">Invoice already settled </div>
                  <v-btn depressed rounded color="success" to="/tenderinvoicing">Goto Invoices</v-btn>
              </v-card-text>

          </v-card>
                </template>

              </v-card-text>
          </v-card>
        


        </div>
   
</template>

<script>
export default {
layout:"user",
props:['invoicenumber'],
name:'TenderReceipting',
data(){
    return{
        paymentDialog:true,
        status:"",
        message:"",
    
    }
},
async fetch(){
 await this.$store.dispatch('tenderreceipting/getData',this.invoicenumber)   
},
methods:{
  async settle(id){
    let formdata ={suspenseId:id,invoicenumber:this.invoicenumber}
    await this.$axios.post('api/bidder/tenderreceipting',formdata).then(async(res)=>{
      this.$swal(res.data.status,res.data.message,res.data.status)
      await this.$store.dispatch('tenderreceipting/getData',this.invoicenumber)
    }).catch(error=>{
      this.$swal("error",error.response.data.message,"error")
    })
  }
},
computed:{
    receiptData(){
        return this.$store.state.tenderreceipting.data
       
    },
    walletbalance(){
        let balance = 0
        const receiptData = this.$store.state.tenderreceipting.data
        if(receiptData.wallet){
       receiptData.wallet.forEach(wal=>{
            balance = balance+wal.balance
      })
        }
      return balance
    },
    getBalance(){
    let data = this.$store.state.receipting.data
    return  data.totalinvoice - data.totalreceipt
    },
    totalreceipts(){
      const receipts = this.$store.state.tenderreceipting.data.receipts
     let totalreceipt=0
    if(receipts.length>0){
       receipts.forEach(element => {
          totalreceipt =Number(totalreceipt) + Number(element.amount)
       });
      }
      return totalreceipt 
    }
}
}
</script>

<style>

</style>