export const state =()=>({
    data:[],
    notice:{},
    url:"http://localhost:4000/api/entity-domain/"
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setNotice(state,payload){
        state.notice = payload
    }
}

export const actions={
    async getData({commit}){
        await this.$axios.get('api/entity-domain/entitynotice').then((res)=>{
            commit('setData',res.data)
          })
    },
    async getNotice({commit},payload){
        await this.$axios.get('api/entity-domain/entitynotice/'+payload).then((res)=>{
            commit('setNotice',res.data)
          })
    },
    async addData({commit},payload){      

        let config = { headers: {'content-type': 'multipart/form-data'}}
        try {
            await this.$axios({
                method:"POST",
                url:'api/entity-domain/entitynotice',
                data:payload,
                config:config
                }).then(async (res)=>{
                   this.loading = false
                   this.dispatch('notice/getData')
                   this.$swal("success",res.data.message,"success")
                   this.$router.push('/noticeproducts/'+res.data.notice.id)              

            })
        }catch (err) {
            this.loading = false
            this.$swal("error",err.response.data.message,"error")
       }
    },

    async editData({commit},payload){
        let config = { headers: {'content-type': 'multipart/form-data'}}
        await this.$axios({method:'PATCH',
                           url:'api/entity-domain/entitynotice/'+payload.id,
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
        await this.$axios.delete('api/entity-domain/entitynotice/'+payload).then((res)=>{
            this.dispatch('notice/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async cancelData({commit},payload){
        await this.$axios.delete('api/entity-domain/entitynotice/cancel/'+payload).then((res)=>{
            this.dispatch('notice/getData')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async confirm({commit},payload){
        await this.$axios.get('api/entity-domain/entitynotice/confirm/'+payload).then(res=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            this.$router.push('/procurementnotice')
        })
    },
    async publish({commit},payload){
        await this.$axios.get('api/entity-domain/entitynotice/publish/'+payload).then(res=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            this.$router.push('/procurementnotice')
        })
    }
}