<template>
  <div>
        <v-card v-if="fee" class="mt-5">
         <v-toolbar color="error" dark>
          <v-toolbar-title> Required Fee: {{fee.name}} </v-toolbar-title>
       </v-toolbar>
        <v-card-text>
               
            <template v-if="application.length>0">   
       <v-simple-table dense>
                    <template v-slot:default>
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>Tender Number</th>
                            <th>Type</th>
                            <th>Validity Period</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Code</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                        
                          <tr v-for="app in application" :key="app.id">
                             <td>
                               {{app.id}}
                             </td>
                              <td>
                               {{app.tendernumber}}
                             </td>
                              <td>
                               {{app.type}}
                             </td>
                              <td>
                               {{app.validityperiod}}
                             </td>
                              <td>
                               {{app.amount}}
                             </td>
                              <td>
                               {{app.status}}
                             </td>
                              <td>
                               {{app.code}}
                             </td>
                             <td>
                              
                             </td>
                          </tr>
                        
                        
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
                   <template v-else>
                    <v-alert dense  class="text-center" outlined type="error">                    
                         {{fee.name}}  is required inorder to process this invoice       
                      </v-alert>
                   </template>
                    
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
 props:['fee','application']
}
</script>

<style>

</style>