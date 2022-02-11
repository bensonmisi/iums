<template>
  <div class="mt-5">
       <v-row>
            <v-col md="12">
                <v-form v-model="valid" ref="form" lazy-validation>
                <v-card>
                    <v-card-title>Verify Certificate</v-card-title>
                    <v-card-text class="pt-5">
                <v-row>
                   <!--  <v-col md="3"><v-select outlined label="Certificate Type" v-model="form.type" :rules="typeRule" :items="certificateList"/></v-col>
                -->     <v-col md="10"><v-text-field outlined label="Certificate Number" v-model="form.code" :rules="codeRule"/></v-col>
                    <v-col md="2"><v-btn large outlined rounded depressed @click="submit">Verify</v-btn></v-col>
                </v-row>
                    </v-card-text>
                </v-card>
                </v-form>
            </v-col>
        </v-row>
        <v-dialog v-model="resultDialog" width="600">
            <v-card>
                <v-card-title>Verification Results</v-card-title>
                <v-card-text>
                  <SupplierVerificationResult :data="supplier"/>
                  <TenderVerificationResult :data="tenderapplication"/>
              
                </v-card-text>
            </v-card>
        </v-dialog>
          <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import SupplierVerificationResult from './supplierreport.vue'
import TenderVerificationResult from './tenderreport.vue'
export default {
components:{SupplierVerificationResult,TenderVerificationResult},
 data(){
     return{
         certificateList:['REGISTRATION','BIDBOND','SPOC','CONTRACT FEE','ESTABLISHMENT FEE'],
         /* typeRule:[v=>!!v || 'Please select certificate type'], */
         codeRule:[v=>!!v || 'Please enter certificate code'],
         resultDialog:false,
         form:{
             code:''
         },
         supplier:null,
         tenderapplication:null,
         valid:false,
         overlay:false
     }
 },methods:{
     async submit(){
             if(this.$refs.form.validate()){
                        this.valid = true
                           this.overlay=true
                    await this.$axios.post('api/verification',this.form).then(res=>{
                            this.supplier = res.data.supplier,
                            this.tenderapplication = res.data.tenderapplication
                            this.resultDialog = true
                               this.overlay=false
                    }).catch(error=>{
                          this.overlay=false
                        this.$swal('error',error.response.data.message,'error')
                    })
             }
     }
 }
}
</script>

<style>

</style>