<template>
  <div>
      <v-btn rounded depressed color="primary" @click="viewList">View</v-btn>
      <v-dialog v-model="viewDialog" width="1200">
          <v-card>
              <v-card-title>
                  Registered suppliers
                  <v-spacer/>
                   <downloadexcel :data="computedsuppliers"><v-btn rounded depressed color="primary">Download</v-btn></downloadexcel>
                  
                  <v-btn icon @click="viewDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Emails</th>
                                <th>Phones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="computedsuppliers.length>0">
                            <tr v-for="(supplier,index) in computedsuppliers" :key="index">
                                <td>{{supplier.name}}</td>
                                <td>{{supplier.code}}</td>
                                <td>{{supplier.status}}</td>
                                <td>{{supplier.address}}</td>
                                <td>{{supplier.city}}</td>
                                <td>{{supplier.emails}}</td>
                                <td>{{supplier.phones}}</td>
                            </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="7" class="text-center red--text">No registered suppliers found</td>
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
import moment from 'moment'
import JsonExcel from "vue-json-excel";
export default {
  components: {downloadexcel:JsonExcel},
  props:['id'],
  data(){
      return{
          suppliers:[],
          viewDialog:false
      }
  },methods:{
      async viewList(){
          await this.$axios.get('api/registeredsuppliers/'+this.id).then(res=>{
              this.suppliers= res.data
              this.viewDialog = true
          })
      }
  },computed:{
      computedsuppliers(){
          let array =[]
          this.suppliers.forEach(supplier=>{
              const status = moment(supplier.expiry_date).isAfter(moment()) ? 'ACTIVE' :'EXPIRED'
              const address = supplier.account.contact ? supplier.account.contact.address :""
              const phones = supplier.account.contact ? supplier.account.contact.phones :""
              const emails = supplier.account.contact ? supplier.account.contact.emails : ""
              const city = supplier.account? supplier.account.city : ""

              const el ={name:supplier.account.name,city:city,code:supplier.category.code,status:status,address:address,phones:phones,emails:emails}
              array.push(el)
          })

          return array
      }
  }
}
</script>

<style>

</style>