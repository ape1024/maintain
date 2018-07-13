import { resetTime } from './utils'
import { alarmHandle, stateData, layer } from './config'
import { getDeviceRecord, getGuide } from 'api/map'
export class IconAlarmList {
  constructor ({alarmtime, devicename, memo, deviceState, recordid, deviceid, areaid}) {
    this.startTime = resetTime(alarmtime, 'time')
    this.deviceName = devicename
    this.deviceDesc = memo
    this.deviceState = stateData[deviceState].name
    this.deviceReason = recordid
    this.deviceReasonState = deviceState !== layer.fire
    this.deviceId = deviceid
    this.areaId = areaid
  }
}

export const createFactoryData = function (factory) {
  return [
    {name: '单位名称：', val: factory.name},
    {name: '单位详址：', val: factory.address},
    {name: '上级单位：', val: factory.higherunit},
    {name: '监管单位：', val: factory.supervisionunit},
    {name: '消防类别：', val: factory.firefightingtype},
    {name: '行业类别：', val: factory.industrycategory},
    {name: '占地面积：', val: factory.landarea},
    {name: '总建筑面积：', val: factory.constructionarea},
    {name: '单位联系人：', val: factory.linkman},
    {name: '联系人电话：', val: factory.linkmantel},
    {name: '联网状态：', val: factory.networkingstate},
    {name: '入网日期：', val: factory.networkingdate}
  ]
}

export const createBuildingData = function (building) {
  return [
    {name: '建筑物编号：', val: building.areacode},
    {name: '建筑物名称：', val: building.buildingname},
    {name: '建造日期：', val: building.constructiondate},
    {name: '建筑物使用性质：', val: building.nature},
    {name: '火灾危险性类别：', val: building.dangerouscategory},
    {name: '耐火等级：', val: building.refractory},
    {name: '结构类型：', val: building.floorarea},
    {name: '建筑高度：', val: building.buildingarea},
    {name: '占地面积：', val: building.floorarea},
    {name: '建筑物面积：', val: building.buildingarea},
    {name: '标准层面积：', val: building.layerarea},
    {name: '地上层数：', val: building.abovelayer},
    {name: '地上层数面积：', val: building.abovearea},
    {name: '地下层数：', val: building.followinglayer},
    {name: '地下层数面积：', val: building.followingarea}
  ]
}

export const createFloorData = async function (floor) {
  const record = await getDeviceRecord(floor.deviceid).then((t) => t !== undefined ? t : [])
  const guide = floor.acceptid ? (await getGuide(floor.acceptid, floor.basedevicecode).then((t) => t).operateguide) : ''
  const stateName = stateData[floor.deviceStateVal].name

  let handleState
  if (floor.acceptState === alarmHandle.ALARM_NOT_ALARM || floor.acceptState === alarmHandle.ALARM_NOT_ALARM_OVERTIME) {
    handleState = 1
  } else if (floor.acceptState === alarmHandle.ALARM_NOT_HANDLE || floor.acceptState === alarmHandle.ALARM_NOT_HANDLE_OVERTIME) {
    handleState = 2
  } else {
    handleState = 3
  }
  return {
    state: floor.deviceStateVal,
    handleState,
    alarmId: floor.acceptid,
    device: [
      {name: '运行状态：', val: stateName},
      {name: '位置描述：', val: floor.position},
      {name: '管理编码：', val: floor.devicecode},
      {name: '地址编码：', val: floor.areaCode},
      {name: '生产厂家：', val: floor.unit},
      {name: '规格型号：', val: floor.devicemodel},
      {name: '生产时间：', val: resetTime(floor.madedate, 'all')}
    ],
    maintenance: record.map((t) => {
      return {name: t.worktypename, val: t.conclusion, time: t.lasttime}
    }),
    alarm: [
      {name: '信号类型：', val: stateName},
      {name: '报警时间：', val: resetTime(floor.createtime, 'time')},
      {name: '位置描述：', val: floor.position},
      {name: '地址编码：', val: floor.areaCode},
      {name: '控制器：', val: floor.deviceController}
    ],
    guide
  }
}
