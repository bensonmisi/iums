<template>
  <div>
      <v-btn color="primary" @click="infoDialog=true">OPEN</v-btn>
         <v-dialog v-model="infoDialog" width="900">
       <v-card>
           <v-card-title dark class="white--text orange darken-4">
               Accounts
               <v-spacer/>
               <v-btn icon @click="infoDialog=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                 <v-text-field
                            label="Filter"
                            class="mt-1 mb-1"
                            outlined
                            v-model="filter"
                        />
                 <v-simple-table v-if="transactions" dense>
                        <template v-slot:default> 
                            <thead>
                             <tr>
                                 <th>Date</th>
                                 <th>Name</th>
                                 <th></th>
                             </tr>
                            </thead>                      
                        <tbody>    
                            <tr v-for="account in  transactions" :key="account.id">
                             <td>
                                 {{account.created_at | formateHumanDiff}}
                             </td>
                             <td>
                                 {{account.name}}
                             </td>
                             <td>
                                <v-btn x-small depressed rounded color="success">OPEN</v-btn>   
                             </td>
                            </tr>                     
                        </tbody>
                        </template>
                    </v-simple-table>
           </v-card-text>
       </v-card>
       </v-dialog>
  </div>
</template>

<script>
export default {
 name:'supplierlist',
 props:['accounts'],
 data(){
     return{
         infoDialog:false,
         filter:''
     }
 },computed:{
    transactions(){
     const data =  this.accounts
      
            if(this.filter !='')
            {
                return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.filter.toUpperCase())))
            }else{
                return data
            }

      
    }
}

}
</script>

<style>

</style>