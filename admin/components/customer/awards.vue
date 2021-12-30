<template>
  <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div>
                   <v-badge
                    color="red"
                    content="6"
                     overlap
                  >
                 <v-icon x-large color="green" class="icon-size">mdi-handshake-outline</v-icon>
                   </v-badge>
                 </div>
               <div class="subtitle-1">Contracts</div>
               <v-btn block depressed color="primary">Open</v-btn>

           </v-card-text>
       </v-card>
  </v-col>
</template>

<script>
export default {
name:'accountcontracts'
}
</script>
<style scoped>

.icon-size{
    font-size: 60px !important;
}
 
</style>