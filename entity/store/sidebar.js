export const state = () =>({
    menus:[]
})

export const mutations={
    setMenus(state,payload){
        state.menus = payload
    }
}


export const actions={

    async getMenus({commit}){
        await this.$axios.get('api/admin/adminmenus').then((res)=>{
            commit('setMenus',res.data)
          })
    }
}