<template>
  <div>
       <v-btn icon depressed color="info" @click="addPermModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
   
  
      <v-dialog v-model="addPermModel" width="400">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Bank Account Number
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="Account number"
                            outlined
                            v-model="form.accountnumber"
                            :rules="accountnumberRule"
                        />
                      <v-select
                            label="Account Type"
                            outlined
                            :items="typelist"
                            v-model="form.type"
                            :rules="accounttypeRule"
                        />
                          <v-select
                            label="Currency"
                            outlined
                            v-model="form.currency"
                            :rules="currencyRule"
                               :items="currencylist"
                            item-text="name"
                            item-value="name"
                        />

                           <v-select
                            label="Status"
                            outlined
                            :items="statuslist"
                            v-model="form.status"
                        />
                      
                          
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
    props:['accountnumber'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              accountnumber:this.accountnumber.accountnumber,
              currency:this.accountnumber.currency,
              type:this.accountnumber.type,
              status:this.accountnumber.status
         },
         accountnumberRule:[v=>!!v || 'Account number is required'],
         accounttypeRule:[v=>!!v || 'Account Type is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         typelist:['NONREFUNDABLE','REFUNDABLE'],
         statuslist:['ACTIVE','DELETED']

     }
 },computed:{
    currencylist(){
        return this.$store.state.currency.currency
    }
},methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.patch('api/admin/accountnumbers/'+this.accountnumber.id,this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('accountnumbers/getAccountnumbers')
                      
                        this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
     }
 }
}
</script>

<style>

</style>