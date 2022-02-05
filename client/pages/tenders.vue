<template>
<div>
      <v-row>
          <v-col>
              <v-card flat dark color="indigo" rounded="0">
                  <v-card-text class="d-flex">
                      <v-btn text to="/">Home</v-btn>
                       <v-btn text disabled>Browse Tenders</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
    <v-container fluid>
 <Tenders/>
    </v-container>
</div>

</template> 
<script>
export default {
  auth:false,

}
</script>