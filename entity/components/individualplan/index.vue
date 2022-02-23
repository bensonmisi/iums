<template>
  <div>
      <v-btn icon x-small color="info" @click="getData"><v-icon>mdi-archive-search</v-icon></v-btn>
       <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
     <v-card>
        <v-toolbar
          dark
          color="primary"
        >
        <v-toolbar-title>Individual Procurement Plan</v-toolbar-title>
        <v-spacer/>
        <v-btn icon light @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
            <div class="text-h5 mt-2">Annual Plan Item</div>
            <v-simple-table dark class="mt-2">
                 <template v-slot:default>
                    <tbody>
                        <tr>
                               <td>
                                            {{item.id}}
                                        </td>
                                        <td><small>{{item.description}}</small></td>
                                        <td><small>{{item.quantity}}</small></td>
                                        <td><small>{{item.uom.name}}</small></td>
                                        <td><small>{{item.currency.name}}{{item.cost}}</small></td>
                                          <td><small>{{item.currency.name}}{{item.annualcost}}</small></td>
                                          <td><small>{{item.noticetype.name}}</small></td>
                                          <td><small>{{item.spoc}}</small></td>
                                         <td><small>{{item.rate_of_purchase}}</small></td>
                                          <td><small>{{item.cycle_time}}</small></td>
                                          <td><small>{{item.date_of_purchase}}</small></td>
                                           <td><small>{{item.prequalification}}</small></td>
                                             <td><small>{{item.external_lead_time}}</small></td>
                                            <td><small>{{item.source_of_funds}}</small></td>                                           
                                            <td><small>{{item.procurementcategory.name}}</small></td>
                                             <td><small>{{item.procurementclassification.name}}</small></td>
                                              <td><small>{{item.status}}</small></td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            
            <v-card class="mt-2">
              <v-card-title>
                   <div class="text-h5">Individual Plan</div>
                   <v-spacer/>
                   <template v-if="item.status=='PENDING'">
                   <IndividualplanAdd :id="item.id"/>
                   </template>
              </v-card-title>
              <v-card-text>
                <v-simple-table dense>
                       <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>A.P.Ref</th>                                    
                                    <th>Qty</th>
                                    <th>UOM</th>
                                    <th>Unit Cost</th>
                                    <th>Total Cost</th>
                                    <th>R.O.P</th>
                                     <th>D.O.P</th>
                                    <th>C.Time</th>                                   
                                    <th>Prequal</th>
                                    <th>E.L.Time</th>
                                    <th>S.O.F</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                              <template v-if="plans && plans.length>0">
                              <tr v-for="plan in plans" :key="plan.id">
                                        <td>{{item.id}}</td>                                       
                                        <td><small>{{plan.quantity}}</small></td>
                                        <td><small>{{item.uom.name}}</small></td>
                                        <td><small>{{item.currency.name}}{{item.cost}}</small></td>
                                        <td><small>{{item.currency.name}}{{item.cost * plan.quantity}}</small></td>                                         
                                        <td><small>{{item.rate_of_purchase}}</small></td>                                         
                                        <td><small>{{plan.date_of_purchase}}</small></td>
                                        <td><small>{{item.cycle_time}}</small></td>
                                        <td><small>{{item.prequalification}}</small></td>
                                        <td><small>{{item.external_lead_time}}</small></td>
                                        <td><small>{{item.source_of_funds}}</small></td>           
                                        <td><small>{{item.status}}</small></td>
                                        <td class="d-flex pt-2">
                                          <template v-if="item.status=='PENDING'">
                                          <IndividualplanEdit :item="plan"/>
                                          <IndividualplanDelete :item="plan"/>
                                          </template>
                                        </td>
                              </tr>
                              </template>
                              <template v-else>
                                <tr><td colspan="13" class="text-center red--text">No Individual Plan found</td></tr>
                              </template>
                            </tbody>
                       </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
        </v-card-text>
     </v-card>
       </v-dialog>
  </div>
</template>

<script>
export default {
props:['item'],
data(){
    return{
        dialog:false
    }
},methods:{
    async getData(){
          await this.$store.dispatch('individualplan/getData',this.item.id)
        this.dialog=true
    }
},
computed:{
  plans(){
    return this.$store.state.individualplan.data
  }
}
}
</script>

<style>

</style>