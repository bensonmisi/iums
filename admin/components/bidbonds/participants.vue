<template>
  <div>
      <v-btn x-small rounded depressed color="success" @click="openList">View</v-btn>
        <v-dialog v-model="addPermModel"    
          fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
       <v-card>
           <v-card-title>
              Tender Participants
               <v-spacer/>
            <schedulelist :tenderapplicationId="id"/>
               <v-btn x-small depressed color="success" class="ml-1" rounded @click="addPermModel=false"><v-icon x-small>mdi-close</v-icon> close</v-btn>
           </v-card-title>

           <v-card-text>
              <template  v-if="participants.length">
       <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>Tender Number</th>
                             <th>Company</th>
                            <th>Type</th>
                            <th>Closing Date</th>
                            <th>Validity Period</th>
                            <th>Maturity Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Refunded</th>
                            <th>Allow Refund</th>
                            <th>Code</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        
                          <tr v-for="application in participants" :key="application.id">
                             <td>
                               {{application.id}}
                             </td>
                              <td>
                               {{application.tendernumber}}
                             </td>
                               <td>
                               {{application.account ? application.account.name : ""}}
                             </td>
                              <td>
                               {{application.type}}
                             </td>
                              <td>
                               {{application.closingDate}}
                             </td>
                              <td>
                               {{application.validityperiod}}
                             </td>
                             <td>
                               {{application.maturitydate}}
                             </td>
                              <td>
                               {{ application.currency ? application.currency.name :''}}{{application.amount}}
                             </td>
                              <td>
                               {{application.status}}
                             </td>
                               <td>
                               {{application.refunded}}
                             </td>
                               <td :class="application.refund">
                               {{application.refund}}
                             </td>
                              <td>
                               {{application.code}}
                             </td>
                             <td>
                               <template v-if="!checkDate(application.maturitydate)">
                                 <template v-if="application.refunded=='PENDING'">
                                   <bidderbankdetails :application="application"/>
                                 </template>
                               </template>
                             </td>
                          </tr>
                        
                        
                        </tbody>
                    </template>
                </v-simple-table>
                  </template>
           </v-card-text>
       </v-card>
        </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import bidderbankdetails from './bidderbankdetails.vue'
import schedulelist from './schedulelist.vue'
export default {
  components: { bidderbankdetails, schedulelist },
name:'participants',
props:['id'],
data(){
  return{
    addPermModel:false,
    details:[]
  }
},
methods:{
  async openList(){
   await this.$store.dispatch('bidbonds/getDetails',this.id) 
   this.addPermModel = true
  
  },
  checkDate(date){
     const maturitydate = new Date(date)
      let check = moment(maturitydate).isSameOrAfter(moment().format('YYYY-MM-DD hh:mm:ss'))
      return check
 }
},computed:{  
  participants(){
    return this.$store.state.bidbonds.details
  }
}
}
</script>

<style scoped>
 .N{
   color: red;
 }
 .Y{
   color: green;
 }
</style>