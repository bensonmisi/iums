<template>
     <v-app-bar
      fixed
      flat
      app
      height="120"
      color="brown lighten-5"
     
      
    >
    
    <v-toolbar-title><v-img src="logo.png" width="180"/></v-toolbar-title>
    <v-spacer/>
    <v-btn class="mr-2" text to="/">Home</v-btn>
    <v-btn class="mr-2" text to="/tenders">Tenders</v-btn>
    <v-btn class="mr-2" text to="/awards">Awards</v-btn>
    <v-btn class="mr-2" text to="/registeredsuppliers">Registered Suppliers</v-btn>
    <v-btn class="mr-2" text to="/procuremententity">Procurement ENTITIES</v-btn>
    <v-btn class="primary mr-2" depressed to="register">Register</v-btn>
    <v-btn class="success" depressed to="login">Login</v-btn>
     
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>