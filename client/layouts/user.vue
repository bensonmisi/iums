<template>

  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
     light
     
    >
    <div class="d-flex justify-center pa-3 white">
               <img src="/icon.jpg" width="90px"/>
      </div>
      <Sidebar/>
                     
       <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
    dark
      fixed
      app
      flat
      color="indigo"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
     
      <v-toolbar-title>
        <div v-if="loggedInUser">
        {{loggedInUser.account.name}}
        </div>
        <div class="subtitle-bar">{{loggedInUser.account.regnumber}}</div>
        </v-toolbar-title>
      <v-spacer />
      <Notification/>
       <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          v-bind="attrs"
          v-on="on"
          
        >
        <div class="d-sm-none d-md-flex d-none d-sm-flex" v-if="loggedInUser">
         Welcome: {{loggedInUser.name}} {{loggedInUser.surname}}
        </div>
          <div class="d-none d-sm-flex d-md-none d-flex d-sm-none primary"><v-icon>mdi-account-circle-outline</v-icon></div>
        </v-btn>
      </template>
      <v-list>
        <v-list-item router to="Profile">
           <v-list-item-action>
            <v-icon>mdi-account-cog</v-icon>
          </v-list-item-action>
           <v-list-item-content>
          <v-list-item-title>User Profile</v-list-item-title>
           </v-list-item-content>
        </v-list-item>      
         <v-list-item router  @click="logout">
           <v-list-item-action>
            <v-icon>mdi-power</v-icon>
          </v-list-item-action>
           <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
           </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
    <v-main class="grey lighten-4">
      
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
   
       <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex' 
export default {
  data () {
    return {
      drawer: true,
      offset:true,
      fixed:true,
      items: [],
      title: 'PRAZ Portal',
      overlay:false
    }
  },methods:{
  async logout(){
    await this.$auth.logout()
  }
  },
  computed:{
  ...mapGetters(['isAuthenticated', 'loggedInUser']),
   }
}
</script>
<style scoped>
.subtitle-bar{
  font-size: 12px;
}
</style>
