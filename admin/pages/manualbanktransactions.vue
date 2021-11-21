<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Manual Transaction Requests </v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col  >
              <v-card>
                  <v-card-text>
                       <v-simple-table dense>
                    <template v-slot:default>
                        <tr>
                            <td v-for="(account,index) in transactions.accountnumbers" :key="index" class="border-r">
                                <div> {{index}}</div>
                    <div class="title">  {{account.length}}</div> 
                            </td>
                        </tr>
                    </template>
                       </v-simple-table>
                 
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Bank transactions
                    <v-spacer/>
                  <ManualtransactionsAdd/>
                </v-card-title>
                <v-card-text>
                  
                    <template v-if="transactions">
                 <v-tabs v-model="tabs">
                    <v-tab v-for="(account,index) in transactions" :key="index">{{index}}</v-tab>
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
                           Received On
                        </th>
                        <th class="text-left">
                          Description  
                        </th>
                        <th class="text-left">
                          Account 
                        </th>
                         <th class="text-left">
                          Reference 
                        </th>
                         <th class="text-left">
                         Amount
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
                        <td>{{ per.created_at | formatDate  }}</td>
                        <td>
                            {{per.description}}
                        </td>
                          <td>
                            {{per.accountnumber}}
                        </td>
                          <td>
                            {{per.source_reference}}
                        </td>
                          <td>
                            {{per.currency}}{{per.amount}}
                        </td>
                         <td>
                            {{per.status}}
                        </td>
                        <td class="d-flex pt-2 pb-2">
                            <!-- <ManualtransactionsEdit :transaction="per"/>
                            <ManualtransactionsDelete :transaction="per"/>
                            <ManualtransactionsView :transaction="per"/> -->
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
export default {
layout:'user',
data(){
    return{
        overlay:false,
        tabs:null
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('manualtransactions/getTransactions') 
   this.overlay = false
},computed:{
    transactions(){
       const transaction =  this.$store.state.manualtransactions.transactions
       const transactions = transaction.reduce((acc,obj)=>{
         const key = obj['status']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

      return transactions
    }
}
}
</script>

<style>

</style>