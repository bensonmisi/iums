export const state =()=>({
    noticetypes:[]
})

export const mutations={
    setNoticetypes(state,payload){
        state.noticetypes = payload
    }
}

export const actions={
    async getTypes({commit},payload){
        await this.$axios.get('api/admin/noticetypes').then((res)=>{
            commit('setNoticetypes',res.data)
          })
    },
    async addType({commit},payload){
        try {
            await this.$axios.post('api/admin/noticetypes',payload).then((res)=>{
                this.$swal("success",res.data.message,"success")
                 this.dispatch('noticetypes/getTypes')
                })
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")   
       
        }
    
    },
    async updateType({commit},payload){
        try {
            await this.$axios.patch('api/admin/noticetypes/'+payload.id,payload.data).then((res)=>{
                this.$swal("success",res.data.message,"success")
                 this.dispatch('noticetypes/getTypes')
                })
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")   
       
        }
    
    },
}