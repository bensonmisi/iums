export const state =()=>({
    records:[],
    details:[]
})

export const mutations={
    setRecords(state,payload){
        state.records = payload
    },
    setDetails(state,payload){
        state.details = payload
    }
}

export const actions={
    async getRecords({commit},payload){
        await this.$axios.get('api/admin/bidbondmanagement').then((res)=>{
            commit('setRecords',res.data)
          })
    },
    async getDetails({commit},payload){
        await this.$axios.get('api/admin/bidbondmanagement/'+payload).then((res)=>{
            commit('setDetails',res.data)
          })
    }

    
}