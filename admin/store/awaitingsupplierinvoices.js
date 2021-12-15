export const state =()=>({
    invoices:[],
    accountinvoices:[],
    selectedinvoices:[]
})

export const mutations={
    setInvoices(state,payload){
        state.invoices= payload
    },
    setaccountInvoices(state,payload){
        state.accountinvoices = payload
    },
    setSelectedInvoice(state,payload){
    state.selectedinvoices = payload
    }
}

export const actions={
    async getInvoices({commit}){
        await this.$axios.get('api/admin/supplierinvoice').then((res)=>{
            commit('setInvoices',res.data)
          })
    },
    async getByCompany({commit},payload){
        await this.$axios.get('api/admin/supplierinvoice/'+payload).then((res)=>{
            commit('setaccountInvoices',res.data)
          })
    },
    async getByInvoiceNumber({commit},payload){
        await this.$axios.get('api/admin/supplierinvoice/getInvoiceData/'+payload).then((res)=>{
            commit('setSelectedInvoice',res.data)
          })
    },
    
}