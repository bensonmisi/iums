<template>
  <div>
      <v-btn x-small depressed color="primary" @click="getData">Source of Funds</v-btn>
   
      <v-dialog v-model="addPermModel" width="400">
                
       <v-card>
           <v-card-title>
                Source
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                <template v-if="suspense.source =='banktransactions'">
                <transaction :transaction="suspense.banktransaction"/>
                </template>
                <template v-else>
                 <onlineplayment :transaction="suspense.onlinepayment"/>
                </template>
               
           </v-card-text>
       </v-card>
                  
      </v-dialog>
  </div>
</template>

<script>
import Onlineplayment from './onlineplayment.vue'
import transaction from './transaction.vue'
export default {
  components: { transaction, Onlineplayment },
    props:['id'],
    data(){
        return{
           addPermModel:false ,
           valid:false,
           loading:false,
           suspense:{}
        }
    },methods:{
     async getData(){       
        
          this.loading=true
          console.log("hello")
             try {
                 await this.$axios.get('api/admin/suspensetransfers/source/'+this.id).then((res)=>{
                        this.loading = false
                        this.suspense = res.data
                        this.addPermModel = true

                 })
             }catch (err) {
                 this.loading = false
                 console.log(err)
            }
       
       }
    }

}
</script>

<style>

</style>