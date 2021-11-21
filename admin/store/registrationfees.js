export const state =()=>({
    fees:[]
})

export const mutations={
    setFees(state,payload){
        state.fees = payload
    }
}

export const actions={
    async getFees({commit}){
        await this.$axios.get('api/admin/registrationfee').then((res)=>{
            commit('setFees',res.data)
          })
    }
}