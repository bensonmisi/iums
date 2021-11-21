<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Bank Account numbers</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                  Account numbers
                    <v-spacer/>
                    <AccountnumberAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                           Accountnumber
                        </th>
                         <th class="text-left">
                          Currency
                        </th>
                         <th class="text-left">
                           Type
                        </th>
                          <th class="text-left">
                           Status
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="accountnumbers.length>0">
                        <tr
                        v-for="per in accountnumbers"
                        :key="per.id"
                        >
                        <td>{{ per.accountnumber }}</td>
                          <td>{{ per.currency}}</td>
                            <td>{{ per.type }}</td>
                            <td>{{ per.status }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <AccountnumberEdit :accountnumber="per"/>
                            <AccountnumberDelete :accountnumber="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="4" class="text-center red--text">No account numbers found</td>
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
   await this.$store.dispatch('accountnumbers/getAccountnumbers') 
   this.overlay = false
},computed:{
    accountnumbers(){
        return this.$store.state.accountnumbers.accountnumbers
    }
}
}
</script>
 
<style>

</style>