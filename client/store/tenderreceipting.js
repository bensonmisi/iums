export const state =()=>({
    data:[]
})

export const mutations={
    setData(state,payload){
        state.data = payload
    }
}

export const actions={
    async getData({commit},payload){
        await this.$axios.get('api/bidder/tenderreceipting/'+payload).then(res=>{

         this.$swal(res.data.status,res.data.message,res.data.status)
         if(res.data.status=="error"){
            this.$router.push('/tenderinvoicing')
         }
         commit('setData',res.data)
        }).catch(error=>{            
            this.$swal("error",error.response.data.message,"error")
            if(error.response.data.statusCode==204){
                this.$router.push('/tenderinvoicing')
            }
        })
    }
}