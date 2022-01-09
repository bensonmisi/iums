<template>
  <div>
        <v-btn x-small depressed color="primary" @click="getDetails" :loading="loading" :disabled="loading">OPEN</v-btn>
         <v-dialog v-model="infoDialog" width="900">
            <v-card>
                <v-card-title>Supplier Information<v-spacer/> <v-btn icon @click="infoDialog=false"><v-icon>mdi-close</v-icon></v-btn> </v-card-title>
                <v-card-text>
                 <detailprofile :account="details.account"/>
                 <detaildocuments :documents="details.documents" :id="id"/>
                 <detailregistration :registrations="details.registrations"/>
                 <detailcomments :comments="details.comments" :id="id"/>
     
                </v-card-text>
            </v-card>
         </v-dialog>
  </div>
</template>

<script>
import detailprofile from './detail/profile.vue'
import detaildocuments from './detail/documents.vue'
import detailregistration from './detail/registration.vue'
import detailcomments from './detail/comments.vue'
export default {
  name:'supplierdetails',
  props:['id'],
  components:{detailprofile,detaildocuments,detailregistration,detailcomments},
  data(){
      return{
       
       loading:false,
       infoDialog:false
      }
  },
  methods:{
    
    async getDetails(){
        this.loading=true
            await this.$store.dispatch('suppliers/getDetails',this.id)  
            this.loading =false
            this.infoDialog=true
       
      
    }

  },computed:{
     details(){
        return this.$store.state.suppliers.details
    }
}


}
</script>

<style>

</style>