<template>
 <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                  <v-badge
                    color="red"
                    :content="users ? users.length : 0"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-account-group</v-icon>
                  </v-badge>
                 
                 </div>
               <div class="subtitle-1">Users</div>
               <v-btn block depressed color="primary" @click="showInfo">Open</v-btn>

           </v-card-text>
       </v-card>
       <v-dialog v-model="infoDialog" width="900">
      <v-card>
    <v-card-title class="white--text blue darken-4">
      <v-icon>mdi-users</v-icon> Users
     <v-spacer></v-spacer>
     <template v-if="account">
     <addUser :id="account.id"/>
     </template>
   </v-card-title>
 <v-card-text>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Surname
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-right">
           
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in users"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
           <td>{{ item.surname }}</td>
          <td>{{ item.email }}</td>
           <td><updateUser :user="item"/> </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
       </v-dialog>
  </v-col>
</template>

<script>
import addUser from './user/add.vue'
import updateUser from './user/edit.vue'
export default {
 name:"accountusers",
 components:{addUser,updateUser},
 props:['users','account'],
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