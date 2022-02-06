<template>
     <div>
       <v-row>
           <v-col md="6" offset-md="3">
               <v-form ref="form" lazy-validation v-model="valid">
             <v-card>
                 <v-card-title>Company Banking Details</v-card-title>
                 <v-card-text>
                     <v-alert
                        outlined
                        type="error"
                        prominent
                        border="left"
                        >
                       Please enter your company banking details that will be used  when processing your bid bond refund. You should attach a letter  with your company letterhead  and authorizing  us  to use the account details for all refunds belonging to the company
                        </v-alert>
                        <v-row>
                            <v-col>
                     <v-text-field
                            label="Bank name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                            </v-col>
                            <v-col>
                         <v-text-field
                            label="Account name"
                            outlined
                            v-model="form.accountname"
                            :rules="accountnameRule"
                        />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                         <v-text-field
                            label="Account number"
                            outlined
                            v-model="form.accountnumber"
                            :rules="accountnumberRule"
                        />
                            </v-col>
                            <v-col>
                          <v-select   
                            label="Currency"
                            outlined
                            v-model="form.currencyId"
                            :rules="currencyRule"
                            :items="currency"
                            item-value="id"
                            item-text="name"
                        />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                           <v-text-field
                            label="Branch"
                            outlined
                            v-model="form.branch"
                            :rules="branchRule"
                        />
                            </v-col>
                            <v-col>
                        
                           <v-text-field
                            label="Branch Code"
                            outlined
                            v-model="form.branchcode"
                            :rules="branchcodeRule"
                        />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                         <v-file-input
                    accept=".pdf"
                    label="File input"
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                            </v-col>
                        </v-row>
                      
                 </v-card-text>
                  <v-card-actions>
               <v-btn rounded class="error" @click="uploadModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
             </v-card>
               </v-form>
           </v-col>
       </v-row>
     </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
 await this.$store.dispatch('invoicing/getSettings')
 },data(){
     return{
         file:null,
         valid:false,
         loading:false,
         form:{
             name:'',
             accountname:'',
             accountnumber:'',
             branch:'',
             branchcode:'',
             swiftcode:'',
             currencyId:''
             
         },
         fileRule:[v=>!!v || 'Authorization letter required'],
         nameRule:[v=>!!v || 'Bank name required'],
         accountnumberRule:[v=>!!v ||' Account number required'],
           accountnameRule:[v=>!!v ||' Account name required'],
         branchRule:[v=>!!v || 'Branch required'],
         branchcodeRule:[v=>!!v || 'Branch code required'],
           currencyRule:[v=>!!v || 'currency required'],

     }
 },computed:{
    currency(){
        return this.$store.state.invoicing.setting.currency
    }
 },methods:{
     async submit(){
            if(this.$refs.form.validate()){
                this.loading = true
                this.valid = true
                 const formdata = new FormData()
                 formdata.append('name',this.form.name)
                 formdata.append('accountnumber',this.form.accountnumber)
                 formdata.append('accountname',this.form.accountname)
                 formdata.append('branch',this.form.branch)
                 formdata.append('branchcode',this.form.branchcode)
                 formdata.append('swiftcode',this.form.swiftcode)
                 formdata.append('currencyId',this.form.currencyId)
                 formdata.append('file',this.file)
                 await this.$axios.post('api/bidder/bankaccount',formdata).then(res=>{
                     this.$swal(res.data.status,res.data.message,res.data.status)
                     this.$router.push('/user/tenders')
                 }).catch(error=>{
                    this.loading = false
                    this.$swal('error',error.response.data.message,'error')
                 })
            }
     }
 }

}
</script>

<style>

</style>