<template>
  <div>
      <v-btn icon small color="success" @click="show()"><v-icon>mdi-currency-usd</v-icon></v-btn>
      <v-dialog v-model="showDialog" width="700">
          <v-card>
              <v-card-title>
                  Notice Fees
                  <v-spacer/>
                 <noticefeeNew :id="notice.id"/> <v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                       <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Fee
                        </th>
                        <th class="text-left">
                         Validity Period
                        </th>
                        <th class="text-left">
                          Cost
                        </th>
                        <th class="text-left">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                       <template v-if="noticefees.length>0">
                          <tr v-for="fee in noticefees" :key="fee.id">
                                <td class="text-left">{{fee.tenderfeetype.name}}</td>
                                <td class="text-left">{{fee.bidbondperiod ? fee.bidbondperiod.days :""}}</td>
                                <td class="text-left">
                                    {{fee.currency.name}}
                                    {{fee.amount}}
                                </td>
                                <td class="d-flex">
                                  <noticefeeUpdate :fee="fee"/>
                                  <noticefeeDelete :fee="fee"/>
                                </td>
                          </tr>
                       </template>
                       <template v-else>
                           <tr>
                               <td colspan="4" class="red--text text-center">No notice fees found</td>
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
import noticefeeNew from './add.vue'
import noticefeeUpdate from './edit.vue'
import noticefeeDelete from './delete.vue'
export default {
name:'noticefeeView',
components:{noticefeeNew,noticefeeUpdate,noticefeeDelete},
props:['notice'],
data(){
    return{
        showDialog:false
    }
},methods:{
    async show(){
      await this.$store.dispatch('noticefee/getData',this.notice.id)
      this.showDialog = true
    }
},computed:{
    noticefees(){
        return this.$store.state.noticefee.data
    }
}
}
</script>

<style>

</style>