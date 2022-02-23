export const state = () =>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}


export const actions={

    async getData({commit}){
        await this.$axios.get('api/entity-domain/organogram').then((res)=>{
            commit('setData',res.data)
          })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/entity-domain/organogram/'+payload).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('organograms/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    }
}