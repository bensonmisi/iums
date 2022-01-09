<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Bank Details</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Bank Details
                    <v-spacer/>
                </v-card-title>
                <v-card-text>
                      <v-simple-table dense>
                            <template v-slot:default>
                               <thead>
                                   <tr>
                                       <th>Bidder</th>
                                       <th>Bank</th>
                                       <th>Account name</th>
                                        <th>Account number</th>
                                        <th>Currency</th>
                                        <th>Branch</th>
                                        <th>Branch code</th>
                                         <th>Status</th>
                                         <th></th>
                                   </tr>
                               </thead>
                               <tbody>
                                
                                   <tr v-for="detail in details" :key="detail.id">
                                       <td>{{detail.account ? detail.account.name : ""}}</td>
                                       <td>{{detail.name}}</td>
                                       <td>{{detail.accountname}}</td>
                                        <td>{{detail.accountnumber}}</td>
                                            <td>{{detail.currency ? detail.currency.name : ""}}</td>
                                         <td>{{detail.branch}}</td>
                                           <td>{{detail.branchcode}}</td>
                                             <td>                                                
                                            {{detail.status}}                                          
                                                                          
                                             </td>
                                             <td>

                                              <v-btn x-small depressed rounded color="primary" @click="openletter(detail.letter)">Open letter</v-btn>
                                              <v-btn x-small depressed rounded color="success" @click="approve(detail.id)">Approve</v-btn>
                                             </td>
                                   </tr>
                              
                                  
                               </tbody>
                            </template>
                       </v-simple-table>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
export default {
layout:'user',
data(){
    return{
        overlay:false
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('bankdetails/getAll') 
   this.overlay = false
},
methods:{
    openletter(letter){
        let fullURl ="http://localhost:4000/"+letter
        window.open(fullURl)
    },
    async approve(id){
            await this.$store.dispatch('bankdetails/approve',id)
    }
},computed:{
    details(){
        return this.$store.state.bankdetails.details
    }
}
}
</script>

<style>

</style>