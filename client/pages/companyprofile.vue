<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Company Profile</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-2">
          <v-col>
         <v-alert
      text
      v-if="redirect"
      color="error"
    >
      <h3 class="text-h5">
        Account Profile
      </h3>
      <div>Please add the following information that is missing on your profile</div>

      <v-divider
        class="my-4 info"
        style="opacity: 0.22"
      ></v-divider>

      <v-row
        align="center"
        no-gutters
      >
        <v-col class="grow">
            <ol>
                <li v-if="!contacts">Capture your organisation's contact details. These are the details that we will publish on our portal and appear in our periodic government gazzate </li>
                 <li v-if="directors && directors.length==0">Add directors/owners/partners identification information </li>
                 <li v-if="!maillist">Please capture an email that our system will use to send you notifications. We recommend using a group email that is accessed by multiple users for example sales@company.co.zw</li>
              
            </ol>
         
        </v-col>
        
      </v-row>
    </v-alert>
          </v-col>
      </v-row>
    <Contacts :contacts="contacts"/>
    <Directors :directors="directors"/>
    <Mailist :mailist="maillist"/>
      </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
layout:'user',
async fetch(){
 await this.$store.dispatch('dashboard/getDashboard')
},
  computed:{
  ...mapGetters(['loggedInUser']),
  contacts(){
      return this.$store.state.dashboard.data.contacts
   },
   directors(){
    let array = []
    array = this.$store.state.dashboard.data.directors   
    return array
   },
   maillist(){
       return this.$store.state.dashboard.data.maillist
   },
   redirect(){
     return this.$store.state.dashboard.data.redirect
   }

   }

}
</script>