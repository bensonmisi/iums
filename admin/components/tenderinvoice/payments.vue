<template>
  <div>
    <v-card class="mt-5">
         <v-toolbar color="green" dark>
          <v-toolbar-title>Receipts</v-toolbar-title>
       </v-toolbar>
             <v-card-text>
                    <v-simple-table dense>
                    <template v-slot:default>
                          <thead>
                          <tr>
                            <th>Date</th>
                             <th>Receipt number</th>                       
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-if="receipts.length">
                          <tr v-for="receipt in receipts" :key="receipt.id">
                           <td>
                             {{receipt.created_at}}
                           </td>
                            <td>
                             {{receipt.receiptnumber}}
                           </td>
                            <td>
                              {{receipt.currency}}{{receipt.amount}}
                           </td>
                          </tr>
                          </template>
                          <template v-else>
                            <tr>
                              <td colspan="4" class="text-center red--text">No receipts found as yet</td>
                            </tr>
                          </template>
                        </tbody>
                    </template>
                    </v-simple-table>
             </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props:['receipts']
}
</script>

<style>

</style>