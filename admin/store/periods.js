export const state =()=>({
    periods:[]
})

export const mutations={
    setPeriods(state,payload){
        state.periods = payload
    }
}

export const actions={
    async getPeriods({commit},payload){
        await this.$axios.get('api/admin/registrationperiod').then((res)=>{
            commit('setPeriods',res.data)
          })
    }
}