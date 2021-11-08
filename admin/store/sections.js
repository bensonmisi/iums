export const state =()=>({
    sections:[]
})

export const mutations={
    setSections(state,payload){
        state.sections = payload
    }
}

export const actions={
    async getSections({commit},payload){
        await this.$axios.get('api/admin/section').then((res)=>{
            commit('setSections',res.data)
          })
    }
}