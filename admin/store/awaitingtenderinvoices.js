export const state =()=>({
    invoices:[],
    accountinvoices:[],
    invoicedata:[],
    receiptData:[]
})

export const mutations={
    setInvoices(state,payload){
        state.invoices = payload
    },
    setaccountInvoices(state,payload){
        state.accountinvoices = payload
    },
    setInvoiceData(state,payload){
        state.invoicedata = payload
    },
    setreceiptData(state,payload){
        state.receiptData = payload
    }
}

export const actions={
    async getInvoices({commit}){
        await this.$axios.get('api/tenderinvoice').then((res)=>{
            commit('setInvoices',res.data)
          })
    },

    async getByCompany({commit},payload){
        await this.$axios.get('api/tenderinvoice/'+payload).then((res)=>{
            commit('setaccountInvoices',res.data)
          })
    },
    async getInvoiceData({commit},payload){
        await this.$axios.get('api/tenderinvoice/getInvoiceData/'+payload).then((res)=>{
            commit('setInvoiceData',res.data)
          })
    },
    async deleteApplication({commit},payload){
        const invoiceId = payload.invoiceId
       await this.$axios.delete('api/admin/tenderapplication/'+payload.applicationId).then((res)=>{
        this.dispatch('awaitingtenderinvoices/getInvoiceData',invoiceId)
      })
    },
    async linkApplication({commit},payload){
        const invoiceId = payload.invoiceId
       await this.$axios.get('api/admin/tenderapplication/'+payload.applicationId).then((res)=>{
        this.dispatch('awaitingtenderinvoices/getInvoiceData',invoiceId)
      })
    },   
    async editApplication({commit},payload){
      try {
        await this.$axios.patch('api/admin/tenderapplication/'+payload.data.id,payload.data).then((res)=>{
          this.$swal("success",res.data.message,"success")
          this.dispatch('awaitingtenderinvoices/getInvoiceData',payload.invoiceId)
        })
      } catch (error) {
        this.$swal("error",error.response.data.message,"error")
      }
   
  },
    async deleteInvoice({commit},payload){
       
       await this.$axios.delete('api/tenderinvoice/'+payload.invoice.id).then((res)=>{
        this.dispatch('awaitingtenderinvoices/getInvoiceData',payload.invoice.id)
        this.dispatch('awaitingtenderinvoices/getByCompany',payload.invoice.accountId)
      })
    },
      async getReceiptData({commit},payload){
        await this.$axios.get('api/admin/receipting/'+payload).then((res)=>{
            commit('setreceiptData',res.data)
          })
    }
}