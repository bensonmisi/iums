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
        await this.$axios.get('api/bidder/noticeinvoicing').then((res)=>{
            commit('setData',res.data)
          }).catch(error=>{
            commit('setData',[])
          })
    },

    async getAll({commit}){
        await this.$axios.get('api/bidder/noticeinvoicing/all').then((res)=>{
            commit('setData',res.data)
          }).catch(error=>{
            commit('setData',[])
          })
    },
    async addData({commit},payload){
        await this.$axios.get('api/bidder/noticeinvoicing/'+payload).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            commit('setData',res.data)
          }).catch(error=>{
           this.$swal("error",error.response.data.message,"error")
           if(error.response.data.statusCode==412){
               this.$router.push('/bankdetails')
           }
          }) 
    },

    async removeData({commit},payload){
        await this.$axios.delete('api/bidder/noticeinvoicing/'+payload).then((res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            commit('setData',res.data)
          }).catch(error=>{
           this.$swal("error",error.response.data.message,"error")
          }) 
    }
}