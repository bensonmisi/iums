<template>
   <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text disabled>Procurement Returns</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

<v-row class="mt-2">
    <v-col>
    <v-card flat>
        <v-card-title class="d-flex justify-between">
          <div>Monthly Return</div>
          <v-spacer/>
          <ProcurementsSystem :id="id"/>
        </v-card-title>
    </v-card>
    </v-col>
</v-row>

    <v-row class="mt-2" v-for="smmry in summary" :key="smmry.id">
        <v-col>        
              <v-card class="rounded-0">
                  <v-card-title>{{smmry.name}}</v-card-title>
                  <v-card-text>
                      <v-simple-table>
                          <template v-slot:default>
                              <thead>
                                  <tr>
                                      <th>Description</th>
                                      <th class="green lighten-2 white--text" >Budget Amount(ZWL)</th>
                                       <th class="primary lighten-2 white--text" >Actual Amount(ZWL)</th>
                                         <th class="red lighten-2 white--text" >Variance Amount(ZWL)</th>
                                          <th class="green lighten-2 white--text" >Budget Amount(USD)</th>
                                       <th class="primary lighten-2 white--text" >Actual Amount(USD)</th>
                                         <th class="red lighten-2 white--text" >Variance Amount(USD)</th>
                                     
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Monthly Procurement Budget</td>
                                      <td>ZWL {{budget_total(smmry.budget,'ZWL')}}</td>
                                      <td>ZWL {{budget_total(smmry.actual,'ZWL')}}</td>
                                      <td>ZWL {{budget_total(smmry.budget,'ZWL')-budget_total(smmry.actual,'ZWL')}}</td>
                                     <td>USD {{budget_total(smmry.budget,'USD')}}</td>
                                      <td>USD {{budget_total(smmry.actual,'USD')}}</td>
                                      <td>USD {{budget_total(smmry.budget,'USD')-budget_total(smmry.actual,'USD')}}</td>
                                  </tr>
                                   

                              </tbody>
                          </template>
                      </v-simple-table>

                  </v-card-text>
              </v-card>
        </v-col>
         
    </v-row>
    
 
    <v-row class="mt-3">     
         <v-col>
            <v-card flat>
                <v-toolbar flat dense color="success">
                  <v-toolbar-title></v-toolbar-title>
                  <v-spacer/>
                 
                  
                </v-toolbar>
                <v-card-text>
                    <template v-if="monthlyreturns">
                        <v-simple-table dense>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Tender Number
                                        </th>
                                        <th>
                                            Procurement Group
                                        </th>
                                        <th>
                                            Procurement Type
                                        </th>
                                        <th>
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="monthlyreturns && monthlyreturns.monthlyreturndata.length>0">
                                        <tr v-for="retrn in monthlyreturns.monthlyreturndata" :key="retrn.id">
                                         <td>{{retrn.created_at|formatDate}}</td>
                                         <td>{{retrn.tendernumber}}</td>
                                         <td>{{retrn.procurementcategory.name}}</td>
                                         <td>{{retrn.noticetype.name}}</td>
                                         <td>{{retrn.currency.name}}{{retrn.value}}</td>

                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="5" class="text-center red--text"> No Monthly Returns Found</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
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
      const id = this.$route.params.id
    await this.$store.dispatch('monthlyreturn/getRecord',id)
  },data(){
      return{
          id:this.$route.params.id
      }
  },
   methods:{
       
        actual_total(records,currency){
           let total = 0
           records.forEach(rec=>{
               if(rec.currency ==currency){
                   total = total + Number(rec.amount)
               }
           })

           return total
        },
        budget_total(records,currency){
          let total = 0
           records.forEach(rec=>{
               if(rec.currency ==currency){
                   total = total + Number(rec.amount)
               }
           })

           return total
        }
   },computed:{
      monthlyreturns(){
          return this.$store.state.monthlyreturn.data.returns
      },
      summary(){
         return this.$store.state.monthlyreturn.data.summary 
      }
  }
}
</script>

<style>

</style>