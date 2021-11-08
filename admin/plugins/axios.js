export default function ({ $axios, redirect }) {
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
        switch (error.response.status) {
            case 500:
                redirect('/500')
                break;
            
            case 403:
                    redirect('/403')
             break;
            default:
                break;
        }
       
      })
    }