<template>
  <div>
        <v-btn color="success" icon dark @click="fetch()"><v-icon>mdi-file-lock-outline</v-icon></v-btn>
        <v-dialog v-model="showModel" width="800">
            <v-card>
                <v-card-title>
                    <i>{{itm.name}}</i> =>Required Documents
                    <v-spacer/>
                    <div class="d-flex">
                        <DocumentsAdd :id="itm.id"/>
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
                           Locality
                        </th>
                        <th class="text-left">
                            Type
                        </th>
                        <th class="text-left">
                           Max Pages
                        </th>
                        <th class="text-left">
                            Max Size
                        </th>
                          <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="items.length>0">
                        <tr
                        v-for="item in items"
                        :key="item.id"
                        >
                        <td>{{ item.name }}</td>
                        <td>{{ item.locality}}</td>
                        <td>{{ item.filetype}}</td>
                        <td>{{ item.pages}}</td>
                         <td>{{ item.filesize}}</td>
                         <td class="d-flex pa-3">
                             <DocumentsEdit :doc="item"/>
                             <DocumentsDelete :doc="item"/>
                         </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="6" class="text-center red--text"> No Documents Found</td>
                            </tr>
                        </template>
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
      return this.$store.state.documents.docs
     }
 },
 methods:{
 async fetch(){
    this.$store.dispatch('documents/getDocuments',this.itm.id)  
    this.showModel = true
   
 }},
}
</script>

<style>

</style>