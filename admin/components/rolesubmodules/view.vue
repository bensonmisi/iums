<template>
  <div>
        <v-btn color="success" depressed x-small dark @click="fetch()">submodules</v-btn>
        <v-dialog v-model="showModel" width="600">
            <v-card>
                <v-card-title>
                    <i>{{role.name}}</i> =><i>{{module.name}}</i>=>SubModules
                    <v-spacer/>
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
                        v-for="sub in submodules"
                        :key="sub.id"
                        >
                        <td>{{ sub.name }}</td>
                        <td>
                            
                                   <v-icon   
                                    v-if="sub.assigned"
                                    color="green">mdi-check</v-icon>
                                   
                                  <v-icon   v-if="!sub.assigned"
                                    color="red">mdi-cancel</v-icon>
                                 
                          
                        </td>
                        <td class="d-flex pa-2">
                            <template  v-if="!sub.assigned">
                            <RolesubmodulesAssign :role="role" :module="module" :submodule="sub"/>
                            </template>
                             <template  v-if="sub.assigned">
                            <RolesubmodulesUnassign :role="role" :module="module" :submodule="sub"/>
                             <RolepermissionsView :role="role" :submodule="sub"/>
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
    props:['role','module'],
 data(){
     return{
         showModel:false,
     }
 },
 computed:{
     submodules(){
      return this.$store.state.roles.submodules
     }
 },
 methods:{
 async fetch(){
    this.$store.dispatch('roles/getAssignedSubmodules',{id:this.module.id,roleId:this.role.id})  
    this.showModel = true
   
 }},
}
</script>

<style>

</style>