<template>
  <div>
    <v-btn small rounded color="success" @click="viewDialog=true">View</v-btn>   
    <v-dialog v-model="viewDialog" width="600">
      <v-card>
        <v-card-title>Invoice Details<v-spacer/><v-btn icon @click="viewDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
        <v-card-text>
          <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                  Date
                                </th>
                                <th>
                                  Category
                                </th>
                                <th>
                                  Settlement
                                </th>
                                <th>
                                  Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          <tr v-for="inv in invoicedata" :key="inv.id">
                            <td>{{inv.created_at| formatDate}}</td>
                            <td>{{inv.category.name}}</td>
                            <td>{{inv.settlement}}</td>
                            <td>{{inv.currency.name}}{{inv.cost}}</td>
                       
                          </tr>
                        </tbody>
                    </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <invReset :invoicenumber="invoicedata[0].invoicenumber"/>
          <v-spacer/>
          <invUpdate :invoicenumber="invoicedata[0].invoicenumber"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import invReset from './reset.vue'
import invUpdate from './update.vue'
export default {
 name:'invDetails',
 components:{invReset,invUpdate},
 props:['invoicedata'], 
 data(){
     return{
       viewDialog:false  
     }
 }
}
</script>

<style>

</style>