<template>
  <v-row class="mt-4">
      <v-col>
      <v-card>
          <v-toolbar color="indigo" dark>
              <v-toolbar-title>Bid Bonds</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              <v-simple-table>
                  <template v-slot:default>
                      <thead>
                          <tr>
                          <th>Tender Number</th>
                          <th>Closing Date</th>
                          <th>Validty Period</th>
                          <th>Maturity Date</th>
                          <th>Amount</th>
                          <th>Refunded</th>
                          <th>Time Decay</th>
                          <th>
                              Participants
                          </th>
                          <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-if="computedbidbonds">
                          <tr v-for="(bid,index) in computedbidbonds" :key="bid.id">
                             <td>{{index}}</td> 
                             <td>{{bid[0].closingDate}}</td>
                             <td>{{bid[0].validityperiod}} days</td>
                              <td>{{bid[0].maturitydate}}</td>
                              <td>{{bid[0].currency.name}}{{bid[0].amount}}</td>
                              <td>{{bid[0].refund}}</td>
                              <td>{{bid[0].maturitydate|formateHumanDiff}}</td>
                              <td>
                                  {{bid.length}}
                              </td>
                              <td></td>
                          </tr>
                          </template>
                          <template v-else>
                              <tr><td colspan="7" class="text-center red--text">No Bidbonds applications found</td></tr>
                          </template>
                      </tbody>
                  </template>
              </v-simple-table>
          
          </v-card-text>
      </v-card>
      </v-col>
  </v-row>
</template>

<script>
export default {
props:['bidbonds'],
computed:{
    computedbidbonds(){
        var data = []
        data = this.bidbonds
        if(data.length>0)
        {
            return data.reduce((acc,obj)=>{
         const key = obj['tendernumber']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})
        }else{
            return null
        }
    }
}
}
</script>

<style>

</style>