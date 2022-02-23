<template>
  <div>
      <v-btn icon rounded depressed color="primary" x-small @click="additem"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-dialog v-model="showDialog" width="1000">
          <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Edit Plan Item
                  <v-spacer/>
                   <v-radio-group
                    v-model="form.currencyId"
                    row
                    >
                    <div v-for="curr in currency" :key="curr.id">
                    <v-radio
                        :label="curr.name"
                        :value="curr.id"
                    ></v-radio>
                    </div>
                    </v-radio-group>
                  <v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-row>
                      <v-col>
                          <v-text-field outlined label="Description" v-model="form.description" :rules="discriptionRule"/>
                      </v-col>
                      <v-col>
                          <v-text-field outlined type="number" label="Quantity" v-model="form.quantity" :rules="quantityRule"/>
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                            
                          <v-select outlined label="UOM"  v-model="form.uomId" :items="uom" item-text="name" item-value="id" :rules="uomRule"/>
                          
                      </v-col>
                      <v-col>
                        
                          <v-text-field outlined label="Unit Cost"  v-model="form.cost" :rules="costRule"/>
                        
                      </v-col>
                  </v-row>
                    <v-row>
                      <v-col>
                          <v-select outlined label="Method" :items="noticetypes" item-value="id" item-text="name" v-model="form.noticetypeId" :rules="noticetypeRule"/>
                      </v-col>
                      <v-col>
                          <v-select outlined label="Rate of Purchase" :items="ratelist" v-model="form.rate_of_purchase" :rules="rateRule"/>
                      </v-col>
                  </v-row>
                   <v-row>
                      <v-col>
                          <v-text-field outlined label="Cycle Time(days)" type="number" v-model="form.cycle_time" :rules="cycletimeRule"/>
                      </v-col>
                      <v-col>
                          <v-select outlined label="Date of Purchase" v-model="form.date_of_purchase" :items="monthlist" :rules="dateRule"/>
                      </v-col>
                  </v-row>
                      <v-row>
                      <v-col>
                          <v-select outlined  label="Procurement Category" :items="categories" item-value="id" item-text="name" v-model="form.procurementcategoryId" :rules="categoryRule"/>
                      </v-col>
                      <v-col>
                          <v-select outlined label="Procurement Classification"  :items="classifications" item-value="id" item-text="name" v-model="form.procurementclassificationId" :rules="classificationRule"/>
                      </v-col>
                  </v-row>
                    <v-row>
                      <v-col>
                          <v-select outlined  label="SPOC" :items="optionlist" v-model="form.spoc" :rules="spocRule"/>
                      </v-col>
                      <v-col>
                          <v-select outlined label="Prequalification"  :items="optionlist" v-model="form.prequalification" :rules="prequalificationRule"/>
                      </v-col>
                  </v-row>
                   <v-row>
                      <v-col>
                          <v-text-field outlined label="External Lead Time (days)" type="number" v-model="form.external_lead_time" :rules="externalleadtimeRule"/>
                      </v-col>
                      <v-col>
                          <v-text-field outlined label="Source of funds" v-model="form.source_of_funds" :rules="sourceoffundsRule"/>
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
    props:['item'],
data(){
    return{
        valid: false,
        showDialog:false,
        overlay:false,
        monthlist:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
        optionlist:['Y','N'],
        ratelist:['DAILY','WEEKLY','MONTHLY','QUARTERLY','BIO-ANNUALLY','ANNUALLY','ONCE-OFF'],
         form:{
            description:this.item.description,
            quantity:this.item.quantity,
            uomId:this.item.uomId,
            cost:this.item.cost,
            noticetypeId:this.item.noticetypeId,
            rate_of_purchase:this.item.rate_of_purchase,
            cycle_time:this.item.cycle_time,
            date_of_purchase:this.item.date_of_purchase,
            external_lead_time:this.item.external_lead_time,
            source_of_funds:this.item.source_of_funds,
            spoc:this.item.spoc,
            prequalification:this.item.prequalification,
            procurementclassificationId:this.item.procurementclassificationId,
            procurementcategoryId:this.item.procurementcategoryId,
            currencyId:this.item.currencyId,
            annualcost:this.item.annualcost

         },
        discriptionRule:[v=>!!v || ' Description is required'],
        quantityRule:[v=>!!v || ' Quantity is required'],
        uomRule :[v=>!!v || 'UOM is required'],
        costRule:[v=>!!v || ' unit Cost is required'],
        noticetypeRule:[v=>!!v || ' Method of procurement is required'],
        rateRule:[v=>!!v || ' rate of purchase is required'],
        cycletimeRule:[v=>!!v || 'Cycle Time is required'],
        dateRule:[v=>!!v || 'Date of Purchase is required'],
        spocRule:[v=>!!v || 'Specify if SPOC is required'],
        prequalificationRule:[v=>!!v || 'Specify if Prequalification is required'],
        externalleadtimeRule:[v=>!!v || 'Specify External Lead Time'],
        sourceoffundsRule:[v=>!!v || 'Specify Source of Funds'],
        classificationRule:[v=>!!v || 'Select Procurement Classification'],
        categoryRule:[v=>!!v || 'Select Procurement Category'],
    }
    
},
methods:{
   async additem(){
       await this.$store.dispatch('settings/getNoticetypes')
       await this.$store.dispatch('settings/getCategories')
       await this.$store.dispatch('settings/getClassifications')
       await this.$store.dispatch('settings/getUom')
       await this.$store.dispatch('settings/getCurrency')
        this.showDialog=true
   },
   async submit(){
       if(this.$refs.form.validate()){
           this.valid = true
           this.overlay=true
           this.form.annualcost = Number(this.form.quantity) * Number(this.form.cost)
           const payload ={id:this.item.id,data:this.form}
             await this.$store.dispatch('annualplan/editData',payload)
             this.showDialog = false
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