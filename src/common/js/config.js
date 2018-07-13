// 地图类型
export const mapType = {
  map1: 1,
  map2: 2,
  map3: 3,
  map4: 4
}
// 报警数据操作状态
export const alarmAddOrDelete = {
  add: 'ADD',
  delete: 'DELETE',
  update: 'UPDATE'
}
// 输入框的按键状态
export const searchBoxState = {
  up: 38,
  down: 40,
  ok: 13
}
export const polygonState = {
  selected: '#fa522b',
  unselected: '#5ea8d7'
}
// 不同类型对应的不同样式的class
export const iconTypeStyle = {
  normal: '',
  alarm: 'icon-alarm',
  selected: 'icon-selected'
}
// 接警情况处理
export const alarmHandle = {
  ALARM_NOT_ALARM: 1,
  ALARM_NOT_HANDLE: 2,
  ALARM_HANDLE: 3,
  ALARM_NOT_ALARM_OVERTIME: 4,
  ALARM_NOT_HANDLE_OVERTIME: 5,
  ALARM_HANDLE_OVERTIME: 6
}
// 报警情况类型
export const alarmHandleState = {
  alarmNothing: 0,
  alarmReceive: 1,
  alarmHandle: 2,
  alarmFinish: 3
}
// 报警情况类型
export const alarmHandleStateName = {
  alarmNothing: '-',
  alarmReceive: '接警',
  alarmHandle: '报警处理',
  alarmFinish: '已处理'
}
// 地图瓦片加载失败的默认图片
export const errorUrl = 'static/img/area-nav.png'
// marker类型
export const layer = {
  fire: 'fire',
  start: 'start',
  feedback: 'feedback',
  supervise: 'supervise',
  shield: 'shield',
  fault: 'fault',
  state: 'state',
  other: 'other',
  normal: 'normal'
}
// 报警图标的图片
export const iconUrl = {
  fire: 'static/img/fire.png',
  start: 'static/img/start.png',
  feedback: 'static/img/feedback.png',
  supervise: 'static/img/supervise.png',
  shield: 'static/img/shield.png',
  fault: 'static/img/fault.png',
  state: 'static/img/state.png',
  other: 'static/img/other.png'
}
// 报警码
export const stateCode = {
  shield: 1,
  fire: 2,
  supervise: 4,
  start: 8,
  feedback: 16,
  fault: 32,
  state: 64,
  other: 128
}
// 报警级别
export const stateLevel = {
  shield: 1700,
  fire: 1600,
  supervise: 1500,
  start: 1400,
  feedback: 1300,
  fault: 1200,
  state: 1100,
  other: 1000,
  normal: 900
}
// 报警数组
export const stateArr = ['shield', 'fire', 'supervise', 'start', 'feedback', 'fault', 'state', 'other']
// 报警描述
export const stateData = {
  shield: {name: '屏蔽', type: 'shield', color: '#DA9A80'},
  fire: {name: '火警', type: 'fire', color: '#FA2B2B'},
  supervise: {name: '监管', type: 'supervise', color: '#F07918'},
  start: {name: '启动', type: 'start', color: '#DD5050'},
  feedback: {name: '反馈', type: 'feedback', color: '#48AEE8'},
  fault: {name: '故障', type: 'fault', color: '#DFB800'},
  state: {name: '状态', type: 'state', color: '#4BB780'},
  other: {name: '其它', type: 'other', color: '#9470F1'},
  normal: {name: '正常', type: 'normal', color: '#fff'}
}
export const userError = {
  inputError: '用户名或密码错误'
}
// 接警处理操作错误提示
export const alarmHandleError = {
  reasonId: '请选择报警原因',
  reasonText: '请填写报警原因',
  handleText: '请填写处理情况内容'
}
export const repairError = {
  repairType: '请选择任务类型',
  reasonText: '请填写异常条件',
  handleText: '请填写处理意见',
  handlePer: '请选择执行人员'
}
export const errorText = {
  network: '网络异常'
}
