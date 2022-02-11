<template>
<div>
 <v-container>
       <v-sheet height="500" class="text-center pa-10">
        <div :class="headercss">Procurement Regulatory Authority of Zimbabwe</div>
        <div class="headline">Public Procurement Portal</div>
        <v-row class="mt-2">
            <v-col md="4" offset-md="4">
                <v-row>
                    <v-col>
                        <v-btn color="success" depressed block to="register">REGISTER</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="primary" depressed block to="login">LOGIN</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
       <SuppliersVerify/>
          </v-sheet>
 </v-container>
 <div class="brown lighten-5">
 <v-row >
      <v-col md="4" offset-md="4" class="text-center">
      <div class="display-1 mt-5">
       Latest Tenders
      </div>
      </v-col>
 </v-row>
 <v-row>
     <v-col md="10" offset-md="1">        
        <TendersLatest/>
     </v-col>
 </v-row>
 </div>
 <div >
 <v-row >
      <v-col md="4" offset-md="4" class="text-center">
      <div class="display-1 mt-5">
       Bank Details 
      </div>
      </v-col>
 </v-row>
 <v-row>
     <v-col md="10" offset-md="1">
         <v-row>
             <v-col>
                 <v-card>
                     <v-card-title>REFUNDABLE(USD)</v-card-title>
                     <v-card-text>
                  <div>BID BONDS only</div>
                   <div>BANK: CBZ</div>
                    <div>CURRENCY: UNITED STATES DOLLARS (USD)</div>
                   <div>ACCOUNT NUMBER: 10721064850128</div>
                    <div>BRANCH SORT CODE: 6101</div>
                    <div>SWIFT CODE: COBZZWHAXXX</div>
                     </v-card-text>
                 </v-card>
             </v-col>
             <v-col>
                 <v-card>
                     <v-card-title>REFUNDABLE(ZWL)</v-card-title>
                     <v-card-text>
                <div> BID BONDS only</div>
<div>BANK: CBZ</div>
<div>CURRENCY: ZIM DOLLAR (ZWL)</div>
<div>ACCOUNT NUMBER: 10721064850118</div>
<div>BRANCH SORT CODE: ---</div>
<div>SWIFT CODE: ------</div>
                     </v-card-text>
                 </v-card>
             </v-col>
         </v-row>
          <v-row class="mt-2">
             <v-col>
                 <v-card>
                     <v-card-title>NON-REFUNDABLE(USD)</v-card-title>
                     <v-card-text>
<div class="red--text">REGISTRATIONS, BID ESTABLISHMENT FEES; TRAINING FEES; AND ADMIN FEES (Contract, SPOC & Other Admin Fees)</div>
<div>BANK: CBZ</div>
<div>CURRENCY: UNITED STATES DOLLARS (USD)</div>
<div>ACCOUNT NUMBER: 10721064850108</div>
<div>BRANCH SORT CODE: 6101</div>
<div>SWIFT CODE: COBZZWHAXXX</div>
                     </v-card-text>
                 </v-card>
             </v-col>
             <v-col>
                 <v-card>
                     <v-card-title>NON-REFUNDABLE(ZWL)</v-card-title>
                     <v-card-text>
               
<div class="red--text">REGISTRATIONS, BID ESTABLISHMENT FEES; TRAINING FEES; AND ADMIN FEES (Contract, SPOC & Other Admin Fees)</div>
<div>BANK: CBZ</div>
<div>CURRENCY: ZIM DOLLAR (ZWL)</div>
<div>ACCOUNT NUMBER: 10721064850020</div>
<div>BRANCH SORT CODE: 6101</div>
<div>SWIFT CODE: COBZZWHAXXX</div>
                     </v-card-text>
                 </v-card>
             </v-col>
         </v-row>
     </v-col>
 </v-row>
 </div>
</div>

</template> 
<script>
export default {
  auth:false,
  computed:{
         headercss(){
              switch (this.$vuetify.breakpoint.name)
               {
                case 'xs': return 'headline mt-4 font-weight-bold'
                case 'sm': return 'headline mt-4 font-weight-bold'
                case 'md': return 'display-2 mt-8 font-weight-bold'
                case 'lg': return 'display-2 mt-8 font-weight-bold'
                case 'xl': return  'display-2 mt-8 font-weight-bold'
                }
          }
    }

}
</script>