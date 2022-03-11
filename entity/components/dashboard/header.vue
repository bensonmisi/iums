<template>
   <div>
         <v-alert
         v-if="!procurementclass"
      prominent
      type="error"
    >
      <v-row align="center">
        <v-col class="grow">
          You account is not authorized to procure . Please click the apply now button to request for a procurement class 
        </v-col>
        <v-col class="shrink">
          <v-btn to="/apply">APPLY NOW</v-btn>
        </v-col>
      </v-row>
    </v-alert>
     <v-alert
         v-else-if="procurementclass && procurementclass.status=='PENDING'"
      prominent
      type="warning"
    >
      <v-row align="center">
        <v-col class="grow">
           You have an incomplete application process
         </v-col>
        <v-col class="shrink">
          <v-btn to="/apply">Continue</v-btn>
        </v-col>
      </v-row>
    </v-alert>

      <v-alert
         v-else-if="procurementclass && procurementclass.status=='AWAITING'"
      prominent
      text
      type="info"
    >
      <v-row align="center">
        <v-col class="grow">
           Your application to conduct procurement  is awaiting verification
         </v-col>
      </v-row>
    </v-alert>


       <v-alert
         v-if="invoice && invoice.status=='PENDING'"
      prominent
      type="info"
    >
      <v-row align="center">
        <v-col class="grow">
         System has detected an invoice Pending settlement. Please upload your pop  in order to complete the application process
        </v-col>
        <v-col class="shrink">
          <v-btn to="/invoicing">UPLOAD POP</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-alert
         v-if="invoice && invoice.status=='AWAITING'"
      prominent
      text
      type="primary"
    >
      <v-row align="center">
        <v-col class="grow">
        Your invoice is awaiting  funds verification. Once our finance team identifies your transaction your application will be finalized        </v-col>
      </v-row>
    </v-alert>
<v-row>
   
      <v-col>
        
      <v-card flat>
        <v-card-text class="text-center">
             <div v-if="procurementclass && procurementclass.status=='APPROVED'">
          <v-row>
            <v-col md="8" class="text-left">
             <div class="text-h4"> Class({{procurementclass.procurementclass.name}})</div>
             <div>Expiry Year: {{procurementclass.year}}</div>
            </v-col>
            <v-col md="4" class="text-right">
              <v-btn color="primary" large  to="/notice/add"><v-icon>mdi-plus</v-icon> Add Notice</v-btn>
            </v-col>
          </v-row>
            </div>
            <div v-else>
              
            </div>
           
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  

    
   </div>
</template>

<script>
export default {
 props:['procurementclass','invoice']
}
</script>

<style>

</style>