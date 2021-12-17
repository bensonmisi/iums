<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Period
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-select
                            label="Currency"
                            outlined
                            v-model="form.currencyId"
                            :rules="currencyRule"
                            :items="currencylist"
                            item-text="name"
                            item-value="id"
                        />
                  <v-text-field
                            label="Lower Limit"
                            outlined
                            v-model="form.lowerlimit"
                             :rules="lowerlimitRule"
                        />

                    <v-text-field
                            label="Upper Limit"
                            outlined
                            v-model="form.upperlimit"
                             :rules="upperlimitRule"
                        />
                     <v-text-field
                            label="Fee"
                            outlined
                            v-model="form.fee"
                             :rules="feeRule"
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
    props:['period'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              upperlimit:'',
              lowerlimit:'',
              fee:'',
              currencyId:'',
              validityperiod:''
         },
         upperlimitRule:[v=>!!v || 'Upper limit  is required'],
         lowerlimitRule:[v=>!!v || 'lower limit  is required'], 
         feeRule:[v=>!!v || 'Fee  is required'], 
         currencyRule:[v=>!!v || 'Currency is required'],       
         loading:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          this.form.validityperiod = this.period.days
          this.$store.dispatch('bidbondthreshold/addThreshold',this.form)
          this.loading=false
          this.addPermModel=false
          this.$refs.form.reset()
       }
     }
 },computed:{
    currencylist(){
        return this.$store.state.currency.currency
    }
}
}
</script>

<style>

</style>