<template>
<v-card>
    <v-card-text>
   <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Description
                        </th>
                        <th class="text-left">
                            Entity
                        </th>
                        <th class="text-left">
                           Reach
                        </th>
                        <th class="text-left">
                            Closing Date
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                            <tbody>
                                    <template v-if="notices && notices.length>0">
                        <tr
                        v-for="per in notices"
                        :key="per.id"
                        >
                        <td>{{per.title}}</td>
                        <td>
                            <div>{{ per.procuremententity.name}}</div>
                            <small>{{per.tendernumber}}</small>
                        </td>
                         <td>{{per.reach}}</td>
                        <td>{{per.closingDate}} {{per.closingTime}}</td>
                        <td> <v-chip x-small :color="checkStatus(per.closingDate)=='CLOSED' ? 'red' :'green lighten-2'">{{checkStatus(per.closingDate)}}</v-chip></td>
                        <td class="text-right">
                            <TenderView :uuid="per.uuid"/>
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

</template>

<script>
import moment from 'moment'
import TenderView from './view.vue'
export default {
    name:'TenderList',
    components:{TenderView},
  props:['notices'],
  methods:{
    checkStatus(date){
        const status = moment(date).isSameOrAfter(moment())
        if(status){
        return "Closes "+moment(date).startOf('days').fromNow()
        }else{
            return "CLOSED"
        }
    }
  }
}
</script>

<style>

</style>