<template>
  <div>
      <v-btn x-small depressed color="primary" @click="addPermModel=true">View</v-btn>
   
      <v-dialog v-model="addPermModel" width="700">
                   <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               View Transaction
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
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
                               <th>Status</th><td>{{transaction.status   }}</td>
                           </tr>
                       </tbody>
                    </template>
                 </v-simple-table>
                 <div class="title">Make Decision</div>
                             <v-select
                            label="Select Status"
                            outlined
                            v-model="form.status"
                            :rules="statusRule"
                            :items="statuslist"
                        />   

                    <v-text-field
                            label="Reason"
                            v-if="form.status=='DENIED'"
                            outlined
                            v-model="form.reason"
                        />
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
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
    props:['transaction'],
    data(){
        return{
           addPermModel:false ,
           valid:false,
           loading:false,
           statuslist:['APPROVED','DENIED'],
           form:{
               id:"",
               status:"",
               reason:""
           },

           statusRule:[v=>!!v || 'Select Status'],
        }
    },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
               this.form.id = this.transaction.id
                 await this.$axios.post('api/admin/suspensetransfers/decision',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('suspensetransfers/getTransactions') 
                        this.$refs.form.reset()
                        this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
       }
    }

}
</script>

<style>

</style>