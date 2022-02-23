<template>
  <div>
      <v-btn rounded depressed color="primary" @click="additem">Add Entry</v-btn>
      <v-dialog v-model="showDialog" width="600">
          <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Add Individual Plan Item
                  <v-spacer/>
                  <v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-row>
                     
                      <v-col>
                          <v-text-field outlined type="number" label="Quantity" v-model="form.quantity" :rules="quantityRule"/>
                      </v-col>
                     
                  </v-row>
                  <v-row>
                     <v-col>
                          <v-select outlined label="Date of Purchase" v-model="form.date_of_purchase" :items="monthlist" :rules="dateRule"/>
                      </v-col>
                  </v-row>
                    
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded depressed color="error" @click="showDialog=false">Cancel</v-btn>
                  <v-spacer/>
                   <v-btn rounded depressed color="success" @click="submit">Submit</v-btn>
              </v-card-actions>
          </v-card>
          </v-form>
             <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
      </v-dialog>
  </div>
</template>

<script>
export default {
    props:['id'],
data(){
    return{
        valid: false,
        showDialog:false,
        overlay:false,
        monthlist:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],

         form:{
            quantity:'',
            date_of_purchase:'',
            annualplanId:this.id,

         },
        quantityRule:[v=>!!v || ' Quantity is required'],
        dateRule:[v=>!!v || 'Date of Purchase is required'],
    }
    
},
methods:{
   async additem(){
        this.showDialog=true
   },
   async submit(){
       if(this.$refs.form.validate()){
           this.valid = true
           this.overlay=true  
             await this.$store.dispatch('individualplan/addData',this.form)
             this.$refs.form.reset()
           this.overlay=false
       }
   }

},computed:{
    noticetypes(){
        return this.$store.state.settings.noticetypes
    },
    currency(){
        return this.$store.state.settings.currency
    },
    categories(){
        return this.$store.state.settings.categories
    },
    classifications(){
        return this.$store.state.settings.classifications
    },
    uom(){
        return this.$store.state.settings.uom
    }
}
}
</script>

<style>

</style>