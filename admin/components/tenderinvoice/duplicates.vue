<template>
<div>
    <v-dialog persistent v-model="duplicateModel" width="500">
        
       <v-card>
           <v-card-title>
               Remove Duplicates
              </v-card-title>
           <v-card-text>
                 <v-alert
                        prominent
                        type="error"
                      
                      >
                           The system has detected multiple Tender fee requests please select the entry you wish to use for invoicing 
                                
                      </v-alert>
           </v-card-text>
       </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
  props:['applications','open'],
  data(){
   return{
    duplicateModel:true 
   }
  },
  created(){
      console.log(this.applications.length)
       if(this.applications.length>1){
           this.duplicateModel = true
       }
  }
}
</script>

<style>

</style>