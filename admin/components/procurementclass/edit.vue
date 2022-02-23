<template>
  <div>
      <v-btn icon depressed color="primary" @click="addSubModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addSubModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Class
               <v-spacer/>
               <v-btn icon @click="addSubModel=false"><v-icon>mdi-close</v-icon></v-btn>
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
               <v-btn rounded class="error" @click="addSubModel=false">Cancel</v-btn>
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
    props:['item'],
 data(){
     return{
         addSubModel:false,
         valid:false,
         form:{
             name:this.item.name
         },
         nameRule:[v=>!!v || 'Name is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          const payload ={id:this.item.id,data:this.form}
          await this.$store.dispatch('procurementclass/editData',payload)
          this.loading = false
       }
     }
 }
}
</script>

<style>

</style>