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
    async addRole({commit},payload){
          await this.$axios.post('api/admin/role',payload).then(async(res)=>{
              this.$swal("success",res.data.message,"success")
              await this.dispatch('roles/getRoles')              
          }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
          })
    },
    async editRole({commit},payload){
        await this.$axios.patch('api/admin/role/'+payload.id,payload.data).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
            await this.dispatch('roles/getRoles')              
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
  },
  async deleteRole({commit},payload){
    await this.$axios.delete('api/admin/role/'+payload).then(async(res)=>{
        this.$swal("success",res.data.message,"success")
        await this.dispatch('roles/getRoles')              
    }).catch(error=>{
        this.$swal("error",error.response.data.message)
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