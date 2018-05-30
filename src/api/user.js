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
  const url = `http://172.16.6.16:8920/auth/logout?token=${toKen}`
  return url
}
//  系统设置->用户设置->查看用户信息
export const iConsumerexamine = (userId) => {
  const url = `http://172.16.6.16:8920/users/findUser?userid=${userId}`
  return url
}

//  用户设置  修改用户
export const modifytheUser = (userid, organizationid, usercode, username, email, tel, userstate, job, memo) => {
  //  用户id | 组织id | 登录名 | 用户名 | 邮箱 | 电话 | 用户角色 | 职务 | 备注
  const url = `http://172.16.6.16:8920/users/updateUser?userid=${userid}&organizationid=${organizationid}&usercode=${usercode}&username=${username}&email=${email}&tel=${tel}&userstate=${userstate}&job=${job}&memo=${memo}`
  return url
}
//  用户设置  添加用户
export const appUser = (token, organizationid, usercode, username, pwd, email, tel, job, memo, userstate) => {
  //
  const url = `http://172.16.6.16:8920/users/createUser?token=${token}&organizationid=${organizationid}&usercode=${usercode}&username=${username}&pwd=${pwd}&email=${email}&tel=${tel}&job=${job}&memo=${memo}&roleids=1`
  return url
}
