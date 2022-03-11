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
        await this.$axios.get('api/entity-domain/entitynoticefee/'+payload).then((res)=>{
            commit('setData',res.data)
          })
    }

}