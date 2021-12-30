<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Type
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
                     <v-select
                            label="Required Fee"
                            outlined
                            v-model="form.required"
                            :items="feetypes"
                            item-text="name"
                            item-value="name"
                        />
                       <v-select
                            label="Rule"
                            outlined
                            v-model="form.rule"
                            :items="rulelist"
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
    name:"AddTenderFeetype",
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:'',
              required:'',
              rule:''
         },
         nameRule:[v=>!!v || 'Name is required'], 
         rulelist:['PAID','AVAILABLE'],     
         loading:false
     }
 },computed:{
     feetypes(){
        return this.$store.state.tenderfeetype.types  
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          this.$store.dispatch('tenderfeetype/addFeetype',this.form)
          this.loading=false
          this.addPermModel=false
          this.$refs.form.reset()
       }
     }
 }
}
</script>

<style>

</style>