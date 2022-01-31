<template>
    <div>
      <v-row>
          <v-col>
              <v-card>
                  <v-card-text class="d-flex">
                      <v-btn text to="/dashboard">Dashboard</v-btn>
                       <v-btn text disabled>General Account Settings</v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
          <v-col md="6" offset-md="3">
            <v-form v-model="valid" ref="form" lazy-validation>
               <v-card>
                  <v-card-title>
                    General Account Settings
                </v-card-title>
                  <v-card-text>
                    <v-alert
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
    >
     Update your account settings to continue with the registration process
    </v-alert>
                    <v-row><v-col><v-select outlined label="Account Type" v-model="form.suppliertypeId" :rules="suppliertypeRule" :items="suppliertypes" item-value="id" item-text="name"/></v-col></v-row>
                    
                     <v-row>
                                   <v-col>
                                       <v-select
                                           :items="countrylist"
                                           label="Country"
                                           outlined
                                           v-model="form.country"
                                           :rules="countryRule"
                                       >
                                       </v-select>
                                   </v-col>
                     </v-row>
                     <v-row>
                                   <v-col>
                                       <v-text-field
                                           v-model="form.city"
                                           label="City"
                                           outlined
                                           :rules="cityRule"
                                       >
                                       </v-text-field>
                                   </v-col>
                               </v-row>
                    
                        <v-row v-if="form.country =='Zimbabwe'">
                                   <v-col>
                                       <v-select
                                           :items="provincelist"
                                           label="Province"
                                           outlined
                                           v-model="form.province"
                                           :rules="provinceRule"
                                       >
                                       </v-select>
                                   </v-col>
                        </v-row>
                        <v-row>
                                   <v-col>
                                       <v-select
                                           :items="computeList"
                                           label="District"
                                           outlined
                                           v-model="form.district"
                                           :rules="districtRule"
                                       >
                                       </v-select>
                                   </v-col>
                               </v-row>
                  </v-card-text>
                   <v-card-actions>
                      <v-btn rounded depressed class="error" to="/">Cancel</v-btn>
                      <v-spacer/>
                      <v-btn rounded depressed class="success" @click="submit">Submit</v-btn>
                  </v-card-actions>                
                </v-card>
            </v-form>
          </v-col>
      </v-row>
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
layout:'user',
data(){
    return{
      overlay:false,
      form:{
              suppliertypeId:'',
               country:'',
               city:'',
               district:'',
               province:''
      },
       suppliertypes:[],
       suppliertypeRule:[v=>!!v || 'Supplier type is required'],
        countryRule:[v=>!!v || 'Select Country'],
        cityRule:[v=>!!v || 'Select City'],
        districtRule:[v=>!!v || 'District  is required'],
        provinceRule:[v=>!!v || 'Province  is required'],
        provincelist:['Matabeleland South','Mashonaland Central','Mashonaland West','Mashonaland North','Mashonaland East','Masvingo','Midlands','Manicaland','Bulawayo','Harare'],
        countrylist:['Zimbabwe','Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', ' Bahrain', ' Bangladesh', ' Barbados', ' Belarus', ' Belgium', ' Belize', ' Benin', ' Bermuda', ' Bhutan', ' Bolivia', ' Bosnia and Herzegovina', ' Botswana', ' Bouvet Island', ' Brazil', ' British Indian Ocean Territory', ' Brunei Darussalam', ' Bulgaria', ' Burkina Faso', ' Burundi', ' Cambodia', ' Cameroon', ' Canada', ' Cape Verde', ' Cayman Islands', ' Central African Republic', ' Chad', ' Chile', ' China', ' Christmas Island', ' Cocos (Keeling Islands)', ' Colombia', ' Comoros', ' Congo', ' Cook Islands', ' Costa Rica', ' Cote D Ivoire (Ivory Coast)', ' Croatia (Hrvatska', ' Cuba', ' Cyprus', ' Czech Republic', ' Denmark', ' Djibouti', ' Dominica', ' Dominican Republic', ' East Timor', ' Ecuador', ' Egypt', ' El Salvador', ' Equatorial Guinea', ' Eritrea', ' Estonia', ' Ethiopia', ' Falkland Islands (Malvinas)', ' Faroe Islands', ' Fiji', ' Finland', ' France', ' France', ' Metropolitan', ' French Guiana', ' French Polynesia', ' French Southern Territories', ' Gabon', ' Gambia', ' Georgia', ' Germany', ' Ghana', ' Gibraltar', ' Greece', ' Greenland', ' Grenada', ' Guadeloupe', ' Guam', ' Guatemala', ' Guinea', ' Guinea-Bissau', ' Guyana', ' Haiti', ' Heard and McDonald Islands', ' Honduras', ' Hong Kong', ' Hungary', ' Iceland', ' India', ' Indonesia', ' Iran', ' Iraq', ' Ireland', ' Israel', ' Italy', ' Jamaica', ' Japan', ' Jordan', ' Kazakhstan', ' Kenya', ' Kiribati', ' Korea (North)', ' Korea (South)', ' Kuwait', ' Kyrgyzstan', ' Laos', ' Latvia', ' Lebanon', ' Lesotho', ' Liberia', ' Libya', ' Liechtenstein', ' Lithuania', ' Luxembourg', ' Macau', ' Macedonia', ' Madagascar', ' Malawi', ' Malaysia', ' Maldives', ' Mali', ' Malta', ' Marshall Islands', ' Martinique', ' Mauritania', ' Mauritius', ' Mayotte', ' Mexico', ' Micronesia', ' Moldova', ' Monaco', ' Mongolia', ' Montserrat', ' Morocco', ' Mozambique', ' Myanmar', ' Namibia', ' Nauru', ' Nepal', ' Netherlands', ' Netherlands Antilles', ' New Caledonia', ' New Zealand', ' Nicaragua', ' Niger', ' Nigeria', ' Niue', ' Norfolk Island', ' Northern Mariana Islands', ' Norway', ' Oman', ' Pakistan', ' Palau', ' Panama', ' Papua New Guinea', ' Paraguay', ' Peru', ' Philippines', ' Pitcairn', ' Poland', ' Portugal', ' Puerto Rico', ' Qatar', ' Reunion', ' Romania', ' Russian Federation', ' Rwanda', ' Saint Kitts and Nevis', ' Saint Lucia', ' Saint Vincent and The Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Seychelles', 'Sierra Leone', ' Singapore', ' Slovak Republic', ' Slovenia', ' Solomon Islands', ' Somalia', ' South Africa', ' S. Georgia and S. Sandwich Isls.', ' Spain', ' Sri Lanka', ' St. Helena', 'St. Pierre and Miquelon', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen Islands', ' Swaziland', ' Sweden', ' Switzerland', ' Syria', ' Taiwan', ' Tajikistan', ' Tanzania', ' Thailand', ' Togo', ' Tokelau', ' Tonga', ' Trinidad and Tobago', ' Tunisia', ' Turkey', ' Turkmenistan', ' Turks and Caicos Islands', ' Tuvalu', ' Uganda', ' Ukraine', ' United Arab Emirates', ' United Kingdom (Britain / UK)', ' United States of America (USA)', ' US Minor Outlying Islands', ' Uruguay', ' Uzbekistan', ' Vanuatu', ' Vatican City State (Holy See)', ' Venezuela', ' Viet Nam', ' Virgin Islands (British)', 'Virgin Islands (US)', 'Wallis and Futuna Islands', 'Western Sahara', 'Yemen', 'Yugoslavia', 'Zaire', ' Zambia'],
        

    }
},async fetch(){
      await this.$axios.get('api/auth/suppliertypes').then((res)=>{
          this.suppliertypes = res.data
      })  
   },
   methods:{
     async submit(){
     
         if(this.$refs.form.validate()){
          this.valid = true
           this.overlay=true
           try {
                await this.$axios.patch('/api/bidder/profile/account/update',this.form).then((res)=>{
             this.$swal(res.data.status,res.data.message,res.data.status)
             this.overlay=false
             this.$router.push('/supplier/documents')
           })
           } catch (error) {
             this.overlay = false
             this.$swal('error',error.response.data.message,"error") 
           }
        
           }
     }
   },
  computed:{
   ...mapGetters(['loggedInUser']),
                computeList(){
            var list = [];
            if(this.form.province =='Matabeleland South')
            {
                list=['Beitbridge','Bulilima','Gwanda','Insiza','Mangwe','Matobo','Umzingwane']
            }
            else if(this.form.province =='Bulawayo'){
                list =['Bulawayo']
            }
            else if(this.form.province=='Mashonaland Central'){
                list=["Bindura","Guruve","Mazowe","Mbire","Mount Darwin","Muzarabani"]
            }
            else if(this.form.province=='Mashonaland West'){
                list=["Chegutu","Chinhoyi","Hurungwe","Kariba","Makonde","Mhondoro-Ngezi","Sanyati","Zvimba"]
            }
            else if(this.form.province=='Mashonaland East'){
                list=["Chikomba","Goromonzi","Marondera","Mudzi","Murehwa","Mutoko","Seke","Uzumba-Maramba-Pfungwe"]
            }
            else if(this.form.province=='Masvingo'){
                list=["Bikita","Chiredzi","Chivi","Gutu","Masvingo","Mwenezi","Zaka"]
            }
            else if(this.form.province=='Midlands'){
                list=["Chirumhanzu","Gokwe North","Gokwe South","Gweru","Kwekwe","Mberengwa","Shurugwi","Zvishavane"]
            }
            else if(this.form.province=='Manicaland'){
                list=[ "Buhera","Chimanimani","Chipinge","Makoni","Mutare","Mutasa","Nyanga"]
            }
            else if(this.form.province=='Harare'){
                list=['Harare']
            }

            return list;
        }

   }
}
</script>