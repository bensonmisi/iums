<template>
  <div>
      <v-btn icon depressed color="primary" @click="add()"><v-icon>mdi-pencil</v-icon></v-btn>
   
      <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Fee
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-select
                            label="Fee Type"
                            outlined
                            v-model="form.tenderfeetypeId"
                            :rules="typeRule"
                            :items="types"
                            item-text="name"
                            item-value="id"
                        />

                       <v-select
                            label="Currency"
                            outlined
                            v-model="form.currencyId"
                            :rules="currencyRule"
                            :items="currencylist"
                            item-text="name"
                            item-value="id"
                        />

                            <v-select
                            v-if="form.tenderfeetypeId=='2'"
                            label="Bid Validity Period"
                            outlined
                            v-model="form.bidbondperiodId"
                            :rules="periodRule"
                            :items="periodlist"
                            item-text="days"
                            item-value="id"
                        />
                           <v-text-field
                            label="Amount"
                            outlined
                            v-model="form.amount"
                            :rules="amountRule"
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
  </div>
</template>

<script>
export default {
    name:'noticefeeUpdate',
    props:['fee'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{         
            tenderfeetypeId:this.fee.tenderfeetypeId,
            currencyId:this.fee.currencyId,
            amount:this.fee.amount,
            bidbondperiodId:this.fee.bidbondperiodId
         },
         typeRule:[v=>!!v || 'Tender fee type is required'],
         amountRule:[v=>!!v || 'Amount type is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         periodRule:[v=>!!v || 'Bid Validity Period is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false
     }
 },methods:{
     async add(){
      await this.$store.dispatch('currency/getCurrency')
      await this.$store.dispatch('bidbondperiods/getPeriods')
      await this.$store.dispatch('tenderfeetype/getTenderfeetypes')
      this.addPermModel = true
     },
     async submit(){
     if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading = true
          const payload = {fee:this.fee,data:this.form}
          await this.$store.dispatch('noticefee/updateData',payload)
          this.loading = false
          this.addPermModel = false
          this.$refs.form.reset()

       }
     }
 },
 computed:{
     types(){
         return this.$store.state.tenderfeetype.types
     },
     currencylist(){
         return this.$store.state.currency.currency
     },
     periodlist(){
         return this.$store.state.bidbondperiods.periods
     }
 }
}
</script>

<style>

</style>