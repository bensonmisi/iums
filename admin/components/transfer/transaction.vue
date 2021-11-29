<template>
   <v-simple-table dense>
                    <template v-slot:default>
                       <tbody>
                           <tr>
                               <th>Description</th><td>{{transaction.description }}</td>
                           </tr>
                            <tr>
                               <th>transaction Date</th><td>{{transaction.transactionDate }}</td>
                           </tr>
                            <tr>
                               <th>Reference Number</th><td>{{transaction.referencenumber  }}</td>
                           </tr>
                             <tr>
                               <th>Source reference</th><td>{{transaction.sourcereference  }}</td>
                           </tr>
                           <tr>
                               <th>Statement reference</th><td>{{transaction.statementreference  }}</td>
                           </tr>
                           <tr>
                               <th>Accountnumber</th><td>{{transaction.accountnumber  }}</td>
                           </tr>
                           <tr>
                               <th>Amount</th><td>{{transaction.currency }} {{transaction.amount }}</td>
                           </tr>
                          
                       </tbody>
                    </template>
                 </v-simple-table>
</template>

<script>
export default {
 props:['transaction']
}
</script>

<style>

</style>