// 获取clientId
const clientIdJson = window.sessionStorage.getItem('clientId')
let clientId = ''
if (clientIdJson) {
  clientId = JSON.parse(clientIdJson)
} else {
  clientId = `${parseInt(Math.random() * 8000 + 1000)}${new Date().getTime()}`
  window.sessionStorage.setItem('clientId', JSON.stringify(clientId))
}

const state = {
  userData: {
    areaId: '1'
  },
  cityAreaId: '',
  factoryAreaId: '',
  buildingAreaId: '',
  floorPlansAreaId: '',
  username: '',
  usericon: '',
  userToken: '',
  loading: false,
  maintainProject: window.localStorage.pattern ? window.localStorage.pattern : '',
  clientId,
  userList: [],
  treeStructure: [],
  cityDataDelete: false,
  cityData: {},
  cityDataMq: {},
  factoryDataDelete: false,
  factoryData: {},
  factoryDataMq: {},
  buildingDataDelete: false,
  buildingData: {},
  buildingDataMq: {},
  floorDataDelete: false,
  floorData: {},
  floorDataMq: {},
  mapLoadingState1: false,
  mapLoadingState2: false,
  mapLoadingState3: false,
  mapLoadingState4: false,
  mapLoadingStateMq: false,
  firstList: [],
  allList: [],
  alarmMq: {},
  alarmId: '',
  repairId: ''
}

export default state
