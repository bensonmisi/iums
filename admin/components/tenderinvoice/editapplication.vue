<template>
  <div>
    <v-btn x-small color="info" rounded icon depressed><v-icon>mdi-pencil</v-icon></v-btn>
    <v-dialog v-model="editModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Edit Application
               <v-spacer/>
               <v-btn icon @click="editModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                      
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="editModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
 data(){
     return{
         text:"",
         snackbar:falsee,
         color:"",
         loading:false,
         editModel:false,
         valid:true,
         form:{
             id:"",
             tendernumber:"",
             amount:"",
             
         }

     }
 }
}
</script>

<style>

</style>