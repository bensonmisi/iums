<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Tender Applications</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col>
            <Applications :applications="applications"/>
          </v-col>
      </v-row>


       <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

      </div>
</template>
<script>

export default {
layout:'user',
data(){
    return{
      overlay:false
    }
},
async fetch(){
    this.overlay=true
await this.$store.dispatch('tenderapplications/getData')
this.overlay = false
},
  computed:{
   applications(){
       return this.$store.state.tenderapplications.data
   }
   }

}
</script>