<template>
  <div>
       <v-btn rounded outlined depressed @click="searchModel=true">Search</v-btn>
       <v-dialog width="700" v-model="searchModel">
        <v-card>
         <v-card-title>Customer Search<v-spacer/><v-btn icon @click="searchModel=false"><v-icon>mdi-icon</v-icon></v-btn></v-card-title>
        <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
               <v-col md="10">
                 <v-text-field
                            label="Search Value"
                            dense
                            outlined
                            v-model="form.query"
                            :rules="queryRule"
                           />
                </v-col>
                 <v-col md="2">
                 <v-btn depressed rounded outlined :loading="loading" :disabled="loading" @click="search">Search</v-btn>
                 </v-col>

            </v-row>
            </v-form>
           
            <v-row>
                <v-col>
                    <div v-if="results.length>0">
                         <p class="subtitle-1">Search results: {{results.length}}</p>
                      <v-simple-table dense>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">
                                    ID
                                </th>
                                <th class="text-left">
                                    Reg number
                                </th>
                                <th class="text-left">
                                    Name
                                </th>
                                <th class="text-right">

                                </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="item in results"
                                :key="item.id"
                                >
                                <td>{{ item.id }}</td>
                                <td>{{ item.regnumber }}</td>
                                <td>{{ item.name }}</td>
                                <td>
                                    <CustomerView :item="item"/>
                                </td>
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
        </v-card>    
       </v-dialog>
  </div>
</template>

<script>
export default {
name:'customersearch',
data(){
    return{
        searchModel:false,  
        queryRule:[v=>!!v || 'Please enter search value'] ,     
        form:{
        query:'',
        },
         valid:true,
         loading:false
     }
},methods:{
    async search(){
           if(this.$refs.form.validate())
          {
          this.valid = true
          this.loading=true
            await  this.$store.dispatch('accounts/search',this.form)
            this.loading=false

          }
    }
},computed:{
    results(){
        
        return  this.$store.state.accounts.accounts
    }
 }

}
</script>

<style>

</style>