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
  const url = `http://172.16.6.16:8920/users/findUser?userid=${userId}`
  return url
}
//  头部右侧部分
export const findUserProjects = (token) => {
  const url = `http://172.16.6.181:8920/projects/findUserProjects?token=${token}`
  return url
}

//  用户设置  修改用户
export const modifytheUser = (userid, organizationid, username, email, tel, userstate, job, memo, roleids, file) => {
  //  用户id | 组织id | 登录名 | 用户名 | 邮箱 | 电话 | 用户角色 | 职务 | 备注
  const roleidsStr = roleids.join(',')
  const url = `http://172.16.6.16:8920/users/updateUser?userid=${userid}&organizationid=${organizationid}&username=${username}&email=${email}&tel=${tel}&userstate=${userstate}&job=${job}&memo=${memo}&roleids=${roleidsStr}&file=${file}`
  return url
}
//  修改密码
export const modifytheUserPwd = (userid, pwd) => {
  const url = `http://172.16.6.16:8920/users/updateUser?userid=${userid}&pwd=${pwd}`
  return url
}
//  用户设置  添加用户
export const appUser = (token, organizationid, usercode, username, pwd, email, tel, job, memo, roleids, file) => {
  const roleidsStr = roleids.join(',')
  const url = `http://172.16.6.16:8920/users/createUser?token=${token}&organizationid=${organizationid}&usercode=${usercode}&username=${username}&pwd=${pwd}&email=${email}&tel=${tel}&job=${job}&memo=${memo}&roleids=${roleidsStr}&file=${file}`
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
//  获取所有省份
export const getAllProvince = () => {
  const url = `http://172.16.6.16:8920/organization/getAllProvince`
  return url
}
//  通过省份 获取所有的市
export const getCitiesByProvinceId = (provinceid) => {
  const url = `http://172.16.6.16:8920/organization/getCitiesByProvinceId?provinceid=${provinceid}`
  return url
}
//  通过市 获取所有的区县
export const getCountiesByCityId = (countid) => {
  const url = `http://172.16.6.16:8920/organization/getCountiesByCityId?cityid=${countid}`
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
//  审核 获取处理异常情况的方式
export const maintainDailygetRepairTypes = () => {
  const url = `http://172.16.6.181:8920/task/getRepairTypes`
  return url
}
//  审核 获取任务明细
export const maintainDailygetDetailsByDeviceId = (taskid, deviceID) => {
  const url = `http://172.16.6.181:8920/task/getDetailsByDeviceId?taskId=${taskid}&deviceId=${deviceID}`
  return url
}
//  审核  分配任务
export const maintainDailyassignedTask = (token, string, desc, disposeopinion, faultTypeId) => {
  const url = `http://172.16.6.181:8920/task/assignedTask?token=${token}&detailIDs=${string}&desc=${desc}&disposeopinion=${disposeopinion}&faultTypeId=${faultTypeId}`
  return url
}
//  maintain-repair  故障维修
//  获取列表
export const maintainRepairfindRepairTasks = (projectid) => {
  const url = `http://172.16.6.181:8920/repairtasks/findRepairTasks?projectid=${projectid}`
  return url
}
//  查寻列表
export const maintainRepairmaintainRepairfindRepairTasksTwo = (projectid, regionModel, maintenanceData, Auditstatus) => {
  const url = `http://172.16.6.181:8920/repairtasks/findRepairTasks?projectid=${projectid}&areaid=${regionModel}&repairStates=${maintenanceData}&approvalStates=${Auditstatus}`
  return url
}
//  维修状态
export const maintainRepairgetRepairStates = () => {
  const url = `http://172.16.6.181:8920/repairtasks/getRepairStates`
  return url
}
//  审批状态
export const maintainRepairgetRepariTaskApprovalItem = () => {
  const url = `http://172.16.6.181:8920/repairtasks/getRepariTaskApprovalItem`
  return url
}
//  根据id获取任务
export const maintainRepairfindTaskByTaskid = (repairtaskid) => {
  const url = `http://172.16.6.181:8920/repairtasks/findTaskByTaskid?repairtaskid=${repairtaskid}`
  return url
}
//  删除任务信息
export const maintainRepairremoveRepairtasks = (repairtaskid) => {
  const url = `http://172.16.6.181:8920/repairtasks/removeRepairtasks?repairtaskid=${repairtaskid}`
  return url
}
//  根据任务id 获取任务信息
export const maintainRepairfindReworksByTaskid = (ID) => {
  const url = `http://172.16.6.181:8920/reworks/findReworksByTaskid?repairtaskid=${ID}`
  return url
}
//  获取任务审批记录
export const maintainRepairgetApprovalInfos = (ID) => {
  const url = `http://172.16.6.181:8920/repairtasks/getApprovalInfos?repairtaskid=${ID}`
  return url
}
//  审核
export const maintainRepairapprovalTask = (token, repairtaskid, approvalOpinion, approvalState, assignmenttime, faulttypeData, faultreasonData, faultrangeData, faultphenomenonData, faulttreatmentData) => {
  const url = `http://172.16.6.181:8920/repairtasks/approvalTask?token=${token}&repairtaskid=${repairtaskid}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}&assignmenttime=${assignmenttime}&faulttypeid=${faulttypeData}&faultreasonid=${faultreasonData}&faultrangeid=${faultrangeData}&faultphenomenonid=${faultphenomenonData}&faulttreamentid=${faulttreatmentData}`
  return url
}
//  验证维修
export const maintainRepaircheckTask = (token, repairtaskid, confirmopinion) => {
  const url = `http://172.16.6.181:8920/repairtasks/checkTask?token=${token}&taskID=${repairtaskid}&confirmopinion=${confirmopinion}`
  return url
}
//  获取故障维修所有分类选项
export const maintainRepairgetFaultSelectItems = () => {
  const url = `http://172.16.6.181:8920/repairtasks/getFaultSelectItems`
  return url
}
//  重新分配
export const maintainRepairreAssignedTask = (token, repairid, desc, disposeopinion, faultTypeId) => {
  const url = `http://172.16.6.181:8920/repairtasks/reAssignedTask?token=${token}&repairid=${repairid}&desc=${desc}&disposeopinion=${disposeopinion}&faultTypeId=${faultTypeId}`
  return url
}
//  上报问题 maintainReport
//  获取处理状态
export const maintainReportgetFeedbackstateStates = () => {
  const url = `http://172.16.6.181:8920/feedback/getFeedbackstateStates`
  return url
}
//  获取确认状态
export const maintainReportgetConfrimStates = () => {
  const url = `http://172.16.6.181:8920/feedback/getConfrimStates`
  return url
}
//  获取上报问题
export const maintainReportfindFeedback = (projectid) => {
  const url = `http://172.16.6.181:8920/feedback/findFeedback?projectid=${projectid}`
  return url
}
//  查寻上报问题
export const maintainReportfindFeedbackTwo = (projectid, areaid, basedevicecode, feedbackState, confirmState) => {
  const url = `http://172.16.6.181:8920/feedback/findFeedback?projectid=${projectid}&areaid=${areaid}&basedevicecode=${basedevicecode}&feedbackState=${feedbackState}&confirmState=${confirmState}`
  return url
}

//   根据反馈id获取反馈信息
export const maintainReportfindFeedbacksByFeedbackid = (Id) => {
  const url = `http://172.16.6.181:8920/feedback/findFeedbacksByFeedbackid?feedbackid=${Id}`
  return url
}
//  删除反馈信息
export const maintainReportremoveFeedbacks = (ID) => {
  const url = `http://172.16.6.181:8920/feedback/removeFeedbacks?feedbackid=${ID}`
  return url
}
//  生产厂家
export const maintainReportfindManufactures = (baseDeviceId) => {
  const url = `http://172.16.6.16:8920/dev/findManufactures?baseDeviceId=${baseDeviceId}`
  return url
}
//  添加生产厂家 AddManufacture
export const maintainReportAddManufacture = (customManufacturerDate, devicetypeid) => {
  const url = `http://172.16.6.16:8920/dev/AddManufacture?name=${customManufacturerDate}&basedeviceid=${devicetypeid}`
  return url
}
//  增加上报问题
export const maintainReportAddDevice = (rowcount, token, devicetypeid, manufacturerid, basedevicecode, devicemodel, position, devicecount, parameters, memo, madedate, effectivedate, mac) => {
  const url = `http://172.16.6.16:8920/dev/AddDevice?rowcount=${rowcount}&token=${token}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&basedevicecode=${basedevicecode}&devicemodel=${devicemodel}&position=${position}&devicecount=${devicecount}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}&mac=${mac}`
  return url
}
//  通过厂家获取到规格型号
export const maintainReportfindDivecemodels = (region, manufacturerId) => {
  const url = `http://172.16.6.16:8920/dev/findDivecemodels?baseDeviceId=${region}&manufacturerId=${manufacturerId}`
  return url
}
//  分配任务
export const maintainReportassignedTask = (token, desc, disposeopinion, feedbackid, faultTypeId) => {
  const url = `http://172.16.6.181:8920/feedback/assignedTask?token=${token}&desc=${desc}&disposeopinion=${disposeopinion}&feedbackid=${feedbackid}&faultTypeId=${faultTypeId}`
  return url
}
//  确认反馈信息
export const maintainReporconfirmFeedback = (token, deviceid, feedbackstate) => {
  const url = `http://172.16.6.181:8920/feedback/confirmFeedback?token=${token}&feedbackid=${deviceid}&feedbackstate=${feedbackstate}`
  return url
}

//  计划  maintainArranged
// 删除计划 deletePlan
export const maintainArrangeddeletePlan = (checkplanid) => {
  const url = `http://172.16.6.181:8920/plan/deletePlan?checkplanid=${checkplanid}`
  return url
}
//  获取所有的巡检计划
export const maintainArrangegetAllPlans = () => {
  const url = `http://172.16.6.181:8920/plan/getAllPlans`
  return url
}
//  获取巡检计划
export const maintainArranggetCheckPlan = (checkplanid) => {
  const url = `http://172.16.6.181:8920/plan/getCheckPlan?checkPlanId=${checkplanid}`
  return url
}
//  获取所有计划类型
export const maintainArranggetAllPlanTypes = () => {
  const url = `http://172.16.6.181:8920/plan/getAllPlanTypes`
  return url
}
//  修改计划
export const maintainArrangupdatePlan = (checkPlanId, planName, planCode, worktypeid, planDesc, startDate, endDate, checkFrequency, interval, createTaskTime) => {
  const url = `http://172.16.6.181:8920/plan/updatePlan?checkPlanId=${this.Checkplanid}&planName=${planName}&planCode=${planCode}&worktype=${worktypeid}&planDesc=${planDesc}&startDate=${startDate}&endDate=${endDate}&checkFrequency=${checkFrequency}&interval=${interval}&createTaskTime=${createTaskTime}`
  return url
}
//  根据工作类型获取工作模式
export const maintainArranggetWorkModesByWorkType = (workType) => {
  const url = `http://172.16.6.181:8920/plan/getWorkModesByWorkType?workType=${workType}`
  return url
}
//  插件频率类型
export const maintainArranggetAllCheckFrequency = () => {
  const url = `http://172.16.6.181:8920/plan/getAllCheckFrequency`
  return url
}
//  查询所有的角色
export const karaktersFindAllRoles = (token) => {
  const url = `http://172.16.6.181:8920/roles/FindAllRoles?token=${token}`
  return url
}
//  设置角色权限
export const karaktersSetRoleFunctions = (roleid) => {
  const url = `http://172.16.6.181:8920/roles/SetRoleFunctions?roleid=${roleid}`
  return url
}
//  查询所有功能模块
export const karaktersFindAllFunctions = (token) => {
  const url = `http://172.16.6.181:8920/roles/FindAllFunctions?token=${token}`
  return url
}
//  创建角色
export const increasedCreaterole = (roleName, organizationinfoid, token) => {
  const url = `http://172.16.6.181:8920/roles/createrole?roleName=${roleName}&organizationinfoid=${organizationinfoid}&token=${token}`
  return url
}
//  查看用户信息
export const consumerFindUser = (userid) => {
  const url = `http://172.16.6.16:8920/users/findUser?userid=${userid}`
  return url
}
//  获取用户列表
export const consumerfindAll = (pageIndex, pageSize) => {
  const url = `http://172.16.6.16:8920/users/findAll?pageIndex=0&pageSize=30`
  return url
}
//  删除用户
export const consumerdelUser = (userId) => {
  const url = `http://172.16.6.16:8920/users/delUser?userid=${userId}`
  return url
}
//  获取用户组织树
export const getOrganizationTreeByUser = (token) => {
  const url = `http://172.16.6.16:8920/organization/getOrganizationTreeByUser?token=${token}`
  return url
}
//  获取角色列表
export const getRolesList = (token) => {
  const url = `http://172.16.6.16:8920/users/getRolesList?token=${token}`
  return url
}
//  获取职务
export const getJobList = () => {
  const url = `http://172.16.6.16:8920/users/getJobList`
  return url
}
//  获取组织结构
export const getOrganizationTrees = (token) => {
  const url = `http://172.16.6.16:8920/organization/getOrganizationTrees?token=${token}`
  return url
}
//  根据ID 获取项目详情
export const findDetailByProjectid = (projectId) => {
  const url = `http://172.16.6.181:8920/projects/findDetailByProjectid?projectId=${projectId}`
  return url
}
//  删除项目
export const removeProjectById = (projectId) => {
  const url = `http://172.16.6.181:8920/projects/removeProjectById?projectId=${projectId}`
  return url
}
//  获取所有的项目信息
export const findAllProjects = () => {
  const url = `http://172.16.6.181:8920/projects/findAllProjects`
  return url
}
//  获取所有的审核状态
export const FindDevAllstate = () => {
  const url = `http://172.16.6.181:8920/dev/FindDevAllstate`
  return url
}
//  新增项目
export const createOrUpdateProject = (token) => {
  const url = `http://172.16.6.181:8920/projects/createOrUpdateProject?token=${token}`
  return url
}
//  获取设施列表
export const increasefindAllDevType = () => {
  const url = `http://172.16.6.181:8920/projects/findAllDevType`
  return url
}
//  获取项目类型
export const increasegetWorkTypes = () => {
  const url = `http://172.16.6.16:8920/projects/getWorkTypes`
  return url
}
//  获取服务机构
export const getRootOrganizationsNotProprietor = () => {
  const url = `http://172.16.6.16:8920/organization/getRootOrganizationsNotProprietor`
  return url
}
//  获取业主单位
export const getProprietorOrganization = () => {
  const url = `http://172.16.6.16:8920/organization/getProprietorOrganization`
  return url
}
