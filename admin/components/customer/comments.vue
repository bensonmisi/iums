<template>
 <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    :content="comments ? comments.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-comment-account</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Comments</div>
               <v-btn block depressed color="primary" @click="showInfo">Open</v-btn>

           </v-card-text>
       </v-card>
       <v-dialog v-model="infoDialog" width="800px">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      Account Comments  
   </v-card-title>
 <v-card-text>
      <v-simple-table height="220px">
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
            ID
          </th>
          <th class="text-left">
           Comment
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="comments">
           <template v-if="comments.length>0"> 
        <tr
          v-for="item in comments"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
           <td>{{ item.comment }}</td>
          <td>{{ item.status }}</td>
      
        </tr>
           </template>
          <template v-else>
              <tr><td colspan="3" class="text-center red--text">No Comments Found</td></tr>
          </template>
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
export default {
 name:"accountcomments",
 props:['comments'],
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

.icon-size{
    font-size: 60px !important;
}
 
</style>