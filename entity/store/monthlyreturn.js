export const state =()=>({
    data:{},
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
    
}

export const actions={
    async getData({commit},payload){
        await this.$axios.get('api/entity-domain/monthlyreturn').then((res)=>{
            commit('setData',res.data)
          })
    },
    async getRecord({commit},payload){
        await this.$axios.get('api/entity-domain/monthlyreturn/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        await this.$axios.post('api/entity-domain/monthlyreturn',payload).then(async(res)=>{
                           await this.dispatch('monthlyreturn/getData')
          })
    }
}