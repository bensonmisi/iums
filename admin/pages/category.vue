<template>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Supplier Categories</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                  <v-card>
                <v-card-text>
                  
                   
                     <v-text-field
                            label="Filter"
                            outlined
                            v-model="filter"
                        />
                      
                </v-card-text>
                  </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                <v-card-title>
                   Categories
                    <v-spacer/>
                    <CategoryAdd/>
                </v-card-title>
                <v-card-text>
                 <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                            #ID
                        </th>
                         <th class="text-left">
                            Code
                        </th>  
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Status
                        </th>
                        <th class="text-right">
                           
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="categories.length>0">
                        <tr
                        v-for="per in categories"
                        :key="per.id"
                        >
                        <td>{{ per.id }}</td>
                        <td>{{ per.code }}</td>
                        <td>{{ per.name }}</td>
                          <td>{{ per.status }}</td>
                        <td class="d-flex justify-end pt-2 pb-2">
                            <CategoryEdit :category="per"/>
                            <CategoryDelete :category="per"/>
                        </td>
                        </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="5" class="pa-3 text-center red--text">No Categoris Found</td>
                            </tr>
                        </template>
                    </tbody>
                    </template>
                </v-simple-table>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        timeout="2000"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>
export default {
layout:'user',
data(){
    return{
        overlay:false,
        filter:""
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('category/getCategories') 
   this.overlay = false
},computed:{
    categories(){
        const data =  this.$store.state.category.categories
            if(this.filter !='')
            {
                return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.filter.toUpperCase()) || !dt.code.toUpperCase().indexOf(this.filter.toUpperCase())))
            }else{
                return data
            }

    }
}
}
</script>

<style>

</style>