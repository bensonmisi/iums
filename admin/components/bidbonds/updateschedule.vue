<template>
  <div>
      <v-btn x-small depressed rounded @click="openDialog">refund info</v-btn>
      <v-dialog width="500" v-model="refundDialog">
          <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>Add Refund Details<v-spacer/> <v-btn icon @click="refundDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text>
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
                                label="Refund Date"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                outlined
                                v-bind="attrs"
                                :rules="transferdateRule"
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
                           <v-text-field
                            label="reference number"
                            outlined
                            v-model="referencenumber"
                            :rules="referencenumberRule"
                        />
              </v-card-text>
                <v-card-actions>
               <v-btn rounded class="error" @click="refundDialog=false">Cancel</v-btn>
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
 props:['record'],
 data(){
     return{
         loading:false,
         valid:false,
         referencenumber:'',
         menu:false,
         date:null,
         status:'REFUNDED',
         refundDialog:false,
         referencenumberRule:[v=>!!v || 'Reference number required'],
         transferdateRule:[v=>!!v || 'Transfer Date is required']


     }
 },methods:{
     openDialog(){
         this.refundDialog = true
     },
     async submit(){
            if(this.$refs.form.validate())
            {
                this.valid = true
                this.loading=true
                var payload ={id:this.record.id,applicationId:this.record.applicationId,referencenumber:this.referencenumber,refunded_on:this.date,status:'REFUNDED'}
                 await this.$store.dispatch('bidbondrefunds/updateRefund',payload)
                  this.loading=false
            }
     }
 }
}
</script>

<style>

</style>