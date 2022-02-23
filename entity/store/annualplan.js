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
        await this.$axios.get('api/entity-domain/annualplan').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        await this.$axios.post('api/entity-domain/annualplan',payload).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('annualplan/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },
    async editData({commit},payload){
        await this.$axios.patch('api/entity-domain/annualplan/'+payload.id,payload.data).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('annualplan/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/entity-domain/annualplan/'+payload).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('annualplan/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },async approveData(){
        await this.$axios.get('api/entity-domain/annualplan/1').then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('annualplan/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },
}