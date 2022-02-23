<template>
  <div>
         <v-btn depressed rounded color="primary" @click="showSelection">Assign Class</v-btn>
         <v-dialog width="400" v-model="showDialog">
             <v-card>
                 <v-card-title>Select Procument Class</v-card-title>
                 <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in classlist" :key="item.id">
                                <td>{{item.name}}</td>
                                <td><v-btn rounded color="primary" small @click="assign(item.id)">Select</v-btn></td>
                              </tr>
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
     showDialog:false,
     form:{
       procurementclassId:''
     }

   }
 },
 methods:{
   async showSelection(){
      await this.$store.dispatch('procurementclass/getData')
      this.showDialog=true
   },
   async assign(id){
             this.$swal({
              title: 'Are you sure?',
              text: "You want to assign class to application",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then(async(result) => {
              if (result.isConfirmed) {
                  this.form.procurementclassId = id
                const payload ={id:this.id,data:this.form}
              await this.$store.dispatch('entityapplications/assignClass',payload)
              }
            })
    
   }
 },computed:{
    classlist(){
      return this.$store.state.procurementclass.data
    }
 }
}
</script>

<style>

</style>