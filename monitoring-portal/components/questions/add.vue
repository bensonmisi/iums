<template>
  <div>
      <v-btn fab small color="success" @click="addQuestionDialog=true"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="addQuestionDialog" width="400">
              <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-toolbar dense color="primary">
                  <v-toolbar-title>Add Question</v-toolbar-title>
                  <v-spacer/>
                  <v-btn icon @click="addQuestionDialog=false">
                      <v-icon>mdi-close</v-icon>
                  </v-btn>
              </v-toolbar>
              <v-card-text>         
                    <v-textarea
                         label="Question"
                         outlined
                         v-model="form.question"
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
  data(){
      return{
         addQuestionDialog:false ,
         valid:false,
            loading:false,
         form:{
          question:"",
          checklistId:'',
       
         }
      }
  },methods:{
      async submit(){
      if(this.$refs.form.validate())
       { 
           this.form.checklistId = this.id
           this.valid = true
            this.loading = true
           await this.$store.dispatch('checklistquestions/addData',this.form)
           this.loading = false
           this.$refs.form.reset()
       }
      }
  }
}
</script>

<style>

</style>