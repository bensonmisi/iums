<template>
  <div>
        <v-btn color="success" icon dark @click="fetch()"><v-icon>mdi-account-lock</v-icon></v-btn>
        <v-dialog v-model="showModel" width="800">
            <v-card>
                <v-card-title>
                    <i>{{role.name}}</i> =>Assigned Modules
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
                        v-for="module in modules"
                        :key="module.id"
                        >
                        <td>{{ module.name }}</td>
                        <td>
                            
                                   <v-icon   
                                    v-if="module.assinged"
                                    color="green">mdi-check</v-icon>
                                   
                                  <v-icon   v-if="!module.assinged"
                                    color="red">mdi-cancel</v-icon>
                                 
                          
                        </td>
                        <td class="d-flex pa-2">
                            <template  v-if="!module.assinged">
                            <RolemodulesAssign :role="role" :module="module"/>
                            </template>
                             <template  v-if="module.assinged">
                            <RolemodulesUnassign :role="role" :module="module"/>
                            <RolesubmodulesView :role="role" :module="module"/>
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
    props:['role'],
 data(){
     return{
         showModel:false,
         switch1:[]
     }
 },
 computed:{
     modules(){
      return this.$store.state.roles.modules
     }
 },
 methods:{
 async fetch(){
    this.$store.dispatch('roles/getAssignedModules',this.role.id)  
    this.showModel = true
   
 }},
}
</script>

<style>

</style>