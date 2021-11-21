<template>
  <div>
      <v-btn fab depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="500">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Add transaction
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                <v-row>
                      <v-col>
                        <v-select
                            label="Bank"
                            outlined
                            v-model="form.bankId"
                            :rules="bankRule"
                            :items="banks"
                            item-text="name"
                            item-value="id"
                        />
                   </v-col>
                   <v-col>
                  <v-text-field
                            label="Description"
                            outlined
                            v-model="form.description"
                            :rules="descriptionRule"
                        />
                   </v-col>
               </v-row>
               <v-row>

                      <v-col>
                  <v-text-field
                            label="Source Reference"
                            outlined
                            v-model="form.source_reference"
                            :rules="sourcereferenceRule"
                        />
                   </v-col>
                   <v-col>
                  <v-text-field
                            label="Reference"
                            outlined
                            v-model="form.referencenumber"
                            :rules="referenceRule"
                        />
                   </v-col>
                  </v-row>
                  <v-row>
                      <v-col>
                  <v-text-field
                            label="Statement Reference"
                            outlined
                            v-model="form.statement_reference"
                            :rules="statementreferenceRule"
                        />
                   </v-col>
                   <v-col>
                    <v-select
                            label="Account Numbers"
                            outlined
                            v-model="form.accountnumber"
                            :rules="accountnumberRule"
                            :items="accountnumbers"
                            item-text="accountnumber"
                            item-value="accountnumber"
                            @change="getCurrency"
                        />
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
                                label="From date"
                               prepend-inner-icon="mdi-calendar"
                                outlined
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
                      <v-text-field
                            label="Amount"
                            outlined
                            v-model="form.amount"
                            :rules="amountRule"
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
     async fetch(){
          await this.$store.dispatch('accountnumbers/getAccountnumbers') 
          await this.$store.dispatch('banks/getBanks') 
    },
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              bankId:'',
              description:'',
              source_reference:'',
              statement_reference:'',
              referencenumber:'',
              accountnumber:'',
              currency:'',
              amount:'',
              transactionDate:null
         },
         bankRule:[v=>!!v || 'Select Source Bank'],
         descriptionRule:[v=>!!v || 'Description required'],
         sourcereferenceRule:[v=>!!v || 'Source reference required'],
         referenceRule:[v=>!!v || 'Reference number required'],
         statementreferenceRule:[v=>!!v || 'Statement reference required'],
         accountnumberRule:[v=>!!v || 'Account number required'],
         currencyRule:[v=>!!v || 'Currency required'],
         amountRule:[v=>!!v || 'Amount required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         date:null,
         menu:false
     }
 },methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 this.form.transactionDate = this.date
                 await this.$axios.post('api/admin/manualtransactions',this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('manualtransactions/getTransactions')
                        this.$refs.form.reset()
                        this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
     },getCurrency(){
        
         const data = this.$store.state.accountnumbers.accountnumbers
         data.forEach(element => {
              if(element.accountnumber === this.form.accountnumber){
                  this.form.currency = element.currency
              }
         });
     }
 },computed:{
    accountnumbers(){
        return this.$store.state.accountnumbers.accountnumbers
    }, 
    banks(){
        return this.$store.state.banks.banks
    }
    }
}
</script>

<style>

</style>