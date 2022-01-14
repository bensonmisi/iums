<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Contract Fees</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  Contract Fees
                  <v-spacer/>
                   <downloadexcel :data="applications"><v-btn  depressed class="primary mr-2">Export</v-btn></downloadexcel>
             
                </v-card-title>
                <v-card-text>
                            <template  v-if="applications.length">
       <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>Bidder</th>
                            <th>Tender Number</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Code</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        
                          <tr v-for="application in applications" :key="application.id">
                             <td>
                               {{application.id}}
                             </td>
                              <td>
                               {{application.name}}
                             </td> 
                              <td>
                               {{application.tendernumber}}
                             </td>                             
                              <td>
                               {{application.currency}}{{application.amount}}
                             </td>
                              <td>
                               {{application.status}}
                             </td>
                              <td>
                               {{application.code}}
                             </td>
                             <td>
                                
                             </td>
                          </tr>
                        
                        
                        </tbody>
                    </template>
                </v-simple-table>
                  </template>
                     <template v-else>
                      <v-alert
                        prominent
                        type="error"
                      >
                            We could not find any settled contract fee applications 
                        
                      </v-alert>          
                  </template>
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
import JsonExcel from "vue-json-excel";
export default {
layout:'user',
components:{
downloadexcel:JsonExcel
},
data(){
    return{
        overlay:false
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('tenderapplications/getApplications',"CONTRACT FEE") 
   this.overlay = false
},computed:{
    applications(){
        let array = []
        const data =  this.$store.state.tenderapplications.applications

        data.forEach(element => {
            const el = {id:element.id,name:element.account?element.account.name:"",tendernumber:element.tendernumber,currency:element.currency.name,amount:element.amount,status:element.status,code:element.status} 
           array.push(el)
       });

       return array
    }
}
}
</script>

<style>

</style>