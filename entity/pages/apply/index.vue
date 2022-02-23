<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text disabled>Procurement Plan</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <Stepper :progress="1"/>
        </v-col>
    </v-row>
    <v-row class="mt-5"   v-if="uploads">
        <v-col>
            <v-card>
                <v-card-title>
                  Procurement Plan
                 <v-spacer/>
                 <Uploadplan :id="uploads.id"/>
                </v-card-title>
                <v-card-text>
                       <v-alert
                       v-if="uploads.plan && uploads.plan.length>0"
                        prominent
                        text
                        type="success"
                        >
                        <v-row align="center">
                            <v-col class="grow">
                             If you have completed creating your procurement plan. Click on continue button to goto the next stage
                            </v-col>
                            <v-col class="shrink">
                            <v-btn to="/apply/pmu">Continue</v-btn>
                            </v-col>
                        </v-row>
                        </v-alert>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-center">Version</th>
                                <th class="text-center">Date</th>
                                <th class="text-center">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                           <template v-if="uploads.plan && uploads.plan.length>0">
                               <tr v-for="upload in uploads.plan" :key="upload.id">
                                   <td class="text-center">{{upload.id}}</td>
                                   <td class="text-center">{{upload.created_at|formatDate}}</td>
                                   <td class="text-center">
                                 <v-chip
                                    class="ma-2"
                                    x-small
                                    :color="upload.status=='APPROVE'? 'success' :'warning'"
                                    >{{upload.status}}
                                    </v-chip>
                                    </td>
                                   <td class="text-center">
                                       <template v-if="upload.status=='PENDING'">
                                           <UploadplanDelete :id="upload.id"/>
                                       </template>
                                    </td>                                   
                               </tr>
                           </template>
                           <template v-else>
                                     <tr>
                                         <td colspan="3" class="pa-3">
                                              <v-alert
                                                text
                                                prominent
                                                type="error"
                                                icon="mdi-cloud-alert"
                                                >
                                                   No procurement plans upload as yet. Please upload your signed procurement plan to proceed with the application process       </v-alert>
                                          </td>
                                     </tr>
                           </template>
                        </tbody>
                    </template>
                </v-simple-table>
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
     await this.$store.dispatch('uploadplan/getData')
 },computed:{
     uploads(){
         const data = this.$store.state.uploadplan.data
         return data
     },
   
 }


}
</script>

<style>

</style>