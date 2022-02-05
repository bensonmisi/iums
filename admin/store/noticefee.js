export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit},payload){
        await this.$axios.get('api/admin/noticefee/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        await this.$axios.post('api/admin/noticefee',payload).then((res)=>{
            this.dispatch('noticefee/getData',payload.noticeId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },

    async updateData({commit},payload){
        await this.$axios.patch('api/admin/noticefee/'+payload.fee.id,payload.data).then((res)=>{
            this.dispatch('noticefee/getData',payload.fee.noticeId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/admin/noticefee/'+payload.id).then((res)=>{
            this.dispatch('noticefee/getData',payload.noticeId)
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}