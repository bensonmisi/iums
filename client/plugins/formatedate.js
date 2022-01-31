import Vue from 'vue'
import moment from 'moment'
Vue.filter('formatDate', (value) => {
  const date = new Date(value)
  return moment(value).format('YYYY-MM-DD hh:mm:ss')

})

Vue.filter('formateHumanDiff',(value)=>{
  const date = new Date(value)
  return moment(date).fromNow()
})

Vue.filter('formatDays',(value)=>{
  const date = new Date(value)
  return moment(date).startOf('days').fromNow()
})

