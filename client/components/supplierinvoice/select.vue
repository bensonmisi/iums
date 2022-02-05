<template>
  <div>
       <v-btn rounded depressed color="primary" @click="selectDialog=true">select</v-btn>
       <v-dialog v-model="selectDialog" width="700">
           <v-form v-model="valid" ref="form" lazy-validation>
           <v-card>
               <v-card-title>Registration Options<v-spacer/></v-card-title>
               <v-card-text>
                   <v-select outlined label="Select Registration Year" :items="periods" item-text="regyear" item-value="regyear" v-model="form.regyear" :rules="regyearRule"/>
                   <v-select outlined label="Select Registration Duration" :items="options" item-text="name" item-value="name" v-model="form.option" :rules="optionRule"/>
                    <v-select outlined label="Select Currency" :items="currencylist" item-text="name" item-value="id" v-model="form.currencyId" :rules="currencyRule"/>
              
               </v-card-text>
               <v-card-actions>
                   <v-btn rounded depressed color="error" @click="selectDialog=false">Cancel</v-btn>
                   <v-spacer/>
                   <v-btn rounded depressed color="success" @click="submit" :disabled="loading" :loading="loading">Submit</v-btn>
               </v-card-actions>
           </v-card>
           </v-form>
       </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    name:'addCategory',
props:['category'],
data(){
    return{
      selectDialog:false,
      valid:false,
      loading:false,
      form:{
          regyear:'',
          option:'',
          categoryId:this.category.id,
          currencyId:''

      },
      regyearRule:[v=>!!v || 'Select Registration Year'],
      optionRule:[v=>!!v || ' Select Registration option'],
      currencyRule:[v=>!!v || 'Select Currency']


    }
},
methods:{
  async submit(){
         if(this.$refs.form.validate())
       {
          this.valid = true
          let message = ""
         
       const expire_date = this.compute_expiry_date(this.form.option)
        if(this.form.option=='QUARTERLY'){
             message='<p>You have selected <b>'+this.category.name+'</b> to be paid using   QUARTERLY installment option which expires on <b>'+expire_date+'</b>. By selecting this option you are agreeing to pay your <b>annual registration in quarterly installments</b></p>'
          }else{
             message='<p>You have selected <b>'+this.category.name+'</b> to be paid using ONCE-OFF option which expires on <b>'+expire_date+'</b>. </p>'
     
          }
      const { value: accept } = await this.$swal({

  title: 'Terms and conditions',
  html:message,
  input: 'checkbox',
  inputValue: 0,
  inputPlaceholder:
    'I agree with the terms and conditions',
  confirmButtonText:
    'Continue <i class="fa fa-arrow-right"></i>',
  inputValidator: (result) => {
    return !result && 'You need to agree with T&C'
  }
})

if (accept) 
{
 this.loading=true
 await this.$store.dispatch('invoicing/addItem',this.form)
 this.loading = false
 this.$refs.form.reset()
 this.selectDialog=false

}
}
  },
  compute_expiry_date(option)
  {
    let expire_date="";
    let  year  = moment().year()
      if(option=='QUARTERLY'){
       const quarter =  moment().quarter();
       if(quarter==1){
        expire_date = "31-03-"+year
       }else if(quarter==2){
          expire_date="30-06-"+year
       }else if(quarter==3){
         expire_date="30-09-"+year
       }else{
        expire_date="31-12-"+year
       }
      }else{
        expire_date="31-12-"+year
      }
      return expire_date
  }
},
computed:{
    options()
    {
        return this.$store.state.invoicing.setting.options
    },
    periods(){
        return this.$store.state.invoicing.setting.periods 
    },
    currencylist(){
      return this.$store.state.invoicing.setting.currency
    }
}
}
</script>

<style>

</style>