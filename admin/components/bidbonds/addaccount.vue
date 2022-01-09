<template>
  <div>
     <v-btn rounded x-small color="primary" depressed @click="openDialog()">Add Details</v-btn>
     <v-dialog v-model="dialogModel"  width="500">
         <v-form v-model="valid" ref="form" lazy-validation>
         <v-card>
             <v-card-title>
                 Add Bank Account
                 <v-spacer/>
                 <v-btn icon @click="dialogModel=false"><v-icon>mdi-close</v-icon></v-btn>
             </v-card-title>
             <v-card-text>
                    <v-text-field
                            label="Bank Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                  <v-text-field
                            label="Account name"
                            outlined
                            v-model="form.accountname"
                            :rules="accountnameRule"
                        />
                        <v-text-field
                            label="Account number"
                            outlined
                            v-model="form.accountnumber"
                            :rules="accountnumberRule"
                        />
                           <v-text-field
                            label="Branch"
                            outlined
                            v-model="form.branch"
                            :rules="branchRule"
                        />
                            <v-text-field
                            label="Branch code"
                            outlined
                            v-model="form.branchcode"
                            :rules="branchcodeRule"
                        />
                     <v-select
                            label="Select Currency"
                            outlined
                            v-model="form.currencyId"
                            :rules="currencyRule"
                            :items="currency"
                            item-text="name"
                            item-value="id"
                           
                        />

                           <v-file-input
                    accept=".pdf"
                    label="Authrization letter"
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
             </v-card-text>
             <v-card-actions>
                    <v-btn rounded class="error" @click="dialogModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
             </v-card-actions>
         </v-card>
         </v-form>
     </v-dialog>
  </div>
</template>

<script>
export default {
    props:['id'],
 data(){
     return{

         dialogModel:false,
         loading:false,
         file:null,

         form:{
             currencyId:'',
             name:'',
             accountId:this.id,
             accountnumber:'',
             accountname:'',
             branch:'',
             branchcode:'',
             swiftcode:''
           },
         nameRule:[v=>!!v || 'Bank name is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         accountnumberRule:[v=>!!v || 'Account number is required'],
         accountnameRule:[v=>!!v || 'Account name is required'],
         branchRule:[v=>!!v || 'Branch name is required'],
         branchcodeRule:[v=>!!v || 'Branch code is required'],
        fileRule:[v=>!!v || 'Please Attache Authorization letter'],
        valid:false
     }
 },methods:{
     async openDialog(){
      await this.$store.dispatch('currency/getCurrency') 
      this.dialogModel=true
     },
     async submit(){
      if(this.$refs.form.validate())
       {
          this.valid = true

           const formData = new FormData();
          formData.append('name',this.form.name)
          formData.append('file',this.file)
          formData.append('accountId',this.id)
          formData.append('currencyId',this.form.currencyId)
          formData.append('accountnumber',this.form.accountnumber)
          formData.append('accountname',this.form.accountname)
          formData.append('branch',this.form.branch)
          formData.append('branchcode',this.form.branchcode)
          formData.append('swiftcode:',this.form.swiftcode)
         
          let config = { headers: {'content-type': 'multipart/form-data'}}
 
        try {
            await this.$axios({
                method:"POST",
                url:'api/admin/bankdetails',
                data:formData,
                config:config
            }).then((res)=>{
            this.$swal('success',res.data.message,'success')
            this.$store.dispatch('bankdetails/getDetails',this.id)
          })  
        } catch (error) {
            this.$swal("error",error,"error") 
        }
       }
     }
 },
 computed:{
      currency(){
      return this.$store.state.currency.currency        
       },
 }
}
</script>

<style>

</style>