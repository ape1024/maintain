import axios from 'axios'
import { TOKEN_STATE_FALSE, TOKEN_STATE_TRUE } from './config'

export const interceptors = function () {
  axios.interceptors.request.use(function (config) {
    const tokenJson = window.sessionStorage.token
    const token = tokenJson ? JSON.parse(tokenJson) : ''
    // Do something before request is sent
    if (token) {
      if (config.url.indexOf('token') === -1) {
        if (config.url.indexOf('?') === -1) {
          config.url = `${config.url}?token=${token}&ran=${Math.random()}`
        } else {
          config.url = `${config.url}&token=${token}&ran=${Math.random()}`
        }
      } else {
        config.url = `${config.url}&ran=${Math.random()}`
      }
    }
    config.url = encodeURI(config.url)
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
}

export const interceptorsResponse = function (router, msg) {
  axios.interceptors.response.use(
    response => {
      // token已经失效的处理
      const tokenJson = window.sessionStorage.tokenState
      const tokenState = tokenJson ? JSON.parse(tokenJson) : TOKEN_STATE_TRUE
      if (tokenState === TOKEN_STATE_FALSE) {
        throw new Error('token失效')
      }
      // token在不确定失效的处理
      switch (response.data.code) {
        // 返回数据token失效状态
        case -10:
          // 这里写清除token的代码
          window.sessionStorage.clear()
          window.sessionStorage.setItem('tokenState', JSON.stringify(TOKEN_STATE_FALSE))
          router.replace({
            path: '/login'
          })
          throw new Error('token失效')
        default:
          return response
      }
    },
    error => {
      msg.alert('发送数据失败', '错误提示', {
        confirmButtonText: '确定'
      })
      return Promise.reject(error)
    })
}
