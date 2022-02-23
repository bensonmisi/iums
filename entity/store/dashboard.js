export const state = () =>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}


export const actions={

    async getData({commit}){
        await this.$axios.get('api/entity-domain/dashboard').then((res)=>{
            commit('setData',res.data)
          })
    }
}