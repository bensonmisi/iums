export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit}){
        await this.$axios.get('api/bidder/documents').then((res)=>{
            commit('setData',res.data)
          })
    }
}