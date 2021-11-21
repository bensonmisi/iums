<template>
  <div>
      <v-btn x-small depressed color="primary" @click="addPermModel=true">View</v-btn>
   
      <v-dialog v-model="addPermModel" width="700">
       <v-card>
           <v-card-title>
               View Transaction
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                 <v-simple-table dense>
                    <template v-slot:default>
                       <tbody>
                           <tr>
                               <th>Recieved On</th><td>{{transaction.created_at | formatDate }}</td>
                           </tr>
                            <tr>
                               <th>Description</th><td>{{transaction.description }}</td>
                           </tr>
                            <tr>
                               <th>Account Number</th><td>{{transaction.accountnumber   }}</td>
                           </tr>
                             <tr>
                               <th>Reference number</th><td>{{transaction.referencenumber   }}</td>
                           </tr>
                           <tr>
                               <th>Source reference number</th><td>{{transaction.sourcereference   }}</td>
                           </tr>
                           <tr>
                               <th>Statement Reference</th><td>{{transaction.statementreference  }}</td>
                           </tr>
                            <tr>
                               <th>Claime</th><td>{{transaction.regnumber}}</td>
                           </tr>
                            <tr>
                               <th>Status</th><td>{{transaction.status   }}</td>
                           </tr>
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
    props:['transaction'],
    data(){
        return{
           addPermModel:false 
        }
    }

}
</script>

<style>

</style>