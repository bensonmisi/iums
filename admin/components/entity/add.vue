<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="600">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add Entity
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
               <v-row>
                   <v-col>
                  <v-text-field
                            label="Name"
                            outlined
                            v-model="form.name"
                            :rules="nameRule"
                        />
                   </v-col>
                   <v-col>
                    <v-text-field
                            label="Abbriviation"
                            outlined
                            v-model="form.slug"
                            :rules="slugRule"
                        />
                   </v-col>
               </v-row>
               <v-row>
                   <v-col>
                      <v-text-field
                            label="City"
                            outlined
                            v-model="form.city"
                            :rules="cityRule"
                        />
                   </v-col>
                   <v-col>
                       
                                       <v-select
                                           :items="provincelist"
                                           label="Province"
                                           outlined
                                           v-model="form.province"
                                           :rules="provinceRule"
                                       />
                   </v-col>
               </v-row>
               <v-row>
                   <v-col>                                 
                                   
                        
                                       <v-select
                                           :items="computeList"
                                           label="District"
                                           outlined
                                           v-model="form.district"
                                           :rules="districtRule"
                                       />
                   </v-col>
                   <v-col>
                                      
                                         <v-select
                                           :items="sectorlist"
                                           label="Sector"
                                           outlined
                                           v-model="form.sector"
                                           :rules="sectorRule"
                                       />
                   </v-col>
               </v-row>
                                   
                      
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
    props:['id'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              name:'',
              slug:'',
              city:'',
              province:'',
              district:'',
              sector:''
         },
         nameRule:[v=>!!v || 'Name is required'],
         slugRule:[v=>!!v || 'Abbriviation is required'],
         provinceRule:[v=>!!v || 'Province is required'],
         districtRule:[v=>!!v || 'District is required'],
         cityRule:[v=>!!v || 'City is required'],
         sectorRule:[v=>!!v || 'Sector is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         sectorlist:['Government','Councils','Parastatals','Mining','Health','NGO','Other'],
         provincelist:['Matabeleland South','Mashonaland Central','Mashonaland West','Mashonaland North','Mashonaland East','Masvingo','Midlands','Manicaland','Bulawayo','Harare'],
   
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
         await this.$store.dispatch('procuremententity/addEntity',this.form)
         this.$refs.form.reset()
         this.addPermModel=false
         this.loading = false
       }
     }
 },computed:{
      computeList(){
            var list = [];
            if(this.form.province =='Matabeleland South')
            {
                list=['Beitbridge','Bulilima','Gwanda','Insiza','Mangwe','Matobo','Umzingwane']
            }
            else if(this.form.province =='Bulawayo'){
                list =['Bulawayo']
            }
            else if(this.form.province=='Mashonaland Central'){
                list=["Bindura","Guruve","Mazowe","Mbire","Mount Darwin","Muzarabani"]
            }
            else if(this.form.province=='Mashonaland West'){
                list=["Chegutu","Chinhoyi","Hurungwe","Kariba","Makonde","Mhondoro-Ngezi","Sanyati","Zvimba"]
            }
            else if(this.form.province=='Mashonaland East'){
                list=["Chikomba","Goromonzi","Marondera","Mudzi","Murehwa","Mutoko","Seke","Uzumba-Maramba-Pfungwe"]
            }
            else if(this.form.province=='Masvingo'){
                list=["Bikita","Chiredzi","Chivi","Gutu","Masvingo","Mwenezi","Zaka"]
            }
            else if(this.form.province=='Midlands'){
                list=["Chirumhanzu","Gokwe North","Gokwe South","Gweru","Kwekwe","Mberengwa","Shurugwi","Zvishavane"]
            }
            else if(this.form.province=='Manicaland'){
                list=[ "Buhera","Chimanimani","Chipinge","Makoni","Mutare","Mutasa","Nyanga"]
            }
            else if(this.form.province=='Harare'){
                list=['Harare']
            }

            return list;
        }

 }
}
</script>

<style>

</style>