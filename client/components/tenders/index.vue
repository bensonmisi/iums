<template>
  <div>
      <v-row>
          <v-col>
              <v-form ref="form">
              <v-card>
                  <v-card-text>
                      <v-row>
                          <v-col>
                              <v-text-field outlined label="Search" v-model="search"/>
                          </v-col>
                          <v-col>
                              <v-select outlined label="Filter By Entity" :items="entities" v-model="entityfilter" item-text="name" item-value="id"/>
                          </v-col>
                          <v-col>
                              <v-select outlined label="Filter By Section" :items="sections" v-model="sectionfilter" item-text="name" item-value="id"/>
                          </v-col>
                          <v-col>
                              <v-select outlined label="Filter By Type" :items="types" item-text="name" v-model="typefilter" item-value="id" />
                          </v-col>
                          <v-col md="1" class="text-right">
                              <v-btn rounded depressed color="error" @click="reset()">RESET</v-btn>
                          </v-col>
                      </v-row>
                  </v-card-text>
              </v-card>
              </v-form>
          </v-col>
      </v-row>

      <v-row>
          <v-col md="3">

    <v-card>
    

    <v-list subheader>
      <v-subheader>Sections</v-subheader>

      <v-list-item
        v-for="section in sections"
        :key="section.id"

        @click="filterBySection(section.id)"
      >
        

        <v-list-item-content>
          <v-list-item-title v-text="section.name"></v-list-item-title>
        </v-list-item-content>

            <v-list-item-action>
               <v-avatar
                    color="primary"
                    dark
                    size="30"
                    >
                    {{filtertenders(section.id)}}
                    </v-avatar>
            </v-list-item-action>
      </v-list-item>
    </v-list>
    </v-card>
    <v-card class="mt-2">

    <v-list subheader>
      <v-subheader>Notice Types</v-subheader>

      <v-list-item
        v-for="type in types"
        :key="type.id"
        @click="filterByType(type.id)"
      >        

        <v-list-item-content>
          <v-list-item-title v-text="type.name"></v-list-item-title>
        </v-list-item-content>
         <v-list-item-action>
               <v-avatar
                    color="primary"
                    dark
                    size="30"
                    >
                   {{countByType(type.id)}}
                    </v-avatar>
            </v-list-item-action>
      </v-list-item>
    </v-list>
    </v-card>
<!--     <v-card class="mt-2">
     <v-card-text>
    <v-list subheader>
      <v-subheader>Entities</v-subheader>
      <v-text-field outlined label="Search" v-model="entitysearch"/>

      <v-list-item
        v-for="entity in entities"
        :key="entity.id"
        @click="filterByEntity(entity.id)"
      >        

        <v-list-item-content>
          <v-list-item-title v-text="entity.name"></v-list-item-title>
        </v-list-item-content>
         <v-list-item-action>
               <v-avatar
                    color="primary"
                    dark
                    size="30"
                    >
                   {{countByEntity(entity.id)}}
                    </v-avatar>
            </v-list-item-action>
      </v-list-item>
    </v-list>
     </v-card-text>
  </v-card> -->

          </v-col>
          <v-col md="9">
            <TenderList :notices="tenders"/>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import TenderList from './list.vue'
import { mapGetters } from 'vuex'
export default {
    components:{TenderList},
async fetch(){
    
    await this.$store.dispatch('tenders/getData')
},
data(){
    return{
        search:'',
        entityfilter:'',
        sectionfilter:'',
        typefilter:'',
        statusfilter:'',
        entitysearch:''
    }
}
,methods:{
    reset(){
    this.$refs.form.reset()
    },
    filtertenders(id){
        const data = this.tenders

        const filtered = data.filter(dt=>{
            return dt.sectionId ==id
        })

        return filtered.length
    },
    filterBySection(id){
          this.sectionfilter = id
    },
    filterByType(id){
          this.typefilter = id
    }
    ,
    filterByEntity(id){
          this.entityfilter = id
    },
    countByEntity(id){
     const data = this.tenders

        const filtered = data.filter(dt=>{
            return dt.procuremententityId==id
        })

        return filtered.length
    },
    countByType(id){
        const data = this.tenders

        const filtered = data.filter(dt=>{
            return dt.noticetypeId ==id
        })

        return filtered.length
    }
},computed:{
      ...mapGetters(['loggedInUser']),
    tenders(){
        let data =  this.$store.state.tenders.data.notices
        if(this.search){
             return data.filter(dt=>(!dt.title.toUpperCase().indexOf(this.search.toUpperCase()) || !dt.tendernumber.toUpperCase().indexOf(this.search.toUpperCase())))
        }
        if(this.entityfilter){
            return data.filter(dt=>(dt.procuremententityId==this.entityfilter))   
        }

         if(this.sectionfilter){
            return data.filter(dt=>(dt.sectionId==this.sectionfilter))   
        }
          if(this.typefilter){
            return data.filter(dt=>(dt.noticetypeId==this.typefilter))   
        }


        return data
    },
    entities(){
       let data = this.$store.state.tenders.data.entities
        if(this.entitysearch){
            return data.filter(dt=>(!dt.name.toUpperCase().indexOf(this.entitysearch.toUpperCase())))

        }
       return data
    },
    types(){
        return this.$store.state.tenders.data.types
    },
    sections(){
        return this.$store.state.tenders.data.sections
    },
    options(){
        return ['ACTIVE','CLOSED','CANCELLED']
    }
}


}
</script>

<style>

</style>