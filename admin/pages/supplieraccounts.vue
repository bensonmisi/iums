<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Supplier  Accounts</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
         <v-col>
             <v-card>
                  <v-card-text>
                  </v-card-text>
             </v-card>
         </v-col>
      </v-row>

  </v-container>
</template>

<script>
export default {
 layout:"user"
}
</script>

<style>

</style>