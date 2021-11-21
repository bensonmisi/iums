<template>
  <div>
      <v-btn icon depressed color="primary" @click="addPermModel=true"><v-icon>mdi-pencil</v-icon></v-btn>
 <v-dialog v-model="addPermModel" width="300">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               Update Registration Price
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                 
                           <v-select
                            label="locality"
                            outlined
                            v-model="form.locality"
                            :rules="localityRule"
                            :items="localitylist"
                         
                        />
                             <v-select
                            label="Action"
                            outlined
                            v-model="form.action"
                            :rules="actionRule"
                            :items="types"
                         
                        />
                         <v-select
                            label="Currency"
                            outlined
                            v-model="form.currencyId"
                            :rules="currencyRule"
                               :items="currencylist"
                            item-text="name"
                            item-value="id"
                        />
                           <v-text-field
                            label="Price"
                            outlined
                            v-model="form.price"
                            :rules="priceRule"
                        />
                      
                          
           </v-card-text>
           <v-card-actions>
               <v-btn rounded class="error" @click="addPermModel=false">Cancel</v-btn>
               <v-spacer/>
               <v-btn rounded class="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
           </v-card-actions>
       </v-card>
           </v-form>
      </v-dialog>
       <v-snackbar
     
      :color="color"
      right
      top
      v-model="snackbar"
    >{{text}}</v-snackbar>
  </div>
</template>

<script>
export default {
    props:['price'],
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              currencyId:this.price.currencyId,
              locality:this.price.locality,
              action:this.price.action,
              price:this.price.price
         },
         currencyRule:[v=>!!v || 'Primary Currency is required'],
         actionRule:[v=>!!v || 'Action is required'],
         priceRule:[v=>!!v || 'Price is required'],
         localityRule:[v=>!!v || 'Locality is required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         localitylist:['local','foreign'],
         types:['NEW','RENEWAL']
     }
 },
async fetch(){
    this.overlay=true
   await this.$store.dispatch('currency/getCurrency') 
   this.overlay = false
},computed:{
    currencylist(){
        return this.$store.state.currency.currency
    }
} ,methods:{
     async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.patch('api/admin/registrationfee/'+this.price.id,this.form).then((res)=>{
                        this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                         this.$store.dispatch('registrationfees/getFees')
                         this.addPermModel= false

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
            }
       }
     }
 }
}
</script>

<style>

</style>