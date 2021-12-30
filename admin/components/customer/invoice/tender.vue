<template>
  <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    :content="invoices ? invoices.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-file</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Tender Invoices</div>
               <v-btn block depressed color="primary" @click="infoDialog=true">Open</v-btn>

           </v-card-text>
       </v-card>
             <v-dialog v-model="infoDialog" width="900">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      Tender Invoices
   </v-card-title>
 <v-card-text>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
           Settlment Date
          </th>
           <th class="text-left">
           Invoice number
          </th>
          <th class="text-left">
         Tender number
          </th>
          <th class="text-left">
           Description
          </th>
          <th class="text-left">
            Status
          </th>
           <th class="text-left">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="invoices">
           <template v-if="invoices.length>0"> 
        <tr
          v-for="item in invoices"
          :key="item.id"
        >
          <td>{{ item.updated_at| formatDate }}</td>
            <td>{{ item.invoicenumber }}</td>
           <td>
              {{item.tendernumber}}
             </td>
              <td>{{ item.description }}</td>
          <td>{{ item.status }}</td>
           <td>{{ item.currency ? item.currency.name : '' }}{{ item.amount }}</td>
         
      
        </tr>
           </template>
          <template v-else>
              <tr><td colspan="6" class="text-center red--text">No Tender Invoices Found</td></tr>
          </template>
          </template>
        
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
       </v-dialog>
  </v-col>
</template>

<script>
export default {
name:'tenderinvoices',
props:['invoices'],
data(){
  return{
  infoDialog:false
  }
}
}
</script>
<style scoped>

.icon-size{
    font-size: 60px !important;
}
 
</style>