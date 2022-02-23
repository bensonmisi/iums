<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text disabled>Procurement Plans</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col>
            <v-card>
                <v-card-title>
                 {{currentYear}} Procurement Plan
                 <v-spacer/>
                  <template v-if="plan.length>0"><AnnualplanApprove/></template>
                 <AnnualplanAdd/>
                </v-card-title>
                <v-card-text>
                   <v-simple-table dense>
                       <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Refno</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>UOM</th>
                                    <th>Unit Cost</th>
                                    <th>Total Cost</th>
                                    <th> Method</th>
                                    <th>SPOC</th>
                                    <th>R.O.P</th>
                                     <th>D.O.P</th>
                                    <th>C.Time</th>                                   
                                    <th>Prequal</th>
                                    <th>E.L.Time</th>
                                    <th>S.O.F</th>
                                     <th>Classification</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="plan.length>0">
                                      <tr v-for="pl in plan" :key="pl.id">
                                        <td>
                                            {{pl.id}}
                                        </td>
                                        <td><small>{{pl.description}}</small></td>
                                        <td><small>{{pl.quantity}}</small></td>
                                        <td><small>{{pl.uom.name}}</small></td>
                                        <td><small>{{pl.currency.name}}{{pl.cost}}</small></td>
                                          <td><small>{{pl.currency.name}}{{pl.annualcost}}</small></td>
                                          <td><small>{{pl.noticetype.name}}</small></td>
                                          <td><small>{{pl.spoc}}</small></td>
                                         <td><small>{{pl.rate_of_purchase}}</small></td>
                                          <td><small>{{pl.cycle_time}}</small></td>
                                          <td><small>{{pl.date_of_purchase}}</small></td>
                                           <td><small>{{pl.prequalification}}</small></td>
                                             <td><small>{{pl.external_lead_time}}</small></td>
                                            <td><small>{{pl.source_of_funds}}</small></td>                                           
                                            <td><small>{{pl.procurementcategory.name}}</small></td>
                                             <td><small>{{pl.procurementclassification.name}}</small></td>
                                              <td><small>{{pl.status}}</small></td>
                                             <td class="d-flex pt-2 pb-2">
                                               <div v-if="pl.status =='PENDING'" class="d-flex">
                                                   <AnnualplanEdit :item="pl"/>
                                                   <AnnualplanDelete :item="pl"/>                                                   

                                               </div>
                                               <Individualplan :item="pl"/>
                                             </td>
                                            
                                      </tr>
                                </template>
                                <template v-else>
                                 <tr>
                                     <td colspan="15" class="text-center red--text">No Procurement Plan found for {{currentYear}}</td>
                                 </tr>
                                </template>
                            </tbody>
                       </template>
                   </v-simple-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
     await this.$store.dispatch('annualplan/getData')
 },computed:{
     plan(){
         const data = this.$store.state.annualplan.data
         return data
     },
     currentYear(){
         const today = new Date()
         return today.getFullYear()
     }
 }


}
</script>

<style>

</style>