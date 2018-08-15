import axios from 'axios'
const tokenJson = window.sessionStorage.token
const token = tokenJson ? JSON.parse(tokenJson) : ''
// const CancelToken = axios.CancelToken

export const interceptors = function (router) {
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('////')
    console.log(config)
    if (token) {
      // 验证token
      // 回调
      // router.push({path: '/123123'})
      // return {
      //   ...config,
      //   cancelToken: new CancelToken(function (cancel) {
      //     cancel('')
      //   })
      // }
      if (config.url.indexOf('token') === -1) {
        if (config.url.indexOf('?') === -1) {
        } else {
          config.url = `${config.url}&token=${token}`
        }
      }
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
}
export const interceptorsResponse = function (router) {
  axios.interceptors.response.use(
    response => {
      switch (response.status) {
        case 401:
          // 这里写清除token的代码
          sessionStorage.clear()
          router.replace({
            path: '/login'
          })
      }
      return response
    },
    error => {
      return Promise.reject(error.response.data)
    })
}
