<template>
    <v-container fluid>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="dashboard">Dashboard</v-btn>
                       <v-btn text disabled>Bidbond Management</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                  <v-card>
                <v-card-text>
                  
                   
                     <v-text-field
                            label="Filter"
                            outlined
                            v-model="filter"
                        />
                      
                </v-card-text>
                  </v-card>
          </v-col>
      </v-row>
      <v-row class="mt-5">
          <v-col>
                <v-card>
                        <v-toolbar
                        color="purple"
                        dark
                        flat
                        prominent
                        >
                         <template v-slot:extension>
                             <v-tabs
                      fixed-tabs
                    v-model="tabs">
                    <v-tab v-for="(account,index) in bidbonds" :key="index">{{index}}
                        <v-badge
          color="black"
          :content="account.length"
        />
                    </v-tab>
                </v-tabs>
                         </template>
                        </v-toolbar>
                <v-card-title>
                 
                </v-card-title>
                <v-card-text>
                   <v-tabs-items v-model="tabs">
                    <v-tab-item
                     v-for="(account,index) in bidbonds" :key="index"
                    >
                    <BidbondsList :bidbonds="account"/>
                    </v-tab-item>
                   </v-tabs-items>
                </v-card-text>
            </v-card>
          </v-col>
      </v-row>
           <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        timeout="2000"
      ></v-progress-circular>
    </v-overlay>
    </v-container>
</template>

<script>

export default {
layout:'user',
data(){
    return{
        overlay:false,
        filter:"",
        tabs:null
    }
},
async fetch(){
    this.overlay=true
   await this.$store.dispatch('bidbonds/getRecords') 
   this.overlay = false
},computed:{
    bidbonds(){
      let  data =  this.$store.state.bidbonds.records
            if(this.filter !='')
            {
              data= data.filter(dt=>(!dt.tendernumber.toUpperCase().indexOf(this.filter.toUpperCase())|| !dt.entity.toUpperCase().indexOf(this.filter.toUpperCase())))
            }

                const grouped = data.reduce((acc,obj)=>{
         const key = obj['status']
         if(!acc[key]){
             acc[key]=[]
         }
         acc[key].push(obj)
         return acc
       },{})

      return  grouped

    }
}
}
</script>

<style>

</style>