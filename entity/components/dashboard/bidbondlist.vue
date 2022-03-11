<template>
  <div flat class="mt-4 mb-4 rounded-0">
<v-card v-if="bidbonds && bidbonds.length>0" flat class="rounded-0">
    <v-toolbar flat dense color="indigo" dark>
        <v-toolbar-title>
            Bid Bond Refund List
        </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
        <v-simple-table>
            <template v-slot:default>
             <thead>
                 <tr>
                 <th>Initiation Date</th>
                 <th>Tendernumber</th>
                 <th>Refund Status</th>
                 </tr>

             </thead>   
             <tbody>
                <tr v-for="bid in bidbonds" :key="bid.id">
                    <td>{{bid.created_at|formatDate}}</td>
                    <td>{{bid.noticefee.notice.tendernumber}}</td>
                    <td>{{bid.status}}</td>
                </tr> 
             </tbody>
            </template>
        </v-simple-table>
    </v-card-text>
</v-card>
    
  </div>
</template>

<script>
export default {
props:['bidbonds']
}
</script>

<style>

</style>