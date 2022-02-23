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
       try {
          await this.$axios({
                   url:'api/admin/procurementapplication/fullorganogram/'+id,
                    method: 'GET',
                    responseType: 'blob',
              }).then(async(response)=>{
           const url = window.URL.createObjectURL(new Blob([response.data]));
           this.pdflink = url
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', id+'.pdf');
                        
                        document.body.appendChild(link);
                        link.click();
       })
       } catch (error) {
         console.log(error)
       }
  },
    async downloadPmuOrganogram(id){
       try {
          await this.$axios({
                   url:'api/admin/procurementapplication/pmuorganogram/'+id,
                    method: 'GET',
                    responseType: 'blob',
              }).then(async(response)=>{
           const url = window.URL.createObjectURL(new Blob([response.data]));
           this.pdflink = url
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', id+'.pdf');
                        
                        document.body.appendChild(link);
                        link.click();
       })
       } catch (error) {
         console.log(error)
       }
  }
}
}
</script>

<style>

</style>