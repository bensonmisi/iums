export const state =()=>({
    banks:[]
})

export const mutations={
    setBank(state,payload){
        state.banks = payload
    }
}

export const actions={
    async getBanks({commit},payload){
        await this.$axios.get('api/admin/bank').then((res)=>{
            commit('setBank',res.data)
          })
    }
}