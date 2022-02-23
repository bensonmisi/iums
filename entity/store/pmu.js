export const state = () =>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}


export const actions={

    async getData({commit},payload){
        await this.$axios.get('api/entity-domain/procurementmanagementunit').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){  
          await this.$axios.post('api/entity-domain/procurementmanagementunit',payload).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('pmu/getData',payload.annualplanId)
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },
    async editData({commit},payload){
        await this.$axios.patch('api/entity-domain/procurementmanagementunit/'+payload.id,payload.data).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('pmu/getData',payload.annualplanId)
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/entity-domain/procurementmanagementunit/'+payload.id).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('pmu/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    }
}