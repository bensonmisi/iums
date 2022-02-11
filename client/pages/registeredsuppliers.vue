<template>
<div>
      <v-row>
          <v-col>
              <v-card flat dark color="indigo" rounded="0">
                  <v-card-text class="d-flex">
                      <v-btn text to="/">Home</v-btn>
                       <v-btn text disabled>Registered Suppliers</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text>
                      <v-text-field outlined label="Search by Category Code  or Desciption" v-model="search"/>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>

      <v-row class="mt-2">
          <v-col>
              <v-card>
                  <v-card-text>
                      <v-simple-table>
                          <template v-slot:default>
                              <thead>
                                  <tr>
                                      <th>Category</th>
                                      <th>Registered Suppliers</th>
                                      <th></th>
                                 </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="category in categorylist" :key="category.id">
                                    <td>
                                        <div>{{category.code}}</div>
                                        <small>{{category.description}}</small>
                                    </td>
                                    <td>
                                        {{category.suppliers}}
                                    </td>
                                    <td>
                                        <SuppliersView :id="category.id"/>
                                    </td>
                                  </tr>
                              </tbody>
                          </template>
                      </v-simple-table>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    </v-container>
</div>

</template> 
<script>
export default {
  auth:false,
  async fetch(){
    await this.$axios.get('api/registeredsuppliers').then(res=>{
        this.categories = res.data
    })
  },
  data(){
      return{
          categories:[],
          search:""
      }
  },computed:{
      categorylist(){
          let data = this.categories
          if(this.search){
              return data.filter(dt=>(!dt.description.toUpperCase().indexOf(this.search.toUpperCase()) || !dt.code.toUpperCase().indexOf(this.search.toUpperCase())))
          }
          return data
      }
  }

}
</script>