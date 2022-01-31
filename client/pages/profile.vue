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
                  <ProfileEdit :profile="loggedInUser"/>
             </v-card-title>
                <v-card-text>
                     <v-simple-table>
                    <template v-slot:default>                    
                    <tbody>
                        <tr>
                         <th>Name</th>
                         <td>{{loggedInUser.name}}</td>
                        </tr>
                        <tr>
                         <th>Surname</th>
                         <td>{{loggedInUser.surname}}</td>
                        </tr>
                        <tr>
                         <th>Email</th>
                         <td>{{loggedInUser.email}}</td>
                        </tr>
                        <tr>                       
                         <th>Gender</th>
                         <td>{{loggedInUser.phone}}</td>
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