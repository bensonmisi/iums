<template>
<div>
 <v-container>
       <v-sheet height="300" class="text-center pa-10">
        <div :class="headercss">Procurement Regulatory Authority of Zimbabwe</div>
        <div class="headline">Public Procurement Portal</div>
        <v-row class="mt-2">
            <v-col md="4" offset-md="4">
                <v-row>
                    <v-col>
                        <v-btn color="success" depressed block to="register">REGISTER</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="primary" depressed block to="login">LOGIN</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
          </v-sheet>
 </v-container>
 <div class="brown lighten-5">
 <v-row >
      <v-col md="4" offset-md="4" class="text-center">
      <div class="display-1 mt-5">
       Bank Details 
      </div>
      </v-col>
 </v-row>
 </div>
</div>

</template> 
<script>
export default {
  auth:false,
  computed:{
         headercss(){
              switch (this.$vuetify.breakpoint.name)
               {
                case 'xs': return 'headline mt-4 font-weight-bold'
                case 'sm': return 'headline mt-4 font-weight-bold'
                case 'md': return 'display-2 mt-8 font-weight-bold'
                case 'lg': return 'display-2 mt-8 font-weight-bold'
                case 'xl': return  'display-2 mt-8 font-weight-bold'
                }
          }
    }

}
</script>