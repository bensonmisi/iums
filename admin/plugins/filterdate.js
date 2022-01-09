import Vue from 'vue'
import moment from 'moment'
Vue.filter('formatDate', (value) => {
  const date = new Date(value)
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

Vue.filter('formateHumanDiff',(value)=>{
  const date = new Date(value)
  return moment(date).fromNow()
})

Vue.filter('formatDays',(value)=>{
  const date = new Date(value)
  return moment(date).startOf('days').fromNow()
})



