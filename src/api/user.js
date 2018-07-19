// import axios from 'axios'

//  沈哥    http://172.16.6.181
//  刘哥    http://172.16.6.16
//  登录接口
export const userLogin = (username, password) => {
  let url = `http://172.16.6.181:8920/auth/login?usercode=${username}&password=${password}`
  return url
}
//  判断token 是否失效接口
//  export const judgeToken = (Judgetoken, userid) => {
//   if (Judgetoken === undefined) {
//     return Promise.resolve(false)
//   } else {
//     let url = `http://172.16.6.16:8920/auth/cleanTokenCache?token=${Judgetoken}&userid=${userid}`
//     return axios.post(url).then((response) => {
//       if (response.data.code === 0) {
//         return true
//       } else {
//         return false
//       }
//     })
//   }
// }
//  退出登录
export const secede = (toKen) => {
  const url = `http://172.16.6.181:8920/auth/logout?token=${toKen}`
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
//  组织结构权限管理  获取左边的树状结构
export const managementCreatedtree = (token) => {
  const url = `http://172.16.6.181:8920/organization/getOrganizationTreeByUser?token=${token}`
  return url
}
//  组织结构权限管理 省份
export const managementCreatedProvince = () => {
  const url = `http://172.16.6.181:8920/organization/getAllProvince`
  return url
}
//  组织结构权限管理  专业类别
export const managementCreatedcategory = () => {
  const url = `http://172.16.6.181:8920/organization/getAllLevels`
  return url
}
//  组织结构权限管理   业务类别
export const managementCreatedbusiness = () => {
  const url = `http://172.16.6.181:8920/organization/getAllProfessionalCategory`
  return url
}
//  组织结构权限管理   组织类别
export const managementCreatedorganization = (token) => {
  const url = `http://172.16.6.181:8920/organization/getOrganizationType?token=${token}`
  return url
}
//  组织结构权限管理 点击新增保存
export const managementAuthority = (token, organizationtype, firecontrolcategoryid, industrycategoryid, organization, countytown, conurbation, province, organizationcode, organizationname, address, professionalcategory, level, qualificationnumber, linkman, tel) => {
  const url = `http://172.16.6.181:8920/organization/update?token=${token}&organizationtype=${organizationtype}&firecontrolcategoryid=${firecontrolcategoryid}&industrycategoryid=${industrycategoryid}&organizationid=${organization}&countyid=${countytown}&cityid=${conurbation}&provinceid=${province}&organizationcode=${organizationcode}&organizationname=${organizationname}&&address=${address}&professionalcategory=${professionalcategory}&level=${level}&qualificationnumber=${qualificationnumber}&linkman=${linkman}&tel=${tel}`
  return url
}
//  组织结构权限管理  点击左边树状获取数据-one
export const managementhandleNodeClickOne = (organization) => {
  const url = `http://172.16.6.181:8920/organization/getOrganization?organizationid=${organization}`
  return url
}
//  组织结构权限管理  点击左边树状获取数据-two
export const managementhandleNodeClickTwo = (organization) => {
  const url = `http://172.16.6.181:8920/organization/getOrganizationInfo?organizationid=${organization}`
  return url
}
