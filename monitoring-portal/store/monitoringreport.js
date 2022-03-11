export const state =()=>({
    data:[],
    report:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setReport(state,payload){
        state.report = payload
    }
}

export const actions={
    async getData({commit},payload){
        await this.$axios.get('api/admin/monitoringreport').then((res)=>{
            commit('setData',res.data)
          })
    },
    async filterData({commit},payload){
        await this.$axios.post('api/admin/monitoringreport/filter',payload).then((res)=>{
            commit('setData',res.data)
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async showData({commit},payload){
        await this.$axios.post('api/admin/monitoringreport',payload).then((res)=>{
            commit('setReport',res.data)
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },

}