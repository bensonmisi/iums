<template>
<div>
      <v-row>
          <v-col>
              <v-card flat dark color="indigo" rounded="0">
                  <v-card-text class="d-flex">
                      <v-btn text to="/">Home</v-btn>
                       <v-btn text disabled>Award Notices</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    <v-container fluid>   

      <v-row class="mt-2">
          <v-col>
              <v-card>
                  <v-card-text>
                      <v-simple-table dense>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>Procurement Entity</th>
                                   <th>Description</th>
                                   <th>Tender number</th>
                                   <th>Procurement Type</th>
                                   <th>Closing Date</th>
                                   <th>

                                   </th>

                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="notices.length>0">
                                 <tr v-for="notice in notices" :key="notice.id">
                                    <td>
                                        {{notice.procuremententity.name}}
                                    </td>
                                    <td>
                                        {{notice.title}}
                                    </td>
                                    <td>
                                        {{notice.tendernumber}}
                                    </td>
                                    <td>{{notice.noticetype.name}}</td>
                                    <td>{{notice.closingDate}} {{notice.closingTime}}</td>
                                    <td>
                                        
                                    </td>
                                 </tr>
                               </template>
                               <template v-else>
                                   <tr>
                                       <td colspan="6" class="text-center red--text">
                                           No Award notices found
                                       </td>
                                   </tr>
                               </template>
                           </tbody>
                       </template>
                      </v-simple-table>  
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    </v-container>
</div>

</template> 
<script>
export default {
  auth:false, 
  data(){
      return{
          notices:[],
      }
  },
   async created(){
    await this.$axios.get('api/welcome/awardnotices').then(res=>{
        this.notices = res.data
    })
  }

}
</script>