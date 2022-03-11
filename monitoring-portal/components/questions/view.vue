<template>
  <div>
      <v-btn depressed color="primary" rounded @click="getQuestions">Questions</v-btn>
      <v-dialog v-model="showDialig" width="800">
          <v-card>
              <v-toolbar dense color="primary">
                  <v-toolbar-title>Checklist Questions</v-toolbar-title>
                  <v-spacer/>
                  <QuestionsAdd :id="id"/>
              </v-toolbar>
              <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="questions && questions.length>0">
                                 <tr v-for="qns in questions" :key="qns.id">
                                     <td>{{qns.question}}</td>
                                     <td>{{qns.status}}</td>
                                     <td></td>
                                 </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <td colspan="3" class="text-center red--text">Questions not found</td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </v-simple-table>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
props:['id'],
data(){
    return{
       showDialig:false 
    }
},methods:{
    async getQuestions(){
      await this.$store.dispatch('checklistquestions/getData',this.id)
      this.showDialig = true
    }
},computed:{
    questions(){
        return this.$store.state.checklistquestions.data
    }
}
}
</script>

<style>

</style>