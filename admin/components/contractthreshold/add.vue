<template>
  <div>
      <v-btn fab color="primary" @click="openModel"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="addModel" width="600">
          <v-card>
              <v-card-title>
                  Add Threshold
                  <v-spacer/>
                  <v-btn icon small @click="addModel=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-row>
                      <v-col>
                    <v-select
                         label="Group"
                         outlined
                         v-model="form.group"
                         :rules="groupRule"
                         :items="grouplist"
                         />
                      </v-col>
                      <v-col>
                     <v-select
                         label="Notice Type"
                         outlined
                         v-model="form.noticetypeId"
                         :rules="noticetypeRule"
                         :items="noticetypes"
                         item-value="id"
                         item-text="name"
                         />
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                    <v-select
                         label="Currency"
                         outlined
                         v-model="form.currencyId"
                         :rules="currencyRule"
                         :items=" currencylist"
                         item-value="id"
                         item-text="name"
                         />
                      </v-col>
                      <v-col>
                           <v-select
                         label="SELECT TYPE"
                         outlined
                         v-model="form.type"
                         :rules="typeRule"
                         :items="typelist"
                         />
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                    <v-text-field
                            label="Lower ranger"
                            outlined
                            v-model="form.lower"
                            :rules="lowerRule"
                        />
                      </v-col>
                      <v-col>
                        <v-text-field
                            label="UPPER ranger"
                            outlined
                            v-model="form.lower"
                            :rules="lowerRule"
                        />
                       
                      </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                          <v-text-field
                            label="Min Cost"
                            outlined
                            v-model="form.mincost"
                            :rules="mincostRule"
                        />
                      </v-col>
                      <v-col>
                          <v-text-field
                            label="Max Cost"
                            outlined
                            v-model="form.maxcost"
                            :rules="maxcostRule"
                        />
                      </v-col>
                  </v-row>
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded depressed small class="error">Cancel</v-btn>
                  <v-spacer/>
                  <v-btn rounded depressed small class="success">Submit</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {

 data(){
     return{
         addModel:false,
         typelist:['PERCENTAGE','FIXED'],
         currencyRule:[v=>!!v || 'Select Currency'],
         lowerRule:[v=>!!v || 'Enter lower range'],
         upperRule:[v=>!!v || 'Enter upper range'],
         mincostRule:[v=>!!v || 'Enter minimum cost'],
         maxcostRule:[v=>!!v || 'Ener maximum cost'],
         grouplist:['DOMESTIC','INTERNATIONAL'],
         form:{
             group:'',
             currencyId:'',
             noticetypeId:'',
             lower:'',
             upper:'',
             type:'',
             mincost:'',
             maxcost:''

         }
     }
 }, 
 methods:{
   async openModel(){
     await this.$store.dispatch('currency/getCurrency')
     await this.$store.dispatch('noticetypes/getTypes')
     this.addModel = true
   }
 },
 computed:{
     currencylist(){
         return this.$store.state.currency.currency
     },
      noticetypes(){
         return this.$store.state.noticetypes.noticetypes
     }
 }
}
</script>

<style>

</style>