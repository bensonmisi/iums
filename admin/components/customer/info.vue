<template>
   <v-col md="3">
       <v-card>
           <v-card-text class="text-center">
               <div><v-icon x-large color="green" class="icon-size">mdi-information-outline</v-icon></div>
               <div class="subtitle-1">Profile</div>
               <v-btn block depressed color="primary" @click="showInfo">Open</v-btn>

           </v-card-text>
       </v-card>
       <v-dialog v-model="infoDialog" width="800px">
       <v-card>
           <v-card-title dark class="white--text orange darken-4">
               Profile<v-spacer/>
               <contacts :contact="contact"/>
               <template v-if="account">
              <editinfo :info="account"/>
               </template>
           </v-card-title>
           <v-card-text>
                 <v-simple-table v-if="account" dense>
                        <template v-slot:default>                       
                        <tbody>
                            <tr><th>#ID</th><td>{{account.id}}</td></tr>
                             <tr><th>Reg number</th><td>{{account.regnumber}}</td></tr>
                              <tr><th>Name</th><td>{{account.name}}</td></tr>
                              <tr><th>Account Type</th><td>{{account.suppliertype ? account.suppliertype.name : "NOT SET" }}</td></tr>
                              <tr><th>Locality</th><td>{{account.locality}}</td></tr>
                              <tr><th>City</th><td>{{account.city}}</td></tr>
                              <tr><th>Country</th><td>{{account.country}}</td></tr>

                        </tbody>
                        </template>
                    </v-simple-table>
           </v-card-text>
       </v-card>
       </v-dialog>
   </v-col>
</template>

<script>
import contacts from './contacts.vue'
import editinfo from './editinfo.vue'
export default {
name:'accountinfo',
components:{contacts, editinfo},
props:['account','contact'],
data(){
    return{
    infoDialog:false
    }
},methods:{
    showInfo(){
        this.infoDialog=true
    }
}

}
</script>

<style scoped>

.icon-size{
    font-size: 60px !important;
}
 
</style>