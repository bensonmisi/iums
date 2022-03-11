<template>
  <div>
      <v-btn rounded depressed color="primary" @click="add"><v-icon>mdi-plus</v-icon>New Category</v-btn>
        <v-dialog v-model="categoryDialog" width="500">
          <v-form  ref="addProduct" lazy-validation>
          <v-card>
              <v-card-title>
                  Choose Category
                  <v-spacer/>
                  <v-btn icon @click="categoryDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-text-field outlined label="Filter" v-model="search"/>
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
                         <v-btn x-small rounded depressed color="primary" @click="addCategory(per.id)">add</v-btn>
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
             
          </v-card>
          </v-form>
      </v-dialog>
  </div>
</template>

<script>
export default {
props:['id'],
data(){
    return{
     categoryDialog:false,
     search:"",
     form:{
         noticeId:"",
         categoryId:""
     }   
    }
},methods:{
    async add(){
            await this.$store.dispatch('settings/getNoticeSettings')
            this.categoryDialog = true
    },
    async addCategory(id){
         this.form.categoryId = id
         this.form.noticeId = this.id
         await this.$store.dispatch('noticecategory/addData',this.form)
    }

},computed:{
    categories(){
            let data =  this.$store.state.settings.settings.categories
         if(this.search){
          return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.search.toUpperCase()) || !dt.code.toUpperCase().indexOf(this.search.toUpperCase())))
          }
         return data
    }
}
}
</script>

<style>

</style>