<template>
  <div>
       <v-card class="mt-2">
    <v-card-title class="white--text indigo">
      Account Comments  
      <v-spacer/>
      <addcomment :id="id"/>
   </v-card-title>
 <v-card-text>
      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
             <th class="text-left">
            ID
          </th>
          <th class="text-left">
           Comment
          </th>
          <th class="text-left">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
          <template v-if="comments">
           <template v-if="comments.length>0"> 
        <tr
          v-for="item in comments"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
           <td>{{ item.comment }}</td>
          <td>{{ item.status }}</td>
      
        </tr>
           </template>
          <template v-else>
              <tr><td colspan="3" class="text-center red--text">No Comments Found</td></tr>
          </template>
          </template>
        
      </tbody>
    </template>
  </v-simple-table>
 </v-card-text>
   
  </v-card>
  </div>
</template>

<script>
import addcomment from './addcomment.vue'
export default {
  components: { addcomment },
name:'detailcomments',
props:['comments','id']
}
</script>

<style>

</style>