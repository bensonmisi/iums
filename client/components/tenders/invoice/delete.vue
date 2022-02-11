<template>
<div>
  <v-btn depressed rounded class="error" @click="removeItem">Delete Invoice</v-btn>
</div>
</template>

<script>
export default {
props:['id'],
name:'TenderInvoiceDelete',
methods:{
    async removeItem(){
     this.$swal({
                            title: 'tender Invoice',
                            text: "Clear Invoice",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then(async (result) => {
                            if (result.isConfirmed) {

                                   try{
                                        await this.$axios.delete('/api/bidder/noticeinvoicing/'+this.id).then(async(res)=>{
                                        if(res.data.status=="success"){                                       
                                        await this.$store.dispatch('tenderinvoicing/getData')
                                        }
                                    })
                                    }catch(error){
                                        console.log(error.message)
                                }
                            
                            }
                            })
    }
}
}
</script>

<style>

</style>