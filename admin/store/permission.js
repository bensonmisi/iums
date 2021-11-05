export const state =()=>({
    permissions:[]
})

export const mutations={
    setPermissions(state,payload){
        state.permissions = payload
    }
}

export const actions={
    async getPermissions({commit},payload){
        await this.$axios.get('api/admin/permission/all/'+payload).then((res)=>{
            commit('setPermissions',res.data)
          })
    }
}