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
                         <v-btn text :to="`/noticecategory/`+noticeId">PRAZ Categories</v-btn>
                       <v-btn text disabled>Confirm Notice</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
       <v-row>
          <v-col>
              <Noticestepper :progress="4"/>
          </v-col>
      </v-row>
      <v-row class="mt-3">
          <v-col>
               <v-card>
              <v-card-title>Confirm Notice</v-card-title>
              <v-card-text>
                  <v-card>
                      <v-card-title>Notice Information<v-spacer/><NoticeEditinfo :item="notice"/></v-card-title>
                      <v-card-text>
                  <v-simple-table dense>
                      <template v-slot:default>
                          <tbody>
                          <tr><th>Title</th><td>{{notice.title}}</td></tr>
                          <tr><th>Tender number</th><td>{{notice.tendernumber}}</td></tr>
                          <tr><th>Notice Type</th><td>{{notice.noticetype.name}}</td></tr>
                           <tr><th>Closing date</th><td>{{notice.closingDate}}{{notice.closingTime}}</td></tr>
                           <tr><th>Publish Status</th><td>{{notice.status}}</td></tr>
                           <tr><th>Estimate Bid Value</th><td>${{notice.currency}}{{notice.bidvalue}}</td></tr>
                          </tbody>
                      </template>
                  </v-simple-table>
                      </v-card-text>
                  </v-card>

                  <v-card class="mt-4">
                    <v-card-title>Required Service/Product<v-spacer/><v-btn color="primary" depressed rounded  :to="`/noticeproducts/`+notice.id">Add Product/Service</v-btn></v-card-title>
                   <v-card-text>
                  <v-simple-table dense class="mt-2">
                      <template v-slot:default>
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Quantity</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="product in notice.noticeproduct" :key="product.id">
                                  <td>{{product.description}}</td>
                                  <td>{{product.quantity}}</td>
                                  <td class="d-flex pt-1">
                                      <NoticeproductEdit :item="product"/>
                                      <NoticeproductDelete :item="product"/>
                                </td>
                              </tr>
                          </tbody>
                      </template>
                  </v-simple-table>
                   </v-card-text>
                  </v-card>

                  <v-card class="mt-3">
                      <v-card-title>Required Categories<v-spacer/><v-btn color="primary" depressed rounded  :to="`/noticecategory/`+notice.id">Add Category</v-btn></v-card-title>
                      <v-card-text>
                          <v-simple-table dense>
                              <template v-slot:default>
                                  <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Code</th>
                                          <th></th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      <template v-if="notice.noticecategory.length>0">
                                      <tr v-for="cat in notice.noticecategory" :key="cat.id">
                                      <td>{{cat.category.name}}</td>
                                      <td>{{cat.category.code}}</td>
                                      <td><NoticecategoryDelete :item="cat"/></td>
                                      </tr>
                                      </template>
                                      <template v-else>
                                          <tr>
                                              <td class="text-cener red--text">No category specified</td>
                                          </tr>
                                      </template>
                                  </tbody>
                              </template>
                          </v-simple-table>
                      </v-card-text>
                  </v-card>
                  <v-card class="mt-2">
                      <v-card-title>Notice fees</v-card-title>
                      <v-card-text>
                          <v-simple-table>
                              <template v-slot:default>
                                  <thead>
                                      <tr>
                                          <th>Name</th>
                                          <th>Cost</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                          <template v-if="notice.noticefee.length>0">
                             <tr v-for="fee in notice.noticefee" :key="fee.id">
                                 <td>
                                     {{fee.tenderfeetype.name}}
                                 </td>
                                 <td>
                                     {{fee.currency.name}}
                                     {{fee.amount}}
                                 </td>
                             </tr>
                          </template>
                          <template v-else>
                             <tr><td colspan="2" class="text-center red--text">No notice fees found</td></tr>
                          </template>
                                  </tbody>
                              </template>
                          </v-simple-table>
                      </v-card-text>
                  </v-card> 
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded depressed color="error">Cancel</v-btn>
                  <v-spacer/>
                  <v-btn rounded depressed color="success" @click="confirm">Confirm</v-btn>
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
      await this.$store.dispatch('notice/getNotice',id)
},
data(){
    return{
        noticeId:this.$route.params.id
    }
},
methods:{
    async confirm(){
        await this.$store.dispatch('notice/confirm',this.noticeId)
    }
}
,computed:{
  
   notice(){
         return this.$store.state.notice.notice
     }
}
}
</script>

<style>

</style>