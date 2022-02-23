<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text disabled>Upload Proof of Payment</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col md="6" offset-md="3">
           <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>Upload Proof of Payment</v-card-title>
              <v-card-text> 
                 <v-text-field v-model="form.name" label="Bank Name" outlined :rules="nameRule"/>   
                 <v-text-field v-model="form.amount" label="Amount" outlined :rules="amountRule"/>
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
                                :rules="dateRule"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            no-title
                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
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
                   <v-file-input
                    label="Click here to attach POP"
                    outlined
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                      
              </v-card-text>
              <v-card-actions>
                  <v-btn color="primary" depressed block @click="submit">Submit</v-btn>
              </v-card-actions>
          </v-card>
            </v-form>
        </v-col>
    </v-row>
  </div>
  
</template>

<script>
export default {
layout:"user",
data(){
    return{
         overlay:false,
         valid:false,
         file:null,
         menu:false,
         date:null,
         form:{
             amount:'',
             name:'',
             paymentdate:'',

         },
          nameRule:[v=>!!v || 'Name required'],
         referencenumberRule:[v=>!!v || 'Reference number is required'],
         amountRule:[v=>!!v || 'Amount is required'],
         dateRule:[v=>!!v || 'Transfer date required'],
         fileRule:[v=>!!v || 'Please Attache Proof of payment'],
    }
},methods:{
    async submit(){
          let config = { headers: {'content-type': 'multipart/form-data'}}
          const formdata = new FormData()
         formdata.append('amount',this.form.amount)
         formdata.append('bank',this.form.name)
         formdata.append('transdate',this.date)
         formdata.append('file',this.file)
        await this.$axios({
            method:"POST",
            url:'api/entity-domain/authorityinvoiceupload',
            data:formdata,
            config:config
            }).then((res)=>{
           this.$swal(res.data.status,res.data.message,res.data.status)
            this.$router.push('dashboard')
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}
}
</script>

<style>

</style>