<template>
  <v-row class="mt-3">
      <v-col md="3" v-for="bal in balances" :key="bal.id">
          <v-card elevation="12">
              <v-card-text class="d-flex justify-space-between">
                   <div class="pa-5 green white--text rounded">{{bal.currency}}</div>
                   <div class="text-right">
                <div>{{bal.type}}</div>
                <div class="font-weight-bold">{{bal.balance}}</div>
                   </div>
               
              </v-card-text>
          </v-card>
      </v-col>
  </v-row>
</template>

<script>
export default {
    name:'accountbalances',
  props:['balances']
}
</script>

<style>

</style>