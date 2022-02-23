<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>My Profile</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-3">
          <v-col>
          <v-card>
              <v-card-title>
                  Personal Information
                  <v-spacer/>
                  <ProfileEdit :profile="loggedInUser.user"/>
             </v-card-title>
                <v-card-text>
                     <v-simple-table>
                    <template v-slot:default>                    
                    <tbody>
                         <tr>
                         <th>Title</th>
                         <td>{{loggedInUser.user.title}}</td>
                        </tr>
                        <tr>
                         <th>Name</th>
                         <td>{{loggedInUser.user.name}}</td>
                        </tr>
                        <tr>
                         <th>Surname</th>
                         <td>{{loggedInUser.user.surname}}</td>
                        </tr>
                        <tr>
                         <th>Email</th>
                         <td>{{loggedInUser.user.email}}</td>
                        </tr>
                        <tr>                       
                         <th>Phone</th>
                         <td>{{loggedInUser.user.phonenumber}}</td>
                        </tr>
                           <tr>                       
                         <th>Jobtitle</th>
                         <td>{{loggedInUser.user.jobtitle}}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
                </v-card-text>
          </v-card>
          <ProfileChangepassword/>
          </v-col>

      </v-row>

      </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
layout:'user',
  computed:{
  ...mapGetters(['loggedInUser']),
   }

}
</script>