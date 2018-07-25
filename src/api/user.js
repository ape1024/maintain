// import axios from 'axios'

//  沈哥    http://172.16.6.181
//  刘哥    http://172.16.6.16
//  登录接口
export const userLogin = (username, password) => {
  let url = `http://172.16.6.181:8920/auth/login?usercode=${username}&password=${password}`
  return url
}
//  退出登录
export const secede = (toKen) => {
  const url = `http://172.16.6.181:8920/auth/logout?token=${toKen}`
  return url
}
//  系统设置->用户设置->查看用户信息
export const iConsumerexamine = (userId) => {
  const url = `http://172.16.6.181:8920/users/findUser?userid=${userId}`
  return url
}

//  用户设置  修改用户
export const modifytheUser = (userid, organizationid, username, email, tel, userstate, job, memo, roleids, file) => {
  //  用户id | 组织id | 登录名 | 用户名 | 邮箱 | 电话 | 用户角色 | 职务 | 备注
  const url = `http://172.16.6.16:8920/users/updateUser?userid=${userid}&organizationid=${organizationid}&username=${username}&email=${email}&tel=${tel}&userstate=${userstate}&job=${job}&memo=${memo}&roleids=${roleids}&file=${file}`
  return url
}
//  用户设置  添加用户
export const appUser = (token, organizationid, usercode, username, pwd, email, tel, job, memo, userstate) => {
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
//  公共api  区域   设备类别 审核状态
export const findAreasTreeByProjectid = (projectid) => {
  //  区域
  const url = `http://172.16.6.181:8920/areas/findAreasTreeByProjectid?projectid=${projectid}`
  return url
}
export const findAllDeviceType = () => {
  //  获取设备类别
  const url = 'http://172.16.6.181:8920/dev/findAllDeviceType'
  return url
}
export const getTaskQueryApprovalItems = () => {
  //  审核状态
  const url = 'http://172.16.6.181:8920/task/getTaskQueryApprovalItems'
  return url
}
//  home
export const maintainHomeRightTop = (projectid) => {
  const url = `http://172.16.6.16:8920/dev/statDeviceAndQuestionAndTaskRate?projectid=${projectid}`
  return url
}
export const maintainHomeRightBottom = (projectid) => {
  const url = `http://172.16.6.16:8920/dev/statTaskDoneState?projectid=${projectid}`
  return url
}
export const maintainHomeInspection = (projectid) => {
  const url = `http://172.16.6.16:8920/dev/statTaskDoneState2?projectid=${projectid}`
  return url
}
export const maintainHomeStacked = (projectid) => {
  const url = `http://172.16.6.16:8920/dev/statDevRunState?projectid=${projectid}`
  return url
}
//  daily
export const maintainDailyCurrentTaskStat = (worktypeid, projectid) => {
  const url = `http://172.16.6.181:8920/task/getCurrentTaskStat?worktypeid=${worktypeid}&projectid=${projectid}`
  return url
}
//  通过一级的id获取二级数据
export const maintainDailygetCurrentTaskDeviceStat = (itemAreaid) => {
  const url = `http://172.16.6.181:8920/task/getCurrentTaskDeviceStat?taskid=${itemAreaid}`
  return url
}
//  按条件查询
export const maintainDailygetCurrentTaskDeviceData = (taskid, areaid, basedevicecode, approvalstates) => {
  const url = `http://172.16.6.181:8920/task/getCurrentTaskDeviceStat?taskid=${taskid}&areaid=${areaid}&basedevicecode=${basedevicecode}&approvalstates=${approvalstates}`
  return url
}
//  审批任务
export const maintainDailyapprovalTaskDetail = (token, taskDetailid, approvalOpinion, approvalState) => {
  const url = `http://172.16.6.181:8920/task/approvalTaskDetail?token=${token}&taskDetailId=${taskDetailid}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}`
  return url
}
//  审批 -> 技术判断
export const maintainDailygetEquirementjudgments = (checkdetailid) => {
  const url = `http://172.16.6.181:8920/task/getEquirementjudgments?checkdetailid=${checkdetailid}`
  return url
}
//  审批  -> 审批选项
export const maintainDailygetTaskApprovalItems = () => {
  const url = `http://172.16.6.181:8920/task/getTaskApprovalItems`
  return url
}
//  安排任务 -> 业主单位
export const maintainDailygetProprietorOrgTree = () => {
  const url = `http://172.16.6.181:8920/organization/getProprietorOrgTree`
  return url
}
//  安排任务 -> 维保单位
export const maintainDailygetRepairOrgTreeByDeviceId = (deviceid) => {
  const url = `http://172.16.6.181:8920/organization/getRepairOrgTreeByDeviceId?deviceid=${deviceid}`
  return url
}
