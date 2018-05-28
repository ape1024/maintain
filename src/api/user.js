import axios from 'axios'

//  登录接口
export const userLogin = (username, password, genre) => {
  let url = `http://172.16.6.16:8920/auth/login?usercode=${username}&password=${password}&serviceType=${genre}`
  return url
}
//  判断token 是否失效接口
export const judgeToken = (Judgetoken) => {
  if (Judgetoken === undefined) {
    return Promise.resolve(false)
  } else {
    let url = `http://172.16.6.16:8920/auth/tokenCheck?token=${Judgetoken}`
    return axios.post(url).then((response) => {
      console.log(response.data.code)
      if (response.data.code === 0) {
        return true
      } else {
        return false
      }
    })
  }
}
//  退出登录
export const secede = (toKen) => {
  let url = `http://172.16.6.99:8910/auth/logout?token=${toKen}`
  return url
}
//  系统设置->用户设置->查看用户信息
export const iConsumerexamine = (userId) => {
  let url = `http://172.16.6.16:8920/users/findUser?userid=${userId}`
  return url
}

//  用户设置  修改用户
export const modifytheUser = (userid, organizationid, usercode, username, email, tel, userstate, job, memo, file) => {
  //  用户id |
}
