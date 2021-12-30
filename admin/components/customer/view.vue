<template>
  <div>
    <v-btn outlined depressed x-small rounded color="primary" @click="viewProfile">View</v-btn>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          
          <v-toolbar-title>
            <div>{{item.name}}</div>
            <div>{{item.regnumber}}</div>
            </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
           <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <accountbalances :balances="profile.balances"/>
      <v-row>
          <accountinfo :account="profile.account" :contact="profile.contact"/>
           <accountusers :users="profile.users" :account="profile.account"/>         
           <accountdocuments :documents="profile.documents"/>
           <accountcomments :comments="profile.comments"/>
           <accountsuspense :suspense="profile.suspense"/>
           <accountregistration :registrations="profile.registrations"/>
           <supplierinvoice :invoices="profile.supplierinvoices"/>
           <tenderinvoice :invoices="profile.tenderinvoices"/>
           <tenderapplications :applications="profile.tenderappplications"/>
           <onlinepayments :payments="profile.onlinepayments"/>
           <bankpayments :payments="profile.transactions"/>
           <accountcontracts/>
      </v-row>
       
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
 </div>  
</template>

<script>
import accountinfo from './info.vue'
import accountusers from './users.vue'
import accountdocuments from './documents.vue'
import accountcomments from './comments.vue'
import accountsuspense from './suspense.vue'
import accountbalances from './balances.vue'
import accountregistration from './registrations.vue'
import supplierinvoice from './invoice/supplier.vue'
import tenderinvoice from './invoice/tender.vue'
import tenderapplications from './applications.vue'
import onlinepayments from './onlinepayments.vue'
import bankpayments from './bankpayments.vue'
import accountcontracts from './awards.vue'

export default {
  components:{accountinfo,accountusers,bankpayments,accountdocuments,accountcomments,accountsuspense,accountbalances,accountregistration,supplierinvoice,tenderinvoice,onlinepayments,accountcontracts,tenderapplications},
props:['item'],
data(){
    return{
        dialog:false,
        overlay:false
    }
},methods:{
    async viewProfile(){
        this.dialog = true
        this.overlay = true
         await  this.$store.dispatch('accounts/getProfile',this.item.id)
         this.overlay = false
    }
},computed:{
    profile(){
       return this.$store.state.accounts.profile
    }
}
}
</script>

<style>

</style>