<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Option
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />

                          <v-text-field
                            label="Duration"
                            outlined
                            type="number"
                            v-model="form.duration"
                            :rules="durationRule"
                        />
                      
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
  </div>
</template>

<script>
export default {
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:'',
              duration:''
         },
         nameRule:[v=>!!v || 'Name is required'],
         durationRule:[v=>!!v || 'Duration is required'],        
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          await this.$store.dispatch('registrationoptions/addData',this.form)
          this.$refs.form.reset()
          this.loading = false
       }
     }
 }
}
</script>

<style>

</style>