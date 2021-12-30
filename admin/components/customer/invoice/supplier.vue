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
                 <v-icon x-large color="green" class="icon-size">mdi-receipt</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Supplier Invoices</div>
               <v-btn block depressed color="primary" @click="infoDialog=true">Open</v-btn>

           </v-card-text>
       </v-card>
             <v-dialog v-model="infoDialog" width="900">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      Supplier Invoices
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
           Category
          </th>
          <th class="text-left">
           Year
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
             <template v-if="item.category">
            <div> {{ item.category.name }}</div>
            <div class="font-weight-bold">{{ item.category.code }}</div>
             </template>
             </td>
              <td>{{ item.year }}</td>
          <td>{{ item.status }}</td>
           <td>{{ item.currency ? item.currency.name : '' }}{{ item.amount }}</td>
         
      
        </tr>
           </template>
          <template v-else>
              <tr><td colspan="6" class="text-center red--text">No Supplier Invoices Found</td></tr>
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
name:'supplierinvoices',
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