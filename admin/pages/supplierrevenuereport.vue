<template>
    <v-container fluid>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Supplier Revenue Reports</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-text>
                <v-row>
                    <v-col>
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
                     <v-col>
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
                                label="To date"
                               prepend-inner-icon="mdi-calendar"
                                outlined
                                readonly
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
                    <v-col>
                            <v-select
                            label="Settlement Option"
                            outlined
                            v-model="form.settlement"
                            :items="settlementoptions"
                        />
                    </v-col>
                      <v-col>
                            <v-select
                            label="Currency"
                            outlined
                            v-model="form.currency"
                            :items="currencylist"
                            item-value="id"
                            item-text="name"
                        />
                    </v-col>
                    <v-col>
                        <v-btn rounded block outlined large color="success" @click="search">Filter</v-btn>
                    </v-col>
                </v-row>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>

      <v-row>
          <v-col>
              <v-card>
                  <v-card-text>
                    <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                          Invoice number
                        </th>
                          <th class="text-left">
                          Company
                        </th>
                         <th class="text-left">
                            Total Categories
                        </th>
                           <th class="text-left">
                            Cost Per Category
                        </th>
                        <th class="text-left">
                          Total Invoiced
                        </th>
                         
                        <th class="text-left">
                            Total Receipted
                        </th>
                      
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(record,index) in reportdata" :key="index"
                        >
                        <td>{{record["inv"]}}</td>
                        <td>{{record["data"].filteredinvoices[0].account ? record["data"].filteredinvoices[0].account.name :"" }}</td>
                        <td>{{record["data"].filteredinvoices.length}}</td>
                         <td>{{record["data"].filteredinvoices[0].currency ? record["data"].filteredinvoices[0].currency.name :"" }}{{totalInvoiced(record["data"].filteredinvoices)}}</td>
                         <td>{{record["data"].filteredinvoices[0].currency ? record["data"].filteredinvoices[0].currency.name :"" }}{{totalReceipted(record["data"].filteredreceipts)}}</td>
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
export default {
layout:'user',
data(){
    return{
        overlay:false,
        date:null,
        menu:false,
        date2:null,
        menu2:false,
        settlementoptions:['ONCE-OFF','QUARTERLY'],
        form:{
            fromdate:"",
            todate:"",
            currency:"",
            settlement:"",
        }
    }
},
async fetch(){
    this.overlay=true
      await this.$store.dispatch('currency/getCurrency')
   this.overlay = false
},methods:{
      async search(){
          this.form.fromdate = this.date
          this.form.todate = this.date2
          this.overlay = true
           await this.$store.dispatch('supplierrevenue/filterReport',this.form)
           this.overlay = false
      },
      totalInvoiced(data){
          let total = 0;
          data.forEach(element => {
              total = total + Number(element.cost)
          });

          return total
      },
        totalReceipted(data){
          let total = 0;
          data.forEach(element => {
              total = total + Number(element.amount)
          });

          return total
      }

},computed:{
    currencylist(){
        return this.$store.state.currency.currency
    },
    reportdata(){
        return this.$store.state.supplierrevenue.report
    }
}
}
</script>

<style>

</style>