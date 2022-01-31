<template>
    <v-container fluid>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Tender Revenue Reports</v-btn>
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
                            label="Currency"
                            outlined
                            v-model="form.currency"
                            :items="currencylist"
                            item-value="id"
                            item-text="name"
                        />
                    </v-col>
                       <v-col>
                            <v-select
                            label="Reg Year"
                            outlined
                            v-model="form.year"
                            :items="regyear"
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
          <v-col v-for="(dt,index) in summary" :key="index">
              <v-card>
               <v-card-text class="text-center pt-5 pb-5">
                   <div>{{index}}</div>
                   <div>{{dt[0].currency.name}}{{computeTotal(dt)}}</div>
               </v-card-text>
              </v-card>
          </v-col>
        </v-row>
      <v-row class="mt-3">
          <v-col>
              <v-card>
                  <v-card-text>
                          <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                          Date
                        </th>
                         <th class="text-left">
                          reg Year
                        </th>
                        <th class="text-left">
                          Invoice number
                        </th>
                          <th class="text-left">
                          Company
                        </th>
                        <th class="text-left">
                         Description
                        </th>
                         <th class="text-left">
                            Tender number
                        </th>                     
                         <th class="text-left">
                        Amount
                        </th>                        
                     
                        </tr>
                    </thead>
                    <tbody>
                      <template v-if="reportData.length>0">
                       <tr v-for="record in reportData" :key="record.id">
                            <td>{{record.updated_at | formatDate }}</td>
                            <td>{{record.year}}</td>
                            <td>{{record.invoicenumber}}</td>
                            <td>
                                <div>{{record.account ? record.account.name :""}}</div>
                                <div>{{record.account ? record.account.regnumber :""}}</div>
                            </td>
                            <td>
                                {{record.description}}
                            </td>
                            <td>
                                {{record.tendernumber}}
                            </td>
                              <td>
                               {{record.currency.name}}{{record.amount}}
                            </td>
                       </tr>
                      </template>
                      <template>
                        <tr>
                            <td colspan="7" class="text-center red--text">No Report data found</td>
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
import moment from 'moment'
export default {
    layout:'user',
data(){
    return{
        overlay:false,
        date:null,
        menu:false,
        date2:null,
        menu2:false,
        checkbox:false,
        form:{
            startdate:"",
            enddate:"",
            currency:"",
            year:""
        }
    }
},
async fetch(){
    this.overlay=true
      await this.$store.dispatch('currency/getCurrency')
       await this.$store.dispatch('tenderrevenue/getReport')
   this.overlay = false
},methods:{
    async search(){
          this.form.startdate = this.date
          this.form.enddate = this.date2
          this.overlay = true
           await this.$store.dispatch('tenderrevenue/filterReport',this.form)
           this.overlay = false
    },
    computeTotal(dt){
        let total = 0;
        dt.forEach(element => {
            total = total+Number(element.amount)
        });

        return Math.round(total)
    }
},computed:{
     currencylist(){
        return this.$store.state.currency.currency
    },
    regyear(){
        let regyear =[]
         for (let index = 2019; index <= moment().year(); index++){
            regyear.push(index)            
         }

         return regyear
    },summary(){
        let data = this.$store.state.tenderrevenue.report
         const invoices= data.reduce((acc,obj)=>{
         const key = obj['description']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

       return invoices
    },
    reportData(){
         return this.$store.state.tenderrevenue.report
    }
}
}
</script>

<style>

</style>