<template>
     <v-card>

           <v-toolbar
     light
      flat
    >

      <v-toolbar-title>Bidbonds</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn rounded depressed class="indigo white--text">New Request</v-btn>
      <template v-slot:extension>
        <v-tabs
          v-model="tab"
        
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
           class="indigo white--text"
          >
           ACTIVE ({{computedData.activearray.length}})
          </v-tab>
          <v-tab
            class="green white--text"
          >
          MATURED
          ({{computedData.maturedarray.length}})
          </v-tab>
          <v-tab
              class="orange white--text"
          >
          PENDING
           ({{computedData.pendingarray.length}})
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
              
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <Bidbonddata :bidbonds="computedData.activearray"/>                     
                    </v-tab-item>
                      <v-tab-item>
                           <Bidbonddata :bidbonds="computedData.maturedarray"/>                        
                    </v-tab-item>
                      <v-tab-item>
                           <Bidbonddata :bidbonds="computedData.pendingarray"/>                     
                    </v-tab-item>
                    </v-tabs-items>
          </v-card>
</template>

<script>
import moment from 'moment'
import Bidbonddata from './bidbonddata.vue'
export default {
props:['bidbonds'],
components:{Bidbonddata},
data(){
 return{
     tab: null,
      items: [
          'ACTIVE', 'MATURED', 'PENDING'
        ],
 }
},
methods:{
 checkData(date){
     return moment(date).isAfter(moment()) ? 'ACTIVE' :'MATURED'
 }
},computed:{
    computedData(){
        let activearray = []
        let maturedarray = []
        let pendingarray = []
        if(this.bidbonds)
        {
        this.bidbonds.forEach(element => {
            let status =  element.maturitydate ? moment(element.maturitydate).isAfter(moment()) ? 'ACTIVE' :'MATURED' :'PENDING'
            const el ={id:element.id,tendernumber:element.tendernumber,validityperiod:element.validityperiod,maturitydate:element.maturitydate,status:status,refunded:element.refunded}
            if(status=='ACTIVE')
            {
            activearray.push(el)
            }
            if(status=='MATURED'){
                maturedarray.push(el)
            }
            if(status=='PENDING'){
                pendingarray.push(el)
            }
        });
        }

        return {activearray,maturedarray,pendingarray}
    }
}
}
</script>

<style scoped>
 .MATURED{
     color: green;
     font-weight: bold;
 }
 .ACTIVE{
     color: indigo;
     font-weight: bold;
 }
 .PENDING{
     color: orange;
     font-weight: bold;
 }
</style>