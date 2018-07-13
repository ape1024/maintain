const debug = process.env.NODE_ENV !== 'production'

const debugOsmUrl = 'http://172.16.5.34:8080'
const projectOsmUrl = 'http://172.16.5.34:8080'
export const osmUrl = debug ? debugOsmUrl : projectOsmUrl

// const debugUrl = 'http://172.16.6.99:8910'
const debugUrl = 'http://172.16.5.35:18920'
const projectUrl = 'http://172.16.5.35:18920'
export const URL = debug ? debugUrl : projectUrl

export const USER_LOGIN_OK = 0
export const USER_EXIT_OK = 1
