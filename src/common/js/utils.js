export const stateData = {
  pb: {name: '屏蔽', type: 'pb', color: '#DA9A80'},
  hj: {name: '火警', type: 'fire', color: '#FA2B2B'},
  jg: {name: '监管', type: 'supervise', color: '#F07918'},
  qd: {name: '启动', type: 'start', color: '#DD5050'},
  fk: {name: '反馈', type: 'feedback', color: '#48AEE8'},
  gz: {name: '故障', type: 'fault', color: '#DA9A80'},
  zt: {name: '状态', type: 'state', color: '#4BB780'},
  qt: {name: '其它', type: 'other', color: '#9470F1'},
  ok: {name: '正常', type: 'ok', color: '#fff'}
}
export const examineDate = {
  modify: {name: '修改', type: 'modify', color: '#e59a42'},
  file: {name: '归档', type: 'file', color: '#fff'},
  keep: {name: '留存', type: 'keep', color: '#3292a6'},
  unuse: {name: '停用', type: 'unuse', color: '#666'},
  waitapproval: {name: '待审批', type: 'waitapproval', color: '#e59a42'},
  del: {name: '删除', type: 'del', color: '#a63232'},
  rework: {name: '返工', type: 'rework', color: '#cf763a'},
  ok: {name: '可用', type: 'ok', color: '#cfb53a'}
}
//  时间戳转 YYYY-xx-ff
export const fmtDate = (obj) => {
  let date = new Date(obj)
  let y = 1900 + date.getYear()
  let m = `0` + (date.getMonth() + 1)
  let d = `0` + date.getDate()
  return y + `-` + m.substring(m.length - 2, m.length) + `-` + d.substring(d.length - 2, d.length)
}

export const dateTransfer = (timer) => {
  let date = new Date()
  date.setTime(timer)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  return y + '/' + m + '/' + d + ' ' + h + ':' + minute
}

export function resetTime (time, type) {
  if (time === '946656000000') {
    return '--:--'
  }
  let myTime = parseInt(time)
  let myDate = new Date(myTime)
  let year = myDate.getFullYear()
  let month = myDate.getMonth() + 1
  let day = myDate.getDate()
  let hour = myDate.getHours()
  let minutes = myDate.getMinutes()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (type === 'hh') {
    return `${hour}`
  } else if (type === 'mm') {
    return `${minutes}`
  } else if (type === 'time') {
    return `${hour}:${minutes}`
  } else if (type === 'date') {
    return `${year}-${month}-${day}`
  } else if (type === 'all') {
    return `${year}-${month}-${day} ${hour}:${minutes}`
  }
}

export function resize (pos, size, max) {
  if ((pos + size) > max) {
    return (pos - size)
  }
  return pos
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
