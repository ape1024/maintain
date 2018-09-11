// import axios from 'axios'
//  登录接口
const Test = window.Test
export const userLogin = (username, password) => {
  let url = `${Test}/auth/login?usercode=${username}&password=${password}`
  return url
}
//  退出登录
export const secede = (toKen) => {
  const url = `${Test}/auth/logout?token=${toKen}`
  return url
}
//  系统设置->用户设置->查看用户信息
export const iConsumerexamine = (userId) => {
  const url = `${Test}/users/findUser?userid=${userId}`
  return url
}
//  头部右侧部分
export const findUserProjects = (token) => {
  const url = `${Test}/projects/findUserProjects?token=${token}`
  return url
}

//  用户设置  修改用户
export const modifytheUser = (userid, organizationid, username, email, tel, userstate, job, memo, roleids, file) => {
  //  用户id | 组织id | 登录名 | 用户名 | 邮箱 | 电话 | 用户角色 | 职务 | 备注
  const roleidsStr = roleids.join(',')
  const url = `${Test}/users/updateUser?userid=${userid}&organizationid=${organizationid}&username=${username}&email=${email}&tel=${tel}&userstate=${userstate}&job=${job}&memo=${memo}&roleids=${roleidsStr}&file=${file}`
  return url
}
//  修改密码
export const modifytheUserPwd = (userid, oldpwd, newpwd) => {
  const url = `${Test}/users/changePwd?userid=${userid}&oldpwd=${oldpwd}&newpwd=${newpwd}`
  return url
}
//  用户设置  添加用户
export const appUser = (token, organizationid, usercode, username, pwd, email, tel, job, memo, roleids, file) => {
  const roleidsStr = roleids.join(',')
  const url = `${Test}/users/createUser?token=${token}&organizationid=${organizationid}&usercode=${usercode}&username=${username}&pwd=${pwd}&email=${email}&tel=${tel}&job=${job}&memo=${memo}&roleids=${roleidsStr}&file=${file}`
  return url
}
//  getCheckTaskByRepairTaskId
export const getCheckTaskByRepairTaskId = (repairtaskid) => {
  const url = `${Test}/repairtasks/getCheckTaskByRepairTaskId?repairtaskid=${repairtaskid}`
  return url
}
//   FindAllRolesByOrgID
export const FindAllRolesByOrgID = (data) => {
  const url = `${Test}/roles/FindAllRolesByOrgID?orgid=${data}`
  return url
}
//  getTaskParams
export const getTaskParams = (checktaskdetailid) => {
  const url = `${Test}/task/getTaskParams?detailID=${checktaskdetailid}`
  return url
}

export const upload = (token) => {
  const url = `${Test}/upload/upload?token=${token}`
  return url
}
//  组织结构权限管理  获取左边的树状结构
export const managementCreatedtree = (token) => {
  const url = `${Test}/organization/getOrganizationTreeByUser?token=${token}`
  return url
}
//  deleteTaskDetail
export const deleteTaskDetail = (checktaskdetailid) => {
  const url = `${Test}/task/deleteTaskDetail?taskDetailId=${checktaskdetailid}`
  return url
}
//  组织结构权限管理 省份
export const managementCreatedProvince = () => {
  const url = `${Test}/organization/getAllProvince`
  return url
}
//  组织结构权限管理  专业类别
export const managementCreatedcategory = () => {
  const url = `${Test}/organization/getAllLevels`
  return url
}
//  组织结构权限管理   业务类别
export const managementCreatedbusiness = () => {
  const url = `${Test}/organization/getAllProfessionalCategory`
  return url
}
//  组织结构权限管理   组织类别
export const managementCreatedorganization = (token) => {
  const url = `${Test}/organization/getOrganizationType?token=${token}`
  return url
}
//  组织结构权限管理 点击新增保存
export const managementAuthority = (token, organizationtype, firebrigadeid, firecontrolcategoryid, industrycategoryid, file, organization, parentid, countyid, city, province, organizationcode, organizationname, shortname, address, professionalcategory, scope, level, qualificationnumber, linkman, tel, memo) => {
  const url = `${Test}/organization/update?token=${token}&organizationtype=${organizationtype}&firebrigadeid=${firebrigadeid}&firecontrolcategoryid=${firecontrolcategoryid}&industrycategoryid=${industrycategoryid}&file=${file}&organizationid=${organization}&parentid=${parentid}&countyid=${countyid}&cityid=${city}&provinceid=${province}&organizationcode=${organizationcode}&organizationname=${organizationname}&shortname=${shortname}&address=${address}&professionalcategory=${professionalcategory}&scope=${scope}&level=${level}&qualificationnumber=${qualificationnumber}&linkman=${linkman}&tel=${tel}&memo=${memo}`
  return url
}
//  组织结构权限管理  点击左边树状获取数据-one
export const managementhandleNodeClickOne = (organization) => {
  const url = `${Test}/organization/getOrganization?organizationid=${organization}`
  return url
}
//  组织结构权限管理  点击左边树状获取数据-two
export const managementhandleNodeClickTwo = (organization) => {
  const url = `${Test}/organization/getOrganizationInfo?organizationid=${organization}`
  return url
}
//  公共api  区域   设备类别 审核状态
export const findAreasTreeByProjectid = (projectid) => {
  //  区域
  const url = `${Test}/areas/findAreasTreeByProjectid?projectid=${projectid}`
  return url
}
//  approvalCheckPlan
export const approvalCheckPlan = (token, checkPlanId, approvalOpinion, approvalState) => {
  const url = `${Test}/plan/approvalCheckPlan?token=${token}&checkPlanId=${checkPlanId}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}`
  return url
}
export const findAllDeviceType = () => {
  //  获取设备类别
  const url = `${Test}/dev/findAllDeviceType`
  return url
}
export const getTaskQueryApprovalItems = () => {
  //  审核状态
  const url = `${Test}/task/getTaskQueryApprovalItems`
  return url
}
//  获取所有省份
export const getAllProvince = () => {
  const url = `${Test}/organization/getAllProvince`
  return url
}
//  通过省份 获取所有的市
export const getCitiesByProvinceId = (provinceid) => {
  const url = `${Test}/organization/getCitiesByProvinceId?provinceid=${provinceid}`
  return url
}
//  通过市 获取所有的区县
export const getCountiesByCityId = (countid) => {
  const url = `${Test}/organization/getCountiesByCityId?cityid=${countid}`
  return url
}
//  测试当前密码
export const steganogramCheckOldPwd = (usercode, password) => {
  const url = `${Test}/auth/checkOldPwd?usercode=${usercode}&password=${password}`
  return url
}
//  home
export const maintainHomeRightTop = (projectid) => {
  const url = `${Test}/dev/statDeviceAndQuestionAndTaskRate?projectid=${projectid}`
  return url
}
export const maintainHomeRightBottom = (projectid) => {
  const url = `${Test}/dev/statTaskDoneState?projectid=${projectid}`
  return url
}
export const maintainHomeInspection = (projectid) => {
  const url = `${Test}/dev/statTaskDoneState2?projectid=${projectid}`
  return url
}
export const maintainHomeStacked = (projectid) => {
  const url = `${Test}/dev/statDevRunState?projectid=${projectid}`
  return url
}
export const statDevFaultState = () => {
  const url = `${Test}/dev/statDevFaultState`
  return url
}
//  AddDivecemodels
export const AddDivecemodels = (manufactureId, Deviceid, versionCustom, technicalParameter) => {
  const url = `${Test}/dev/AddDivecemodels?manufactureId=${manufactureId}&baseDeviceId=${Deviceid}&modelName=${versionCustom}&para=${technicalParameter}`
  return url
}
//  updateDevice
export const updateDevice = (token, deviceid, devicetypeid, manufacturerid, devicemodel, position, parameters, memo, madedate, effectivedate, files) => {
  const url = `${Test}/dev/updateDevice?token=${token}&deviceid=${deviceid}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&devicemodel=${devicemodel}&position=${position}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}&files=${files}`
  return url
}

//  daily
export const maintainDailyCurrentTaskStat = (worktypeid, projectid) => {
  const url = `${Test}/task/getCurrentTaskStat?worktypeid=${worktypeid}&projectid=${projectid}`
  return url
}
//  通过一级的id获取二级数据
export const maintainDailygetCurrentTaskDeviceStat = (itemAreaid) => {
  const url = `${Test}/task/getCurrentTaskDeviceStat?taskid=${itemAreaid}`
  return url
}
//  批量审批
export const batchApprovalCheckTaskByDeviceids = (token, taskid, deviceids) => {
  const url = `${Test}/task/batchApprovalCheckTaskByDeviceids?token=${token}&taskid=${taskid}&deviceids=${deviceids}`
  return url
}
//  按条件查询
export const maintainDailygetCurrentTaskDeviceData = (taskid, areaid, basedevicecode, approvalstates) => {
  const url = `${Test}/task/getCurrentTaskDeviceStat?taskid=${taskid}&areaid=${areaid}&basedevicecode=${basedevicecode}&approvalstates=${approvalstates}`
  return url
}
//  审批任务
export const maintainDailyapprovalTaskDetail = (token, taskDetailid, approvalOpinion, approvalState) => {
  const url = `${Test}/task/approvalTaskDetail?token=${token}&taskDetailId=${taskDetailid}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}`
  return url
}
//  审批 -> 技术判断
export const maintainDailygetEquirementjudgments = (checkdetailid) => {
  const url = `${Test}/task/getEquirementjudgments?checkdetailid=${checkdetailid}`
  return url
}
export const maintainDailygetEquirementjudgments2 = (checkdetailid) => {
  const url = `${Test}/task/getEquirementjudgments2?checkdetailid=${checkdetailid}`
  return url
}
//  审批  -> 审批选项
export const maintainDailygetTaskApprovalItems = () => {
  const url = `${Test}/task/getTaskApprovalItems`
  return url
}
export const getRepairUsers = (id) => {
  const url = `${Test}/repairtasks/getRepairUsers?repairid=${id}`
  return url
}
//  安排任务 -> 业主单位
export const maintainDailygetProprietorOrgTree = () => {
  const url = `${Test}/organization/getProprietorOrgTree`
  return url
}
//  安排任务 -> 维保单位
export const maintainDailygetRepairOrgTreeByDeviceId = (deviceid) => {
  const url = `${Test}/organization/getRepairOrgTreeByDeviceId?deviceid=${deviceid}`
  return url
}
//  审核 获取处理异常情况的方式
export const maintainDailygetRepairTypes = () => {
  const url = `${Test}/task/getRepairTypes`
  return url
}
//  审核 获取任务明细
export const maintainDailygetDetailsByDeviceId = (taskid, deviceID) => {
  const url = `${Test}/task/getDetailsByDeviceId?taskId=${taskid}&deviceId=${deviceID}`
  return url
}
//  审核  分配任务
export const maintainDailyassignedTask = (token, string, desc, disposeopinion, faultTypeId) => {
  const url = `${Test}/task/assignedTask?token=${token}&detailIDs=${string}&desc=${desc}&disposeopinion=${disposeopinion}&faultTypeId=${faultTypeId}`
  return url
}
//  maintain-repair  故障维修
//  获取列表
export const maintainRepairfindRepairTasks = (projectid) => {
  const url = `${Test}/repairtasks/findRepairTasks?projectid=${projectid}`
  return url
}
//  查寻列表
export const maintainRepairmaintainRepairfindRepairTasksTwo = (projectid, regionModel, maintenanceData, Auditstatus) => {
  const url = `${Test}/repairtasks/findRepairTasks?projectid=${projectid}&areaid=${regionModel}&repairStates=${maintenanceData}&approvalStates=${Auditstatus}`
  return url
}
//  维修状态
export const maintainRepairgetRepairStates = () => {
  const url = `${Test}/repairtasks/getRepairStates`
  return url
}
//  审批状态
export const maintainRepairgetRepariTaskApprovalItem = () => {
  const url = `${Test}/repairtasks/getRepariTaskApprovalItem`
  return url
}
//  根据id获取任务
export const maintainRepairfindTaskByTaskid = (repairtaskid) => {
  const url = `${Test}/repairtasks/findTaskByTaskid?repairtaskid=${repairtaskid}`
  return url
}
//  删除任务信息
export const maintainRepairremoveRepairtasks = (repairtaskid) => {
  const url = `${Test}/repairtasks/removeRepairtasks?repairtaskid=${repairtaskid}`
  return url
}
//  根据任务id 获取任务信息
export const maintainRepairfindReworksByTaskid = (ID) => {
  const url = `${Test}/reworks/findReworksByTaskid?repairtaskid=${ID}`
  return url
}
//  获取任务审批记录
export const maintainRepairgetApprovalInfos = (ID) => {
  const url = `${Test}/repairtasks/getApprovalInfos?repairtaskid=${ID}`
  return url
}
//  审核
export const maintainRepairapprovalTask = (token, repairtaskid, approvalOpinion, approvalState, assignmenttime, faulttypeData, faultreasonData, faultrangeData, faultphenomenonData, faulttreatmentData) => {
  const url = `${Test}/repairtasks/approvalTask?token=${token}&repairtaskid=${repairtaskid}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}&assignmenttime=${assignmenttime}&faulttypeid=${faulttypeData}&faultreasonid=${faultreasonData}&faultrangeid=${faultrangeData}&faultphenomenonid=${faultphenomenonData}&faulttreamentid=${faulttreatmentData}`
  return url
}
//  验证维修
export const maintainRepaircheckTask = (token, repairtaskid, confirmopinion) => {
  const url = `${Test}/repairtasks/checkTask?token=${token}&taskID=${repairtaskid}&confirmopinion=${confirmopinion}`
  return url
}
//  getAllHigherOrgIDs
export const getAllHigherOrgIDs = (orgid) => {
  const url = `${Test}/organization/getAllHigherOrgIDs?orgid=${orgid}`
  return url
}
//  获取故障维修所有分类选项
export const maintainRepairgetFaultSelectItems = () => {
  const url = `${Test}/repairtasks/getFaultSelectItems`
  return url
}
//  重新分配
export const maintainRepairreAssignedTask = (token, repairid, desc, disposeopinion, faultTypeId) => {
  const url = `${Test}/repairtasks/reAssignedTask?token=${token}&repairid=${repairid}&desc=${desc}&disposeopinion=${disposeopinion}&faultTypeId=${faultTypeId}`
  return url
}
//  上报问题 maintainReport
//  获取处理状态
export const maintainReportgetFeedbackstateStates = () => {
  const url = `${Test}/feedback/getFeedbackstateStates`
  return url
}
//  获取确认状态
export const maintainReportgetConfrimStates = () => {
  const url = `${Test}/feedback/getConfrimStates`
  return url
}
//  获取上报问题
export const maintainReportfindFeedback = (projectid) => {
  const url = `${Test}/feedback/findFeedback?projectid=${projectid}`
  return url
}
//  setUserRoles
export const setUserRoles = (userid) => {
  const url = `${Test}/users/setUserRoles?userid=${userid}`
  return url
}

//  查寻上报问题
export const maintainReportfindFeedbackTwo = (projectid, areaid, basedevicecode, feedbackState, confirmState) => {
  const url = `${Test}/feedback/findFeedback?projectid=${projectid}&areaid=${areaid}&basedevicecode=${basedevicecode}&feedbackState=${feedbackState}&confirmState=${confirmState}`
  return url
}

//   根据反馈id获取反馈信息
export const maintainReportfindFeedbacksByFeedbackid = (Id) => {
  const url = `${Test}/feedback/findFeedbacksByFeedbackid?feedbackid=${Id}`
  return url
}
//  删除反馈信息
export const maintainReportremoveFeedbacks = (ID) => {
  const url = `${Test}/feedback/removeFeedbacks?feedbackid=${ID}`
  return url
}
//  生产厂家
export const maintainReportfindManufactures = (baseDeviceId) => {
  const url = `${Test}/dev/findManufactures?baseDeviceId=${baseDeviceId}`
  return url
}
//  添加生产厂家 AddManufacture
export const maintainReportAddManufacture = (customManufacturerDate, devicetypeid) => {
  const url = `${Test}/dev/AddManufacture?name=${customManufacturerDate}&basedeviceid=${devicetypeid}`
  return url
}
//  增加上报问题
export const maintainReportAddDevice = (rowcount, token, devicetypeid, manufacturerid, basedevicecode, devicemodel, position, devicecount, parameters, memo, madedate, effectivedate, mac) => {
  const url = `${Test}/dev/AddDevice?rowcount=${rowcount}&token=${token}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&basedevicecode=${basedevicecode}&devicemodel=${devicemodel}&position=${position}&devicecount=${devicecount}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}&mac=${mac}`
  return url
}
//  通过厂家获取到规格型号
export const maintainReportfindDivecemodels = (region, manufacturerId) => {
  const url = `${Test}/dev/findDivecemodels?baseDeviceId=${region}&manufacturerId=${manufacturerId}`
  return url
}
//  分配任务
export const maintainReportassignedTask = (token, desc, disposeopinion, feedbackid, faultTypeId) => {
  const url = `${Test}/feedback/assignedTask?token=${token}&desc=${desc}&disposeopinion=${disposeopinion}&feedbackid=${feedbackid}&faultTypeId=${faultTypeId}`
  return url
}
//  确认反馈信息
export const maintainReporconfirmFeedback = (token, deviceid, feedbackstate) => {
  const url = `${Test}/feedback/confirmFeedback?token=${token}&feedbackid=${deviceid}&feedbackstate=${feedbackstate}`
  return url
}
//  删除组织机构
export const organizationDelete = (organizationid) => {
  const url = `${Test}/organization/delete?organizationid=${organizationid}`
  return url
}
//  DeleteRole
export const DeleteRole = (kayakersId) => {
  const url = `${Test}/roles/DeleteRole?roleid=${kayakersId}`
  return url
}
//  计划  maintainArranged
// 删除计划 deletePlan
export const maintainArrangeddeletePlan = (checkplanid) => {
  const url = `${Test}/plan/deletePlan?checkplanid=${checkplanid}`
  return url
}
//  获取所有的巡检计划
export const maintainArrangegetAllPlans = (projectid) => {
  const url = `${Test}/plan/getAllPlans?projectid=${projectid}`
  return url
}
//  获取巡检计划
export const maintainArranggetCheckPlan = (checkplanid) => {
  const url = `${Test}/plan/getCheckPlan?checkPlanId=${checkplanid}`
  return url
}
//  获取所有计划类型
export const maintainArranggetAllPlanTypes = () => {
  const url = `${Test}/plan/getAllPlanTypes`
  return url
}
//  获取计划状态 20180803 rad
export const maintainArranggetAllApprovalItems = () => {
  const url = `${Test}/plan/getAllApprovalItems`
  return url
}
//  修改计划
export const maintainArrangupdatePlan = (checkPlanId, planName, planCode, worktypeid, planDesc, startDate, endDate, checkFrequency, interval, createTaskTime) => {
  const url = `${Test}/plan/updatePlan?checkPlanId=${checkPlanId}&planName=${planName}&planCode=${planCode}&worktype=${worktypeid}&planDesc=${planDesc}&startDate=${startDate}&endDate=${endDate}&checkFrequency=${checkFrequency}&interval=${interval}&createTaskTime=${createTaskTime}`
  return url
}
//  根据工作类型获取工作模式
export const maintainArranggetWorkModesByWorkType = (workType) => {
  const url = `${Test}/plan/getWorkModesByWorkType?workType=${workType}`
  return url
}
//  插件频率类型
export const maintainArranggetAllCheckFrequency = () => {
  const url = `${Test}/plan/getAllCheckFrequency`
  return url
}
//  查询所有的角色
export const karaktersFindAllRoles = (token) => {
  const url = `${Test}/roles/FindAllRoles?token=${token}`
  return url
}
//  设置角色权限
export const karaktersSetRoleFunctions = (roleid) => {
  const url = `${Test}/roles/SetRoleFunctions?roleid=${roleid}`
  return url
}
//  查询当前角色权限
export const karaktersFindRoleFunctions = (roleid) => {
  const url = `${Test}/roles/FindRoleFunctions?roleid=${roleid}`
  return url
}
//  admindelDevice
export const admindelDevice = (deviceid) => {
  const url = `${Test}/dev/delDevice?devid=${deviceid}`
  return url
}
//  adminfindDeviceDetail
export const adminfindDeviceDetail = (deviceid) => {
  const url = `${Test}/dev/findDeviceDetail?devid=${deviceid}`
  return url
}
// adminFindInspectionMaintenance
export const adminFindInspectionMaintenance = (deviceid) => {
  const url = `${Test}/dev/FindInspectionMaintenance?devid=${deviceid}`
  return url
}
//  admingetDevListDetailProjects
export const admingetDevListDetailProjects = (areaid) => {
  const url = `${Test}/dev/getDevListDetailProjects?areaid=${areaid}`
  return url
}
//  getDevListDetailProjectsTwo
export const getDevListDetailProjectsTwo = (basedevicecode, areaid) => {
  const url = `${Test}/dev/getDevListDetailProjects?basedevicecode=${basedevicecode}&areaid=${areaid}`
  return url
}
export const getDevListDetailProjectsThree = (equipmentdata, runningState, AuditstatusD, adminid, manufactorModel) => {
  const url = `${Test}/dev/getDevListDetailProjects?basedevicecode=${equipmentdata}&devicestate=${runningState}&approvalstate=${AuditstatusD}&areaid=${adminid}&manufacturerid=${manufactorModel}`
  return url
}
//  getApprovalItems
export const getApprovalItems = () => {
  const url = `${Test}/plan/getApprovalItems`
  return url
}
//  createPlan
export const createPlan = (token, worktypeid, projectid, planName, planCode, planDesc, startDate, endDate, checkFrequency, interval, createTaskTime) => {
  const url = `${Test}/plan/createPlan?token=${token}&worktypeid=${worktypeid}&projectid=${projectid}&planName=${planName}&planCode=${planCode}&planDesc=${planDesc}&startDate=${startDate}&endDate=${endDate}&checkFrequency=${checkFrequency}&interval=${interval}&createTaskTime=${createTaskTime}`
  return url
}
//  getProjectDevices
export const getProjectDevices = (projectid) => {
  const url = `${Test}/projects/getProjectDevices?projectid=${projectid}`
  return url
}
//  getProjectAreas
export const getProjectAreas = (projectid) => {
  const url = `${Test}/projects/getProjectAreas?projectid=${projectid}`
  return url
}
//  getRoleOrganizations
export const getRoleOrganizations = (token) => {
  const url = `${Test}/organization/getRoleOrganizations?token=${token}`
  return url
}
//  getUserFuncions
export const getUserFuncions = (token) => {
  const url = `${Test}/users/getUserFuncions?token=${token}`
  return url
}
//  CalcDevCount
export const CalcDevCount = (regionId, pageIndex, pageSize) => {
  const url = `${Test}/dev/CalcDevCount?areaid=${regionId}&pageIndex=${pageIndex}&pageSize=${pageSize}`
  return url
}
//  FindDevAllApprovalstate
export const FindDevAllApprovalstate = () => {
  const url = `${Test}/dev/FindDevAllApprovalstate`
  return url
}
//  查询所有功能模块
export const karaktersFindAllFunctions = (token) => {
  const url = `${Test}/roles/FindAllFunctions?token=${token}`
  return url
}
//  创建角色
export const increasedCreaterole = (roleName, organizationinfoid, token) => {
  const url = `${Test}/users/createrole?roleName=${roleName}&organizationid=${organizationinfoid}&token=${token}`
  return url
}
//  查看用户信息
export const consumerFindUser = (userid) => {
  const url = `${Test}/users/findUser?userid=${userid}`
  return url
}
//  获取用户列表
export const consumerfindAll = (pageIndex, pageSize) => {
  const url = `${Test}/users/findAll?pageIndex=0&pageSize=30`
  return url
}
//  获取用户列表(自己下属)
export const findAllBydefault = (pageIndex, pageSize, token) => {
  const url = `${Test}/users/findAllBy?&&pageIndex=${pageIndex}&pageSize=${pageSize}&token=${token}`
  return url
}
//  获取用户列表 (条件查询)
export const findAllBy = (selectedOptions, role, Username, Handphone, pageIndex, pageSize, token) => {
  const url = `${Test}/users/findAllBy?organizationId=${selectedOptions}&roleId=${role}&usercode=${Username}&tel=${Handphone}&pageIndex=${pageIndex}&pageSize=${pageSize}&token=${token}`
  return url
}
//  删除用户
export const consumerdelUser = (userId) => {
  const url = `${Test}/users/delUser?userid=${userId}`
  return url
}
//  获取用户组织树
export const getOrganizationTreeByUser = (token) => {
  const url = `${Test}/organization/getOrganizationTreeByUser?token=${token}`
  return url
}
//  获取角色列表
export const getRolesList = (token) => {
  const url = `${Test}/users/getRolesList?token=${token}`
  return url
}
//  getUserRoles
export const getUserRoles = (userid) => {
  const url = `${Test}/users/getUserRoles?userid=${userid}`
  return url
}
//  获取职务
export const getJobList = () => {
  const url = `${Test}/users/getJobList`
  return url
}
//  获取组织结构
// export const getOrganizationTrees = (token) => {
//   const url = `${Test}/organization/getOrganizationTrees?token=${token}`
//   return url
// }
//  获取组织机构2 by rad 20180808
export const getOrganizationTrees = (token) => {
  const url = `${Test}/organization/getOrganizationTreeByUser2?token=${token}`
  return url
}

//  根据ID 获取项目详情
export const findDetailByProjectid = (projectId) => {
  const url = `${Test}/projects/findDetailByProjectid?projectId=${projectId}`
  return url
}
//  删除项目
export const removeProjectById = (projectId) => {
  const url = `${Test}/projects/removeProjectById?projectId=${projectId}`
  return url
}
//  获取所有的项目信息
export const findAllProjects = () => {
  const url = `${Test}/projects/findAllProjects`
  return url
}
//  获取所有的审核状态
export const FindDevAllstate = () => {
  const url = `${Test}/dev/FindDevAllstate`
  return url
}
//  新增项目
export const createOrUpdateProject = (token) => {
  const url = `${Test}/projects/createOrUpdateProject?token=${token}`
  return url
}
//  获取设施列表
export const increasefindAllDevType = () => {
  const url = `${Test}/projects/findAllDevType`
  return url
}
//  findAllAreaTrees
export const findAllAreaTrees = () => {
  const url = `${Test}/areas/findAllAreaTrees`
  return url
}
//  获取项目类型
export const increasegetWorkTypes = () => {
  const url = `${Test}/projects/getWorkTypes`
  return url
}
//  获取项目区域 (所有)
export const findAllRootAreasTree = () => {
  const url = `${Test}/areas/findAllRootAreasTree`
  return url
}
//  获取服务机构
export const getRootOrganizationsNotProprietor = () => {
  const url = `${Test}/organization/getRootOrganizationsNotProprietor`
  return url
}
//  获取业主单位
export const getProprietorOrganization = () => {
  const url = `${Test}/organization/getProprietorOrganization`
  return url
}
//  getRepairOrgTreeByProjectId
export const getRepairOrgTreeByProjectId = (projectid) => {
  const url = `${Test}/organization/getRepairOrgTreeByProjectId?projectId=${projectid}`
  return url
}
//  getFirebrigades  消防监管机构
export const getFirebrigades = () => {
  const url = `${Test}/organization/getFirebrigades`
  return url
}
//  消防单位类别
export const getFirecontrolcategory = () => {
  const url = `${Test}/organization/getFirecontrolcategory`
  return url
}
//  getIndustrycategory  行业类别
export const getIndustrycategory = () => {
  const url = `${Test}/organization/getIndustrycategory`
  return url
}
export const SetCheckTaskFiled = (taskID) => {
  const url = `${Test}/task/SetCheckTaskFiled?checktaskid=${taskID}`
  return url
}
export const getCheckStandardsByBasedevicecode = (basedevicecode) => {
  const url = `${Test}/plan/getCheckStandardsByBasedevicecode?basedevicecode=${basedevicecode}`
  return url
}
export const getCheckStandard = (value) => {
  const url = `${Test}/plan/getCheckStandard?checkstandardid=${value}`
  return url
}
export const getStandardparams = (value) => {
  const url = `${Test}/plan/getStandardparams?checkstandardid=${value}`
  return url
}
export const getTechnicalRequirements = (value) => {
  const url = `${Test}/plan/getTechnicalRequirements?checkstandardid=${value}`
  return url
}
export const deleteCheckStandard = (tabulationID) => {
  const url = `${Test}/plan/deleteCheckStandard?checkstandardid=${tabulationID}`
  return url
}
export const creatOrUpdateCheckStandard = (MinData, MaxData, unit) => {
  const url = `${Test}/plan/creatOrUpdateCheckStandard?min=${MinData}&max=${MaxData}&unit=${unit}`
  return url
}
export const getFaultTypes = () => {
  const url = `${Test}/plan/getFaultTypes`
  return url
}
export const getRevisionlevel = () => {
  const url = `${Test}/plan/getRevisionlevel`
  return url
}
export const getAllWorkcycle = () => {
  const url = `${Test}/plan/getAllWorkcycle`
  return url
}
export const getWorkModes = () => {
  const url = `${Test}/plan/getWorkModes`
  return url
}
