<template>
    <v-container fluid>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Suspense Report</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text>
                         <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <tr class="blue">
                                                    <td v-for="(account,index) in balances" :key="index" class="text-center">
                                                          
                                                               <div> <small>{{index}}</small></div>
                                                               <div><b>{{account[0].currency}}{{computeTotals(account)}}</b></div>
                     
                     </td>
                                    </tr>
                                </tbody>
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
                    Suspense Report
                    <v-spacer/>
                    <downloadexcel :data="suspenselist"><v-btn  depressed class="primary mr-2">Export</v-btn></downloadexcel>
               
                </v-card-title>
                <v-card-text>
                      <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                       <th class="text-left">
                       #
                        </th>
                        <th class="text-left">
                        Period
                        </th>
                        <th class="text-left">
                          Name
                        </th>
                        <th class="text-left">
                         Account
                        </th>
                        <th class="text-left">
                         Source
                        </th>
                         <th class="text-left">
                        Total Deposited
                        </th>
                         <th class="text-left">
                        Total Receipted
                        </th>
                         <th class="text-left">
                        Total inter-wallets
                        </th>
                          <th class="text-left">
                         Remaining Balance
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="suspense in suspenselist" :key="suspense.id">
                            <td>{{suspense.id}}</td>
                            <td>
                                {{suspense.created_at| formateHumanDiff}}
                            </td>
                            <td>
                               <div> {{suspense.name}}</div>
                               <div><small>{{suspense.regnumber}}</small></div>
                            </td>
                            <td>
                                {{suspense.accountnumber}}
                            </td>
                             <td>
                                {{suspense.source}}
                            </td>
                            <td>
                               {{suspense.currency}} {{suspense.amount}}
                            </td>
                            <td>
                                 {{suspense.currency}} {{suspense.totalrecipts}}
                            </td>
                            <td>
                                 {{suspense.currency}} {{suspense.totaltransfers}}
                            </td>
                            <td>
                                {{suspense.currency}}  {{suspense.balance}}
                            </td>
                            <td>
                                <SuspensereportsReceipts :id="suspense.id"/>
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
import accountnumbers from './accountnumbers.vue'
import SuspensereportsReceipts from '~/components/suspensereport/receipts.vue'
import JsonExcel from "vue-json-excel";
export default {
  components: { accountnumbers,downloadexcel:JsonExcel,SuspensereportsReceipts },
layout:'user',
data(){
    return{
        overlay:false,
        totalBalance:0
    }
},
async fetch(){
    this.overlay = true
    this.$store.dispatch('suspense/getSuspense')
    this.overlay = false
},methods:{
    computeTotals(data){
     let total = 0;
     data.forEach(element => {
        total = total+ Number(element.amount)  
     });

     return Math.round(total)
    }

},computed:{
    suspenselist(){
        let array=[]
        const records= this.$store.state.suspense.suspense
        records.forEach(record=>{
            const el={
                id:record.id,
                created_at:record.created_at,
                source:record.source,
                currency:record.currency,
                amount:record.amount,
                regnumber:record.regnumber,
                name:record.name,
                accountnumber:record.accountnumber,
                totalrecipts:this.computeTotals(record.receipts),
                totaltransfers:this.computeTotals(record.transfers),
                balance:Math.round(record.balance)
                }
            array.push(el)
       })
       return array
    },
      balances(){
       const transaction =  this.$store.state.suspense.suspense
       const accountnumbers = transaction.reduce((acc,obj)=>{
         const key = obj['accountnumber']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

       return accountnumbers
    }
}
}
</script>

<style>

</style>