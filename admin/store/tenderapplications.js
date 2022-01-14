export const state =()=>({
    applications:[]
})

export const mutations={
    setApplications(state,payload){
        state.applications = payload
    }
}

export const actions={
    async getApplications({commit},payload){
        await this.$axios.get('api/admin/tenderapplication/type/'+payload).then((res)=>{
            commit('setApplications',res.data)
          })
    }
}