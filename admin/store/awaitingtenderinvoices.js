export const state =()=>({
    invoices:[],
    accountinvoices:[]
})

export const mutations={
    setInvoices(state,payload){
        state.invoices = payload
    },
    setaccountInvoices(state,payload){
        state.accountinvoices = payload
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
    }
}