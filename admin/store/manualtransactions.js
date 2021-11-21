export const state =()=>({
    transactions:[]
})

export const mutations={
    setTransactions(state,payload){
        state.transactions = payload
    }
}

export const actions={
    async getTransactions({commit},payload){
        await this.$axios.get('api/admin/manualtransactions').then((res)=>{
            commit('setTransactions',res.data)
          })
    }
}