export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getDashboard({commit}){
        await this.$axios.get('api/bidder/dashboard').then((res)=>{
            commit('setData',res.data)
          })
    }
}