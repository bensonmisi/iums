export const state =()=>({
    data:[],
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit},payload){
        await this.$axios.get('api/entity-domain/entitynoticeproduct/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){      

    await this.$axios.post('api/entity-domain/entitynoticeproduct',payload).then(async(res)=>{
      this.$swal(res.data.status,res.data.message,res.data.status)
      this.dispatch('noticeproduct/getData',payload.noticeId)
    }).catch(error=>{
        this.$swal("error",error.response.data.message,"error")
    })
    },

    async editData({commit},payload){
        await this.$axios.patch('api/entity-domain/entitynoticeproduct/'+payload.id,payload.data).then(async(res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            this.dispatch('noticeproduct/getData',payload.data.noticeId)
          }).catch(error=>{
              this.$swal("error",error.response.data.message,"error")
          })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/entity-domain/entitynoticeproduct/'+payload.id).then((res)=>{
            this.dispatch('noticeproduct/getData',payload.noticeId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}