import axios from 'axios'
import global_ from '../components/tool/Global'
//  登录接口
export const userLogin = (username, password, genre) => {
  let url = `http://172.16.6.99:8910/auth/login?usercode=${username}&password=${password}&serviceType=${genre}`
  return url
}
//  判断token 是否失效接口
export const judgeToken = (Judgetoken) => {
  console.log(Judgetoken)
  if (window.sessionStorage.token === undefined) {
    global_.concealment = false
  } else {
    let url = null
    global_.concealment = true
    url = `http://172.16.6.99:8910/auth/tokenCheck?token=${Judgetoken}`
    axios.post(url).then(function (response) {
      alert(Judgetoken)
      global_.concealment = true
    })
  }
}
