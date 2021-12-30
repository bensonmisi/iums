<template>
  <v-col md="6">
      <v-card elevation="12" height="200px">
        <v-card-text class="text-center">
           <div class="headline">{{label}}</div>
           <div class="display-2">{{data ? data.length : 0 }}</div>
          
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
             <list :accounts="data"/>
        </v-card-actions>
      </v-card>
  </v-col>
</template>

<script>
import list from './list.vue'
export default {
  components: { list },
name:'suppliersummary',
props:['label','data'],

}
</script>

<style>

</style>