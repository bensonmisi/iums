<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Suspense Wallet Transfers </v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
       <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Suspense Wallet
                    <v-spacer/>
                     <downloadexcel :data="rawdata"><v-btn  depressed class="primary mr-2">Export</v-btn></downloadexcel>
                  <TransferAdd/>
                </v-card-title>
                <v-card-text>
                  
                    <template v-if="transactions">
                 <v-tabs v-model="tabs">
                    <v-tab v-for="(account,index) in transactions" :key="index">{{index}}
                        <v-badge
          color="black"
          :content="account.length"
        />
                    </v-tab>
                </v-tabs>
                 <v-tabs-items v-model="tabs">
                    <v-tab-item
                     v-for="(account,index) in transactions" :key="index"
                    >
                     <v-simple-table dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                               <th class="text-left">
                        Created At
                        </th>
                        
                        <th class="text-left">
                         Source 
                         </th>
                         <th class="text-left">
                          Destination 
                        </th>
                          <th class="text-left">
                        Source  Account 
                        </th>
                         <th class="text-left">
                         Destination Account
                        </th>
                         <th class="text-left">
                           Amount
                        </th>
                         <th class="text-left">
                           Requested By
                        </th>
                           <th class="text-left">
                         Status
                        </th>
                         <th class="text-right">
                       
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="per in account"
                        :key="per.id"
                        >
                           <td>{{ per.created_at | formatDate}}</td>
                    
                        <td>
                          {{per.source.regnumber}}
                            
                        </td>
                          <td>
                         
                           {{per.destination.regnumber}}
                        </td>
                            <td>{{ per.suspense.accountnumber}}</td>
                          <td>
                            {{per.accountnumber}}
                        </td>
                          <td>
                            {{per.amount}}
                        </td>
                          <td>
                            {{per.requester ? per.requester.name  : ''}}
                             {{per.requester ? per.requester.surname : ''}}
                        </td>
                         <td>
                            {{per.status}}
                        </td>
                        <td class="d-flex pt-2 pb-2">
                          <template v-if="per.status=='PENDING'">
                          <TransferDelete :request="per"/>
                           <TransferView :transaction="per"/>
                          </template>
                          <template v-else>
                            <TransferDetails :transaction="per"/>
                          </template>
                        </td>
                      
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                    </v-tab-item>
                </v-tabs-items>
                    </template>
                    <template v-else>
                         <v-alert
                            color="red lighten-2"
                            dark
                            >
                            No Manual Requests found as yet
                            </v-alert>
                    </template>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64" 
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
import JsonExcel from "vue-json-excel";
export default {
layout:'user',
components:{
downloadexcel:JsonExcel
},
data(){
    return{
        overlay:false,
        tabs:null
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('suspensetransfers/getTransactions') 
   this.overlay = false
},computed:{
    transactions(){
       const transaction =  this.$store.state.suspensetransfers.transactions
       const transactions = transaction.reduce((acc,obj)=>{
         const key = obj['status']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

      return  transactions
    },
    rawdata(){
      return this.$store.state.suspensetransfers.transactions 
    }
},methods:{
    computedTotals(obj){
        let total = 0;
        obj.forEach(element => {
             total = total+ Number(element.amount)
        });
        return total
    }
}
}
</script>

<style>

</style>