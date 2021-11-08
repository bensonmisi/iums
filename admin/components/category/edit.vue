<template>
  <div>
      <v-btn icon depressed color="primary" @click="addPermModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
   
       <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
              Update Category
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
                            label="Code"
                            outlined
                            v-model="form.code"
                            :rules="codeRule"
                        />
                        <v-select
                            label="Section"
                            outlined
                            v-model="form.sectionId"
                            :rules="sectionRule"
                            :items="sections"
                        />
                         <v-select
                            label="Status"
                            outlined
                            v-model="form.status"
                            :items="status"
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
    props:['category'],

 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:this.category.name,
              code:this.category.code,
              sectionId:this.category.sectionId
         },
         nameRule:[v=>!!v || 'Category name is required'],
         codeRule:[v=>!!v || 'Category code is required'],
        sectionRule:[v=>!!v || 'Section name is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         status:['ACTIVE','BLOCKED']
     }
 },
   async fetch(){
   await this.$store.dispatch('sections/getSections') 
  
}
 ,methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.post('api/admin/categories',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('category/getCategories')
                        this.$refs.form.reset()
                        this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
     }
 },computed:{
    sections(){
        return this.$store.state.sections.sections
    }
}
}
</script>

<style>

</style>