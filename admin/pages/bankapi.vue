<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Bank transactions</v-btn>
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
                    <div class="title">  {{computedTotals(account)}}</div> 
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
                   <downloadexcel :data="transactions.transactions"><v-btn  depressed class="primary mr-2">Export</v-btn></downloadexcel><BankapiFilter/>
                </v-card-title>
                <v-card-text>
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
                        v-for="per in transactions.transactions"
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
                            {{per.sourcereference}}
                        </td>
                          <td>
                            {{per.currency}}{{per.amount}}
                        </td>
                         <td>
                            {{per.status}}
                        </td>
                        <td>
                            <BankapiView :transaction="per"/>
                        </td>
                      
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
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
        overlay:false
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('banktransactions/getCurrent') 
   this.overlay = false
},computed:{
    transactions(){
       const transaction =  this.$store.state.banktransactions.transactions
       const accountnumbers = transaction.reduce((acc,obj)=>{
         const key = obj['accountnumber']+"("+obj['currency']+")"
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

       return {transactions:transaction,accountnumbers:accountnumbers}
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