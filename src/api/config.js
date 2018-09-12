const debug = process.env.NODE_ENV !== 'production'

export const osmUrl = window.osmUrlConfig

export const URL = window.Test

const debugMqUrl = 'http://172.16.5.35:16674/stomp'
// const projectMqUrl = 'http://172.16.5.35:16674/stomp'
const projectMqUrl = 'http://114.215.46.71:15674/stomp'
export const amqpLocation = debug ? debugMqUrl : projectMqUrl

export const projectBaiDuUrl = 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518'

export const USER_LOGIN_OK = 0
export const USER_EXIT_OK = 1

export const TOKEN_STATE_FALSE = '0'
export const TOKEN_STATE_TRUE = '1'
