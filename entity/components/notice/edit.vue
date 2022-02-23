<template>
  <div>
      <v-btn icon depressed color="primary" @click="add()"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="900">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Notice
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
               <v-row>
                   <v-col>
                  <v-text-field
                            label="Title"
                            outlined
                            v-model="form.title"
                            :rules="titleRule"
                        />
                   </v-col>
                   <v-col>
                  <v-text-field
                            label="Tender number"
                            outlined
                            v-model="form.tendernumber"
                            :rules="tendernumberRule"
                        />
                   </v-col>
               </v-row>
               <v-row>
                <v-col>
                     </v-col>
                <v-col>
                    <v-select v-model="form.noticetypeId" :rules="noticetypeRule" outlined label="Notice Type" :items="types" item-text="name" item-value="id" />
                </v-col>
               </v-row>               
               <v-row>
                      <v-col>
                       <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Closing Date"
                               prepend-inner-icon="mdi-calendar"
                                outlined
                                :rules="dateRule"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                   </v-col>
                   <v-col>
                       <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            :rules="timeRule"
            label="Closing time"
            prepend-inner-icon="mdi-clock-time-four-outline"
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu2.save(time)"
        ></v-time-picker>
      </v-menu>
                   </v-col>
               </v-row>
                <v-row>
                <v-col>
                    <v-select v-model="form.sectionId" :rules="sectionRule" outlined label="Notice Section" :items="sections" item-text="name" item-value="id" />
                </v-col> 
                 <v-col>
                    <v-select v-model="form.reach" :rules="reachRule" outlined label="Reach" :items="reachlist"/>
                </v-col>  
                </v-row>
                <v-row>
                <v-col>
                 <v-card>
                     <v-card-title>Required Categories<v-spacer/> <v-btn icon @click="categoryDialog=true"><v-icon>mdi-plus</v-icon></v-btn></v-card-title>
                     <v-card-text>
                     <v-row v-if="form.categories.length>0">
                         <v-col
                            v-for="(category, i) in form.categories"
                            :key="category.id"
                            class="shrink"
                            >
                            <v-chip
                                close
                                @click:close="form.categories.splice(i, 1)"
                            >
                               
                                {{ category}}
                            </v-chip>
                            </v-col>
                     </v-row>
                     <v-row v-else>
                         <v-col class="text-center red--text">
                              No Categories specified
                         </v-col>
                     </v-row>
                     </v-card-text>               
                 </v-card>
                </v-col>  
                <v-col>
                  <v-file-input
                    accept=".pdf"
                    label="Attach Tender Document"
                    outlined
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                </v-col>            
               </v-row>

               <v-card class="mt-3">
                           <v-toolbar
      color="indigo"
      dark
    >

      <v-toolbar-title>Required Product/Service</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="productDialog=true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
         <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Product/Service</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
       <template v-if="form.products.length>0">
         <tr v-for="(prod,index) in form.products" :key="index">
             <td>
                 {{prod.name}}
             </td>
             <td>{{prod.quantity}}</td>
             <td>
                 <v-btn icon @click="form.products.splice(i, 1)"><v-icon>mdi-close</v-icon></v-btn>
             </td>
         </tr>
       </template>
       <template v-else>
           <tr>
               <td colspan="3" class="text-center red--text">No Product/Service added as yet</td>
           </tr>
       </template>
                        </tbody>
                    </template>
         </v-simple-table>
    </v-card-text>
               </v-card>
              

                      
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>

      <v-dialog v-model="productDialog" width="300">
          <v-form  ref="addProduct" lazy-validation>
          <v-card>
              <v-card-title>
                  Add Product/Service
                  <v-spacer/>
                  <v-btn icon @click="productDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-text-field outlined label="Name" v-model="name" :rules="nameRule"/>
                  <v-text-field outlined label="Quantity" v-model="quantity" :rules="quantityRule"/>
              </v-card-text>
              <v-card-actions>
                  <v-btn color="error" rounded depressed @click="productDialog=false">Cancel</v-btn>
                  <v-spacer/>
                    <v-btn color="success" rounded depressed @click="addProduct()">Submit</v-btn>
              </v-card-actions>
          </v-card>
          </v-form>
      </v-dialog>

       <v-dialog v-model="categoryDialog" width="300">
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
                         <v-btn x-small rounded depressed color="primary" @click="addCategory(per.code)">add</v-btn>
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
    props:['notice'],
 data(){
     return{
         addPermModel:false,
         categoryDialog:false,
         valid:false,
         date:this.notice.closingDate,
         menu:false,
        time: this.notice.closingTime,
         menu2: false,
         productDialog:false,
         name:'',
         quantity:'',
         file:null,
         form:{
              title:this.notice.title,
              tendernumber:this.notice.tendernumber,
              procuremententityId:this.notice.procuremententityId,
              noticetypeId:this.notice.noticetypeId,
              closingDate:'',
              closingTime:'',
              sectionId:this.notice.sectionId,
              categories:[],
              products:[],
              reach:this.notice.reach
         },
         titleRule:[v=>!!v || 'Title is required'],
         fileRule:[v=>!!v || 'Tender document is required'],
         tendernumberRule:[v=>!!v || 'Tender number is required'],
         entityRule:[v=>!!v || 'Procurement entity is required'],
         noticetypeRule:[v=>!!v || 'Notice Type is required'],
         dateRule:[v=>!!v || 'Date is required'],
         timeRule:[v=>!!v || 'Time is required'],
         sectionRule:[v=>!!v || 'Section is required'],
         nameRule:[v=>!!v || 'Product / Service name required'],
         quantityRule:[v=>!!v || 'Quantity is required'],
         reachRule:[v=>!!v || 'Reach is required'],
         search:"",
         loading:false,
         reachlist:['LOCAL','INTERNATIONAL']
     }
 },methods:{

    addProduct(){
        if(this.$refs.addProduct.validate())
       {
           if(!this.form.products.includes(this.name)){
               this.form.products.push({name:this.name,quantity:this.quantity})
           }
       }
    },
    addCategory(code){
      this.form.categories.push(code)
    },
    checkproduct(name){
        let check = true

         this.form.products.forEach(element => {
             if(element.name==name){
                 check = false
             }
         });

         return check
    },
     async add(){

         
         await this.$store.dispatch('settings/getNoticeSettings')
         this.notice.noticeproduct.forEach(product => {
              this.form.products.push({name:product.description,quantity:product.quantity})
         });

         this.notice.noticecategory.forEach(category=>{
             this.form.categories.push(category.category.code)
         })
         this.addPermModel = true
     },
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          this.form.closingDate =this.date
          this.form.closingTime=this.time
          let formdata = new FormData()
          formdata.append('closingDate',this.date)
          formdata.append('closingTime',this.time)
          formdata.append('file',this.file)
          formdata.append('title',this.form.title)
          formdata.append('tendernumber',this.form.tendernumber)
          formdata.append('procuremententityId',this.form.procuremententityId)
          formdata.append('noticetypeId',this.form.noticetypeId)
          formdata.append('sectionId',this.form.sectionId)
          formdata.append('categories',JSON.stringify(this.form.categories))
          formdata.append('products',JSON.stringify(this.form.products))
          formdata.append('reach',this.form.reach)
          const payload = {id:this.notice.uuid,data:formdata}
          await this.$store.dispatch('notice/updateData',payload)
          this.loading=false
          this.addPermModel=false
          this.$refs.form.reset()
       }
     }
 },computed:{
    types(){
         return this.$store.state.settings.settings.noticetypes
     },
     sections(){
         return this.$store.state.settings.settings.sections
     },
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