export const state =()=>({
    types:[]
})

export const mutations={
    setTenderfeetype(state,payload){
        state.types = payload
    }
}

export const actions={
    async getTenderfeetypes({commit},payload){
        await this.$axios.get('api/admin/tenderfeetype').then((res)=>{
            commit('setTenderfeetype',res.data)
          })
    },
    async addFeetype({commit},payload){
        try {
            await this.$axios.post('api/admin/tenderfeetype',payload).then((res)=>{
                this.dispatch('tenderfeetype/getTenderfeetypes')
                this.$swal("success",res.data.message,"success")
              }) 
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")     
        }
    },
    async updateFeetype({commit},payload){
        try {
            await this.$axios.patch('api/admin/tenderfeetype/'+payload.id,payload.data).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('tenderfeetype/getTenderfeetypes')
              }) 
        } catch (error) {
            this.$swal("error",error.response.data.message,"error") 
        }
      
    },
    async deleteFeetype({commit},payload){
        try {
            await this.$axios.delete('api/admin/tenderfeetype/'+payload).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('tenderfeetype/getTenderfeetypes')
              })   
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")
        }  
    }
}