export const state =()=>({
    submodules:[]
})

export const mutations={
    setSubmodules(state,payload){
        state.submodules = payload
    }
}

export const actions={
    async getSubmodules({commit},payload){
        await this.$axios.get('api/admin/submodules/all/'+payload).then((res)=>{
            commit('setSubmodules',res.data)
          })
    }
}