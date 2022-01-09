export const state =()=>({
    thresholds:[]
})

export const mutations={
    setThresholds(state,payload){
        state.thresholds = payload
    }
}

export const actions={
    async getThresholds({commit},payload){
        await this.$axios.get('api/admin/contactfeethreshold').then((res)=>{
            commit('setThresholds',res.data)
          })
    },
    async addThreshold({commit},payload){
        await this.$axios.post('api/admin/contactfeethreshold',payload).then((res)=>{
            this.dispatch('contractfeethreshold/getThresholds')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async updateThreshold({commit},payload){
        await this.$axios.patch('api/admin/contactfeethreshold/'+payload.id,payload.data).then((res)=>{
            this.dispatch('contractfeethreshold/getThresholds')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteThreshold({commit},payload){
        await this.$axios.delete('api/admin/contactfeethreshold/'+payload).then((res)=>{
            this.dispatch('contractfeethreshold/getThresholds')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
    


}