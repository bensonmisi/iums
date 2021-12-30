<template>
 <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    :content="suspense ? suspense.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-wallet-outline</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Suspense</div>
               <v-btn block depressed color="primary" @click="showInfo">Open</v-btn>

           </v-card-text>
       </v-card>
       <v-dialog v-model="infoDialog" width="900">

      <v-card>
    <v-card-title class="white--text blue darken-4">
      Suspense Statement 
   </v-card-title>
 <v-card-text>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
           Date
          </th>
            <th class="text-left">
           Accountnumber
          </th>
          <th class="text-left">
           Source
          </th>
          <th class="text-left">
            Amount
          </th>
           <th class="text-left">
            Status
          </th>
           <th class="text-right">
            
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="suspense">
        <tr
          v-for="item in suspense"
          :key="item.id"
        >
          <td>{{ item.created_at |formatDate }}</td>
           <td>{{ item.accountnumber }}</td>
           <td>{{ item.source }}</td>
          <td>{{ item.currency }}{{item.amount}}</td>
          <td :class="item.status">{{item.status}}</td>
          <td>
           <suspensereceipts :id="item.id"/>
          </td>
      
        </tr>
          </template>
          <template v-else>
              <tr><td colspan="5" class="text-center red--text">No Suspense entries Found</td></tr>
          </template>
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
       </v-dialog>
  </v-col>
</template>

<script>
import suspensereceipts from './suspense/receipts.vue'
export default {
 name:"accountsuspense",
 props:['suspense'],
 components:{suspensereceipts},
 data(){
    return{
    infoDialog:false
    }
},methods:{
    showInfo(){
        this.infoDialog=true
    }
}

}
</script>
<style scoped>
.UTILIZED{
    color:red
}.PENDING{
    color: green;
}
.icon-size{
    font-size: 60px !important;
}
</style>