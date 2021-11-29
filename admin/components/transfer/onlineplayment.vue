<template>
   <v-simple-table dense>
                    <template v-slot:default>
                       <tbody>
                           <tr>
                               <th>Poll Url</th><td><a :href="transaction.pollUrl">{{transaction.pollUrl }}</a></td>
                           </tr>
                            <tr>
                               <th>Mode</th><td>{{transaction.mode }}</td>
                           </tr>
                            <tr>
                               <th>type</th><td>{{transaction.type  }}</td>
                           </tr>
                             <tr>
                               <th>Status</th><td>{{transaction.status  }}</td>
                           </tr>
                           <tr>
                               <th>Payment Date</th><td>{{transaction.updated_at  }}</td>
                           </tr>
                                                    
                       </tbody>
                    </template>
                 </v-simple-table>
</template>

<script>
export default {
 props:['transaction']
}
</script>

<style>

</style>