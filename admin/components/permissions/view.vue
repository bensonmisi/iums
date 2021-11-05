<template>
  <div>
        <v-btn color="success" icon dark @click="fetch()"><v-icon>mdi-shield-lock</v-icon></v-btn>
        <v-dialog v-model="showModel" width="600">
            <v-card>
                <v-card-title>
                    <i>{{sub.name}}</i> =>Permissions
                    <v-spacer/>
                    <div class="d-flex">
                        <PermissionsAdd :id="sub.id"/>
                        <v-btn icon depressed color="error" @click="showModel=false"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="per in perms"
                        :key="per.id"
                        >
                        <td>{{ per.name }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <PermissionsEdit :permission="per"/>
                            <PermissionsDelete :permission="per"/>
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
    props:['sub'],
 data(){
     return{
         showModel:false,
     }
 },
 computed:{
     perms(){
      return this.$store.state.permission.permissions
     }
 },
 methods:{
 async fetch(){
    this.$store.dispatch('permission/getPermissions',this.sub.id)  
    this.showModel = true
   
 }},
}
</script>

<style>

</style>