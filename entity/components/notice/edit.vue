<template>
  <div>
      <v-btn icon color="primary" @click="edit"><v-icon>mdi-pencil</v-icon></v-btn>
      <v-dialog v-model="editDialog" width="900">
          <v-card>
              <v-card-title>Edit Notice<v-spacer/> <v-btn icon @click="editDialog=false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
              <v-card-text>
                       <v-form v-model="valid" ref="form" lazy-validation>
                <v-card>
                <v-card-text>
                    <v-row>
                   <v-col>
                  <v-text-field label="Title" dense outlined v-model="form.title" :rules="titleRule"/>
                   </v-col>
                <v-col>
                    <v-select dense v-model="form.noticetypeId" :rules="noticetypeRule" outlined label="Notice Type" :items="types" item-text="name" item-value="id" />
                </v-col>
               </v-row> 
                  <template v-if="form.noticetypeId=='7'">
                 
                   <v-row>
                       <v-col>
                    <v-select dense outlined :items="currency" v-model="form.currencyId" :rules="currencyRule" item-text="name" item-value="id" label="Currency"/>
                </v-col>
                <v-col>
                    <v-text-field dense  prefix="$" outlined v-model="form.bidvalue" :rules="bidvalueRule" label="ESTIMATE BID VALUE"/>
                </v-col>

                   </v-row>
                     <v-row>
                       <v-col>
                             <v-checkbox
                            v-model="requireBond"
                            label="Tick if you require Bid bond"
                            />
                       </v-col>
                       <v-col>
                           
                       </v-col>
                   </v-row>
               <v-row v-if="requireBond">
                
                <v-col>
                    <v-text-field dense prefix="$" outlined v-model="form.bidbond" :rules="bidbondRule" label="Bid Bond"/>
                </v-col>
                 <v-col>
                    <v-select dense outlined v-model="form.bidbondperiodId" :items="periods" item-value="id" item-text="days" :rules="bidbondperiodRule" label="Bid Bond Period(days)"/>
                </v-col>
              </v-row>
               </template>              
               <v-row>
                      <v-col>
                       <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                dense
                                label="Closing Date"
                               prepend-inner-icon="mdi-calendar"
                                outlined
                                :rules="dateRule"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="date"
                            no-title
                            scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                   </v-col>
                   <v-col>
                       <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            dense
            :rules="timeRule"
            label="Closing time"
            prepend-inner-icon="mdi-clock-time-four-outline"
            outlined
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu2.save(time)"
        ></v-time-picker>
      </v-menu>
                   </v-col>
               </v-row>
                <v-row>
                <v-col>
                    <v-select dense v-model="form.sectionId" :rules="sectionRule" outlined label="Notice Section" :items="sections" item-text="name" item-value="id" />
                </v-col> 
                 <v-col>
                    <v-select dense v-model="form.reach" :rules="reachRule" outlined label="Reach" :items="reachlist"/>
                </v-col>  
                </v-row>
                  <v-row>
                <v-col>
                  <v-file-input
                  dense
                    accept=".pdf"
                    label="Attach Tender Document"
                    outlined
                    v-model="file"
                    :rules="fileRule"
                ></v-file-input>
                </v-col>
                <v-col>
                <v-select dense outlined label="Procurement Category" :items="procurementcategories" item-value="id" item-text="name" v-model="form.procurementcategoryId" :rules="procurementcategoryRule"/>
                </v-col>            
               </v-row>
                    
                </v-card-text>
                <v-card-actions>
                    <v-btn rounded depressed color="error">Cancel</v-btn>
                    <v-spacer/>
                    <v-btn rounded depressed color="success" @click="submit">Update</v-btn>
                </v-card-actions>
            </v-card>
              </v-form>
              </v-card-text>
          </v-card>
      </v-dialog>
  </div>
</template>

<script>
export default {
props:['notice'],
data(){
    return{
        
         overlay:false,
         editDialog:false,
         valid:false,
          requireBond:false,
         planned:null,
         valid:false,
         date:this.notice.closingDate,
         menu:false,
         time: this.notice.closingTime,
         menu2: false,
         file:null,
         annualplanId:'',
         form:{
              title:this.notice.title,
              noticetypeId:this.notice.noticetypeId,
              closingDate:this.notice.closingDate,
              closingTime:this.notice.closingTime,
              currencyId:'',
              bidbond:'',
              bidvalue:'',
              sectionId:'',
              reach:'',
              procurementcategoryId:'',
              bidbondperiodId:''
         },
         titleRule:[v=>!!v ||'Title is required'],
         noticetypeRule:[v=>!!v ||'Notice Type is required'],
         dateRule:[v=>!!v ||'Date is required'],
         timeRule:[v=>!!v ||'Time is required'],
         sectionRule:[v=>!!v ||'Section is required'],
         fileRule:[v=>!!v ||'Tender Document required'],
         reachRule:[v=>!!v || 'Reach is required'],
         bidvalueRule:[v=>!!v || 'Estimate bid value is required'],
         bidbondRule:[v=>!!v || 'Bid Bond is required'],
         currencyRule:[v=>!!v || 'Currency is required'],
         bidbondperiodRule:[v=>!!v  || 'Bid Bond Period is required'],
         procurementcategoryRule:[v=>!!v || 'Procurement category required'],      
         loading:false,
         reachlist:['LOCAL','INTERNATIONAL']
    }
},methods:{
    async edit(){
       await this.$store.dispatch('settings/getNoticeSettings')
       this.editDialog = true
    },
       async submit(){
       if(this.$refs.form.validate())
       {
          this.valid = true
          this.loading=true
          this.form.closingDate =this.date
          this.form.closingTime=this.time
          let formdata = new FormData()
          formdata.append('closingDate',this.date)
          formdata.append('closingTime',this.time)
          formdata.append('file',this.file)
          formdata.append('title',this.form.title)
          formdata.append('bidbond',this.form.bidbond)
          formdata.append('bidbondperiodId',this.form.bidbondperiodId)
          formdata.append('noticetypeId',this.form.noticetypeId)
          formdata.append('annualplanId',this.annualplanId)
          formdata.append('sectionId',this.form.sectionId)
          formdata.append('reach',this.form.reach)
          formdata.append('currencyId',this.form.currencyId)
          formdata.append('bidvalue',this.form.bidvalue)
          const payload = {id:this.notice.id,data:formdata}
          await this.$store.dispatch('notice/editData',payload)
          this.loading=false
       }
     }
},computed:{
      currency(){
         return this.$store.state.settings.settings.currency
     },
     types(){
         return this.$store.state.settings.settings.noticetypes
     },
     sections(){
         return this.$store.state.settings.settings.sections
     },
     procurementcategories(){
         return this.$store.state.settings.settings.procurementcategories
     },
     periods(){
         return this.$store.state.settings.settings.periods
     }
}
}
</script>

<style>

</style>