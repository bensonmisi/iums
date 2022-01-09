<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Notice Type
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

                <div>Select tender fee types</div>
                 <v-checkbox
                 v-for="type in types" :key="type.id"
                    v-model="form.types"
                    :label="type.name"
                    :value="type.id"
                    ></v-checkbox>

                  
                          
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

   async  fetch(){
     await this.$store.dispatch('tenderfeetype/getTenderfeetypes') 
    },
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:'',
              types:[]
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
          this.$store.dispatch('noticetypes/addType',this.form)
          this.loading=false
       }
     }
 },
computed:{
    types(){
    return this.$store.state.tenderfeetype.types
    }
}
}
</script>

<style>

</style>