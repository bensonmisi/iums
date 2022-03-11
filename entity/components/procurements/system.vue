<template>
 <div>
   <v-btn rounded small @click="systemDialog=true">Add System Procurements</v-btn>   
   <v-dialog v-model="systemDialog" width="1100">
       <v-card flat class="rounded-0">
           <v-toolbar dense dark color="primary">
               <v-toolbar-title>System Procurements</v-toolbar-title>
               <v-spacer/>
               <v-btn icon @click="systemDialog=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-toolbar>
           <v-card-text>
                <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Tender Number</th>
                                    <th>Description</th>
                                    <th>Procurement Type</th>
                                    <th>Bidder</th>
                                    <th>Value</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                              <template v-if="notices && notices.length>0">
                                <tr v-for="(notice,index) in notices" :key="index">
                                  <td><small>{{notice.created_at|formatDate}}</small></td>
                                  <td><small>{{notice.tendernumber}}</small></td>
                                  <td><small>{{notice.description}}</small></td>
                                  <td><small>{{notice.procurementtype}}</small></td>
                                  <td><small>{{notice.account}}</small></td>
                                  <td><small>{{notice.currency}}{{notice.value}}</small></td>
                             
                                  <td>
                                      <v-btn rounded small color="success" @click="getChecklist(notice)">Add Item</v-btn>
                                  </td>
                                </tr>
                              </template>
                              <template v-else>
                               <tr>
                                <td colspan="7" class="text-center red--text">System Procerements not found</td> 
                               </tr>   
                              </template>
                            </tbody>
                        </template>
                    </v-simple-table>
           </v-card-text>
       </v-card>
   </v-dialog>
   <v-dialog v-model="checklistDialog" width="600">
    <v-card>
        <v-toolbar dense color="success">
            <v-toolbar-title>Checklist</v-toolbar-title>
        </v-toolbar>
            <v-card-text>
            <template>
                <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                       <template v-if="checklist && checklist.checklistquestion.length>0">

                       <tr v-for="check in checklist.checklistquestion" :key="check.id">
                           {{checkquestion(check.id)}}
                          <template v-if="checkquestion(check.id)"> 
                          <td>
                              {{check.question}}
                          </td>
                          <td>
                              <div class="d-flex justify-between">
                                  <v-btn small depressed color="success" class="mr-1" @click="addAnswer(check.id,'Y')">YES</v-btn>
                                   <v-btn small depressed class="mr-1" color="error" @click="addAnswer(check.id,'N')">NO</v-btn>
                                    <v-btn small depressed color="warning" @click="addAnswer(check.id,'NA')">N/A</v-btn>
                              </div>
                          </td>
                          </template>
                       </tr>
                       </template>
                       <template v-else>
                           <tr>
                               <td colspan="2" class="text-center red--text">No Question found</td>
                           </tr>
                       </template>
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
export default {
    props:['id'],
data(){
    return{
        systemDialog:false,
        checklistDialog:false,
        notice:{},
        answers:[]
    }

},
  methods:{
     async getChecklist(notice){
         this.notice = notice
         await this.$store.dispatch('checklist/getData',notice.procurementcategoryId)
         this.checklistDialog = true
     } ,
     async addAnswer(id,answer){
       this.answers.push({checklistquestionId:id,answer:answer})
       if(this.answers.length == this.checklist.checklistquestion.length){
           
           await this.submit()
       }
     },
     async submit(){        
         var formdata = {sectionId:this.notice.sectionId,noticetypeId:this.notice.noticetypeId,monthlyreturnId:this.id,noticeawardId:this.notice.noticeawardId,tendernumber:this.notice.tendernumber,currencyId:this.notice.currencyId,procurementcategoryId:this.notice.procurementcategoryId,procurementtypeId:this.notice.procurementtypeId,answers:JSON.stringify(this.answers),value:this.notice.value}
        await this.$store.dispatch('checklist/addData',formdata)
    },
    checkquestion(id){
       if(this.answers.length>0){
           this.answers.forEach(ans=>{
               if(ans.checklistquestionId==id){
                   return false
               }
           })
       }
       return true
    }
  }
,computed:{    
      notices(){
          const notices = this.$store.state.monthlyreturn.data.notices
          let data =[]
          if(notices && notices.length>0){
                 notices.forEach(notice => {
                       if(notice.noticeproduct.length>0)
                         {
                      notice.noticeproduct.forEach(prod=>{
                          if(prod.awards.length>0)
                           {
                          prod.awards.forEach(award=>{ 
                              const el ={sectionId:notice.sectionId,description:prod.description,award_date:award.created_at,tendernumber:notice.tendernumber,noticeawardId:award.id,currencyId:award.currencyId,procuremententityId:notice.procuremententityId,procurementcategoryId:notice.procurementcategoryId,noticetypeId:notice.noticetypeId,procurementtype:notice.noticetype.name,currency:award.currency.name,value:award.value,accountId:award.accountId,account:award.account.name}
                     data.push(el)
                          })
                           }
                        
                      })
                         }
                   
                 });
          }
          return data
      },checklist(){
          return this.$store.state.checklist.data
      }
}
}
</script>

<style>

</style>