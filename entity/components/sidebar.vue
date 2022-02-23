<template>
    <v-list>
      <v-list-item-group
        color="primary"
      >
 <v-list-item
          router
          to="/dashboard"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>          
        </v-list-item> 
        <v-divider></v-divider>
        
        <v-list-item v-for="mn in loggedInUser.menus[0].submodules" :key="mn.id" router :to="mn.url">
          <v-list-item-action>
            <v-icon>{{mn.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{mn.name}}</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>
         <v-divider></v-divider>
      
                
         
      </v-list-item-group>
 </v-list>
      
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data(){
      return{
          offset:true
      }
  },
  computed:{
  ...mapGetters(['isAuthenticated', 'loggedInUser']),
   }
}
</script>

<style>

</style>