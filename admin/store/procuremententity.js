export const state =()=>({
    data:[],
    users:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setUsers(state,payload){
        state.users = payload
    }
}

export const actions={
    async getData({commit}){
        await this.$axios.get('api/admin/procuremententity').then((res)=>{
            commit('setData',res.data)
          })
    },


    async addEntity({commit},payload){
        await this.$axios.post('api/admin/procuremententity',payload).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
          await this.dispatch('procuremententity/getData')
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async editEntity({commit},payload){
        await this.$axios.patch('api/admin/procuremententity/'+payload.id,payload.data).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
          await this.dispatch('procuremententity/getData')
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteEntity({commit},payload){
        await this.$axios.delete('api/admin/procuremententity/'+payload).then(async(res)=>{
            this.$swal("success",res.data.message,"success")
          await this.dispatch('procuremententity/getData')
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },



    async addData({commit},payload){
        await this.$axios.post('api/admin/notice',payload).then((res)=>{
            this.dispatch('notice/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/admin/notice/'+payload).then((res)=>{
            this.dispatch('notice/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },

    async getUsers({commit},payload){
        await this.$axios.get('api/admin/procuremententity-user/'+payload).then((res)=>{
            commit('setUsers',res.data)
          })
    },
    async addUser({commit},payload){
        await this.$axios.post('api/admin/procuremententity-user',payload).then((res)=>{
            this.dispatch('procuremententity/getUsers',payload.procuremententityId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async editUser({commit},payload){
        await this.$axios.patch('api/admin/procuremententity-user/'+payload.id,payload.data).then((res)=>{
            this.dispatch('procuremententity/getUsers',payload.data.procuremententityId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteUser({commit},payload){
        await this.$axios.delete('api/admin/procuremententity-user/'+payload.id).then((res)=>{
            this.dispatch('procuremententity/getUsers',payload.data.procuremententityId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}