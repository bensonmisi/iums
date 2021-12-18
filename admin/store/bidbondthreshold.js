export const state =()=>({
    thresholds:[]
})

export const mutations={
    setThresholds(state,payload){
        state.thresholds= payload
    }
}

export const actions={
    async getThresholds({commit},payload){
        await this.$axios.get('api/admin/bidbondthreshold/'+payload).then((res)=>{
            commit('setThresholds',res.data)
          })
    },
    async addThreshold({commit},payload){
        try {
            await this.$axios.post('api/admin/bidbondthreshold',payload).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('bidbondthreshold/getThresholds',payload.validityperiod)
              })
        } catch (error) {
             this.$swal("error",error.response.data.message,"error")    
        }
  
    },
    async updateThreshold({commit},payload){
        try {
            await this.$axios.patch('api/admin/bidbondthreshold/'+payload.id,payload.data).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('bidbondthreshold/getThresholds',payload.data.validityperiod)
              })
        } catch (error) {
             this.$swal("error",error.response.data.message,"error")    
        }
  
    },

    async deleteThreshold({commit},payload){
        try {
            await this.$axios.delete('api/admin/bidbondthreshold/'+payload.id).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('bidbondthreshold/getThresholds',payload.validityperiod)
              })
        } catch (error) {
             this.$swal("error",error.response.data.message,"error")    
        }
  
    }
}