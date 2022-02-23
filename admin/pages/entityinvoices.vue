<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Entity Invoices</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                 <v-text-field outlined  v-model="search" label="Filter"/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                         Date
                        </th>
                         <th class="text-left">
                        Procurement Entity
                        </th>
                         <th class="text-left">
                          Class
                        </th>
                          <th class="text-left">
                          Expire Year
                        </th>
                         <th class="text-left">
                         Fee
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="invoices.length>0">
                          <tr v-for="inv in invoices" :key="inv.id">
                           <td>{{inv.created_at|formatDate}}</td>
                             <td>{{inv.procuremententity.name}}</td>
                               <td>{{inv.authorityapplication.procurementclass.name}}</td>
                               <td>{{inv.expire_year}}</td>
                               <td>{{inv.currency.name}}{{inv.cost}}</td>
                               <td class="d-flex pt-2">
                                  <EntityinvoiceReceipts :id="inv.id"/>
                               </td>
                          </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="text-center red--text">No Procurement Invoices found</td>
                            </tr>
                        </template>
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
        overlay:false,
        search:""
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('entityinvoice/getData','AWAITING') 
   this.overlay = false
},computed:{
    invoices(){
        const data =  this.$store.state.entityinvoice.data

        if(this.search){
            return data.filter(dt=>(!dt.procuremententity.name.toUpperCase().indexOf(this.search.toUpperCase())))
        }
        return data
    }
}
}
</script>

<style>

</style>