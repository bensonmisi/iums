export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit}){
        await this.$axios.get('api/bidder/users').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        try {
            await this.$axios.post('api/bidder/users',payload).then(async(res)=>{
               await this.dispatch('users/getData')
                this.$swal("success",res.data.message,"success")
              }) 
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")     
        }
    },
    async updateData({commit},payload){
        try {
            await this.$axios.patch('api/bidder/users/'+payload.id,payload.data).then(async(res)=>{
                this.$swal("success",res.data.message,"success")
                await this.dispatch('users/getData')
              }) 
        } catch (error) {
            this.$swal("error",error.response.data.message,"error") 
        }
      
    },
    async deleteData({commit},payload){
        try {
            await this.$axios.delete('api/bidder/users/'+payload).then(async(res)=>{
                this.$swal("success",res.data.message,"success")
               await this.dispatch('users/getData')
              })   
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")
        }  
    }
}