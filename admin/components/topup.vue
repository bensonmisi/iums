<template>
  <div>
     <v-btn x-small reounded depressed @click="addPermModel=true">Topup</v-btn>
      <v-dialog v-model="addPermModel" width="800">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
              Search
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                <v-row>
                   <v-col>
                  <v-text-field
                            label="Description"
                            outlined
                            dense
                            v-model="form.description"
                        />
                   </v-col>
                   <v-col>
                        <v-text-field
                            label="Source reference"
                            outlined
                            dense
                            v-model="form.sourcereference"
                        />
                   </v-col>
                   <v-col>
                         <v-text-field
                            label="Statement reference"
                            outlined
                            dense
                            v-model="form.statementreference"
                        />
                   </v-col>
                   <v-col>
                      <v-btn depressed color="primary" block @click="submit">Search</v-btn>
                   </v-col>
               </v-row>

                 <v-simple-table dense class="mt-4">
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
                        <template v-if="transactions.length>0">
                        <tr
                        v-for="per in transactions"
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
                          <template v-if="per.status=='PENDING'">
                          <v-btn x-small rounded depressed color="success" @click="getPOPs(per.id)">claim</v-btn>
                          </template>
                        </td>
                      
                        </tr>
                        </template>
                    </tbody>
                    </template>
                </v-simple-table>
                      
                          
           </v-card-text>
       </v-card>
           </v-form>
      </v-dialog>
       <v-dialog v-model="claimModel" width="400">
         <v-card>
           <v-card-title>
              Attach POP
               <v-spacer/>
               <v-btn icon @click="claimModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                <v-simple-table dense>
                         <template v-slot:default>
                             <thead>
                                 <tr>                                     
                                     <th>
                                      Bank
                                     </th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="rtgs.length>0">
                                   <tr v-for="rtg in rtgs" :key="rtg.id">
                                    <td>{{rtg.name}}</td>                                    
                                    <td>
                                        <v-btn color="success" depressed rounded x-small  @click="claim(rtg.id)">view</v-btn>
                                    </td>
                                   </tr>
                                 </template>
                                 <template v-else>
                                     <tr>
                                         <td colspan="2" class="text-center red--text">No Uploads found</td>
                                     </tr>
                                 </template>
                             </tbody>
                         </template>
            </v-simple-table>
           </v-card-text>
         </v-card>
       </v-dialog>
  </div>
</template>

<script>
export default {
    props:['accountId','invoiceId'],
 data(){
     return{
         addPermModel:false,
         claimModel:false,
         valid:false,
         transactions:[],
         transactionId:'',
         form:{
            description:'',
            sourcereference:'',
            statementreference:''
           },
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
          this.loading = true
          await this.$axios.post('api/admin/banktransaction',this.form).then((res)=>{
            this.transactions = res.data
          }) 
           this.loading = false
     },
      async getPOPs(id){
        this.transactionId=id
         await  this.$store.dispatch('rtgs/getRtgs',this.accountId)
         this.claimModel = true
       },
     async claim(id){
           this.loading = true
           const dt= {accountId:this.accountId,id:this.transactionId,rtgsId:id}
          await this.$axios.post('api/admin/banktransaction/claim',dt).then((res)=>{
             this.color="success"
                this.snackbar=true
                        this.text=res.data.message
                          this.loading = false
            this.$store.dispatch('awaitingtenderinvoices/getReceiptData',this.invoiceId)
                     
          }).catch((err)=>{
               this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
          })
         
     }
 },computed:{
    rtgs(){
        return  this.$store.state.rtgs.rtgs
    }
 }
}
</script>

<style>

</style>