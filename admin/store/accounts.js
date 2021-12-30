export const state =()=>({
    accounts:[],
    profile:{}
})

export const mutations={
    setAccounts(state,payload){
        state.accounts = payload
    },
    setProfile(state,payload){
        state.profile = payload
    }
}

export const actions={
    async search({commit},payload){
        try {
            await this.$axios.post('api/admin/accounts/search',payload).then((res)=>{
                commit('setAccounts',res.data)
              }) 
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")  
        }
       
    },
    async getProfile({commit},payload){
        try {
            await this.$axios.get('api/admin/accounts/'+payload).then((res)=>{
                commit('setProfile',res.data)
              })   
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")  
        }
    },

    async updateProfile({commit},payload){
        try {
           await this.$axios.patch('api/admin/accounts/'+payload.id,payload).then((res)=>{
               this.$swal("success",res.data.message,res.data.staus)
              this.dispatch('accounts/getProfile',payload.id)
           })
        } catch (error) {
          this.$swal("error",error.response.data.message,"error")    
        }
      },
    async addUser({commit},payload){
      try {
         await this.$axios.post('api/admin/bidders',payload).then((res)=>{
             this.$swal("success",res.data.message,res.data.staus)
            this.dispatch('accounts/getProfile',payload.accountId)
         })
      } catch (error) {
        this.$swal("error",error.response.data.message,"error")    
      }
    },
    async updateUser({commit},payload){
        try {
           await this.$axios.patch('api/admin/bidders/'+payload.id,payload.data).then((res)=>{
               this.$swal("success",res.data.message,res.data.staus)
              this.dispatch('accounts/getProfile',payload.data.accountId)
           })
        } catch (error) {
          this.$swal("error",error.response.data.message,"error")    
        }
      }
      

}