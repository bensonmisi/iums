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
                     <v-btn depressed rounded  color="primary" to="/notice/add"><v-icon>mdi-plus</v-icon>New Notice</v-btn>
                </v-card-title>
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
                     
                        <td>
                            <div>{{per.tendernumber}}</div>
                            <small>{{per.title}}</small>
                        </td>
                        <td>{{per.closingDate}} {{per.closingTime}}</td>
                          <td>{{per.noticetype.name}}</td>
                        <td>{{per.status}}</td>
                        <td>
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