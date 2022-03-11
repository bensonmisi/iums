<template>
  <div>
        <v-btn small depressed rounded color="primary" @click="getReport">View</v-btn>
        <v-dialog v-model="returnDailog" fullscreen>
            <v-card>
                <v-toolbar dense color="primary">
                    <v-toolbar-title>Monthly Return</v-toolbar-title>
                    <v-spacer/>
                    <v-btn icon @click="returnDailog=false"><v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar>
                <v-card-text>
                 
    <v-row class="mt-2" v-for="grp in groups" :key="grp.id">
        <v-col>        
              <v-card class="rounded-0">
                  <v-card-title>{{grp.name}}</v-card-title>
                  <v-card-text>
                      <v-simple-table dense>
                          <template v-slot:default>
                              <thead>
                                  <tr>
                                      <th>Description</th>
                                      <th class="green lighten-2 white--text text-center" >Budget Amount(ZWL)</th>
                                       <th class="primary lighten-2 white--text text-center" >Actual Amount(ZWL)</th>
                                         <th class="red lighten-2 white--text text-center" >Variance Amount(ZWL)</th>
                                          <th class="green lighten-2 white--text text-center" >Budget Amount(USD)</th>
                                       <th class="primary lighten-2 white--text text-center" >Actual Amount(USD)</th>
                                         <th class="red lighten-2 white--text text-center" >Variance Amount(USD)</th>
                                     
                                  </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td></td>
                                  <td class="text-center green--text">
                                     ZWL {{compute_budget(grp.id,'ZWL')}}
                                  </td>
                                  <td class="text-center blue--text">
                                    ZWL {{compute_actual_procurement(grp.id,'ZWL')}}
                                  </td>
                                  <td class="text-center red--text">
                                     ZWL {{compute_budget(grp.id,'ZWL') - compute_actual_procurement(grp.id,'ZWL') }}
                                  </td>
                                  <td class="text-center green--text">
                                     USD {{compute_budget(grp.id,'USD')}}
                                  </td>
                                  <td class="text-center blue--text">
                                    USD {{compute_actual_procurement(grp.id,'USD')}}
                                  </td>
                                  <td class="text-center red--text">
                                    USD {{compute_budget(grp.id,'USD')-compute_actual_procurement(grp.id,'USD')}}
                                  </td>
                              </tr>
                              </tbody>
                          </template>
                      </v-simple-table>
                       <div class="title mt-5">Number & Value of Procurement By Supplier and Procurement Type</div>
                      <v-divider/>
                      <v-simple-table dense class="mt-2">
                          <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Supplier Name</th>
                                    <th>Industry</th>
                                    <th>PR Number</th>
                                    <th>Total Procurements</th>
                                    <th class="grey lighten-3" v-for="type in noticetypes" :key="type.id">{{type.name}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="section in sections" :key="section.id">
                                    <td>{{section.name}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td v-for="type in noticetypes" :key="type.id">{{type.name}}</td>
                                </tr>
                            </tbody>
                          </template>
                      </v-simple-table>

                </v-card-text>
              </v-card>
        </v-col>
    </v-row>
  

                </v-card-text>
            </v-card>
        </v-dialog>
  </div>
</template>

<script>
export default {
    props:['items','month','year'],
    data(){
        return{
         returnDailog:false,
         totalbudgetzwl:0,
         totalprocuredzwl:0,
         totalbudgetusd:0,
         totalprocuredusd:0   
        }
    },methods:{
        async getReport(){
            var formdata = {procuremententityId:this.items.id,month:this.month,year:this.year}
            await this.$store.dispatch('monitoringreport/showData',formdata)
            this.returnDailog = true
        },
        compute_budget(groupId,currency){
          const data = this.plans
          let total = 0
          if(data.length>0){
             data.forEach(element => {
                 if(element.annualplan.currency.name==currency && element.annualplan.procurementcategoryId==groupId){
                     total = Number(total) + Number(element.quantity * element.annualplan.cost)
                 }
             });
          } 
          /*   let cumtotalzwl = this.totalbudgetzwl
            let cumtotalusd = this.totalbudgetusd
          if(currency=='ZWL'){        
             cumtotalzwl= cumtotalzwl+total
          }else{        
              cumtotalusd= cumtotalusd+total
          }
    
          this.totalbudgetzwl = cumtotalzwl
          this.totalbudgetusd =cumtotalusd
          */
          return total 
        },
        compute_actual_procurement(groupId,currency){
             const data = this.monthlyreturns
             let total = 0
             if(data.length>0){
                 data.forEach(el=>{
                         if(el.procurementcategoryId == groupId && el.currency.name == currency){
                             total = total + Number(el.value)
                         }
                 })
             }
             return total
        }

         
    },
    computed:{
          monthlyreturns(){
          return this.$store.state.monitoringreport.report.returns
      },
      plans(){
          return this.$store.state.monitoringreport.report.plans
      },
      groups(){
          return this.$store.state.monitoringreport.report.groups
      },
      entity(){
          return this.$store.state.monitoringreport.report.entity
      },
      noticetypes(){
          return this.$store.state.monitoringreport.report.noticetypes
      },
      sections(){
           return this.$store.state.monitoringreport.report.sections
      }
    }

}
</script>

<style>

</style>