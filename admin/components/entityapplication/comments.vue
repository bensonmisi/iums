<template>
  <div>
      <v-card class="mt-3">
          <v-card-title>Comments<v-spacer/><v-btn fab color="primary" depressed @click="addDialog=true"><v-icon>mdi-plus</v-icon></v-btn></v-card-title>
          <v-card-text>
              <v-simple-table>
                  <template v-slot:default>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Date</th>
                              <th>Comment</th>
                              <th>Author</th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-if="comments && comments.length>0">
                           <tr v-for="item in comments" :key="item.id">
                               <td>{{item.id}}</td>
                               <td>{{item.created_at|formatDate}}</td>
                               <td v-html="item.comment"/>
                               <td>{{item.administrator.name}} {{item.administrator.surname}}</td>
                           </tr>
                          </template>
                          <template v-else>
                              <tr>
                                  <td colspan="4" class="text-center red--text">No comments found</td>
                              </tr>
                          </template>
                      </tbody>
                  </template>
              </v-simple-table>
          </v-card-text>
      </v-card>
      <v-dialog v-model="addDialog" width="900">
          <v-card>
              <v-card-title>
                  Add Comment
                  <v-spacer/>
                  <v-btn icon @click="addDialog=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                <client-only>
                <VueEditor v-model="form.comment" />
                </client-only>
              </v-card-text>

              <v-card-actions>
                  <v-btn rounded color="error" depressed @click="addDialog=false">Cancel</v-btn>
                  <v-spacer/>
                  <v-btn rounded color="success" depressed @click="submit">Submit</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
props:['comments','id'],
data(){
    return{
     addDialog:false,
     form:{
          authorityapplicationId:'',
          comment:"",
      
     }
    }
},
methods:{
    async submit(){
        this.form.authorityapplicationId = this.id
        await this.$axios.post('api/admin/authorityapplicationcomments',this.form).then(async(res)=>{
            this.$swal(res.data.status,res.data.message,res.data.status)
            await this.$store.dispatch('entityapplications/getRecord',this.id)
        }).catch(error=>{
         this.$swal('error',error.response.data.message,'error')
        })
    }
}
}
</script>

<style>

</style>