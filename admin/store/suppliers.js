export const state =()=>({
        suppliers:[],
        details:{},
        report:[]
})

export const mutations={
    setSuppliers(state,payload){
        state.suppliers = payload
    },
    setDetails(state,payload){
        state.details =  payload
    },
    setReport(state,payload){
        state.report = payload
    }

}

export const actions={
    async getSuppliers({commit}){
        await this.$axios.get('api/admin/suppliers').then((res)=>{
            commit('setSuppliers',res.data)
          })
    },
    async getReport({commit},payload){
        await this.$axios.post('api/admin/suppliers',payload).then((res)=>{
            commit('setReport',res.data)
          })
    },
    async getDetails({commit},payload){      
        try {
           this.$axios.get('/api/admin/suppliers/'+payload).then(res=>{
            commit('setDetails',res.data)          
        })    
        } catch (error) {
             this.$swal("error",error.response.data.message,"error")
        }
      
    },async addComment({commit},payload){
        try {
            this.$axios.post('/api/admin/documentcomments',payload).then(res=>{
                this.$swal("success",res.data.message,"success")
             this.dispatch('suppliers/getDetails',payload.accountId)        
         })    
         } catch (error) {
              this.$swal("error",error.response.data.message,"error")
         }
    },
    async approve({commit},payload){      
        try {
           this.$axios.patch('/api/admin/accountdocuments/approve/'+payload).then(res=>{
               if(res.data.status==='success')
               {
            this.$swal("success",res.data.message,"success")
            this.dispatch('suppliers/getDetails',payload) 
            this.dispatch('suppliers/getSuppliers') 
               }else{
                this.$swal("error",res.data.message,"error")   
               }       
        })    
        } catch (error) {
            console.log(error.response.data.message)
             //this.$swal("error",error.response.data.message,"error")
        }
      
    }
}