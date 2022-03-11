<template>
  <div>
      <v-row>
          <v-col>
                <v-tabs  slider-color="black" slider-size="5"  v-model="tab">
                    <v-tab v-for="(nt,index) in computednotices" :key="index" :class="noticeClass(index)">{{index}} Notices ({{nt.length}})</v-tab>
  
               </v-tabs>
               
          <v-tabs-items v-model="tab">
              <v-tab-item v-for="(nt,index) in computednotices" :key="index">
                   <v-card flat class="rounded-0">               
                  <v-card-text>
                      <v-simple-table>
                          <template v-slot:default>
                               <thead>
                        <tr>
                        <th class="text-left">
                            Tender number
                        </th>
                        <th class="text-left">
                            Closing Date
                        </th>

                          <th class="text-left">
                            Notice Type
                        </th>
                        <th>Maturity Status</th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                           <template v-if="nt && nt.length>0">
                        <tr
                        v-for="per in nt"
                        :key="per.id"
                        >
                     
                        <td>
                            <div>{{per.tendernumber}}</div>
                            <small>{{per.title}}</small>
                        </td>
                        <td>{{per.closingDate}} {{per.closingTime}}</td>
                          <td>{{per.noticetype.name}}</td>
                          <td> <v-chip x-small :color="checkStatus(per.closingDate)=='CLOSED' ? 'red' :'green lighten-2'">{{checkStatus(per.closingDate)}}</v-chip></td>
                        <td>{{per.status}}</td>
                        <td class="d-flex pt-2">
                           
                         <NoticeView :id="per.id"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="text-center red--text">No procurement notices found as yet</td>
                            </tr>
                        </template>
                    </tbody>
                          </template>
                      </v-simple-table>
                  </v-card-text>
              </v-card>
              </v-tab-item>
          </v-tabs-items>
            
          </v-col>
      </v-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
props:['notices'],
data(){
    return{
        tab:null
    }
},
methods:{
      checkStatus(date){
        const status = moment(date).isSameOrAfter(moment())
        if(status){
        return "Closes "+moment(date).startOf('days').fromNow()
        }else{
            return "CLOSED"
        }
    },
    noticeClass(index){
        let cls =""
        switch (index) {
            case 'PUBLISHED':
               cls= "primary white--text"
                break;

                  case 'PENDING':
                cls= "warning white--text"
                break;
                  case 'AWAITING':
                cls= "info white--text"
                break;
                  case 'CANCELLED':
                cls= "error white--text"
                break;
        
            default:
               cls= "success white--text"
                break;
        }
        return cls

    }
},computed:{
    computednotices(){
        let data = []
         data = this.notices
         if(data && data.length>0)
         {
        return  data.reduce((acc,obj)=>{
         const key = obj['status']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})
         }
       
    }
}
}
</script>

<style>

</style>