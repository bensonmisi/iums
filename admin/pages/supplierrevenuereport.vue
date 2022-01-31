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
                            <v-select
                            label="Reg Year"
                            outlined
                            v-model="form.regyear"
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
          <v-col>
              <v-card>
               <v-card-text class="text-center pt-5 pb-5">
                   <div>Total Categories</div>
                   <div class="display-1">{{totals.totalcategories}}</div>
               </v-card-text>
              </v-card>
          </v-col>
          <v-col>
              <v-card>
               <v-card-text class="text-center pt-5 pb-5">
                   <div>Total Invoices</div>
                   <div class="display-1">{{totals.totalinvoices}}</div>
               </v-card-text>
              </v-card>
          </v-col>
          <v-col>
              <v-card>
               <v-card-text class="text-center pt-5 pb-5">
                   <div>Total Receipts</div>
                   <div class="display-1">{{totals.totalreceipts}}</div>
               </v-card-text>
              </v-card>
          </v-col>
           <v-col>
              <v-card>
               <v-card-text class="text-center pt-5 pb-5">
                   <div>Over Payments</div>
                   <div class="display-1">{{totals.totalinvoices-totals.totalreceipts}}</div>
               </v-card-text>
              </v-card>
          </v-col>
      </v-row>

      <v-row>
          <v-col>
              <v-card>
                  <v-card-title>
                     <v-checkbox
      v-model="checkbox"
      label="Show Distorted Invoices"
    ></v-checkbox> <v-spacer/>
                       <downloadexcel :data="reportdata"><v-btn  depressed class="primary mr-2">Export</v-btn></downloadexcel>
             
                  </v-card-title>
                  <v-card-text>
                       <v-alert type="error" v-if="(totals.totalinvoices-totals.totalreceipts) < 0">
      System has detected Over payments on one or more receipts. This will distort your revenue projections
    </v-alert>
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
                         Settlement Option
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
                        <template v-if="reportdata.length>0">
                        <tr
                        v-for="(record,index) in reportdata" :key="index"
                        :class="record.totalinvoices < record.totalreceipts ? 'red--text' : record.totalinvoices < record.totalreceipts ? 'blue--text':'' "
                        >
                        <td>{{record.updated_at | formatDate }}</td>
                        <td>{{record.year}}</td>
                        <td>{{record.inv}}</td>
                        <td>{{record.name }}</td>
                         <td>{{record.settlement }}</td>
                        <td>{{record.invoices.length}}</td>
                        <td>{{record.currency }}{{totalInvoiced(record.invoices)/record.invoices.length}}</td>
                         <td>{{record.currency}}{{totalInvoiced(record.invoices)}}</td>
                         <td>{{record.currency}}{{totalReceipted(record.receipts)}}</td>
                         <td>{{record.status}}</td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="8" class="text-center red--text">No Report data to show</td>
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
import JsonExcel from "vue-json-excel";
export default {
layout:'user',
components:{
downloadexcel:JsonExcel
},
data(){
    return{
        overlay:false,
        date:null,
        menu:false,
        date2:null,
        menu2:false,
        checkbox:false,
        settlementoptions:['ONCE-OFF','QUARTERLY'],
        form:{
            fromdate:"",
            todate:"",
            currency:"",
            settlement:"",
            regyear:""
        }
    }
},
async fetch(){
    this.overlay=true
      await this.$store.dispatch('currency/getCurrency')
       await this.$store.dispatch('supplierrevenue/getReport')
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
       const records =  this.$store.state.supplierrevenue.report
       let array = []
       for (let index = 0; index < records.length; index++) {
           const updated_at = records[index]["data"].filteredinvoices[0].updated_at;
           const year = records[index]["data"].filteredinvoices[0].year;
           const settlement = records[index]["data"].filteredinvoices[0].settlement;
           const name = records[index]["data"].filteredinvoices[0].account ? records[index]["data"].filteredinvoices[0].account.name :"";
           const inv = records[index]["inv"]
           const invoices = records[index]["data"].filteredinvoices
           const totalinvoices = this.totalInvoiced(records[index]["data"].filteredinvoices)
           const totalreceipted = this.totalReceipted(records[index]["data"].filteredreceipts)
           const totalcategories = records[index]["data"].filteredinvoices.length
           const receipts = records[index]["data"].filteredreceipts
           const currency = records[index]["data"].filteredinvoices[0].currency ? records[index]["data"].filteredinvoices[0].currency.name :""
           const balance = totalinvoices - totalreceipted
           let status = ""
           if(balance<0){
               status ="OVERPAYMENT"
           }
           
           if(balance > 0){
               status ="UNDERPAYMENT"
           }
           let el={}
           console.log(this.checkbox)
           if(this.checkbox){
               if(status==="OVERPAYMENT" || status==="UNDERPAYMENT")
               {
               el={updated_at:updated_at,year:year,totalinvoices:totalinvoices,totalreceipts:totalreceipted,totalcategories:totalcategories,name:name,inv:inv,invoices:invoices,receipts:receipts,currency:currency,settlement:settlement,status:status}
                array.push(el)
              }
           }
           else{
             el={updated_at:updated_at,year:year,totalinvoices:totalinvoices,totalreceipts:totalreceipted,totalcategories:totalcategories,name:name,inv:inv,invoices:invoices,receipts:receipts,currency:currency,settlement:settlement,status:status}
              array.push(el)
           }
      
         
        }
    return array
    },regyear(){
        let regyear =[]
         for (let index = 2019; index <= moment().year(); index++){
            regyear.push(index)            
         }

         return regyear
    },totals(){
       const records =  this.$store.state.supplierrevenue.report  
           let array = []
           let totalcategories= 0;
           let totalinvoices = 0;
           let totalreceipts = 0;
       for (let index = 0; index < records.length; index++) {
            const invoices = records[index]["data"].filteredinvoices
            const receipts = records[index]["data"].filteredreceipts
            totalcategories = totalcategories + Number(invoices.length)
            receipts.forEach(receipt=>{
                totalreceipts = totalreceipts + Number(receipt.amount)
            })
            invoices.forEach(invoice=>{
                totalinvoices = totalinvoices + Number(invoice.cost)
            })

       }
       const el ={totalcategories,totalinvoices,totalreceipts}
       return el
    }
}
}
</script>

<style>

</style>