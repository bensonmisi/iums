export const state = () =>({
    noticetypes:[],
    currency:[],
    classifications:[],
    categories:[],
    uom:[],
    settings:{}
})

export const mutations={
    setNoticetypes(state,payload){
        state.noticetypes = payload
    },
    setCurrency(state,payload){
        state.currency = payload
    },
    setClassifications(state,payload){
        state.classifications = payload
    },
    setCategories(state,payload){
        state.categories = payload
    },
    setUom(state,payload){
        state.uom = payload
    },
    setSetting(state,payload){
        state.settings = payload
    }


    
}


export const actions={

    async getNoticetypes({commit}){
        await this.$axios.get('api/entity-domain/settings').then((res)=>{
            commit('setNoticetypes',res.data)
          })
    },
    async getCurrency({commit}){
        await this.$axios.get('api/entity-domain/settings/currency').then((res)=>{
            commit('setCurrency',res.data)
          })
    },
    async getClassifications({commit}){
        await this.$axios.get('api/entity-domain/settings/procurementclassification').then((res)=>{
            commit('setClassifications',res.data)
          })
    }
    ,
    async getCategories({commit}){
        await this.$axios.get('api/entity-domain/settings/procurementcategory').then((res)=>{
            commit('setCategories',res.data)
          })
    }
    ,
    async getUom({commit}){
        await this.$axios.get('api/entity-domain/settings/uom').then((res)=>{
            commit('setUom',res.data)
          })
    },
    async getNoticeSettings({commit}){
        await this.$axios.get('api/entity-domain/settings/noticesettings').then((res)=>{
            commit('setSetting',res.data)
          })  
    }
}