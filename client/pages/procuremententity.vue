<template>
<div>
      <v-row>
          <v-col>
              <v-card flat dark color="indigo" rounded="0">
                  <v-card-text class="d-flex">
                      <v-btn text to="/">Home</v-btn>
                       <v-btn text disabled>Procurement Entities</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    <v-container>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text>
                      <v-row>
                          <v-col>
                            <v-text-field outlined label="Search by name" v-model="search"/>
                          </v-col>
                          <v-col>
                               <v-select
                                           :items="provincelist"
                                           label="Province"
                                           outlined
                                           v-model="province"
                                       >
                                       </v-select>
                          </v-col>
                          <v-col>
                                <v-select
                                           :items="districtlist"
                                           label="District"
                                           outlined
                                           v-model="district"
                                       >
                                       </v-select>
                          </v-col>
                      </v-row>
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
                                      <th>Name</th>
                                      <th>City/Town</th>
                                      <th>Province</th>
                                      <th>District</th>
                                      <th></th>
                                 </tr>
                              </thead>
                              <tbody>
                                  <template v-if="entitylist.length>0">
                                  <tr v-for="entity in entitylist" :key="entity.id">
                                    <td>
                                     {{entity.name}}                                      
                                    </td>
                                    <td>
                                        {{entity.city}}
                                    </td>
                                    <td>
                                        {{entity.province}}
                                    </td>
                                    <td>
                                        {{entity.district}}
                                    </td>
                                    <td>
                                       <PlanView :id="entity.id"/>
                                    </td>
                                  </tr>
                                  </template>
                                  <template v-else>
                                      <tr>
                                          <td colspan="5" class="text-center red--text">No Procurement Entities Found</td>
                                      </tr>
                                  </template>
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
  data(){
      return{
          entities:[],
          search:"",
          province:"",
          district:""
      }
  },
   async created(){
    await this.$axios.get('api/welcome/procuremententities').then(res=>{
        this.entities = res.data
    })
  },computed:{
      entitylist(){
          let data = this.entities
          if(this.search || this.province || this.district){
              return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.search.toUpperCase()) ))
          }
          return data
      },
       provincelist()
       {
           return ['Matabeleland South','Mashonaland Central','Mashonaland West','Mashonaland North','Mashonaland East','Masvingo','Midlands','Manicaland','Bulawayo','Harare']
       },     
     districtlist()
     {
            var list = [];
            if(this.province =='Matabeleland South')
            {
                list=['Beitbridge','Bulilima','Gwanda','Insiza','Mangwe','Matobo','Umzingwane']
            }
            else if(this.province =='Bulawayo'){
                list =['Bulawayo']
            }
            else if(this.province=='Mashonaland Central'){
                list=["Bindura","Guruve","Mazowe","Mbire","Mount Darwin","Muzarabani"]
            }
            else if(this.province=='Mashonaland West'){
                list=["Chegutu","Chinhoyi","Hurungwe","Kariba","Makonde","Mhondoro-Ngezi","Sanyati","Zvimba"]
            }
            else if(this.province=='Mashonaland East'){
                list=["Chikomba","Goromonzi","Marondera","Mudzi","Murehwa","Mutoko","Seke","Uzumba-Maramba-Pfungwe"]
            }
            else if(this.province=='Masvingo'){
                list=["Bikita","Chiredzi","Chivi","Gutu","Masvingo","Mwenezi","Zaka"]
            }
            else if(this.province=='Midlands'){
                list=["Chirumhanzu","Gokwe North","Gokwe South","Gweru","Kwekwe","Mberengwa","Shurugwi","Zvishavane"]
            }
            else if(this.province=='Manicaland'){
                list=[ "Buhera","Chimanimani","Chipinge","Makoni","Mutare","Mutasa","Nyanga"]
            }
            else if(this.province=='Harare'){
                list=['Harare']
            }

            return list;
        }
  }

}
</script>