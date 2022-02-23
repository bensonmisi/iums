<template>
  <div>
      <v-btn rounded depressed small @click="getUsers"><v-icon>mdi-account-multiple-plus</v-icon>users</v-btn>
      <v-dialog v-model="usersDialog" width="1000">
          <v-card>
              <v-card-title>Procurement EntityUser<v-spacer/><EntityUserAdd :id="id"/><v-btn icon @click="usersDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
             <v-card-text>
              <v-simple-table>
                  <template v-slot:default>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Role</th>
                              <th>Jobtitle</th>
                              <th>Email</th>
                              <th>Phonenumber</th>
                              
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-if="users && users.length>0">
                              <tr v-for="user in users" :key="user.id">
                                  <td>{{user.id}}</td>
                                  <td>{{user.title}} {{user.name}}  {{user.surname}}</td>
                                  <td>{{user.role.name}}</td>
                                   <td>{{user.jobtitle}}</td>
                                  <td>{{user.email}}</td>
                                  <td>{{user.phonenumber}}</td>
                                 
                                  <td class="d-flex pt-3">
                                      <EntityUserEdit :user="user"/>
                                      <EntityUserDelete :user="user"/>
                                  </td>
                              </tr>
                          </template>
                          <template v-else>
                          <tr><td colspan="7" class="text-center red--text">User not found</td></tr>
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
props:['id'],
data(){
    return{
      usersDialog:false
    }
},
methods:{
    async getUsers(){
        await this.$store.dispatch('procuremententity/getUsers',this.id) 
        this.usersDialog = true  
    }
},computed:{
    users(){
        return this.$store.state.procuremententity.users
    }
}


}
</script>

<style>

</style>