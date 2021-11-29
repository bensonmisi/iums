<template>
  <div>
      <v-btn  depressed color="primary" @click="addPermModel=true"><v-icon>mdi-plus</v-icon> New Request</v-btn>
   
      <v-dialog v-model="addPermModel" width="500">
           <v-form v-model="valid" ref="form" lazy-validation>
       <v-card>
           <v-card-title>
               New SuspenseTransfer
               <v-spacer/>
               <v-btn icon @click="addPermModel=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-card-title>
           <v-card-text>
                  <v-text-field
                            label="PR NUMBER"
                            outlined
                            dense
                            v-model="regnumber"
                            append-outer-icon="mdi-text-box-search-outline"
                             @click:append-outer="submit"
                        />
                        <template v-if="suspenselist.length>0">
                          <v-select
                            label="Source Account Number"
                            outlined
                            v-model="form.suspenseId"
                            :rules="suspenseRule"
                            :items="suspenselist"
                            item-text="accountnumber"
                            item-value="id"
                           
                        />

                    <v-select
                            label="Destination Account Number"
                            outlined
                            v-model="form.destination"
                            :rules="destinationRule"
                            :items="accountnumbers"
                            item-text="accountnumber"
                            item-value="accountnumber"
                         
                        />
                           <v-text-field
                            label="Amount"
                            outlined
                            v-model="form.amount"
                            :rules="amountRule"
                        />
                         <v-checkbox
                            v-model="checkbox"
                            label="Tick here if you wish to transfer to a different Company"
                            ></v-checkbox>
                           <v-text-field
                            label="PR NUMBER"
                            v-if="checkbox"
                            outlined
                            v-model="form.otherregnumber"
                           
                        />
                        <v-btn depressed block class="primary" @click="process">Submit</v-btn>
                        </template>
                      
                          
           </v-card-text>
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
    props:['id'],
     async fetch(){
          await this.$store.dispatch('accountnumbers/getAccountnumbers') 
     },
 data(){
     return{
         addPermModel:false,
         valid:false,
         form:{
              suspenseId:'',
              destination:'',
              amount:'',
              otherregnumber:''
         },
         regnumber:'',
         suspenseRule:[v=> !!v || 'Select suspense account'],
         destinationRule:[v=> !!v || 'Destination account required'],
         amountRule:[v=> !!v || 'Amount required'],
         snackbar:false,
         color:'',
         text:'',
         loading:false,
         checkbox:false,
         suspenselist:[]
     }
 },methods:{
     async submit(){
     
          this.valid = true
          this.loading=true
          if(!this.regnumber){
              this.$swal({ icon: 'error',title: 'Oops...' ,text:"Please Enter PR NUMBER"})
              return
          }
             try {
                 await this.$axios.post('api/suspense/searchByCode',{regnumber:this.regnumber}).then((res)=>{
                        this.loading = false
                       this.suspenselist = res.data

                 })
             }catch (err) {
                 this.loading = false
                 this.color="error"
                this.snackbar=true
                this.text=err.response.data.message
                this.suspenselist = []
            }
       
     },
     async process(){
            if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
             try {
                 await this.$axios.post('api/admin/suspensetransfers',this.form).then((res)=>{
                         this.loading = false
                        this.color="success"
                        this.snackbar=true
                        this.text=res.data.message
                        this.$store.dispatch('suspensetransfers/getTransactions') 
                        this.$refs.form.reset()
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
 },computed:{
    accountnumbers(){
        return this.$store.state.accountnumbers.accountnumbers
    },
    
}
}
</script>

<style>

</style>