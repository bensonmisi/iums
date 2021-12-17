<template>
  <div>
      <v-btn icon depressed color="primary" @click="showModel"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addSubModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Bidbond Period
               <v-spacer/>
               <v-btn icon @click="addSubModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Days"
                            outlined
                            v-model="form.days"
                            type="number"
                            :rules="daysRule"
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
  </div>
</template>

<script>
export default {
    props:['period'],
 data(){
     return{
         addSubModel:false,
         valid:false,
         form:{
             days:this.period.days,
         },
         daysRule:[v=>!!v || 'Days is required'],       
         loading:false
     }
 },methods:{
     showModel(){
     this.addSubModel=true
     },
     async submit(){
     if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          const data = {id:this.period.id,data:this.form}
          this.$store.dispatch('bidbondperiods/updatePeriod',data)
          this.loading=false
          this.addSubModel=false
       }
     }
 }
}
</script>

<style>

</style>