<template>
  <div>
      <v-btn  depressed color="success" @click="addPermModel=true">Search</v-btn>
   
      <v-dialog v-model="addPermModel" width="500">
              <v-form ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Search transactions
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
               <v-row>
                   <v-col>
                  <v-text-field
                            label="Description"
                            outlined
                            v-model="form.description"
                        />
                   </v-col>
                   <v-col>
                           <v-select
                            label="Account Numbers"
                            outlined
                            v-model="form.accountnumber"
                            :items="accountnumbers"
                            item-text="accountnumber"
                            item-value="accountnumber"
                        />
                   </v-col>
               </v-row>
               <v-row>
                   <v-col>
                        <v-text-field
                            label="Source reference"
                            outlined
                            v-model="form.sourcereference"
                        />
                   </v-col>
                   <v-col>
                         <v-text-field
                            label="Statement reference"
                            outlined
                            v-model="form.statementreference"
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
                         <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="date2"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date2"
                                label="To date"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date2"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu2 = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu2.save(date2)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                   </v-col>
               </v-row>
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
                <v-btn rounded class="primary" @click="resetform">Reset</v-btn>
               <v-btn rounded class="success" @click="search" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
     
              </v-form>
      </v-dialog>
  </div>
</template>

<script>
export default {
    props:['transaction'],
    data(){
        return{
           addPermModel:false,
           form:{
            description:'',
            accountnumber:'',
            sourcereference:'',
            statementreference:'',
            fromdate:null,
            todate:null
           },
           menu:false,
           date:null,
           menu2:false,
           date2:null,
           loading:false


        }
    },
   async fetch(){
          await this.$store.dispatch('accountnumbers/getAccountnumbers') 
    },computed:{
    accountnumbers(){
        return this.$store.state.accountnumbers.accountnumbers
    }
},methods:{
        async search(){
            this.loading = true
            this.form.fromdate = this.date
            this.form.todate = this.date2
           await this.$store.dispatch('banktransactions/Search',this.form)   
           this.loading = false
        },
        resetform(){
             this.$refs.form.reset()
        }
    }

}
</script>

<style>

</style>