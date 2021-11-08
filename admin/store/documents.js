export const state =()=>({
    docs:[]
})

export const mutations={
    setDocuments(state,payload){
        state.docs = payload
    }
}

export const actions={
    async getDocuments({commit},payload){
        await this.$axios.get('api/admin/documents/'+payload).then((res)=>{
            commit('setDocuments',res.data)
          })
    }
}