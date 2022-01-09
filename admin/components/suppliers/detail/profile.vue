<template>
  <div>
             <v-card class="mt-2">
           <v-card-title dark class="white--text purple">
               Profile
           </v-card-title>
           <v-card-text>
                 <v-simple-table v-if="account" dense>
                        <template v-slot:default>                       
                        <tbody>
                            <tr><th>#ID</th><td>{{account.id}}</td></tr>
                             <tr><th>Reg number</th><td>{{account.regnumber}}</td></tr>
                              <tr><th>Name</th><td>{{account.name}}</td></tr>
                              <tr><th>Account Type</th><td>{{account.suppliertype ? account.suppliertype.name : "NOT SET" }}</td></tr>
                              <tr><th>Locality</th><td>{{account.locality}}</td></tr>
                              <tr><th>City</th><td>{{account.city}}</td></tr>
                              <tr><th>Country</th><td>{{account.country}}</td></tr>

                        </tbody>
                        </template>
                    </v-simple-table>
           </v-card-text>
       </v-card>
  </div>
</template>

<script>
export default {
 name:'detailprofile',
 props:['account']
}
</script>

<style>

</style>