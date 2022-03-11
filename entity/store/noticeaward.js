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
        await this.$axios.get('api/entity-domain/noticeawards/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){      

    await this.$axios.post('api/entity-domain/noticeawards',payload).then(async(res)=>{
      this.$swal(res.data.status,res.data.message,res.data.status)
      this.dispatch('noticeaward/getData',payload.noticeproductId)
    }).catch(error=>{
        this.$swal("error",error.response.data.message,"error")
    })
    },

}