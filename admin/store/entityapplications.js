export const state = () =>({
    data:[],
    record:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setRecord(state,payload){
        state.record = payload
    }
}


export const actions={

    async getData({commit},payload){
        await this.$axios.get('api/admin/procurementapplication').then((res)=>{
            commit('setData',res.data)
          })
    },
    async getRecord({commit},payload){
        await this.$axios.get('api/admin/procurementapplication/'+payload).then((res)=>{
            commit('setRecord',res.data)
          })
    },

    async assignClass({commit},payload){
        await this.$axios.patch('api/admin/procurementapplication/assign/'+payload.id,payload.data).then(async(res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           await this.dispatch('entityapplication/getData')
          }).catch(error=>{
              this.$swal("error",error.response.data.message,"error")
          })
    },
 
 
}