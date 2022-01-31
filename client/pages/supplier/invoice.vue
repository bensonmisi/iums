<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Invoicing</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Stepper :progress="2"/>
        </v-col>
      </v-row>

       <v-row>
        <v-col>
            <v-card>
                <v-card-title>Invoicing<v-spacer/><addItem/></v-card-title>
                 <v-divider></v-divider>
                <v-card-text>
                    <template v-if="invoices.length>0">
                     <div >
                    <v-row class="mb-1 mt-1" v-for="inv in invoices" :key="inv.id">
                        <v-col cols="12" sm="2">
                            <div class="grey--text"><small>Date</small></div>
                            <div class="black--text">{{inv.created_at|formatDate}}</div>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <div class="grey--text">
                                <small>{{inv.category.name}}</small>
                            </div>
                            <div class="black--text">{{inv.category.code}}</div>

                        </v-col>
                        <v-col cols="6" sm="2">
                            <div class="grey--text">
                                <small>Invoice number</small>
                            </div>
                            <div class="black--text">{{inv.invoicenumber}}</div>
                             <div class="red--text">{{inv.settlement}}</div>
                        </v-col>
                        <v-col cols="6" sm="3" class="text-right">

                            <div><small>{{inv.currency.name}}</small> {{inv.cost}} <v-btn small fab color="error" rounded depressed @click="removeItem(inv.id)"><v-icon>mdi-close</v-icon></v-btn></div>

                        </v-col>

                    </v-row>
                    <v-divider/>
                    <v-row class="pt-3 pb-5">
                      <v-col md="10">
                         <div class="display-1">Total Invoices</div>
                      </v-col>
                      <v-col md="2">
                           <div class="display-1 text-right">{{totalInvoice}}</div>
                           <v-divider/>
                      </v-col>
                    </v-row>
                     </div>



                    </template>
                    <template v-else>
                          <div class="pa-lg-16">
                           <p class=" pa-10 red lighten-5 red--text text-center">
                            No items added to invoice as yet
                          </p>

                         </div>

                    </template>
                </v-card-text>
                <v-card-actions>
                  <v-btn depressed rounded color="primary" to="print/invoice"><v-icon>mdi-printer</v-icon> Invoice</v-btn>
                  <v-spacer/>
                    <v-btn depressed rounded color="success">Make Payment</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
       </v-row>
    </div>
</template>

<script>
import addItem from '../../components/supplierinvoice/add.vue'
export default {
layout:'user',
components:{addItem},
async fetch(){
    this.overlay=true
    this.checkdocuments()
    this.getPendingInvoices()
    this.overlay=false
},methods:{
   async checkdocuments(){
       await this.$store.dispatch('documents/getData')
this.overlay = false
if(this.documents.length==0){
  this.$router.push('/settings/general')
}else{
  let uploaded = 0
  this.documents.forEach(element => {
     if(element.docstatus=='UPLOADED'){
       uploaded = uploaded+1
     }
  });
  if(uploaded<this.documents.length){
     this.$router.push('/supplier/documents')
  }
}
   },
   async getPendingInvoices(){
       await this.$store.dispatch('invoicing/getPending')
   },
   async removeItem(id){
            this.$swal({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then(async (result) => {
  if (result.isConfirmed) {
     await this.$store.dispatch('invoicing/removeItem',id)
  }
})
  
  
   },

   async printInvoice(){
     await this.$axios.get('/api/bidder/supplierinvoicing/invoice/print',{},{responseType: 'arraybuffer',headers: {'Accept': 'application/octet-stream'}}).then((res)=>{
      
      let blob = new Blob([res.data],{ type:'application/pdf'});
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "next1234.pdf";
         link.click();

     })
   }
   
},
  computed:{
   documents(){
       return this.$store.state.documents.data
   },
   invoices(){
       return this.$store.state.invoicing.data
   },
   totalInvoice(){
     let array = []
     let total = 0
     array = this.$store.state.invoicing.data

     array.forEach(inv=>{
       total = total + Number(inv.cost)
     })

     return   array[0].currency.name+""+total
   }
   }
}
</script>

<style>

</style>