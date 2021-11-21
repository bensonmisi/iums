export const state =()=>({
    accountnumbers:[]
})

export const mutations={
    setAccountnumbers(state,payload){
        state.accountnumbers = payload
    }
}

export const actions={
    async getAccountnumbers({commit}){
        await this.$axios.get('api/admin/accountnumbers').then((res)=>{
            commit('setAccountnumbers',res.data)
          })
    }
}