export const state =()=>({
    data:[],
    receipts:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setReceipts(state,payload){
        state.receipts = payload
    }
}

export const actions={
    async getData({commit},payload){
        await this.$axios.get('api/admin/authorityinvoice/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    },
    async getReceipts({commit},payload){
        await this.$axios.get('api/admin/authorityinvoice/invoice/'+payload).then((res)=>{
            commit('setReceipts',res.data)
          })
    },
    async claim({commit},payload){
        await this.$axios.post('api/admin/authorityinvoice/claim',payload).then(async(res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            await this.dispatch('entityinvoice/getReceipts',payload.id)

        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async settle({commit},payload){
        await this.$axios.get('api/admin/authorityinvoice/settle/'+payload).then(async(res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            await this.dispatch('entityinvoice/getData')

        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }

}