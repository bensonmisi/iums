<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                     <v-btn text to="/apply/pmu">PMU</v-btn>
                      <v-btn text to="/apply/committe">Evaluation Committe</v-btn>
                       <v-btn text to="/apply/organogram">Organograms</v-btn>
                    <v-btn text disabled>organograms</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <Stepper :progress="5"/>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col md="6" offset-md="3">
              <v-card>
                <v-card-text class="text-center">
                   <div class="text-h4">Application Submitted</div>
                   <p class="mt-4">Congradulations your application has been successfully submitted. Our team will start assessing your application, if there are any areas that need your attention you will be notified via email</p>
                   <p>After your application is processed successfully our application will generate an invoice where you will upload your Proof of payment</p>
                   <v-btn rounded color="success" depressed class="mt-3" to="/dashboard">Goto Dashboard</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
 layout:"user",
 async fetch(){
    await this.$axios.get('api/entity-domain/authorityapplication/confirm').then(res=>{
        this.$swal(res.data.status,res.data.message,res.data.status)
     }).catch(error=>{
        this.$swal('error',error.response.data.message,'error')
     }) 
 }

}
</script>

<style>

</style>