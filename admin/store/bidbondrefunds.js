export const state =()=>({
    refundlist:[]
})

export const mutations={
    setRefundlist(state,payload){
        state.refundlist = payload
    }
}

export const actions={
    async getrefundlist({commit},payload){
        await this.$axios.get('api/admin/bidbondrefund/'+payload).then((res)=>{
            commit('setRefundlist',res.data)
          })
    },
    async addRefundlist({commit},payload){ 
       await this.$axios.post('api/admin/bidbondrefund',payload).then(async(res)=>{
        this.$swal('success',res.data.message,'success')
           await this.dispatch('bidbondrefunds/getrefundlist',payload.applicationId)
           await this.dispatch('bankdetails/getDetails',payload.accountId)
         
       }).catch(error=>{
           this.$swal('error',error.response.data.message,"error")
       })
    },
    async updateRefund({commit},payload){
        await this.$axios.patch('api/admin/bidbondrefund/'+payload.id,payload).then((res)=>{
            this.dispatch('bidbondrefunds/getrefundlist',payload.applicationId)
            this.$swal('success',res.data.message,'success')
        }).catch(error=>{
            this.$swal('error',error.response.data.message,"error")
        })
    },
    async approveRequest({commit},payload){
        await this.$axios.get('api/admin/bidbondrefund/approve/'+payload.id).then((res)=>{
            this.dispatch('bidbondrefunds/getrefundlist',payload.applicationId)
            this.$swal('success',res.data.message,'success')
        }).catch(error=>{
            this.$swal('error',error.response.data.message,"error")
        })
    }
}