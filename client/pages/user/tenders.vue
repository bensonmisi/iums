<template>
  <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Browse Tenders</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
       <Tenders/>
  </div>

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