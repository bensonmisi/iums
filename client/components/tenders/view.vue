<template>
  <div>
      <v-btn rounded color="primary" small @click="retrieve()">View details</v-btn>
      <v-dialog v-model="detailDialog" fullscreen
      hide-overlay
      transition="dialog-bottom-transition">
        <template v-if="notice">
          <v-card>
                 <v-toolbar
      color="indigo"
      dark
    >

      <v-toolbar-title>Notice Details</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text>Bidders <v-avatar light color="info" size="30">{{applications}}</v-avatar></v-btn>
                           <v-btn text>Downloads <v-avatar light color="info" size="30">{{notice.downloads}}</v-avatar></v-btn>
                             <v-btn rounded depressed color="success" @click="download">Download</v-btn>
      <v-btn icon @click="detailDialog=false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
                   <v-card-text>
                     <v-row>
                       <v-col md="10" offset-md="1">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <th>Title</th>
                            <td>{{notice.title}}</td>
                          </tr>
                           <tr>
                            <th>Type</th>
                            <td>{{notice.noticetype.name}}</td>
                          </tr>
                           <tr>
                            <th>Closing date</th>
                            <td>{{notice.closingDate}} {{notice.closingTime}}</td>
                          </tr>

                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-card class="mt-4">
                         <v-toolbar dense dark color="blue-grey">
                       <v-toolbar-title>Products/Services</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="product in notice.noticeproduct" :key="product.id">
                            <td>{{product.description}}</td>
                             <td>{{product.quantity}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                      </v-card-text>
                    </v-card>

                    <v-card class="mt-4">
                      <v-toolbar dense dark color="blue-grey">
                       <v-toolbar-title>Tender Fees</v-toolbar-title>
                      </v-toolbar>
                       <v-card-text>
                        <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>Fee</th>
                            <th>Cost</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                         <template v-if="notice.noticefee && notice.noticefee.length>0">
                          <tr v-for="fee in notice.noticefee" :key="fee.id">
                            <td>{{fee.tenderfeetype.name}}</td>
                             <td>{{fee.currency.name}}{{fee.amount}}</td>
                             <td>
                               <template v-if="isAuthenticated">
                               <v-btn  v-if="fee.tenderfeetype.name !='ESTABLISHMENT FEE'" depressed color="success">Pay fee</v-btn>
                               </template>
                               <div v-else class="red--text">Login to make payment</div>
                             </td>
                          </tr>
                         </template>
                         <template v-else>
                           <tr><td colspan="3" class="text-center red--text"> No Fees Uploaded</td></tr>
                         </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                       </v-card-text>
                    </v-card>

                      <v-card class="mt-4">
                      <v-toolbar dense dark color="blue-grey">
                       <v-toolbar-title>Required Categories</v-toolbar-title>
                      </v-toolbar>
                       <v-card-text>
                        <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                         <template v-if="notice.noticecategory && notice.noticecategory.length>0">
                          <tr v-for="cat in notice.noticecategory" :key="cat.id">
                            <td>
                              <div>{{cat.category.name}}</div>
                              <small>{{cat.category.code}}</small>

                              </td>

                          </tr>
                         </template>
                         <template v-else>
                           <tr><td colspan="3" class="text-center green--text">No category specified.</td></tr>
                         </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                       </v-card-text>
                      
                    </v-card>

                       </v-col>
                     </v-row>
              </v-card-text>
          </v-card>
        </template>
      </v-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import { mapGetters } from 'vuex' 
export default {
 name:'TenderView',
 components:{pdf},
 props:['uuid'],
 data(){
     return{
         detailDialog:false,
         pdfContent:null,
         viewPdf:false,
           numPages: 0,
            page:1,
            loadedRatio: 1
          }
 },methods:{
     async retrieve(){
         await this.$store.dispatch('tenders/getNotice',this.uuid)
         this.detailDialog=true
     },
     async download(){
       try {
          await this.$axios({
                   url:'api/bidder/tenders/download/'+this.uuid,
                    method: 'GET',
                    responseType: 'blob',
              }).then(async(response)=>{
                await this.$store.dispatch('tenders/getNotice',this.uuid)
           const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', this.uuid+'.pdf');
                        document.body.appendChild(link);
                        link.click();
       })
       } catch (error) {
         console.log(error)
       }
      
     }
 },computed:{
    ...mapGetters(['isAuthenticated']),
   notice(){
     return this.$store.state.tenders.notice
   },
   applications(){
     const data = this.$store.state.tenders.notice.tenderapplications

    if(data && data.length>0)
    {
     const filterd = data.filter(dt=>{dt.status=='PAID'})

     const grouped = transaction.reduce((acc,obj)=>{
         const key = obj['accountId']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

       return grouped.length
    }
    return 0
   }
 }
}
</script>

<style>

</style>