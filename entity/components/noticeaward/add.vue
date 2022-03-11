<template>
  <div>
      <v-btn fab color="success" @click="add"><v-icon>mdi-plus</v-icon></v-btn>
      <v-dialog v-model="addawardDialog" width="700">
          <v-form ref="form" v-model="valid" lazy-validation>
          <v-card>
              <v-card-title>Add Award<v-spacer/><v-btn icon @click="addawardDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text>
                <v-row>
                    <v-col>
                        <v-text-field outlined label="Reg Number" v-model="form.regnumber" :rules="regnumberRule"/>
                    </v-col>
                    <v-col>
                        <v-text-field outlined label="Registration Certificate Code" v-model="form.certificatenumber" :rules="certificatenumberRule"/>
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col>
                        <v-text-field outlined label="Quantity" v-model="form.quantity" :rules="quantityRule"/>
                    </v-col>
                  
                        <v-col>
                            <v-select outlined label=" Currency" v-model="form.currencyId" :rules="currencyRule" :items="currency" item-text="name" item-value="id"/>
                        </v-col>
                   
                    <v-col>
                        <v-text-field prepend-inner-icon="mdi-currency-usd" outlined label="Value" v-model="form.value" :rules="valueRule"/>
                    </v-col>
                </v-row>
                <template v-if="fees && fees.length>0">
                    <v-card>
                        <v-card-text>
                            <v-alert  color="blue-grey"
      dark
      dense
      icon="mdi-information-outline"
      prominent>Please enter Certificate numbers for the tender fees below</v-alert>
                            <v-simple-table class="mt-2">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Certificate Code</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(fee,index) in fees" :key="fee.id">
                                        <td>
                                            {{fee.tenderfeetype.name}}
                                        </td>
                                        <td class="pt-2">
                                           {{filterCode(fee.id) ? filterCode(fee.id):""}}
                                        </td>
                                        <td>
                                            <template v-if="filterCode(fee.id)">
                                              <v-btn fab small color="error" @click="deleteFee(index)"><v-icon>mdi-trash-can</v-icon></v-btn>
                                            </template>
                                            <template v-else>
                                            <v-btn fab small color="primary" @click="addFee(fee)"><v-icon>mdi-plus</v-icon></v-btn>
                                            </template>
                                        </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </template>
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded depressed color="error" @click="addawardDialog=false">Cancel</v-btn>
                  <v-spacer/>
                  <v-btn rounded depressed color="success" @click="submit">Submit</v-btn>
              </v-card-actions>
          </v-card>
          </v-form>
      </v-dialog>
      <v-dialog v-model="codeDialog" width="300">
          <v-card>
              <v-card-title>
                  {{feetitle}}<v-spacer/><v-btn icon @click="codeDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-row>
                      <v-col>
                          <v-text-field outlined v-model="code" label="code"/>
                      </v-col>
                  </v-row>
              </v-card-text>
              <v-card-actions>
                  <v-btn block color="primary" @click="savefee">Add</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
 props:['item'],
 data(){
     return{
         addawardDialog:false,
         codeDialog:false,
         valid:false,
         code:'',
         feelist:[],
         feetitle:'',
         feeid:'',
         form:{
             regnumber:'',
             currencyId:'',
             certificatenumber:'',
             noticeproductId:'',
             quantity:'',
             value:'',
             feecodes:""

         },
         codeRule:[v=>!!v || 'Code is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         regnumberRule:[v=>!!v || 'Bidder PR number is required'],
         certificatenumberRule:[v=>!!v  || ' Bidder Certificate number is required'],
         quantityRule:[
             v=>!!v || 'Quantity awarded required',
             v=> (v && v <= this.item.quantity) || 'Quantity cannot be greater than '+this.item.quantity
            ],
         valueRule:[v=>!!v ||  'Award value required']

     }
 },methods:{

     async add(){
        await this.$store.dispatch('noticefee/getData',this.item.noticeId)
        await this.$store.dispatch('settings/getCurrency')
        this.addawardDialog=true
     },
     addFee(fee){
      this.feetitle = fee.tenderfeetype.name
      this.feeid = fee.id
      this.codeDialog= true
    
     },
     deleteFee(index){
       this.feelist.splice(index, 1);
     },
     savefee(){
      this.feelist.push({noticefeeId:this.feeid,code:this.code})
      this.code = ""
      this.codeDialog = false
     },
     filterCode(id){
         let code =""
     if(this.feelist.length>0){

        this.feelist.forEach(fee=>{
             if(fee.noticefeeId==id)
             {
             code = fee.code
             }
         })

     }
    return code
     },
   async submit(){
    if(this.$refs.form.validate()){

      if(this.fees.length!==this.feelist.length){
          this.$swal("error","Please enter certificate codes for the specified notice fees","error")
          return 
      }
     this.form.feecodes = JSON.stringify(this.feelist)
    this.form.noticeproductId = this.item.id
   await this.$store.dispatch('noticeaward/addData',this.form)
    }
   }
 },
 computed:{
     fees(){
         return this.$store.state.noticefee.data
     },
     currency(){
         return this.$store.state.settings.currency
     }
 }
}
</script>

<style>

</style>