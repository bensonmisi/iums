<template>
  <div>
       <v-btn color="success"  x-small depressed @click="getDetails()">Add</v-btn>
       <v-dialog v-model="detailDialog" width="1000">
           <v-card>
               <v-card-title>
                  Bank Accounts
                   <v-spacer/>
                   <v-btn icon @click="detailDialog=false">
                       <v-icon>mdi-close</v-icon>
                   </v-btn>
               </v-card-title>
               <v-card-text>
                    <template v-if="details.length>0">
                       <v-simple-table dense>
                            <template v-slot:default>
                               <thead>
                                   <tr>
                                       <th>Bank</th>
                                       <th>Account name</th>
                                        <th>Account number</th>
                                        <th>Branch</th>
                                        <th>Branch code</th>
                                          <th>Swift Code</th>
                                         <th>Status</th>
                                         <th></th>
                                   </tr>
                               </thead>
                               <tbody>
                                
                                   <tr v-for="detail in details" :key="detail.id">
                                       <td>{{detail.name}}</td>
                                       <td>{{detail.accountname}}</td>
                                        <td>{{detail.accountnumber}}</td>
                                         <td>{{detail.branch}}</td>
                                           <td>{{detail.branchcode}}</td>
                                              <td>{{detail.swiftcode}}</td>
                                             <td>
                                                  <v-chip
                                                :color="detail.status=='PENDING' ? 'red' : 'green'"
                                                x-small
                                                >
                                            {{detail.status}}
                                            </v-chip>
                                                                            </td>
                                             <td>

                                                <template v-if="detail.status=='PENDING'">
                                                 <editaccount :account="detail"/>
                                                </template>
                                                <template v-else>
                                                 <useaccount :application="application" :bankdetail="detail"/>
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
                             <v-row align="center">
                             <v-col class="grow">
                             No Bank accounts found for the selected bidder.Please notify client to enter account details from his portal accoount
                             </v-col>
                              <v-col class="shrink">
                               <addaccount :id="application.accountId"/>
                                <v-btn rounded x-small color="success" depressed @click="sendMail()">Send Email</v-btn>
                                </v-col>
                              </v-row>
                            </v-alert>
                    </template>
               </v-card-text>
           </v-card>
       </v-dialog>
            
  </div>
</template>

<script>
import addaccount from './addaccount.vue'
import editaccount from './editaccount.vue'
import useaccount from './useaccount.vue'
export default {
  components: { addaccount,editaccount, useaccount },
 name:'bidderbankdetails',
 props:['application'],
 data(){
     return{
      detailDialog:false
     }
 },methods:{
    async getDetails(){
             try {
       await this.$store.dispatch('bankdetails/getDetails',this.application.accountId)
       this.detailDialog=true
    
    } catch (error) {
     this.$swal("error",error.response.data.message,"error")   
    }
     },
      async sendMail(){
            try {
        this.$axios.get('api/admin/bidbondrefund/notify/'+this.application.accountId).then(res=>{
        this.$swal('success',res.data.message,'success')
    }).catch(error=>{
       this.$swal("error",error.response.data.message,"error")   
    })
 
    } catch (error) {
     this.$swal("error",error,"error")   
    }
 }
 },
 computed:{
     details(){
         return this.$store.state.bankdetails.details
     }
 }

}
</script>

<style>

</style>