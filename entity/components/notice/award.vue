<template>
  <div>
      <v-btn rounded small depressed color="primary" @click="getAwards">Award</v-btn>
      <v-dialog v-model="awardDialog" width="900">
          <v-card>
              <v-toolbar color="primary" dark>
              <v-toolbar-title>Award Notices </v-toolbar-title>
               <v-spacer/>
               <NoticeawardAdd :item="item"/>
               <v-btn icon @click="awardDialog=false"><v-icon>mdi-close</v-icon></v-btn>
               </v-toolbar>
              <v-card-text>
                  <v-simple-table>
                      <template v-slot:default>
                          <thead>
                              <tr>
                                  <th>Award Date</th>
                                  <th>Product</th>
                                  <th>Quantity</th>
                                  <th>Bidder</th>
                                  <th>Value</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              <template v-if="awards && awards.length>0">
                                  <tr v-for="award in awards" :key="award.id">
                                           <td>{{award.created_at |formatDate}}</td>  
                                      <td>{{award.noticeproduct.description}}</td>                                     
                                      <td>{{award.quantity}}</td>
                                       <td>
                                          <div>{{award.account.name}}</div>
                                          <small>{{award.account.regnumber}}</small>
                                      </td>
                                      <td>{{award.currency.name}}{{award.value}}</td>
                                      <td></td>
                                  </tr>
                              </template>
                              <template v-else>
                                  <tr>
                                      <td colspan="4" class="text-center red--text">No awards found</td>
                                  </tr>
                              </template>
                          </tbody>
                      </template>
                  </v-simple-table>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
 props:['item'],
 data(){
  return{
      awardDialog:false 
     }
 },
 methods:{
    async  getAwards(){
        await this.$store.dispatch('noticeaward/getData',this.item.id)
        this.awardDialog = true
    }
 },computed:{
     awards(){
         return this.$store.state.noticeaward.data
     }
 }
}
</script>

<style>

</style>