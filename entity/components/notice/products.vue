<template>
  <div>
      <v-btn rounded color="success"  class="mr-2" small depressed @click="fetchAdd">Award</v-btn>
      <v-dialog v-model="awardDialog" width="1000">
          <v-card>
              <v-card-title>
                  Products
                  <v-spacer/>
                  <v-btn icon @click="awardDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-simple-table>
                      <template v-slot:default>
                          <thead>
                          <tr>
                              <th>Description</th>
                              <th>Required Quantity</th>
                              <th>Awarded Quantity</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                            <tr v-for="prd in products" :key="prd.id">
                               <td>{{prd.description}}</td>
                               <td>{{prd.quantity}}</td>
                               <td>{{computedAwarded(prd.awards)}}</td>
                               <td><NoticeAward :item="prd"/></td>
                            </tr>
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
props:['id'],
data(){
 return{
   awardDialog:false  
 }
},
methods:{
async fetchAdd(){
    await this.$store.dispatch('noticeproduct/getData',this.id)
    this.awardDialog = true
},computedAwarded(award){
    let totalawarded = 0

    award.forEach(element => {
         totalawarded  = totalawarded+ element.quantity
    });

    return totalawarded
}
},
computed:{
    products(){
        return this.$store.state.noticeproduct.data
    }
}
}
</script>

<style>

</style>