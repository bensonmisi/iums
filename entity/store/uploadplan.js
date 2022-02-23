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
        await this.$axios.get('api/entity-domain/uploadplan').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){
        let config = { headers: {'content-type': 'multipart/form-data'}}
 
     
        await this.$axios(
            {
                method:"POST",
                url:'api/entity-domain/uploadplan',
                data:payload,
                config:config
            }
            ).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
           this.dispatch('uploadplan/getData')
          }).catch(error=>{
              this.$swal('error',error.response.data.message,'error')
          })
    },
    async removeItem({commit},payload){
        await this.$axios.delete('api/entity-domain/uploadplan/'+payload).then(async(res)=>{
         this.dispatch('uploadplan/getData')
         this.$swal(res.data.status,res.data.message,res.data.status)
        }).catch(error=>{
            this.$swal('error',error.response.data.message,'error')
        })
    }
}