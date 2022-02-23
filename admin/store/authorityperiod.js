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
        await this.$axios.get('api/admin/procurement-class-validty').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        await this.$axios.post('api/admin/procurement-class-validty',payload).then((res)=>{
            this.dispatch('authorityperiod/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}