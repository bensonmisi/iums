<template>
   <v-list>
     <v-list-item
          router
          to="dashboard"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>          
        </v-list-item>
         <v-menu top :offset-x="offset" v-for="item in menus" :key="item.id">
           <template v-slot:activator="{ on, attrs }">
        <v-list-item
           v-bind="attrs"
          v-on="on"
         
        >
          <v-list-item-action>
            <v-icon v-text="item.icon"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"/>
          </v-list-item-content>          
        </v-list-item>
           </template>
            <v-list>
            <v-list-item
          v-for="sub in item.submodules"
          :key="sub.id"
          router
          :to="sub.url"
        >
        <v-list-item-action>
            <v-icon v-text="sub.icon"/>
          </v-list-item-action>
            <v-list-item-content>
          <v-list-item-title v-text="sub.name"/>
            </v-list-item-content>
        </v-list-item>
            </v-list>
         </v-menu>
      </v-list>
</template>

<script>
export default {

  data(){
      return{
          offset:true
      }
  },computed:{
  menus(){
    return this.$store.state.sidebar.menus
  }
  }
}
</script>

<style>

</style>