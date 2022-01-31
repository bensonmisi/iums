export const state =()=>({
    report:[]
})

export const mutations={
    setReport(state,payload){
        state.report = payload
    }
}

export const actions={
    async getReport({commit},payload){
        await this.$axios.get('api/admin/tenderrevenuereport').then((res)=>{
            commit('setReport',res.data)
          })
    },
    async filterReport({commit},payload){
        await this.$axios.post('api/admin/tenderrevenuereport',payload).then((res)=>{
            commit('setReport',res.data)
          })
    }
}