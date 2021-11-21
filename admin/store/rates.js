export const state =()=>({
    rates:[]
})

export const mutations={
    setRates(state,payload){
        state.rates = payload
    }
}

export const actions={
    async getRates({commit}){
        await this.$axios.get('api/admin/exchangerate').then((res)=>{
            commit('setRates',res.data)
          })
    }
}