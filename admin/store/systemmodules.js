export const state=()=>({
    modules:[]
})

export const mutations={
     setModules(state,payload){
         state.modules = payload
     }
}

export const actions={
    async getModules({commit}){
        await this.$axios.get('api/admin/system-modules').then((res)=>{
            commit('setModules',res.data)
          })
    }
}