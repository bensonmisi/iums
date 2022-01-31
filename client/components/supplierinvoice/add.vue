<template>
  <div>
      <v-btn rounded depressed color="primary" @click="retrieve()">Add Category</v-btn>
      <v-dialog v-model="addDialog" width="900">
        <v-card>
          <v-card-title>
            Select Category
            <v-spacer/>
            <v-btn icon @click="addDialog=false"><v-icon>mdi-close</v-icon></v-btn>
            <v-card-text>
           
                     <v-text-field
                            label="Search of category"
                            outlined
                            v-model="filter"
                        />

                             <v-simple-table>
                    <template v-slot:default>                   
                    <tbody>
                        <template v-if="categories.length>0">
                        <tr
                        v-for="per in categories"
                        :key="per.id"
                        >
                        <td>
                         <div> {{ per.code }}</div>
                         <small>{{ per.name }}</small>
                          
                          </td>
                        <td class="text-right">
                         <addCategory :category="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="2" class="pa-3 text-center red--text">No Categoris Found</td>
                            </tr>
                        </template>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import addCategory from './select.vue'
export default {
  components: { addCategory },
name:'addItem',
data(){
  return{
    addDialog:false,
    filter:''
  }
},
methods:{
async retrieve(){
  await this.$store.dispatch('invoicing/getSettings')
  this.addDialog=true
},
},
computed:{
  categories(){
    let data =[]
    data = this.$store.state.invoicing.setting.categories

     if(this.filter !='')
      {
                return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.filter.toUpperCase()) || !dt.code.toUpperCase().indexOf(this.filter.toUpperCase())))
     }
                return data
          
  }
}


}
</script>

<style>

</style>