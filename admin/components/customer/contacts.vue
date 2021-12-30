<template>
    <div>
        <v-btn rounded small color="success" @click="openDialog" class="mr-1">Contacts</v-btn>
        <v-dialog max-width="600" v-model="showDialog">
       <v-card>
           <v-card-title  class="white--text success">
               Account Contacts
               <v-spacer/>
               <v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                 <v-simple-table v-if="contact" dense>
                        <template v-slot:default>                       
                        <tbody>
                            <tr><th>#ID</th><td>{{contact.id}}</td></tr>
                             <tr><th>Emails</th><td>{{contact.emails}}</td></tr>
                              <tr><th>Phone numbers</th><td>{{contact.phonenumbers}}</td></tr>
                              <tr><th>Address</th><td>{{contact.address}}</td></tr>

                        </tbody>
                        </template>
                    </v-simple-table>
                       <v-alert
                       v-else
                      type="error"
                      class="mt-5 mb-5"
                        >
                        No Contacts Information Found
                        </v-alert>
           </v-card-text>
       </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
props:['contact'],
data(){
    return{
       showDialog:false 
    }
},methods:{
    openDialog(){
        this.showDialog = true
    }
}
}
</script>

<style>

</style>