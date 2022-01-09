<template>
  <div>
             <v-btn rounded depressed x-small color="primary" @click="getList"> view schedule list</v-btn>
             <v-dialog width="1400" v-model="scheduleDialog">
                 <v-card>
                     <v-card-title>
                         Schedule List
                         <v-spacer/>
                          <downloadexcel :data="refundlist"><v-btn x-small rounded depressed color="primary">Download</v-btn></downloadexcel>
                         
                         <v-btn x-small rounded depressed color="success" @click="scheduleDialog=false"><v-icon x-small>mdi-close</v-icon> close</v-btn>
                     </v-card-title>
                     <v-card-text>
                  
                            <template  v-if="refundlist.length">
                                <v-simple-table dense>
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th>Tender Number</th>
                                                            <th>Bidder</th>
                                                            <th>Bank</th>
                                                            <th>Account name</th>
                                                            <th>Account number</th>
                                                            <th>Branch</th>
                                                            <th>Branch code</th>
                                                            <th>Swift Code</th>
                                                            <th>Initiate By</th>
                                                            <th>Approved By</th>
                                                            <th>Status</th>
                                                            <th>Amount</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="list in refundlist" :key="list.id">
                                                            <td>{{list.tendernumber}}</td>
                                                             <td>{{list.bidder}}</td>
                                                             <td>{{list.bank}}</td>
                                                             <td>{{list.accountname}}</td>
                                                             <td>{{list.accountnumber}}</td>
                                                             <td>{{list.branch}}</td>
                                                             <td>{{list.branchcode}}</td>
                                                             <td>{{list.swiftcode}}</td>
                                                             <td>{{list.inititedBy}}</td>
                                                             <td>{{list.approvedBy}}</td>
                                                             <td>{{list.status}}</td>
                                                             <td>{{list.amount}}</td>
                                                             <td>
                                                                 <template v-if="list.status=='PENDING'">
                                                                 <updateschedule :record="list"/>
                                                                 </template>
                                                             </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                </v-simple-table>
                            </template>
                            <template v-else>
                                 <v-alert
                            outlined
                            type="error"
                            prominent
                            border="left"
                            >
                             No refund list found 
                            </v-alert>
                            </template>
                     </v-card-text>
                 </v-card>
             </v-dialog>
  </div>
</template>

<script>
import updateschedule from "./updateschedule.vue"
import JsonExcel from "vue-json-excel";

export default {
  components: { updateschedule,downloadexcel:JsonExcel },
 props:['tenderapplicationId'],
 data(){
     return{
        scheduleDialog:false 
     }
 },methods:{
     async getList(){
         await this.$store.dispatch('bidbondrefunds/getrefundlist',this.tenderapplicationId)
         this.scheduleDialog=true
     }
 },computed:{
     refundlist(){
         const data = this.$store.state.bidbondrefunds.refundlist
         let array =[]
         if(data.length>0){
             data.forEach(element => {
                   const el = {id:element.id,applicationId:element.applicationId,tendernumber:element.tendernumber,bidder:element.application.account ? element.application.account.name : "", bank:element.bankdetail.name,accountnumber:element.bankdetail.accountnumber,accountname:element.bankdetail.accountname,branch:element.bankdetail.branch,branchcode:element.bankdetail.branchcode,swiftcode:element.bankdetail.swiftcode,amount:element.application.amount,status:element.status,inititedBy:element.admininitiator.name,approvedBy:element.adminapprover ? element.adminapprover.name :""  }
                   array.push(el)
             });
           
         }
         return array
     }
 }
}
</script>

<style>

</style>