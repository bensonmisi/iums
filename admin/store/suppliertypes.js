export const state =()=>({
    types:[]
})

export const mutations={
    setTypes(state,payload){
        state.types = payload
    }
}

export const actions={
    async getTypes({commit}){
        await this.$axios.get('api/admin/suppliertype').then((res)=>{
            commit('setTypes',res.data)
          })
    }
}