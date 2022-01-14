<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Awaiting Contract Invoices </v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
     
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  
                   
                     <v-text-field
                            label="Filter"
                            width="100px"
                            outlined
                            v-model="filter"
                        />
                      
                </v-card-title>
                <v-card-text>
                  
                    <template v-if="transactions">
                      <v-simple-table>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>
                                         Date
                                     </th>
                                     <th>
                                        Reg number
                                     </th>
                                     <th>
                                         Account Name
                                     </th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                               <tr v-for="(account,index) in transactions" :key="index">
                                <td>
                                  {{account.created_at | formateHumanDiff}}
                                </td>
                                   <td>
                                    {{account.regnumber  }}
                                </td>
                                <td>
                                    {{account.name  }}
                                </td>

                               <td>
                                  <TasksAdd :accountId="account.accountId" :identifier="account.id" type="TENDERINVOICES"/>
                               </td>
                               </tr>

                             </tbody>

                         </template>
                      </v-simple-table>
                    </template>
                    <template v-else>
                         <v-alert
                            color="red lighten-2"
                            dark
                            >
                            No Tender Invoices awaiting verification found as yet
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

export default {
layout:'user',
data(){
    return{
        overlay:false,
        tabs:null,
        filter:''
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('awaitingtenderinvoices/getContractInvoices') 
   this.overlay = false
},computed:{
    transactions(){
     const data =  this.$store.state.awaitingtenderinvoices.invoices
      
            if(this.filter !='')
            {
                return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.filter.toUpperCase())))
            }else{
                return data
            }

      
    }
}
}
</script>

<style>

</style>