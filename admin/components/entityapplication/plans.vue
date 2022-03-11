<template>
  <div>
    
             <v-card class="mt-2">
              <v-card-title>Procurement Plans</v-card-title>
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                      <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">Version</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                           <template v-if="items && items.length>0">
                               <tr v-for="upload in items" :key="upload.id">
                                   <td class="text-center">{{upload.id}}</td>
                                   <td class="text-center">{{upload.created_at|formatDate}}</td>
                                   <td class="text-center">
                                 <v-chip
                                    class="ma-2"
                                    x-small
                                    :color="upload.status=='APPROVE'? 'success' :'warning'"
                                    >{{upload.status}}
                                    </v-chip>
                                    </td>
                                   <td class="text-center">
                                     <v-btn small rounded depressed color="primary" @click="downloadPlan(upload.id)">Download</v-btn>
                                    </td>                                   
                               </tr>
                           </template>
                           <template v-else>
                                     <tr>
                                         <td colspan="3" class="pa-3">
                                              <v-alert
                                                text
                                                prominent
                                                type="error"
                                                icon="mdi-cloud-alert"
                                                >
                                                   No procurement plans upload as yet. Please upload your signed procurement plan to proceed with the application process       </v-alert>
                                          </td>
                                     </tr>
                           </template>
                        </tbody>
                    </template>
                </v-simple-table>
                  </template>
                </v-simple-table>
              </v-card-text>
             </v-card>
  </div>
</template>

<script>
export default {
props:['items'],
methods:{
     async downloadPlan(id){
              let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=100,top=100`;
         open(this.$store.state.addressurl.link+'procurementapplication/plan/'+id,'test',params)
   
  }
}
}
</script>

<style>

</style>