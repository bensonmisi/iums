<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
     light
     
    >
    <div class="d-flex justify-center pa-3 white">
               <img src="icon.png" width="90px"/>
               </div>
               
     <SideBar :menus="getMenus"/>
    
    </v-navigation-drawer>
    <v-app-bar
    dark
      fixed
      app
      flat
      color="green"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
     
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <Taskslist/>
       <Search/>
       <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          dark
          v-bind="attrs"
          v-on="on"
          
        >
         Welcome: {{loggedInUser.profile.name}} {{loggedInUser.profile.surname}}
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
        <v-list-item router to="ChangePassword">
           <v-list-item-action>
            <v-icon>mdi-account-convert</v-icon>
          </v-list-item-action>
           <v-list-item-content>
          <v-list-item-title>Change Password</v-list-item-title>
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
import Pusher from 'pusher-js'
import Search from '~/components/customer/search.vue'
import Taskslist from '~/components/tasks/list.vue'
export default {
  components: { Search ,Taskslist},
  data () {
    return {
      drawer: false,
      offset:true,
      fixed:true,
      items: [],
      title: 'PRAZ PORTAL',
      overlay:false
    }
  },created(){
    this.$store.dispatch('sidebar/getMenus')
     this.getNotitications()
  },methods:{
  async logout(){
    await this.$auth.logout()
  },
  getNotitications(){ 
      /* 
       let pusher = new Pusher('4f2ecae30d5d8824089a', { cluster: 'ap2' })
      pusher.subscribe('manualbanktranactions')
      pusher.bind('DECISION_MANUAL_TRANSACTION_REQUEST', data => {
        this.$swal(data.message)
      }) */
/*  
})

window.$OneSignal.push(['addListenerForNotificationOpened', (data) => {
  console.log('Received NotificationOpened:', data )}
]); */
  }
  },
  computed:{
  ...mapGetters(['isAuthenticated', 'loggedInUser','getMenus']),
   }
}
</script>
