<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Procurement Notices</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  Procurement Notices
                    <v-spacer/>
                    <NoticeAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Entity
                        </th>
                        <th class="text-left">
                            Tender number
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
                        <template v-if="notices.length>0">
                        <tr
                        v-for="per in notices"
                        :key="per.id"
                        >
                        <td>{{ per.procuremententity.name}}</td>
                        <td>
                            <div>{{per.tendernumber}}</div>
                            <small>{{per.title}}</small>
                        </td>
                        <td>{{per.closingDate}} {{per.closingTime}}</td>
                        <td>{{per.status}}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <NoticeEdit :notice="per"/>
                            <NoticeDelete :notice="per"/>
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
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
export default {
layout:'user',
data(){
    return{
        overlay:false
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('notice/getData') 
   this.overlay = false
},computed:{
    notices(){
        return this.$store.state.notice.data
    }
}
}
</script>

<style>

</style>