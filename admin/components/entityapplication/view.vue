<template>
  <div>
      <v-btn small rounded depressed color="primary" @click="retriveRecord">View</v-btn>
      <v-dialog v-model="showDialog" fullscreen width="1000px">
        <v-card>
          <v-card-title>Application
             <v-spacer/>
             <EntityapplicationAssign :id="id"/>
             <v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn>
             </v-card-title>
          <v-card-text>
           <EntityapplicationPmu :items="application.pmu"/>          
           <EntityapplicationCommitte :items="application.evaluationcommitte"/>            
           <EntityapplicationPlans :items="application.uploadplans"/>
           <EntityapplicationOrganograms :items="application.organograms"/>
           <EntityapplicationComments :comments="application.comments" :id="id"/>
          
            
          </v-card-text>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
props:['id'],
data(){
  return{
    showDialog:false,
    pdflink:''
  }
},methods:{
  async retriveRecord(){
     await this.$store.dispatch('entityapplications/getRecord',this.id)
     this.showDialog=true
  }
    
},
computed:{
  application()
  {
    return this.$store.state.entityapplications.record
  }
}
}
</script>

<style>

</style>