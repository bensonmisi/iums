<template>
  <div>
      <v-btn icon @click="showDialog=true">
            <v-badge
          color="red"
          :content="commentscount"
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
         </v-btn>
         <v-dialog v-model="showDialog" width="700">
             <v-card>
                 <v-card-title>Comments<v-spacer/><v-btn icon @click="showDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
                 <v-card-text>
                     <div v-for="comment in comments" :key="comment.id" class="pt-3">
                         <div>{{comment.comment}}</div>
                         <small class="pb-3"><b>{{comment.created_at | formateHumanDiff}}</b></small>
                         <v-divider/>
                     </div>
                 </v-card-text>
             </v-card>
         </v-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
           showDialog:false
        }
    },
computed:{
    commentscount(){
        let count = 0
       const comments= this.$store.state.dashboard.data.comments
       count = comments ? comments.length : 0
        return count
    },
    comments(){
        return this.$store.state.dashboard.data.comments
    }
}
}
</script>

<style>

</style>