<template>
  <div>
      <v-btn color="primary"  fab dark @click="addModel=true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="addModel" width="500">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Module
               <v-spacer/>
               <v-btn icon @click="addModel=false"><v-icon>mdi-close</v-icon></v-btn>
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
                            label="Widget"
                            outlined
                            v-model="form.widget"
                            :rules="widgetRule"
                        />
                          <v-textarea
                            outlined
                            v-model="form.description"
                            :rules="descriptionRule"
                            label="Description"
                            />
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addModel=false">Cancel</v-btn>
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
 data(){
     return{
         addModel:false,
         valid:false,
         form:{
             description:'',
             name:'',
             widget:'',
             icon:''
         },
         nameRule:[v=>!!v || 'Module name is required'],
         descriptionRule:[v=>!!v || 'Module Description is required'],
         widgetRule:[v=>!!v || 'Widget name is required'],
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
                 await this.$axios.post('api/admin/system-modules',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('systemmodules/getModules')
                        this.$refs.form.reset()
                        this.addModel = false

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