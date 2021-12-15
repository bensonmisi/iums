export const state =()=>({
    rtgs:[]
})

export const mutations={
    setRtgs(state,payload){
        state.rtgs = payload
    }
}

export const actions={
    async getRtgs({commit},payload){
        await this.$axios.get('api/admin/rtgs/'+payload).then((res)=>{
            commit('setRtgs',res.data)
          })
    }
}