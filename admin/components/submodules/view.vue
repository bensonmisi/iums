<template>
  <div>
        <v-btn color="success" icon dark @click="fetch()"><v-icon>mdi-vector-link</v-icon></v-btn>
        <v-dialog v-model="showModel" width="800">
            <v-card>
                <v-card-title>
                    <i>{{itm.name}}</i> =>SubModules
                    <v-spacer/>
                    <div class="d-flex">
                        <SubmodulesAdd :id="itm.id"/>
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
                            Url
                        </th>
                        <th class="text-left">
                            Icon
                        </th>
                          <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in items"
                        :key="item.id"
                        >
                        <td>{{ item.name }}</td>
                        <td>{{ item.url }}</td>
                        <td><v-icon v-text="item.icon"/></td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <SubmodulesEdit :submodule="item"/>
                            <SubmodulesDelete :submodule="item"/>
                            <PermissionsView :sub="item"/>
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
    props:['itm'],
 data(){
     return{
         showModel:false,
     }
 },
 computed:{
     items(){
      return this.$store.state.submodules.submodules
     }
 },
 methods:{
 async fetch(){
    this.$store.dispatch('submodules/getSubmodules',this.itm.id)  
    this.showModel = true
   
 }},
}
</script>

<style>

</style>