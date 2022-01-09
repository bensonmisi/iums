export const state =()=>({
    details:[]
})

export const mutations={
    setDetails(state,payload){
        state.details = payload
    }
}

export const actions={
    async getDetails({commit},payload){
        await this.$axios.get('api/admin/bankdetails/'+payload).then((res)=>{
            commit('setDetails',res.data)
          })
    },
   async getAll({commit}){
       await this.$axios.get('api/admin/bankdetails').then((res)=>{
           commit('setDetails',res.data)
       })
   },

   async approve({commit},payload){
    await this.$axios.get('api/admin/bankdetails/approve/'+payload).then((res)=>{
        this.$swal("success",res.data.message,"success")
        this.dispatch('bankdetails/getAll')
    })
}



}