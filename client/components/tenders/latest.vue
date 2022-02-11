<template>
  <div>    
    
      <v-row>
    
          <v-col md="12">
            <TenderList :notices="tenders"/>
          </v-col>
      </v-row>
      <v-row>
          <v-col md="2" offset-md="5">
            <v-btn depressed rounded color="success" to="/tenders">Browse all tenders</v-btn>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import TenderList from './list.vue'
import { mapGetters } from 'vuex'
export default {
    components:{TenderList},
async fetch(){
    
    await this.$store.dispatch('tenders/getLatest')
},computed:{

    tenders(){
       return this.$store.state.tenders.Latest   
    }
}


}
</script>

<style>

</style>