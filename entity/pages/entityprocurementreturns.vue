<template>
    <v-container>
         <v-row>
          <v-col>
              <v-card flat>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Monthly Procurement Returns</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
        <DashboardReturn/>
        <v-row class="mt-2">
            <v-col>
                <v-card flat class="rounded-0">
                    <v-toolbar flat color="primary" dark dense>
                        <v-toolbar-title>Monthly Procurement Returns</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                       <v-simple-table>
                           <template v-slot:default>
                               <thead>
                                   <tr>
                                       <th>
                                           Date
                                       </th>
                                        <th>
                                           Year
                                       </th>
                                       <th>
                                           Month
                                       </th>
                                       <th>
                                           Status
                                       </th>
                                       <th>

                                       </th>
                                   </tr>
                               </thead>
                               <tbody>
                               
                                   <template v-if="returns && returns.length>0">
                                       <tr v-for="ret in returns" :key="ret.id">
                                           <td>{{ret.created_at|formatDate}}</td>
                                                 <td>{{ret.year}}</td>
                                                  <td>{{ret.month}}</td>
                                                   <td>{{ret.status}}</td>
                                                   <td>
                                                       <v-btn small rounded depressed color="primary" :to="`/returns/`+ret.id">View</v-btn>
                                                   </td>

                                       </tr>
                                   </template>
                                   <template v-else>
                                       <tr>
                                           <td colspan="5" class="text-center red--text">No monthly returns found</td>
                                       </tr>
                                   </template>
                               </tbody>
                           </template>
                       </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
    await this.$store.dispatch('monthlyreturn/getData')
 },computed:{
     returns(){
         return this.$store.state.monthlyreturn.data.returns
     }
 }
}
</script>

<style>

</style>