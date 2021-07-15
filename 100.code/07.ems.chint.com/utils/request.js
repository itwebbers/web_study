const axios = require('axios')
const qs = require('qs')

const instance = axios.create({
  baseURL: 'http://ems.chint.com/Trailingend/Core.ashx/',
  timeout: 60000
})

instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config //添加这一行
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// instance.interceptors.response.use(
//   response => {},
//   error => {
//     console.log('err' + error) // for debug
//     return Promise.reject(error)
//   }
// )

// let service = function(url, methods, data) {
//   return instance({
//     url: url,
//     method: methods || 'get',
//     data: data || null
//   })
// }

module.exports = instance
