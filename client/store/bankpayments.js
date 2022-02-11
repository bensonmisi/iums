export const state =()=>({
    data:{}
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit}){
         await this.$axios.get('api/bidder/bank-payment').then(res=>{
            commit('setData',res.data)
         }).catch(error=>{
             this.$swal('error',error.response.message,'error')
         })
        }
            
          
    
}