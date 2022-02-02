export const state =()=>({
    data:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit},payload){
            commit('setData',payload)
          
    }
}