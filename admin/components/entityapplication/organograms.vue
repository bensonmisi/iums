<template>
  <div>
       <v-card class="mt-2">
               <v-card-title>Organograms</v-card-title>
               <v-card-text>
                 <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Version</th>
                                   <th>Date</th>
                                   <th>
                                    
                                   </th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="items && items.length>0">
                                 <tr v-for="org in items" :key="org.id">
                                     <td>{{org.id}}</td>
                                     <td><small>{{org.created_at|formatDate}}</small></td>
                                     <td class="d-flex pt-2 justify-end">
                                        <v-btn small depressed color="primary" @click="downloadPmuOrganogram(org.id)">PMU</v-btn>
                                        <v-btn small depressed color="success" @click="downloadFullOrganogram(org.id)">FULL</v-btn>
                                     </td>
                                 </tr>
                               </template>
                               <template v-else>
                               <tr>
                                   <td colspan="4" class="text-center red--text">No Organograms created as yet</td>
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
props:['items'],
methods:{
      async downloadFullOrganogram(id){
         let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=100,top=100`;
         open(this.$store.state.addressurl.link+'procurementapplication/fullorganogram/'+id,'test',params)
     
  },
    async downloadPmuOrganogram(id){
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=100,top=100`;
         open(this.$store.state.addressurl.link+'procurementapplication/pmuorganogram/'+id,'test',params)
      
  }
}
}
</script>

<style>

</style>