import axios from 'axios'
import { stringify } from 'qs'

class Http {
  constructor() {
    this.v = 1
  }

  get(url, params) {
    return new Promise((resolve, reject) => {
      if (typeof url !== 'string' || url.length === 0) reject(new Error('params url is required!'))
      axios.get(url, {
        params,
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  post(url, data, params) {
    return new Promise((resolve, reject) => {
      if (typeof url !== 'string' || url.length === 0) reject(new Error('params url is required!'))
      axios.post(url, stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params,
      }
      ).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const http = new Http()
export default http
