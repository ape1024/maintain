import axios from 'axios'
import { URL } from './config'

export const findAreasTree = (clientId) => {
  const url = `${URL}/areas/findAreasTreeByDeviceKey?deviceKey=${clientId}`
  return axios.post(url).then(function (response) {
    return Promise.resolve(response.data.data)
  }).catch(function (error) {
    console.log(error)
  })
}
