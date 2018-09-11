import axios from 'axios'
import { URL } from './config'

export const confirmAlarm = (alarmId, deviceKey) => {
  const url = `${URL}/alarm/confirmAlarm?alarmid=${alarmId}&devicekey=${deviceKey}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const getCurrentAlarmData = (alarmId) => {
  const url = `${URL}/alarm/findAlarm?alarmid=${alarmId}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const handleAlarm = (acceptAlarmId, alarmReasonId, alarmNote, processNote) => {
  const reason = alarmReasonId ? `&alarmreasonid=${alarmReasonId}` : ''
  const reasonText = alarmNote ? `&alarmnote=${alarmNote}` : ''
  const url = `${URL}/alarm/handleAlarm?acceptAlarmid=${acceptAlarmId}${reason}${reasonText}&processnote=${processNote}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}
