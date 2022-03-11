<template>
  <div>
      <v-btn icon depressed color="primary" @click="add"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-dialog v-model="addDialog" width="600">
             <v-form v-model="valid" ref="form" lazy-validation>
          <v-card>
              <v-card-title>Update Product/Service<v-spacer/><v-btn icon @click="addDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
             <v-card-text>
                 <v-row>
                     <v-col>
                <v-text-field outlined label="Product/Service" v-model="form.description" :rules="descriptionRule"/>
                     </v-col>
                 </v-row>
                 <v-row>
                     <v-col>
                          <v-text-field outlined label="Quantity" v-model="form.quantity" :rules="quantityRule"/> 
                     </v-col>
                 </v-row>
                   <v-row>
                     <v-col>
                          <v-select outlined label="isPlanned" v-model="form.isplanned" :items="options" :rules="isplannedRule"/> 
                     </v-col>
                 </v-row>
                  <v-row v-if="form.isplanned =='Y'">
                     <v-col>
                          <v-select outlined label="Annual Plan Entry" v-model="form.annualplanId" :items="annualplan" item-value="id" item-text="description" :rules="isplannedRule"/> 
                     </v-col>
                 </v-row>

             </v-card-text>
             <v-card-actions>
                 <v-btn rounded depressed color="error" @click="addDialog=false">Cancel</v-btn>
                 <v-spacer/>
                 <v-btn rounded depressed color="success" @click="submit">Sumit</v-btn>
             </v-card-actions>
          </v-card>
             </v-form>
      </v-dialog>
  </div>
</template>

<script>
export default {
 props:['item'],
 data(){
     return{
         form:{
             description:this.item.description,
             quantity:this.item.quantity,
             isplanned:this.item.isplanned,
             annualplanId:this.item.annualplanId,
             noticeId:this.item.noticeId
         },
         valid:false,
         addDialog:false,
         options:['Y','N'],
         descriptionRule:[v=>!!v || "Description of Service/Product Required"],
         quantityRule:[v=>!!v || 'Quantity is required'],
         isplannedRule:[v=>!!v || 'Specify if procurement is planned '],
         annualplanId:[v=>!!v || 'Select Annual Plan Item']
     }
 },methods:{
     async add(){
            await this.$store.dispatch('annualplan/getData')
            this.addDialog = true
     },
     async submit(){
        if(this.$refs.form.validate())
        {
            this.valid = true
             const payload = {id:this.item.id,data:this.form}
            await this.$store.dispatch('noticeproduct/editData',payload)
           
        }
     }
 },computed:{
     
     annualplan(){
         return this.$store.state.annualplan.data
     },
 }
}
</script>

<style>

</style>