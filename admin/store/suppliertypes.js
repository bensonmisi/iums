export const state =()=>({
    types:[],
    summary:[]
})

export const mutations={
    setTypes(state,payload){
        state.types = payload
    },
    setSummary(state,payload){
        state.summary = payload
    }

}

export const actions={
    async getTypes({commit}){
        await this.$axios.get('api/admin/suppliertype').then((res)=>{
            commit('setTypes',res.data)
          })
    },

    async getSummaryByAccount({commit}){
        await this.$axios.get('api/admin/suppliertype/report/summary').then((res)=>{
            commit('setSummary',res.data)
          })
    }
}