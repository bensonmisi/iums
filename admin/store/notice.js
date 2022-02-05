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
        await this.$axios.get('api/admin/notice').then((res)=>{
            commit('setData',res.data)
          })
    },
    async addData({commit},payload){      

        let config = { headers: {'content-type': 'multipart/form-data'}}
        try {
            await this.$axios({
                method:"POST",
                url:'api/admin/notice',
                data:payload,
                config:config
                }).then(async (res)=>{
                   this.loading = false
                   this.dispatch('notice/getData')
                   this.$swal("success",res.data.message,"success")              

            })
        }catch (err) {
            this.loading = false
            this.$swal("error",err.response.data.message,"error")
       }
    },

    async updateData({commit},payload){
        let config = { headers: {'content-type': 'multipart/form-data'}}
        await this.$axios({method:'PATCH',
                           url:'api/admin/notice/'+payload.id,
                           data:payload.data,
                           config:config
                        }).then((res)=>{
            this.dispatch('notice/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteData({commit},payload){
        await this.$axios.delete('api/admin/notice/'+payload).then((res)=>{
            this.dispatch('notice/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}