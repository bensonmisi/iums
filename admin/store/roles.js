export const state =()=>({
    roles:[]
})

export const mutations={
    setRoles(state,payload){
        state.roles = payload
    }
}

export const actions={
    async getRoles({commit},payload){
        await this.$axios.get('api/admin/role').then((res)=>{
            commit('setRoles',res.data)
          })
    }
}