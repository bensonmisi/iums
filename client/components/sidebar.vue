<template>
<div>
 <v-list>
      <v-list-item-group
        color="primary"
      >
 <v-list-item
          router
          to="/dashboard"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>          
        </v-list-item> 
        <v-divider></v-divider>
        <v-list-item router to="/registration">
          <v-list-item-action>
            <v-icon>mdi-layers-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Registrations</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>
         <v-divider></v-divider>
        <v-list-item router to="/applications">
          <v-list-item-action>
            <v-icon>mdi-briefcase-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tender Applications</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>  
         <v-divider></v-divider>      
        <v-list-item router to="/invoices">
          <v-list-item-action>
            <v-icon>mdi-receipt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Invoices</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>  
         <v-divider></v-divider>
          <v-list-item router to="/invoices">
          <v-list-item-action>
            <v-icon>mdi-cash-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Payments</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>
         <v-divider></v-divider>
          <v-list-item router to="/invoices">
          <v-list-item-action>
            <v-icon>mdi-folder-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Documents</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>  
         <v-divider></v-divider>
         <v-list-item router to="/invoices">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>  
         <v-divider></v-divider>
         <v-list-item router to="/user/tenders">
          <v-list-item-action>
            <v-icon>mdi-view-list-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Browse Tenders</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>  
      </v-list-item-group>
 </v-list>
         

    
</div>
</template>
<script>
export default {
  data(){
      return{
          offset:true
      }
  }
}
</script>

