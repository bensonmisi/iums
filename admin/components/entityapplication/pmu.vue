<template>
   <div>
            <v-card>
           <v-card-title>Procurement Management Unit</v-card-title>
           <v-card-text>
             <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Phone</th>
                                   <th>Jobtitle</th>
                                   <th>HasAccount</th>
                                   <th>
                                    
                                   </th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="items && items.length>0">
                                 <tr v-for="pmu in items" :key="pmu.id">
                                     <td>{{pmu.id}}</td>
                                     <td><small>{{pmu.title}} {{pmu.name}} {{pmu.surname}}</small></td>
                                     <td><small>{{pmu.email}}</small></td>
                                     <td><small>{{pmu.phonenumber}}</small></td>
                                     <td><small>{{pmu.jobtitle}}</small></td>
                                     <td><small>{{pmu.hasaccount}}</small></td>                                  
                                     <td class="d-flex pt-2">
                                       <v-btn small depressed color="primary" @click="downloadCv(pmu.id)">CV</v-btn>
                                        <v-btn small depressed color="success" @click=" downloadSignature(pmu.id)">Signature</v-btn>
                                     </td>
                                 </tr>
                               </template>
                               <template v-else>
                               <tr>
                                   <td colspan="7" class="text-center red--text">No PMU created as yet</td>
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
import pdf from 'vue-pdf'
export default {
props:['items'],
components:{pdf},
methods:{
    async downloadCv(id){
       let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=800,height=800,left=100,top=100`;
open(this.$store.state.addressurl.link+'/procurementapplication/cv/'+id,'test',params)
   
  },
   async downloadSignature(id){
             let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=100,top=100`;
open(this.$store.state.addressurl.link+'procurementapplication/signature/'+id,'test',params)
      
  },
}
}
</script>

<style>

</style>