// import axios from 'axios'
//  登录接口
const Test = window.Test
export const userLogin = (username, password, clientId) => {
  let url = `${Test}/auth/login?usercode=${username}&password=${password}&deviceKey=${clientId}`
  return url
}
// 退出登录
export const secede = (toKen) => {
  const url = `${Test}/auth/logout?token=${toKen}`
  return url
}
// 系统设置->用户设置->查看用户信息
export const iConsumerexamine = (userId) => {
  const url = `${Test}/users/findUser?userid=${userId}`
  return url
}
// 头部右侧部分
export const findUserProjects = (token) => {
  const url = `${Test}/projects/findUserProjects?token=${token}`
  return url
}
// 获取用户管理的管辖范围内的项目信息
export const getPorjectByUserID = (token, userid) => {
  const url = `${Test}/app/tasks/getPorjectByUserID?token=${token}&userid=${userid}`
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
export const getRolesListByOrg = (token, organizationId) => {
  return `${Test}/users/getRolesListByOrg?token=${token}&organizationId=${organizationId}`
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
// 组织机构权限管理 获取用户创建的组织机构
export const managementCreatedOrganizationtree = (token) => {
  const url = `${Test}/organization/getCreateOrganizations?token=${token}`
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
//  组织结构权限管理 专业类别
export const managementCreatedcategory = () => {
  const url = `${Test}/organization/getAllLevels`
  return url
}
//  组织结构权限管理 业务类别
export const managementCreatedbusiness = () => {
  const url = `${Test}/organization/getAllProfessionalCategory`
  return url
}
//  组织结构权限管理 组织类别
export const managementCreatedorganization = (token) => {
  const url = `${Test}/organization/getOrganizationType?token=${token}`
  return url
}
// 获取所有企业等级2
export const getLevelsByProfessionalCategory = (id) => {
  const url = `${Test}/organization/getLevelsByProfessionalCategory?id=${id}`
  return url
}
//  获取当前用户的组织机构信息
export const managementgetUserOrganization = (token) => {
  const url = `${Test}/organization/getUserOrganization?token=${token}`
  return url
}
// 创建组织机构
export const managementCreate = (token, organizationcode, organizationname, shortname, admin, pwd, tel, organizationtype) => {
  const url = `${Test}/organization/create?token=${token}&organizationcode=${organizationcode}&organizationname=${organizationname}&shortname=${shortname}&admin=${admin}&pwd=${pwd}&tel=${tel}&organizationtype=${organizationtype}`
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
// 获得工作结论
export const getWorkconclusion = () => {
  const url = `${Test}/task/getWorkconclusion`
  return url
}
//  approvalCheckPlan
export const approvalCheckPlan = (token, checkPlanId, approvalOpinion, approvalState) => {
  const url = `${Test}/plan/approvalCheckPlan?token=${token}&checkPlanId=${checkPlanId}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}`
  return url
}
export const findAllDeviceType = (token, projectid) => {
  //  获取设备类别
  const url = `${Test}/dev/findAllDeviceType?token=${token}&projectid=${projectid}`
  return url
}
export const findAllDeviceTypeTwo = (token) => {
  return `${Test}/dev/findAllDeviceType2?token=${token}`
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
export const updateDevice = (token, deviceid, projectid, areaid, manufacturerid, devicecode, basedeviceid, devicemodel, position, parameters, memo, mac, madedate, effectivedate, devunitId, files) => {
  const url = `${Test}/dev/updateDevice?token=${token}&deviceid=${deviceid}&projectid=${projectid}&areaid=${areaid}&manufacturerid=${manufacturerid}&devicecode=${devicecode}&basedeviceid=${basedeviceid}&devicemodelID=${devicemodel}&position=${position}&parameters=${parameters}&memo=${memo}&mac2=${mac}&madedate=${madedate}&effectivedate=${effectivedate}&devunitId=${devunitId}&files=${files}`
  return url
}
//  daily
export const maintainDailyCurrentTaskStat = (worktypeid, projectid, begintime, endtime) => {
  const url = `${Test}/task/getCurrentTaskStat?worktypeid=${worktypeid}&projectid=${projectid}&begintime=${begintime}&endtime=${endtime}`
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
export const getCurrentTaskDeviceStatJson = (token, itemAreaid) => {
  return `${Test}/task/getCurrentTaskDeviceStatJson?token=${token}&taskid=${itemAreaid}`
}
export const batchApprovalCheckTaskByDetailIDs = (token, taskid, detailids) => {
  return `${Test}/task/batchApprovalCheckTaskByDetailIDs?token=${token}&taskid=${taskid}&detailids=${detailids}`
}

export const getCurrentTaskDeviceStatJsonTwo = (token, conclusion, taskid, areaid, basedevicecode, approvalstates) => {
  return `${Test}/task/getCurrentTaskDeviceStatJson?token=${token}&conclusion=${conclusion}&taskid=${taskid}&areaid=${areaid}&basedevicecode=${basedevicecode}&approvalstates=${approvalstates}&pageindex=&pagesize=`
}
//  安排任务 -> 维保单位
export const maintainDailygetRepairOrgTreeByDeviceId = (deviceid, projectid) => {
  const url = `${Test}/organization/getRepairOrgTreeByDeviceId?deviceid=${deviceid}&projectid=${projectid}`
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
export const maintainDailyassignedTask = (projectid, token, string, desc, disposeopinion, faultTypeId) => {
  const url = `${Test}/task/assignedTask?projectid=${projectid}&token=${token}&detailIDs=${string}&desc=${desc}&disposeopinion=${disposeopinion}&faultTypeId=${faultTypeId}`
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
// 审核状态
export const maintainRepairgetgetRepariTaskQueryApprovalItem = () => {
  const url = `${Test}/repairtasks/getRepariTaskQueryApprovalItem`
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
// 修改审批意见
export const maintainRepairModifyApprovalOptionByTaskid = (approvalOption, taskid) => {
  const url = `${Test}/repairtasks/modifyApprovalOption?taskid=${taskid}&approvalOption=${approvalOption}`
  return url
}
export const maintainRepairModifyApprovalOptionByTaskidTwo = (token, approvalid, approvalOption) => {
  return `${Test}/repairtasks/modifyApprovalOption2?token=${token}&approvalid=${approvalid}&approvalOption=${approvalOption}`
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
export const maintainRepairapprovalTaskTwo = (token, repairtaskid, approvalOpinion, approvalState) => {
  return `${Test}/repairtasks/approvalTask?token=${token}&repairtaskid=${repairtaskid}&approvalOpinion=${approvalOpinion}&approvalState=${approvalState}`
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
export const maintainReportfindFeedback = (projectid, pageIndex, pageSize) => {
  const url = `${Test}/feedback/findFeedback?projectid=${projectid}&pageIndex=${pageIndex}&pageSize=${pageSize}`
  return url
}
//  setUserRoles
export const setUserRoles = (userid) => {
  const url = `${Test}/users/setUserRoles?userid=${userid}`
  return url
}

//  查寻上报问题
export const maintainReportfindFeedbackTwo = (projectid, areaid, basedevicecode, feedbackState, confirmState, pageIndex, pageSize) => {
  const url = `${Test}/feedback/findFeedback?projectid=${projectid}&areaid=${areaid}&basedevicecode=${basedevicecode}&feedbackState=${feedbackState}&confirmState=${confirmState}&pageIndex=${pageIndex}&pageSize=${pageSize}`
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
export const getCurrentTaskFileDeviceStatJson = (token, worktypeid, maintainProject, startTime, endTime) => {
  return `${Test}/task/getCurrentTaskFileDeviceStatJson?token=${token}&worktypeid=${worktypeid}&projectid=${maintainProject}&beginTime=${startTime}&endTime=${endTime}`
}
//  增加上报问题
export const maintainReportAddDevice = (rowcount, token, projectid, devicetypeid, manufacturerid, basedevicecode, devicemodel, parameters, memo, madedate, effectivedate, icons, devunitid) => {
  const url = `${Test}/dev/AddDevice?rowcount=${rowcount}&token=${token}&projectid=${projectid}&devicetypeid=${devicetypeid}&manufacturerid=${manufacturerid}&basedevicecode=${basedevicecode}&devicemodelID=${devicemodel}&parameters=${parameters}&memo=${memo}&madedate=${madedate}&effectivedate=${effectivedate}&icons=${icons}&devunitid=${devunitid}`
  return url
}
export const AddDevUnit = (token, devicetypeid, unitname) => {
  return `${Test}/dev/AddDevUnit?token=${token}&devicetypeid=${devicetypeid}&unitname=${unitname}`
}
export const GetDevUnit = (token, devicetypeid) => {
  return `${Test}/dev/GetDevUnit?token=${token}&devicetypeid=${devicetypeid}`
}

export const createChecktask = (checkplanid) => {
  return `${Test}/task/createChecktask?planid=${checkplanid}`
}

export const findAllDeviceUnit = (token) => {
  return `${Test}/dev/findAllDeviceUnit?token=${token}`
}
export const PojectdeviceApprovals2 = (deviceids, approvalstate) => {
  const url = `${Test}/dev/PojectdeviceApprovals2?deviceids=${deviceids}&approvalstate=${approvalstate}`
  return url
}
export const PojectdeviceApproval = (deviceid, approvalopinion, approvalstate) => {
  const url = `${Test}/dev/PojectdeviceApproval?deviceid=${deviceid}&approvalopinion=${approvalopinion}&approvalstate=${approvalstate}`
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
export const maintainArrangegetAllPlansTwo = (projectid, worktypeid) => {
  return `${Test}/plan/getAllPlans?projectid=${projectid}&worktypeid=${worktypeid}`
}
//  获取巡检计划
export const maintainArranggetCheckPlan = (checkplanid) => {
  const url = `${Test}/plan/getCheckPlan?checkPlanId=${checkplanid}`
  return url
}
//  获取所有计划类型
export const maintainArranggetAllPlanTypes = (projectid) => {
  const url = `${Test}/plan/getAllPlanTypes?projectid=${projectid}`
  return url
}
// 设置计划可用或不可用
export const maintainArrangsetPlan = (planid) => {
  const url = `${Test}/plan/setPlanEnableOrDisable?planid=${planid}`
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
// 获取计划编码
export const maintainArranggetGetPlanCode = (projectid, worktypeid) => {
  const url = `${Test}/plan/getPlanCode?projectid=${projectid}&worktypeid=${worktypeid}`
  return url
}
// 插件频率类型
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
export const adminfindDeviceDetailTwo = (deviceid) => {
  const url = `${Test}/dev/findDeviceDetail2?devid=${deviceid}`
  return url
}
// adminFindInspectionMaintenance
export const adminFindInspectionMaintenance = (deviceid) => {
  const url = `${Test}/dev/FindInspectionMaintenance?devid=${deviceid}`
  return url
}
//  admingetDevListDetailProjects
export const admingetDevListDetailProjects = (areaid, projectid) => {
  const url = `${Test}/dev/getDevListDetailProjects?areaid=${areaid}&projectid=${projectid}`
  return url
}
//  getDevListDetailProjectsTwo
export const getDevListDetailProjectsTwo = (basedevicecode, areaid, projectid) => {
  const url = `${Test}/dev/getDevListDetailProjects?basedevicecode=${basedevicecode}&areaid=${areaid}&projectid=${projectid}`
  return url
}
export const getDevListDetailProjectsThree = (equipmentdata, runningState, AuditstatusD, adminid, manufactorModel, projectid) => {
  const url = `${Test}/dev/getDevListDetailProjects?basedevicecode=${equipmentdata}&devicestate=${runningState}&approvalstate=${AuditstatusD}&areaid=${adminid}&manufacturerid=${manufactorModel}&projectid=${projectid}`
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
export const CalcDevCount = (token, projectid, regionId, pageIndex, pageSize) => {
  const url = `${Test}/dev/CalcDevCount?token=${token}&projectid=${projectid}&areaid=${regionId}&pageIndex=${pageIndex}&pageSize=${pageSize}`
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
export const GetDevUnitByBaseDevCode = (token, basedevcode) => {
  return `${Test}/dev/GetDevUnitByBaseDevCode?token=${token}&basedevcode=${basedevcode}`
}
//  创建用户角色
export const increasedcreateAdminRole = (roleName, organizationid, token) => {
  const url = `${Test}/users/createAdminRole?roleName=${roleName}&organizationid=${organizationid}&token=${token}`
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
export const getAdminUsers = (orgid, token) => {
  const url = `${Test}/users/getAdminUsers?orgid=${orgid}&token=${token}`
  return url
}
// 查询组织机构中的管理员用户
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
// 获取角色列表
export const getRolesList3 = (token, userId) => {
  const url = `${Test}/users/getRolesList3?userid=${userId}&token=${token}`
  return url
}
// 禁用或启用角色
export const SetRoleDisabledOrEnabled = (roleid) => {
  const url = `${Test}/roles/SetRoleDisabledOrEnabled?roleID=${roleid}`
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
export const getOrganizationTreeTion = (type) => {
  return `${Test}/organization/getOrganizationTree?organizationid=${type}`
}
// 获取单位类型（如果是子单位会返回跟单位类型）
export const getOrgType = (orgid) => {
  const url = `${Test}/organization/getOrgType?orgid=${orgid}`
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
export const areasFindAll = (projectid) => {
  const url = `${Test}/areas/findAll?projectid=${projectid}`
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
// getAllOrgTreeeByProjectId
export const getAllOrgTreeeByProjectId = (projectid, token) => {
  const url = `${Test}/organization/getAllOrgTreeeByProjectId?projectid=${projectid}&token=${token}`
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
export const getPlanState = () => {
  return `${Test}/plan/getPlanState`
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
export const getApproveType = (token) => {
  const url = `${Test}/dev/getApproveType?token=${token}`
  return url
}
export const findAreasTree = (areaid) => {
  const url = `${Test}/areas/findAreasTree?areaid=${areaid}`
  return url
}
// 发布通知
export const deliverAnnouncement = (title, sendTime, effectTime, level, content, ids, names) => {
  return `${Test}/message/createMessage?msgtitle=${title}&sendtime=${sendTime}&effecttime=${effectTime}&msglevel=${level}&content=${content}&receiveids=${ids}&receivenames=${names}`
}
// 获取接收人
export const getReceivePer = () => {
  return `${Test}/message/findReceiveUsers`
}
// 获取通知消息列表
export const getMessageList = (msgType, pageIndex, pageSize, msg, projectId = '') => {
  return `${Test}/message/findMessageList?msgtype=${msgType}&pageIndex=${pageIndex}&pageSize=${pageSize}&msgtitle=${msg}&projectid=${projectId}`
}
// 首页获取消息数量
export const getMessageCount = () => {
  return `${Test}/message/findMessageCount`
}
// 更新消息状态
export const updateMsgState = (id) => {
  return `${Test}/message/updataMessageState?receiveId=${id}`
}
// 获取折线图数据
export const getDevFaultCountForYear = (projectId, areaId, year) => {
  return `${Test}/dev/getDevFaultCountForYear?projectid=${projectId}&areaid=${areaId}&vyear=${year}`
}
// 获取饼图数据
export const getTaskProgress = (projectId, areaId) => {
  return `${Test}/task/getTaskProgress?projectid=${projectId}&areaid=${areaId}`
}
// 获取嵌套环形
export const getCircleData = (projectId, areaId) => {
  return `${Test}/dev/GroupDevIntactconditions?projectid=${projectId}&areaid=${areaId}`
}
// 首页获取设备信息
export const getDeviceData = (projectId, areaId) => {
  return `${Test}/areas/findAlarmDeviceData?projectid=${projectId}&areaid=${areaId}`
}
// 获取设备维保信息
export const getDeviceRepair = (deviceId) => {
  return `${Test}/app/tasks/getDevLastworktime?deviceid=${deviceId}`
}
// 获取区域树根据项目
export const getTreeByProjectId = (projectId) => {
  return `${Test}/areas/findAreasTreeByProjectid?projectid=${projectId}`
}
export const updateUserWithPwd = (token, userid, oldpwd, newpwd, organizationid, username, email, tel, userstate, job, memo, roleids, file) => {
  return `${Test}/users/updateUserWithPwd?token=${token}&userid=${userid}&oldpwd=${oldpwd}&newpwd=${newpwd}&organizationid=${organizationid}&username=${username}&email=${email}&tel=${tel}&userstate=${userstate}&job=${job}&memo=${memo}&roleids=${roleids}&file=${file}`
}
export const exportMaintenanceReportForMonth = (token, projectid, beginTime, endTime, worktypid) => {
  return `${Test}/taskexport/exportMaintenanceReportForMonth?token=${token}&projectid=${projectid}&beginTime=${beginTime}&endTime=${endTime}&worktypid=${worktypid}`
}
export const findAllApproval = (token, recordid) => {
  return `${Test}/task/findAllApproval?token=${token}&recordid=${recordid}`
}
export const getChecktaskdetailsByPlanid = (planid, pageindex, pagesize, begindate, enddate, basedevicecode, areaid, conclusion) => {
  return `${Test}/task/getChecktaskdetailsByPlanid?planid=${planid}&pageindex=${pageindex}&pagesize=${pagesize}&begindate=${begindate}&enddate=${enddate}&basedevicecode=${basedevicecode}&areaid=${areaid}&conclusion=${conclusion}`
}
export const findAllMaintenanceProject = (token, nameKey, pageIndex, pageSize) => {
  let data = nameKey ? `nameKey=${nameKey}&` : ``
  return `${Test}/workRecord/findAllMaintenanceProject?token=${token}&${data}pageIndex=${pageIndex}&pageSize=${pageSize}`
}
export const findTaskType = (token) => {
  return `${Test}/workRecord/findTaskType?token=${token}`
}
export const findFaultProblem = (token, projectid, startTime, endTime, deviceType, deviceArea, taskType, handleResult, pageIndex, pageSize) => {
  return `${Test}/workRecord/findFaultProblem?token=${token}&projectid=${projectid}&startTime=${startTime}&endTime=${endTime}&deviceType=${deviceType}&deviceArea=${deviceArea}&taskType=${taskType}&handleResult=${handleResult}&pageIndex=${pageIndex}&pageSize=${pageSize}`
}
export const getAllFeedbackstate = (token) => {
  return `${Test}/feedback/getAllFeedbackstate?token=${token}`
}
//
export const statFeedBackInfo = (token, projectid, devtypeid, areaid, devstate, start, end, pageIndex, pageSize) => {
  return `${Test}/feedback/statFeedBackInfo?token=${token}&projectid=${projectid}&basedevid=${devtypeid}&areaid=${areaid}&devstate=${devstate}&start=${start}&end=${end}&pageIndex=${pageIndex}&pageSize=${pageSize}`
}

export const statTaskDevListInfo = (token, projectid, devtypeid, areaid, devstate, pageIndex, pageSize) => {
  return `${Test}/feedback/statTaskDevListInfo?token=${token}&projectid=${projectid}&basedevid=${devtypeid}&areaid=${areaid}&devstate=${devstate}&pageIndex=${pageIndex}&pageSize=${pageSize}`
}
//
export const getAllTaskDevstate = (token) => {
  return `${Test}/feedback/getAllTaskDevstate?token=${token}`
}

//
export const exportTaskReport = (token, type, planid, begindate, enddate, devicecode, areaid, conclusion) => {
  return `${Test}/taskexport/exportTaskReport?token=${token}&type=${type}&planid=${planid}&begindate=${begindate}&enddate=${enddate}&devicecode=${devicecode}&areaid=${areaid}&conclusion=${conclusion}`
}

export const getAllDetailsByDeviceId = (taskId, deviceId) => {
  return `${Test}/task/getAllDetailsByDeviceId?taskId=${taskId}&deviceId=${deviceId}`
}

export const generateFeedbackInfo = (token, projectid, start, end, feedbackids) => {
  return `${Test}/taskexport/generateFeedbackInfo?token=${token}&projectid=${projectid}&start=${start}&end=${end}&feedbackids=${feedbackids}`
}

export const generateProblemRecordInfo = (token, repairTaskIds) => {
  return `${Test}/statement/generateFacilities?token=${token}&repairTaskIds=${repairTaskIds}`
}

export const findDeviceType = (token, projectid, startTime, endTime) => {
  return `${Test}/workRecord/findDeviceType?token=${token}&projectid=${projectid}&startTime=${startTime}&endTime=${endTime}`
}

export const findDeviceArea = (token, projectid, startTime, endTime) => {
  return `${Test}/workRecord/findDeviceArea?token=${token}&projectid=${projectid}&startTime=${startTime}&endTime=${endTime}`
}

export const generateContractInfos = (token, projectIds) => {
  return `${Test}/statement/generateContractInfos?token=${token}&projectIds=${projectIds}`
}

export const generateTaskDevDetailInfo = (token, projectid, devids) => {
  return `${Test}/taskexport/generateTaskDevDetailInfo?token=${token}&projectid=${projectid}&devids=${devids}`
}

//  http://172.16.6.16:8920
export const generateTaskTaizgangInfo = (token, projectid, devids, areaid) => {
  return `${Test}/taskexport/generateTaskTaizgangInfo?token=${token}&projectid=${projectid}&devids=${devids}&areaid=${areaid}`
}

//  刘哥的接口, 目前 开始时间 结束时间, 定死(没有意义)
export const generateTaskWorksInfo = (token, projectid, devids) => {
  return `${Test}/taskexport/generateTaskWorksInfo?token=${token}&projectid=${projectid}&devids=${devids}&start=2017-1-1&end=2019-1-1`
}

export const IsNeedAlarmSys = (token) => {
  return `${Test}/auth/IsNeedAlarmSys?token=${token}`
}
