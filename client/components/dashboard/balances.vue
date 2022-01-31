<template>
  <v-row>
      <v-col md="3" v-for="(wal,index) in wallet" :key="index">
          <v-card class="rounded-lg">
              <v-card-subtitle>{{wal.type}}</v-card-subtitle>
              <v-card-text>
                  <v-row>
                      <v-col md="8" class="balance pt-4">
                          {{wal.currency}}{{wal.balance}}
                      </v-col>
                      <v-col md="4" class="text-right">
                          <v-btn fab depressed class="green lighten-3">
                          <v-icon color="green darken-3">mdi-wallet</v-icon>
                          </v-btn>
                      </v-col>
                  </v-row>
              </v-card-text>
          </v-card>
      </v-col>
    
       
     
  </v-row>
</template>

<script>
export default {
 props:['wallet']
}
</script>

<style>
 .balance{
     font-size: 20px;
     font-weight: bold;
 }
</style>