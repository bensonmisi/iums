export const state =()=>({
    receiptData:[]
})

export const mutations={
    setData(state,payload){
        state.receiptData = payload
    }
}

export const actions={
    async getReceiptData({commit},payload){
        await this.$axios.get('api/admin/supplierreceipting/'+payload).then((res)=>{
            commit('setData',res.data)
            this.dispatch('awaitingsupplierinvoices/getByInvoiceNumber',payload)
          })
    }
}