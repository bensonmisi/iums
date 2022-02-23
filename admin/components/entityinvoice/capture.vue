<template>
  <div>
        <v-btn small depressed rounded color="success" @click="transDialog=true">capture</v-btn>
        <v-dialog v-model="transDialog" width="1000">
          <v-card>
            <v-card-title>Search for transaction<v-spacer/><v-btn icon @click="transDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
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
                            {{per.accountnumber}}

                        </td>
                          <td>
                           <div> {{per.sourcereference}}</div>
                            <div><small> {{per.description}}</small></div>
                        </td>
                          <td>
                            {{per.currency}}{{per.amount}}
                        </td>
                         <td>
                            {{per.status}}
                        </td>
                        <td>
                          <template v-if="per.status=='PENDING'">
                          <v-btn x-small rounded depressed color="success" @click="claim(per.id)">claim</v-btn>
                          </template>
                        </td>
                      
                        </tr>
                        </template>
                        <template v-else>
                          <tr>
                            <td colspan="5" class="text-center red--text">Nothing to show</td>
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
 props:['id'],
 data(){
   return{
     transDialog:false,
     transactions:[],
         form:{
            description:'',
            sourcereference:'',
            statementreference:''
           },
           claimform:{
          banktransactionId:'',
          id:''
           }
   }
 },methods:{
     async submit(){
          this.loading = true
          await this.$axios.post('api/admin/banktransaction',this.form).then((res)=>{
            this.transactions = res.data
          }) 
           this.loading = false
     },
     async claim(id){
       this.claimform.banktransactionId = id
       this.claimform.id = this.id
                this.$swal({
  title: 'Are you sure?',
  text: "You want to utilize allocate transaction to entity",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes!'
}).then((result) => {
  if (result.isConfirmed) {
      this.$store.dispatch('entityinvoice/claim',this.claimform)
  }
})

     }
 }
}
</script>

<style>

</style>