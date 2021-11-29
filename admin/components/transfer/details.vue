<template>
  <div>
      <v-btn x-small depressed color="primary" @click="addPermModel=true">View</v-btn>
   
      <v-dialog v-model="addPermModel" width="700">
                 
       <v-card>
           <v-card-title>
               View Transaction
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
               <div class="subtitle-1">Request Information</div>
                 <v-simple-table dense>
                    <template v-slot:default>
                       <tbody>
                           <tr>
                               <th>Source</th><td>{{transaction.source.regnumber }}</td>
                           </tr>
                            <tr>
                               <th>Destination</th><td>{{transaction.destination.regnumber }}</td>
                           </tr>
                            <tr>
                               <th>Source Account</th><td>{{transaction.suspense.accountnumber  }}</td>
                           </tr>
                             <tr>
                               <th>Destination Account</th><td>{{transaction.accountnumber   }}</td>
                           </tr>
                           <tr>
                               <th>Amount</th><td>{{transaction.amount   }}</td>
                           </tr>
                           <tr>
                               <th>Requested By</th>
                               <td>
                              {{transaction.requester ? transaction.requester.name  : ''}}
                             {{transaction.requester ? transaction.requester.surname : ''}}
                             </td>
                           </tr>

                              <tr>
                               <th>Actioned By</th>
                               <td>
                              {{transaction.actioner ? transaction.actioner.name  : ''}}
                             {{transaction.actioner ? transaction.actioner.surname : ''}}
                             </td>
                           </tr>
                            <tr>
                               <th>Status</th><td>{{transaction.status   }}</td>
                           </tr>
                       </tbody>
                    </template>
                 </v-simple-table>
                <v-card>
                    <v-card-title>
                  <div class="subtitle-1">Source Account</div>
                    <v-spacer/>
                     <Sourcedata :id="transaction.id"/>
                    </v-card-title>
                    <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                       <tbody>
                           <tr dark>
                               <th>Id</th>
                               <td> {{transaction.suspense.banktransactionId}}</td>
                           </tr>
                            <tr>
                               <th>Source Description</th>
                               <td> {{transaction.suspense.source}}</td>
                           </tr>
                           <tr>
                               <th>Source Account</th>
                               <td> {{transaction.suspense.accountnumber}}</td>
                           </tr>
                           <tr>
                               <th>Source Currency</th>
                               <td> {{transaction.suspense.currency}}</td>
                           </tr>
                           <tr>
                               <th>Source Amount</th>
                               <td> {{transaction.suspense.amount}}</td>
                           </tr>
                           <tr>
                               <th>Status</th>
                               <td> {{transaction.suspense.status}}</td>
                           </tr>
                       </tbody>
                    </template>
                  </v-simple-table>
                    </v-card-text>
                </v-card>
                <v-card class="mt-5">
                <v-card-title>
                  <div class="subtitle-1">Destination Account</div>
                   <v-spacer/>
                    <v-btn x-small class="success">Utilization Data</v-btn>
                    </v-card-title>
                    <v-card-text>
                  <v-simple-table dense>
                    <template v-slot:default>
                       <tbody>
                           <tr dark>
                               <th>Id</th>
                               <td> {{transaction.processedsuspense.suspensetransferId}}</td>
                           </tr>
                            <tr>
                               <th>Source Description</th>
                               <td> {{transaction.processedsuspense.source}}</td>
                           </tr>
                           <tr>
                               <th>Source Account</th>
                               <td> {{transaction.processedsuspense.accountnumber}}</td>
                           </tr>
                           <tr>
                               <th>Source Currency</th>
                               <td> {{transaction.processedsuspense.currency}}</td>
                           </tr>
                           <tr>
                               <th>Source Amount</th>
                               <td> {{transaction.processedsuspense.amount}}</td>
                           </tr>
                           <tr>
                               <th>Status</th>
                               <td> {{transaction.processedsuspense.status}}</td>
                           </tr>
                       </tbody>
                    </template>
                  </v-simple-table>
                    </v-card-text>
                </v-card>
                   
                 
           
           </v-card-text>
          
       </v-card>
              
      </v-dialog>
  </div>
</template>

<script>
import Sourcedata from './sourcedata.vue'
export default {
  components: {Sourcedata },
    props:['transaction'],
    data(){
        return{
           addPermModel:false ,
           valid:false,
           loading:false
        }
    },methods:{
   
    }

}
</script>

<style>

</style>