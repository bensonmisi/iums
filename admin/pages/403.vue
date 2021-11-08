<template>
   <v-container>
    <v-row>
     <v-col md="6" offset-md="3">
       <v-card dark class="error">
        <v-card-text class="text-center">
            <v-icon x-large>mdi-alert</v-icon>
          <div class="display-2">Unauthorized</div>
          <div class="body"> You do not have permissions to perform action</div>
        </v-card-text>
       </v-card>    
     </v-col>    
    </v-row>    
   </v-container>
</template>

<script>
import systemmodules from './systemmodules.vue'
export default {
  components: { systemmodules },
 layout:'user'
}
</script>

<style>

</style>