export const state =()=>({
    data:[],
    invoice:{},
    setting:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    },
    setSetting(state,payload){
        state.setting = payload
    },
    setInvoice(state,payload){
        state.invoice= payload
    }
}

export const actions={
    async getData({commit}){
        await this.$axios.get('api/bidder/supplierinvoicing').then((res)=>{
            commit('setData',res.data)
          })
    },
    async getPending({commit}){
        await this.$axios.get('api/bidder/supplierinvoicing/pending').then((res)=>{
            commit('setInvoice',res.data)
          })
    },
    async getSettings({commit}){
        await this.$axios.get('api/bidder/supplierinvoicing/settings').then((res)=>{
            commit('setSetting',res.data)
        })
    },
    async addItem({commit},payload){
        await this.$axios.post('api/bidder/supplierinvoicing',payload).then(async (res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            await this.dispatch('invoicing/getPending')
        }).catch(error=>{
            this.$swal('error',error.response.data.message,'error')
        })
    },
    async removeItem({commit},payload){
        await this.$axios.delete('api/bidder/supplierinvoicing/'+payload).then(async (res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            await this.dispatch('invoicing/getPending')
        }).catch(error=>{
            this.$swal('error',error.response.data.message,'error')
        })
    }
}