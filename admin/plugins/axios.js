export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
        switch (error.response.status) {
                    
            case 403:
                    this.$swal("error","You do not have permissions to perform action","error")
             break;
            default:
                break;
        }
       
      })
    }