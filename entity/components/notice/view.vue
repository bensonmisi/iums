<template>
  <div>
      <v-btn small rounded depressed color="primary" @click="getNotice">View</v-btn>
      <v-dialog v-model="showNoticeDialog"  width="1200">
          <v-card>
              <v-card-title>View Notice<v-spacer/> 
               <template v-if=" !checkDate(notice.closingDate)">
                                <NoticeProducts :id="notice.id"/>
                </template>
                <template v-if="notice.status=='PUBLISHED'"><NoticeCancel :notice="notice"/></template>
                <template v-if="checkDate(notice.closingDate)">
              <v-btn v-if="notice.status=='AWAITING'" rounded small depressed color="success" class="ml-2" @click="publish">Publish</v-btn>
                </template>
              <v-btn rounded small depressed color="primary" class="ml-2" @click="viewdoc">View Document</v-btn>
              <v-btn icon @click="showNoticeDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-card>
                      <v-card-title>Notice Information<v-spacer/><template v-if="notice.status!=='AWARDED'">
                                        <template v-if="checkDate(notice.closingDate)">
                          <NoticeEdit :notice="notice"/>
                                        </template>
                          </template></v-card-title>
                      <v-card-text>
                  <v-simple-table dense>
                      <template v-slot:default>
                          <tbody>
                          <tr><th>Title</th><td>{{notice.title}}</td></tr>
                          <tr><th>Tender number</th><td>{{notice.tendernumber}}</td></tr>
                          <tr><th>Notice Type</th><td>{{notice.noticetype.name}}</td></tr>
                           <tr><th>Closing date</th><td>{{notice.closingDate}} {{notice.closingTime}}</td></tr>
                           <tr><th>Publish Status</th><td>{{notice.status}}</td></tr>
                           <tr><th>Estimate Bid Value</th><td>${{notice.currency}}{{notice.bidvalue}}</td></tr>
                          </tbody>
                      </template>
                  </v-simple-table>
                      </v-card-text>
                  </v-card>

                  <v-card class="mt-4">
                    <v-card-title>Required Service/Product<v-spacer/><template v-if="notice.status!=='AWARDED'">
                                      <template v-if="checkDate(notice.closingDate)">
                        <v-btn color="primary" depressed rounded  :to="`/noticeproducts/`+notice.id">Add Product/Service</v-btn>
                                      </template>
                        </template></v-card-title>
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
                                      <template v-if="notice.status!=='AWARDED'">
                                          <template v-if="checkDate(notice.closingDate)">
                                      <NoticeproductEdit :item="product"/>
                                      <NoticeproductDelete :item="product"/>
                                          </template>
                                      </template>
                                </td>
                              </tr>
                          </tbody>
                      </template>
                  </v-simple-table>
                   </v-card-text>
                  </v-card>

                  <v-card class="mt-3">
                      <v-card-title>Required Categories<v-spacer/><template v-if="notice.status!=='AWARDED'">
                                         <template v-if="checkDate(notice.closingDate)">
                          <v-btn color="primary" depressed rounded  :to="`/noticecategory/`+notice.id">Add Category</v-btn>
                                         </template>
                          </template></v-card-title>
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
                                      <td>
                                          <template v-if="notice.status!=='AWARDED'">
                                              <template v-if="checkDate(notice.closingDate)">                                                  
                                          <NoticecategoryDelete :item="cat"/>
                                              </template>
                                          </template>
                                          </td>
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
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
 props:['id'],
 data(){
     return{
         showNoticeDialog:false
     }
 },methods:{
     async getNotice(){
        await this.$store.dispatch('notice/getNotice',this.id)
        this.showNoticeDialog = true
     },
     viewdoc(){
         
       let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=800,height=800,left=100,top=100`;
const url = this.$store.state.notice.url
open(url+'entitynotice/download/'+this.id,'test',params)
  
     },
     async publish(){
         await this.$store.dispatch('notice/publish',this.id)
     }
     ,
    checkDate(date){
    
       const status = moment(moment().format(date)).isSameOrAfter(moment())
     
        if(status){
        return true
        }else{
            return false
        }  
    }
 },computed:{
     notice(){
         return this.$store.state.notice.notice
     }
 }
}
</script>

<style>

</style>