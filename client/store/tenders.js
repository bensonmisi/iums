export const state =()=>({
    data:[],
    notice:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setNotice(state,payload){
      state.notice = payload
    }
}

export const actions={
    async getData({commit}){
        await this.$axios.get('api/bidder/tenders').then((res)=>{
            commit('setData',res.data)
          })
    },
    async getNotice({commit},payload){
        await this.$axios.get('api/bidder/tenders/'+payload).then((res)=>{
            commit('setNotice',res.data)
          })  
    }
}