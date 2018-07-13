import axios from 'axios'
import { URL } from './config'

export const findMap = (areaId, types) => {
  const deviceType = !types ? '' : types
  const url = `${URL}/areas/findMap?areaid=${areaId}&devicetypeids=${deviceType}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const getDeviceRecord = (deviceId) => {
  const url = `${URL}/task/getTaskInfoForAlarm?deviceid=${deviceId}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}

export const getGuide = (alarmTypeId, baseDeviceCode) => {
  const url = `${URL}/alarm/findOperationGuide?alarmTypeId=${alarmTypeId}&basedeviceCode=${baseDeviceCode}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}
