<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Suppliers Report</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-text>
                    <v-row>
                   <v-col md="5">
                            <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="From date"
                                dense
                               prepend-inner-icon="mdi-calendar"
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                   </v-col>
                   <v-col md="5">
                         <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="date2"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date2"
                                dense
                                label="To date"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date2"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu2 = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu2.save(date2)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                   </v-col>
                   <v-col md="2">
                       <v-btn rounded outlined color="success" @click="search">Search</v-btn>
                   </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-2">
          <v-col>
              <v-card>
                  <v-card-title>
                      <v-spacer/>
                      <template v-if="suppliers.length>0">
                        <downloadexcel :data="suppliers"><v-btn  depressed class="primary mr-2">Export</v-btn></downloadexcel>
                      </template>
                  </v-card-title>
                  <v-card-text>
                        <v-simple-table  dense>
                        <template v-slot:default> 
                            <thead>
                             <tr>
                                 <th>Date</th>
                                 <th>Regnumber</th>
                                 <th>Name</th>
                                 <th>Country</th>
                                 <th>City</th>
                                 <th>Address</th>
                                 <th>Emails</th>
                                 <th>Phonenumbers</th>
                             </tr>
                            </thead>                      
                        <tbody>    
                            <tr v-for="supplier in  suppliers" :key="supplier.id">
                             <td>
                                 {{supplier.issuedOn | formateHumanDiff}}
                             </td>
                             <td>
                                  {{supplier.regnumber}}
                             </td>
                             <td>
                                
                                 {{supplier.name}}
                                
                             </td>
                             <td>
                                {{supplier.country}}
                             </td>
                             <td>
                                 {{supplier.city}}
                             </td>
                             <td>
                                 {{supplier.address}}
                             </td>
                             <td>
                                 {{supplier.emails}}
                             </td>
                             <td>
                                 {{supplier.phones}}
                             </td>
                            </tr>                     
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
import JsonExcel from "vue-json-excel";
export default {
layout:'user',
components:{
downloadexcel:JsonExcel
},
data(){
    return{
        overlay:false,
        form:{
            fromDate:null,
            toDate:null,
            status:''
           },
           menu:false,
           date:null,
           menu2:false,
           date2:null,
           loading:false,
           statuslist:['APPROVED','PENDING']
    }
},
methods:{
 async search(){
     this.form.fromDate = this.date
     this.form.toDate = this.date2
     this.overlay = true
     await this.$store.dispatch('suppliers/getReport',this.form)
     this.overlay=false
 }
},
computed:{
    suppliers(){
        return this.$store.state.suppliers.report
    }
}
}
</script>

<style>

</style>