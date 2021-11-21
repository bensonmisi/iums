export const state =()=>({
    transactions:[]
})

export const mutations={
    setTransactions(state,payload){
        state.transactions = payload
    }
}

export const actions={
    async getCurrent({commit}){
        await this.$axios.get('api/admin/banktransaction').then((res)=>{
            commit('setTransactions',res.data)
          })
    },

    async Search({commit},payload){
        await this.$axios.post('api/admin/banktransaction',payload).then((res)=>{
            commit('setTransactions',res.data)
          })
    }
}