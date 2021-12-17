export const state =()=>({
    periods:[]
})

export const mutations={
    setPeriods(state,payload){
        state.periods= payload
    }
}

export const actions={
    async getPeriods({commit}){
        await this.$axios.get('api/admin/bidbondperiods').then((res)=>{
            commit('setPeriods',res.data)
          })
    },
    async addPeriod({commit},payload){
        try {
            await this.$axios.post('api/admin/bidbondperiods',payload).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('bidbondperiods/getPeriods')
              })
        } catch (error) {
             this.$swal("error",error.response.data.message,"error")    
        }
  
    },
    async updatePeriod({commit},payload){
        try {
            await this.$axios.patch('api/admin/bidbondperiods/'+payload.id,payload.data).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('bidbondperiods/getPeriods')
              }) 
        } catch (error) {
            this.$swal("error",error.response.data.message,"error") 
        }
      
    },
    async deletePeriod({commit},payload){
        try {
            await this.$axios.delete('api/admin/bidbondperiods/'+payload).then((res)=>{
                this.$swal("success",res.data.message,"success")
                this.dispatch('bidbondperiods/getPeriods')
              })   
        } catch (error) {
            this.$swal("error",error.response.data.message,"error")
        }  
    }
}