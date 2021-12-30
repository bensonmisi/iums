export const state =()=>({
        suppliers:[]
})

export const mutations={
    setSuppliers(state,payload){
        state.suppliers = payload
    }
}

export const actions={
    async getSuppliers({commit}){
        await this.$axios.get('api/admin/suppliers').then((res)=>{
            commit('setSuppliers',res.data)
          })
    }
}