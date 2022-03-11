<template>
  <div>
      <v-btn rounded depressed color="success" @click="getPlan">View Plan</v-btn>
      <v-dialog v-model="planDialog" width="900">
         <v-card>
             <v-toolbar dense color="primary" dark>
                 <v-toolbar-title>Procurement Plan</v-toolbar-title>
                 <v-spacer/>
                 <v-btn icon @click="planDialog=false"><v-icon>mdi-close</v-icon></v-btn>
             </v-toolbar>
             <v-card-text>
                     <v-simple-table>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>Item</th>
                                     <th>Quantity</th>
                                     <th>Month of Purchase</th>
                                     <th>Rate of Purchase</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="planlist.length > 0">
                                   <tr v-for=" plan in planlist" :key="plan.id">
                                       <td>{{plan.description}}</td>
                                       <td>{{plan.quantity}}</td>
                                       <td>{{plan.month}}</td>
                                       <td>{{plan.rate}}</td>
                                   </tr>
                                 </template>
                                 <template v-else>
                                  <tr>
                                      <td colspan="4" class="text-center red--text">Sorry No Plan Found</td>
                                  </tr>
                                 </template>
                             </tbody>
                         </template>
                     </v-simple-table>
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
       planDialog:false,
       planlist:[]  
     }
 },methods:{
     async getPlan(){
         await this.$axios.get('api/welcome/procurementplan/'+this.id).then(res=>{
             this.planlist = res.data
             this.planDialog = true
         }).catch(error=>{
             this.$swal("error",error.response.data.message,"error")
         })
     }
 }
}
</script>

<style>

</style>