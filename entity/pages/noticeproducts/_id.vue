<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                       <v-btn text to="/procurementnotice">Procurement Notice</v-btn>
                        <v-btn text to="/notice/add">New Notice Details</v-btn>
                       <v-btn text disabled>Notice Products/Service</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
       <v-row>
          <v-col>
              <Noticestepper :progress="2"/>
          </v-col>
      </v-row>
      <v-row class="mt-3">
          <v-col>
              
              <v-card>
                  <v-card-title>Notice Products/Service <v-spacer/><NoticeproductAdd :id="noticeId"/></v-card-title>
                 <v-card-text>
                     <v-simple-table>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>Description</th>
                                     <th>Quantity</th>
                                     <th>IsPlanned</th>
                                     <th>Annual Plan Item</th>
                                     <th>

                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="products.length>0">
                                  <tr v-for="prod in products" :key="prod.id">
                                      <td>{{prod.description}}</td>
                                      <td>{{prod.quantity}}</td>
                                      <td>{{prod.isplanned}}</td>
                                      <td>{{prod.annualplan ? prod.annualplan.description :""}}</td>
                                      <td class="d-flex pt-2">
                                          <NoticeproductEdit :item="prod"/>
                                          <NoticeproductDelete :item="prod"/>
                                     </td>
                                  </tr>
                                 </template>
                                 <template v-else>
                                     <tr><td colspan="5" class="text-center red--text">No Products/Service added to notice as yet</td></tr>
                                 </template>
                             </tbody>
                         </template>
                     </v-simple-table>
                 </v-card-text>
                 <v-card-actions>
                     <v-card-actions v-if="products && products.length>0">
                         <v-btn rounded depressed color="error" to="/procurementnotice">Cancel</v-btn>
                         <v-spacer/>
                         <v-btn rounded depressed color="success" :to="`/noticecategory/`+noticeId">Proceed</v-btn>
                     </v-card-actions>
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
      await this.$store.dispatch('noticeproduct/getData',id)
},
data(){
    return{
        noticeId:this.$route.params.id
    }
}
,computed:{
  
  products(){
      return this.$store.state.noticeproduct.data
  }
}
}
</script>

<style>

</style>