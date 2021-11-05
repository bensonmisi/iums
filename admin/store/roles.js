export const state =()=>({
    roles:[],
    modules:[],
    submodules:[],
    permissions:[]
})

export const mutations={
    setRoles(state,payload){
        state.roles = payload
    },
    setModules(state,payload){
        state.modules = payload
    },
    setSubmodules(state,payload){
        state.submodules = payload
    },
    setPermissions(state,payload){
        state.permissions = payload
    }
}

export const actions={
    async getRoles({commit},payload){
        await this.$axios.get('api/admin/role').then((res)=>{
            commit('setRoles',res.data)
          })
    },
    async getAssignedModules({commit},payload){
        await this.$axios.get('api/admin/system-modules/assignByRole/'+payload).then((res)=>{
            commit('setModules',res.data)
        })
    },
    async getAssignedSubmodules({commit},payload){
        await this.$axios.get('api/admin/submodules/assignedByRole/'+payload.id+'/'+payload.roleId).then((res)=>{
            commit('setSubmodules',res.data)
        })
    },
    async getAssignedPermissions({commit},payload){
        await this.$axios.get('api/admin/permission/assignedByRole/'+payload.id+'/'+payload.roleId).then((res)=>{
            commit('setPermissions',res.data)
        })
    }
}