import { amqpLocation } from './config'
const clientId = `fire${new Date().getTime()}`
const username = 'user'
const password = 'password'

/* global Alarm:true */
export const alarmData = function (deviceKey, callbackAlarm, callbackFirstAlarm) {
  Alarm.onAlarm = function (alarm) {
    callbackAlarm(alarm)
  }
  Alarm.onFirstFireAlarm = function (alarm) {
    callbackFirstAlarm(alarm)
  }
  Alarm.connect(
    amqpLocation,
    clientId,
    deviceKey,
    username,
    password
  )
}
