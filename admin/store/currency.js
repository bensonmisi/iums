export const state =()=>({
    currency:[]
})

export const mutations={
    setCurrency(state,payload){
        state.currency = payload
    }
}

export const actions={
    async getCurrency({commit},payload){
        await this.$axios.get('api/admin/currency').then((res)=>{
            commit('setCurrency',res.data)
          })
    }
}