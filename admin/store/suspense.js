export const state =()=>({
    suspense:[],
    receipts:{}
})

export const mutations={
    setSuspense(state,payload){
        state.suspense = payload
    },
    setReceipts(state,payload){
        state.receipts = payload
    }
}

export const actions={
    async getSuspense({commit},payload){
        await this.$axios.get('api/admin/suspense').then((res)=>{
            commit('setSuspense',res.data)
          })
    },
    async getReceipts({commit},payload){
        await this.$axios.get('api/admin/suspense/'+payload).then((res)=>{
            commit('setReceipts',res.data)
          })
    }
}