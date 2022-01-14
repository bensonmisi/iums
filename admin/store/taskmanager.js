export const state =()=>({
    tasks:[]
})

export const mutations={
    setTasks(state,payload){
        state.tasks = payload
    }
}

export const actions={
    async getTasks({commit}){
        await this.$axios.get('api/admin/taskmanager').then((res)=>{
            commit('setTasks',res.data)
          })
    },
    async addTask({commit},payload){
        await this.$axios.post('api/admin/taskmanager',payload).then((res)=>{
            this.dispatch('taskmanager/getTasks')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    },
    async deleteTask({commit},payload){
        await this.$axios.delete('api/admin/taskmanager/'+payload).then((res)=>{
            this.dispatch('taskmanager/getTasks')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
    ,
    async completedTask({commit},payload){
        await this.$axios.get('api/admin/taskmanager/'+payload).then((res)=>{
            this.dispatch('taskmanager/getTasks')
            this.$swal("success",res.data.message,"success")
        }).catch(error=>{
            this.$swal("error",error.response.data.message,"error")
        })
    }
}