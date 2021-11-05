<template>
  <div>
        <v-btn color="success" depressed x-small dark @click="fetch()">permissions</v-btn>
        <v-dialog v-model="showModel" width="400">
            <v-card>
                <v-card-title>
                   Permissions                   <v-spacer/>
                    <div class="d-flex">
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
                        <th class="text-left">
                           Assigned
                        </th>
                        <th class="text-left">
                           Action
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="perm in permissions"
                        :key="perm.id"
                        >
                        <td>{{ perm.name }}</td>
                        <td>
                            
                                   <v-icon   
                                    v-if="perm.assigned"
                                    color="green">mdi-check</v-icon>
                                   
                                  <v-icon   v-if="!perm.assigned"
                                    color="red">mdi-cancel</v-icon>
                                 
                          
                        </td>
                        <td>
                            <template  v-if="!perm.assigned">
                            <RolepermissionsAssign :role="role"  :submodule="submodule" :permission="perm"/>
                            </template>
                             <template  v-if="perm.assigned">
                            <RolepermissionsUnassign :role="role" :submodule="submodule" :permission="perm"/>
                            </template>
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
    props:['role','submodule'],
 data(){
     return{
         showModel:false,
     }
 },
 computed:{
     permissions(){
      return this.$store.state.roles.permissions
     }
 },
 methods:{
 async fetch(){
    this.$store.dispatch('roles/getAssignedPermissions',{id:this.submodule.id,roleId:this.role.id})  
    this.showModel = true
   
 }},
}
</script>

<style>

</style>