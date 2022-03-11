<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                       <v-btn text to="/procurementnotice">Procurement Notice</v-btn>
                        <v-btn text to="/notice/add">New Notice Details</v-btn>
                        <v-btn text :to="`/noticeproducts/`+noticeId">Notice Products</v-btn>
                       <v-btn text disabled>Notice Categories</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
       <v-row>
          <v-col>
              <Noticestepper :progress="3"/>
          </v-col>
      </v-row>
      <v-row class="mt-3">
          <v-col>
              
              <v-card>
                  <v-card-title>Required Categories<v-spacer/><NoticecategoryAdd :id="noticeId"/></v-card-title>
                 <v-card-text>
                     <v-simple-table>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>Name</th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="categories && categories.length>0">
                                  <tr v-for="cat in categories" :key="cat.id">
                                      <td>
                                          <div>{{cat.category.code}}</div>
                                           <small>{{cat.category.name}}</small>
                                      </td>
                                      <td class="d-flex pt-2">
                                          <NoticecategoryDelete :item="cat"/>
                                     </td>
                                  </tr>
                                 </template>
                                 <template v-else>
                                     <tr><td colspan="5" class="text-center red--text">No PRAZ categories specified as yet</td></tr>
                                 </template>
                             </tbody>
                         </template>
                     </v-simple-table>
                 </v-card-text>
             
                     <v-card-actions>
                         <v-btn rounded depressed color="error" to="/procurementnotice">Cancel</v-btn>
                         <v-spacer/>
                         <v-btn rounded depressed color="success" :to="`/noticeconfirm/`+noticeId">Proceed</v-btn>
                     </v-card-actions>
               
              </v-card>
          </v-col>
      </v-row>

  </v-container>

</template>

<script>
export default {
layout:"user",
async fetch(){
      let id = this.$route.params.id
      await this.$store.dispatch('noticecategory/getData',id)
},
data(){
    return{
        noticeId:this.$route.params.id
    }
}
,computed:{
  
 categories(){
      return this.$store.state.noticecategory.data
  }
}
}
</script>

<style>

</style>