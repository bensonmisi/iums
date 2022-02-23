<template>
  <div>
    <v-row>
        <v-col>
            <v-card>
                <v-card-text>
                    <v-btn text to="/dashboard">Dashboard</v-btn>
                    <v-btn text to="/apply">Plans</v-btn>
                    <v-btn text disabled>Procurement Management Unit</v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <Stepper :progress="2"/>
        </v-col>
    </v-row>
    <v-row class="mt-5">
        <v-col>

               <v-alert
                       v-if="checkSignature==0 && checkPmu==0 && pmulist.length>0"
                       text
                        prominent
                        type="success"
                        >
                        <v-row align="center">
                            <v-col class="grow">
                             If you have completed creating your procurement management unit entries. Click on continue button to goto the next stage
                             
                            </v-col>
                            <v-col class="shrink">
                            <v-btn to="/apply/committe">Continue</v-btn>
                            </v-col>
                        </v-row>
                        </v-alert>
     <v-alert
       text
       dense
      prominent
      type="error"
      v-if="checkSignature>0"
    >
      Upload signatures for all procurement management unit members{{checkSignature}}
    </v-alert>

    <v-alert
       text
       dense
      prominent
      type="error"
      v-if="checkPmu>0"
    >
      Upload CVs for all procurement management unit members{{checkPmu}}
    </v-alert>


            <v-card>
                <v-card-title>
                  Procurement Management Unit
                 <v-spacer/>
                <PmuAdd/>
                </v-card-title>
                <v-card-text>
                   <v-simple-table>
                       <template v-slot:default>
                           <thead>
                               <tr>
                                   <th>#</th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Phone</th>
                                   <th>Jobtitle</th>
                                   <th>HasAccount</th>
                                   <th>Signature</th>
                                   <th>CV</th>
                                   <th>
                                    
                                   </th>
                               </tr>
                           </thead>
                           <tbody>
                               <template v-if="pmulist && pmulist.length>0">
                                 <tr v-for="pmu in pmulist" :key="pmu.id">
                                     <td>{{pmu.id}}</td>
                                     <td><small>{{pmu.title}} {{pmu.name}} {{pmu.surname}}</small></td>
                                     <td><small>{{pmu.email}}</small></td>
                                     <td><small>{{pmu.phonenumber}}</small></td>
                                     <td><small>{{pmu.jobtitle}}</small></td>
                                     <td><small>{{pmu.hasaccount}}</small></td>
                                     <td>
                                        <template v-if="pmu.signature">
                                           <v-chip small color="success">ATTACHED</v-chip>
                                        </template>
                                        <template v-else>
                                          <SignatureUpload :id="pmu.id"/>
                                        </template>
                                     </td>
                                     <td>
                                          <template v-if="pmu.cv">
                                           <v-chip small color="success"  close-icon="mdi-pencil">UPLOADED</v-chip>
                                        </template>
                                        <template v-else>
                                           <CvUpload :id="pmu.id"/>
                                       </template>
                                     </td>
                                     <td class="d-flex pt-2">
                                         <PmuEdit :item="pmu"/>
                                         <PmuDelete :id="pmu.id"/>
                                     </td>
                                 </tr>
                               </template>
                               <template v-else>
                               <tr>
                                   <td colspan="8" class="text-center red--text">No PMU created as yet</td>
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
     await this.$store.dispatch('pmu/getData')
 },computed:{
     pmulist(){
         return  this.$store.state.pmu.data
     
     },
     checkSignature(){
         const data = this.$store.state.pmu.data
        let total = data.length
        let uploadedcvs = 0
        if(data.length>0){
                data.forEach(element => {
                     if(element.signature){
                         uploadedcvs = uploadedcvs+1
                     }  
                });
        } 

        return  total>0 ? total - uploadedcvs : 0
     },
      checkPmu(){
         const data = this.$store.state.pmu.data
        let total = data.length
        let uploadedcvs = 0
        if(data.length>0){
                data.forEach(element => {
                     if(element.cv){
                         uploadedcvs = uploadedcvs+1
                     }  
                });
        } 

        return  total>0 ? total - uploadedcvs : 0
     },
     checkcompletion(){

     }


   
 }


}
</script>

<style>

</style>