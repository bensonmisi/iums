<template>
 <div>
   <v-btn rounded small @click="getChecklist">Add Manual Procurements</v-btn>   

   <v-dialog v-model="checklistDialog" width="800">
    <v-card>
        <v-toolbar dense color="success">
            <v-toolbar-title>Manual Procurement Return</v-toolbar-title>
        </v-toolbar>
            <v-card-text class="mt-1">
                   <v-row>
                   <v-col>
                  <v-text-field label="Title" dense outlined v-model="form.title" :rules="titleRule"/>
                   </v-col>
                   <v-col>
                  <v-text-field label="Tender number" dense outlined v-model="form.tendernumber" :rules="tendernumberRule"/>
                   </v-col>
                   </v-row>
                   <v-row>
                <v-col>
                    <v-select dense v-model="form.noticetypeId" :rules="noticetypeRule" outlined label="Notice Type" :items="types" item-text="name" item-value="id" />
                </v-col>

                       <v-col>
                    <v-select dense outlined :items="currency" v-model="form.currencyId" :rules="currencyRule" item-text="name" item-value="id" label="Currency"/>
                </v-col>
                </v-row>
                <v-row>
               <v-col>  <v-select dense v-model="form.sectionId" :rules="sectionRule" outlined label="Notice Section" :items="sections" item-text="name" item-value="id" />
               </v-col>
                    <v-col>
                <v-select dense outlined label="Procurement Category" :items="procurementcategories" item-value="id" item-text="name" v-model="form.procurementcategoryId" :rules="procurementcategoryRule"/>
                </v-col>
                </v-row>
                <v-row>
                <v-col>
                    <v-text-field dense outlined label="Value" prepend-inner-icon="mdi-currency-usd" v-model="form.value" :rules="valueRule"/>
                </v-col>
                 <v-col>
                          <v-select outlined label="Annual Plan Entry" v-model="form.annualplanId" :items="annualplan" item-value="id" item-text="description" :rules="isplannedRule"/> 
                     </v-col>
                </v-row>

                  <template class="mt-2" v-if="form.procurementcategoryId">
                <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                       <template v-if="checklist[0] && checklist[0].checklistquestion.length>0">

                       <tr v-for="check in checklist[0].checklistquestion" :key="check.id">
                          
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
                
            </v-card-text>,
            <v-card-actions>
                <v-btn rounded depressed color="error" @click="checklistDialog=false">Cancel</v-btn>
                <v-spacer/>
                <v-btn rounded depressed color="success">Submit</v-btn>
            </v-card-actions>
      
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
        answers:[],
        form:{
              title:'',
              tendernumber:'',
              noticetypeId:'',
              currencyId:'',
              sectionId:'',
              procurementcategoryId:'',
              value:'',
              annualplanId:''
        },
         titleRule:[v=>!!v ||'Title is required'],
         tendernumberRule:[v=>!!v ||'Tender number is required'],
         noticetypeRule:[v=>!!v ||'Notice Type is required'],
         valueRule:[v=>!!v ||'Value is required'],
         sectionRule:[v=>!!v ||'Section is required'],
         fileRule:[v=>!!v ||'Tender Document required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         procurementcategoryRule:[v=>!!v || 'Procurement category required'],  
         isplannedRule:[v=>!!v || 'Indi required'],   
         loading:false,
    }

},
  methods:{
     async getChecklist(){        
         await this.$store.dispatch('settings/getNoticeSettings')
         await this.$store.dispatch('checklist/getAll')
          await this.$store.dispatch('annualplan/getData')
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
     checklist(){
           const data = this.$store.state.checklist.data
           if(this.form.procurementcategoryId)
           {
           return  data.filter(dt=>{return dt.procurementcategoryId==this.form.procurementcategoryId})
           }
           return data
      },
     currency(){
         return this.$store.state.settings.settings.currency
     },
     types(){
         return this.$store.state.settings.settings.noticetypes
     },
     sections(){
         return this.$store.state.settings.settings.sections
     },
     procurementcategories(){
         return this.$store.state.settings.settings.procurementcategories
     },
      annualplan(){
         return this.$store.state.annualplan.data
     },
     periods(){
         return this.$store.state.settings.settings.periods
     }
}
}
</script>

<style>

</style>