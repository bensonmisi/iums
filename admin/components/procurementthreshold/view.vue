<template>
   <div>
       <v-btn icon small depressed color="success" @click="getdata"><v-icon>mdi-currency-usd</v-icon></v-btn>
       <v-dialog v-model="showDialog" width="900">           
                <v-card>
                <v-card-title>
                  {{item.name}} Procurement Threshold
                    <v-spacer/>
                    <ProcurementthresholdAdd :item="item"/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                         Class
                        </th>
                         <th class="text-left">
                         Classfication
                        </th>
                         <th class="text-left">
                        Threshold
                        </th>
                         <th class="text-left">
                         Fee
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="procurementthresholds.length>0">
                        <tr
                        v-for="per in procurementthresholds"
                        :key="per.id"
                        >
                        <td>{{ per.procurementclass.name }}</td>
                        <td>{{ per.procurementclassification.name }}</td>
                        <td>{{ per.currency.name }}{{per.value}}</td>
                         <td>{{ per.currency.name }}{{per.fee}}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <ProcurementthresholdEdit :item="per"/>
                            <ProcurementthresholdDelete :item="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="text-center red--text">No Procurement threholds found</td>
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
export default {
layout:'user',
props:['item'],
data(){
    return{
        overlay:false,
        showDialog:false
    }
},
methods:{
    async getdata(){
    this.overlay=true
      await this.$store.dispatch('procurementthreshold/getData',this.item.id) 
      this.showDialog = true
   this.overlay = false
   }
},computed:{
    procurementthresholds(){
        return this.$store.state.procurementthreshold.data
    }
}
}
</script>

<style>

</style>