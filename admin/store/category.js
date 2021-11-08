export const state =()=>({
    categories:[]
})

export const mutations={
    setCategories(state,payload){
        state.categories = payload
    }
}

export const actions={
    async getCategories({commit},payload){
        await this.$axios.get('api/admin/categories').then((res)=>{
            commit('setCategories',res.data)
          })
    }
}