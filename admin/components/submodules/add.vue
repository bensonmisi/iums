<template>
  <div>
      <v-btn icon depressed color="primary" @click="addSubModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addSubModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Submodule
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
                         <v-text-field
                            label="Icon"
                            outlined
                            v-model="form.icon"
                            :rules="iconRule"
                        />
                         <v-text-field
                            label="Url"
                            outlined
                            v-model="form.url"
                            :rules="urlRule"
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
      absolute
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
    props:['id'],
 data(){
     return{
         addSubModel:false,
         valid:false,
         form:{
             systemmoduleId:this.id,
             url:'',
             name:'',
             icon:''
         },
         nameRule:[v=>!!v || 'Module name is required'],
         urlRule:[v=>!!v || 'Module url is required'],
         iconRule:[v=> !!v || 'Icon is required'],
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
             try {
                 await this.$axios.post('api/admin/submodules',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('submodules/getSubmodules',this.id)
                        this.$refs.form.reset()
                        this.addSubModel = false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
     }
 }
}
</script>

<style>

</style>