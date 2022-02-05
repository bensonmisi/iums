<template>
  <div>
         <v-btn x-small v-if="reg.printed==0" rounded depressed color="primary" @click="getGategories()">Change</v-btn>
           <v-dialog v-model="changeDialog" width="900">
        <v-card>
          <v-card-title>
            Select Category
            <v-spacer/>
            <v-btn icon @click="changeDialog=false"><v-icon>mdi-close</v-icon></v-btn>
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
                       <v-btn rounded small color="success" @click="change(per)">select</v-btn>
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
export default {
name:'changeCategory',
props:['reg'],
data(){
  return{
      changeDialog:false,
      filter:""
  }
},
methods:{
   async getGategories(){
        await this.$store.dispatch('invoicing/getSettings')
        this.changeDialog=true
    },
    async change(cat){
        this.$swal({
                            title: 'Registration Change',
                            text: "You are about to change your registration from  "+this.reg.category.name+"  to :"+cat.name,
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {
        var formdata={id:this.reg.id,categoryId:cat.id}
       await this.$axios.post('/api/bidder/registrations',formdata).then(async(response)=>{
           this.$swal(response.data.status,response.data.message,response.data.status)
            await this.$store.dispatch('dashboard/getDashboard')
            this.changeDialog = false
       }).catch(error=>{
           this.$swal("error",error.response.data.message,"error")
       })
                            }
                            })
    }
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