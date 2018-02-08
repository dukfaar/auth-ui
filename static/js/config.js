import axios from 'axios'
import * as _ from 'lodash'

let config = {
}

let configPromise = axios.get('/config/config.json')
config.configPromise = configPromise

configPromise.then(response => {
    _.extend(config, response.data)
})
.catch(error => {
    console.error(error)
})

export default config