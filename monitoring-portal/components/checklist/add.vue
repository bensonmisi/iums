<template>
  <div>
           <v-btn color="success" fab @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Group
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>            
                    <v-select 
                         label="Procurement Group"
                         outlined
                         v-model="form.procurementcategoryId"
                         :items="categorylist"
                         item-text="name"
                         item-value="id"
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
    props:['id'],
    async fetch(){
      await this.$store.dispatch('procurementcategory/getData')
    },
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              procurementcategoryId:''
         },
         procurementcategoryRule:[v=>!!v || 'Procurement category is required'],
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          await this.$store.dispatch('checklist/addData',this.form)
          this.loading=false
       }
     }
 },computed:{
     categorylist(){
         return this.$store.state.procurementcategory.data
     }
 }
}
</script>

<style>

</style>