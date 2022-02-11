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
         await this.$axios.get('api/bidder/paynow-payment').then(res=>{
            commit('setData',res.data)
         }).catch(error=>{
             this.$swal('error',error.response.message,'error')
         })
        },

    async checkPayment({commit},payload){
        await this.$axios.get('api/bidder/paynow-payment/'+payload).then(async(res)=>{
             this.$swal('success',res.data.message,'success')
             await this.dispatch('paynow/getData')
         }).catch(error=>{
             this.$swal('error',error.response.message,'error')
         })
    }
            
          
    
}