export const state =()=>({
    administrators:[]
})

export const mutations={
    setAdministrators(state,payload){
        state.administrators = payload
    }
}

export const actions={
    async getAdministrators({commit}){
        await this.$axios.get('api/admin/users').then((res)=>{
            commit('setAdministrators',res.data)
          })
    }
}