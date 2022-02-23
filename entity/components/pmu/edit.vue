<template>
  <div>
      <v-btn icon color="primary" small @click="showForm"><v-icon small>mdi-pencil</v-icon></v-btn>
      <v-dialog v-model="dialog" width="700">
          <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>
                  Update PMU
                  <v-spacer/>
                  <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
               <v-card-text>
                   <v-row>
                       <v-col>
                          <v-text-field v-model="form.name" :rules="nameRule" label="Name" outlined/>  
                       </v-col>
                       <v-col>
                           
                            <v-text-field v-model="form.surname" :rules="surnameRule" label="Surname" outlined/>                         
                       </v-col>
                   </v-row>
                    <v-row>
                       <v-col>
                              <v-select v-model="form.title" :items="titlelist" outlined label="Title" :rules="titleRule"/>
                                                    
                       </v-col>
                       <v-col>
                           <v-text-field v-model="form.jobtitle" :rules="jobtitleRule" label="Jobtitle" outlined/>                           
                       </v-col>
                   </v-row>
                    <v-row>
                       <v-col>
                           <v-text-field v-model="form.email" :rules="emailRule" label="Email" type="email" outlined/>                           
                       </v-col>
                       <v-col>
                           <v-text-field v-model="form.phonenumber" :rules="phoneRule" label="Phone" outlined/>                           
                       </v-col>
                   </v-row>
                 
                  <v-row>
                      <v-col>
                          <v-checkbox v-model="checkbox" label="Check if you want a system account created for user" />
                      </v-col>
                  </v-row>
           </v-card-text>
             <v-card-actions>
                    <v-btn rounded class="error" @click="uploadDialog=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
             </v-card-actions>
          </v-card>
          </v-form>
      </v-dialog>
  </div>
</template>

<script>
export default {
  props:['item'],
    data(){
        return{
            dialog:false,
            loading:false,
            valid:false,
            checkbox: this.item.hasaccount=='Y' ? true : false,
            form:{
                 name:this.item.name,
                 surname:this.item.surname,
                 title:this.item.title,
                 jobtitle:this.item.jobtitle,
                 phonenumber:this.item.phonenumber,
                 email:this.item.email,
                 hasaccount:this.item.hasaccount
            },
            titlelist:['Mr','Mrs','Miss','Ms','Dr','Prof'],           
            nameRule:[v=>!!v || ' Name is required'],           
            surnameRule:[v=>!!v || ' Surname is required'],          
            titleRule:[v=>!!v || ' Title is required'],          
            jobtitleRule:[v=>!!v || 'Jobtitle is required'],            
            phoneRule:[v=>!!v || 'phonenumber is required'],           
            emailRule:[ v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                     ],

        }
    },methods:{
        showForm(){
            this.dialog = true            
        },
        async submit(){
                if(this.$refs.form.validate()){
          this.valid = true
         const hasaccount = this.checkbox ? 'Y' : 'N'
        this.form.hasaccount = hasaccount
         this.loading = true
         const payload ={id:this.item.id,data:this.form}
         await this.$store.dispatch('pmu/editData',payload)
         this.loading = false
         this.dialog = false
                }

        }
    }

}
</script>

<style>

</style>