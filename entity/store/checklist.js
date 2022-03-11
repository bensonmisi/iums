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
        await this.$axios.get('api/entity-domain/returnchecklist/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    },

    async getAll({commit}){
        await this.$axios.get('api/entity-domain/returnchecklist').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
       await this.$axios.post('api/entity-domain/monthlyreturndata',payload).then(async(res)=>{
          this.$swal(res.data.status,res.data.message,res.data.status)
          await this.dispatch('monthlyreturn/getRecord',payload.monthlyreturnId)
          await this.dispatch('checklist/getData',payload.monthlyreturnId)
       }).catch(error=>{
           this.$swal(error.response.data.status,error.response.data.message,error.response.data.status)
       })
    }
}