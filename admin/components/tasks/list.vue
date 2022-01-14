<template>
  <div>
     <v-btn outlined rounded class="mr-1" @click="openTasks">Tasks
            <v-avatar
                color="error"
                size="25"
                class="ml-2"
                >
                {{tasks.length}}
                </v-avatar>
        </v-btn>
         <v-dialog v-model="showModel" width="900">
          <v-card>
              <v-card-title>
                  My Tasks
                  <v-spacer/>
                  <v-btn icon @click="showModel=false"><v-icon>mdi-close</v-icon></v-btn>
              </v-card-title>
              <v-card-text>
                  <v-simple-table>
                         <template v-slot:default>
                             <thead>
                                 <tr>
                                     <th>
                                         #
                                     </th>
                                     <th>
                                         Client
                                     </th>
                                     <th>
                                         Type
                                     </th>
                                     <th>
                                         Action
                                     </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 <template v-if="tasks.length>0">
                               <tr v-for="task in tasks" :key="task.id">
                                   <td>{{task.created_at|formateHumanDiff}}</td>
                                   <td>{{task.account ? task.account.name : ""}}</td>
                                   <td>{{task.type}}</td>
                                   <td class="d-flex pt-2 pb-2">
                                       <v-btn rounded depressed x-small color="error" @click="removeTask(task.id)">Remove</v-btn>
                                       <template v-if="task.type=='TENDERINVOICES'">
                                           <TenderinvoiceAwaiting :id="task.accountId"/>
                                       </template>
                                       <template v-if="task.type=='SUPPLIERINVOICES'">
                                            <SupplierinvoiceAwaiting :id="task.accountId"/>
                                       </template>
                                       <v-btn rounded depressed x-small color="success" class="ml-2" @click="compltedTask(task.id)">Completed</v-btn>
                                   </td>
                               </tr>
                                 </template>
                                 <template v-else>
                                     <tr>
                                         <td colspan="4" class="text-center red--text">No tasks found</td>
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
 async fetch(){
  await this.$store.dispatch('taskmanager/getTasks')
 },
 data(){
  return{
      showModel:false
  }
 },
 methods:{
  openTasks(){
      this.showModel= true
  },
  async removeTask(id){
          this.$swal({
  title: 'Are you sure?',
  text: "You want to  remove item your tasks",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(async(result) => {
    if (result.isConfirmed) {
      await this.$store.dispatch('taskmanager/deleteTask',id)
    }
})
  },
  async compltedTask(id){
          this.$swal({
  title: 'Are you sure?',
  text: "You completed this task",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes'
}).then(async(result) => {
    if (result.isConfirmed) {
      await this.$store.dispatch('taskmanager/completedTask',id)
    }
})
  }
 },
 computed:{
     tasks(){
         return this.$store.state.taskmanager.tasks
     }
 }
}
</script>

<style>

</style>