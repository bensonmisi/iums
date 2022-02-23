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
        await this.$axios.get('api/admin/procurementclassification').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        await this.$axios.post('api/admin/procurementclassification',payload).then((res)=>{
            this.dispatch('procurementclassification/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async editData({commit},payload){
        await this.$axios.patch('api/admin/procurementclassification/'+payload.id,payload.data).then((res)=>{
            this.dispatch('procurementclassification/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/admin/procurementclassification/'+payload).then((res)=>{
            this.dispatch('procurementclassification/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}