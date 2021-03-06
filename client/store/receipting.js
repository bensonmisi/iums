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
        await this.$axios.get('api/bidder/receipting').then((res)=>{
            commit('setData',res.data)
          }).catch(error=>{
            commit('setData',[])
          })
    },

    async getByInvoice({commit},payload){
        await this.$axios.get('api/bidder/receipting/'+payload).then((res)=>{
            commit('setData',res.data)
          }).catch(error=>{
            commit('setData',[])
          }) 
    }
}