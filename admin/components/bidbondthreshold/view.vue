<template>
  <div>
      <v-btn small rounded depressed color="primary" @click="showModel">Fees</v-btn>
   
      <v-dialog 
      v-model="addPermModel" 
      width="900px"
      hide-overlay
      transition="dialog-bottom-transition"
      >
      
       <v-card>
           <v-card-title>
                <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
              Bid Establishment Fees
               <v-spacer/>
              <add :period="period"/>
           </v-card-title>
           <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                           Locality
                        </th>                       
                        <th class="text-left">
                          Period
                        </th>
                        <th class="text-left">
                         Lower Limit
                        </th>
                         <th class="text-left">
                        Uppper Limit
                        </th>
                           <th class="text-left">
                        Amount
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="thresholdslist.length>0">
                        <tr
                        v-for="per in thresholdslist"
                        :key="per.id"
                        >
                        <td>{{ per.locality }}</td>
                         <td>{{ per.validityperiod }}</td>
                          <td>{{ per.currency? per.currency.name:"" }}{{ per.lowerlimit }}</td>
                           <td>{{ per.currency? per.currency.name:"" }}{{ per.upperlimit }}</td>
                            <td>{{ per.currency? per.currency.name:"" }}{{ per.amount }}</td>
                        <td class="d-flex pt-2 pb-2">
                           <edit :threshold="per"/> 
                           <deleteThreshold :threshold="per"/>                    
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="7" class="pa-3 text-center red--text">No Fees Found</td>
                            </tr>
                        </template>
                    </tbody>
                    </template>
                </v-simple-table>
                          
           </v-card-text>
          
       </v-card>
       
      </v-dialog>
  </div>
</template>

<script>
import add from './add.vue'
import edit from './edit.vue'
import deleteThreshold from './delete.vue'
export default {
    components:{add,edit,deleteThreshold},
    props:['period'],
 data(){
     return{
         addPermModel:false,      
     }
 },methods:{
  async showModel(){
      await this.$store.dispatch('bidbondthreshold/getThresholds',this.period.days) 
      this.addPermModel=true 
  }
 },computed:{
    thresholdslist(){
        return this.$store.state.bidbondthreshold.thresholds
    }
}
}
</script>

<style>

</style>