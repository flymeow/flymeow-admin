import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from './user'
import { removeToken, removeUserInfo } from '@/utils'
const TIMEOUT = 10000

const ERRORS = {
  'Network Error': '网络错误，请检查网络',
  [`timeout of ${TIMEOUT}ms exceeded`]: '请求超时，服务器未响应',
  'Internal Server Error': '请求服务器错误',
  'Request failed with status code 502': '请求服务器错误',
  'Request failed with status code 500': '请求服务器错误'
}

// 创建axios实例
const service = axios.create({
  timeout: TIMEOUT
})
service.defaults.baseURL = process.env.VUE_APP_BASE_API

// 请求
service.interceptors.request.use(
  config => {
    config.data = config.data || {}
    config.headers['token'] = getToken()
    // config.headers['Cache-Control'] = 'max-age=2, must-revalidate';
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.code === 0) {
        return response.data
      } else if (response.data.code === 403) {
        removeUserInfo()
        removeToken()
        router.push({ path: '/login' })
        Message.error('token过期，请重新登录')
        return false
      } else {
        Message.error(response.data.msg)
        return
      }
    }
  },
  error => {
    if (error.response) {
      const msg = error.msg
      if (msg) {
        error.message = ERRORS[msg] || msg
        Message({
          message: error.msg,
          type: 'error',
          duration: 2500,
          dangerouslyUseHTMLString: true
        })
        return Promise.reject(error)
      }
      if (error.response.status === 401) {
        store.dispatch('user/logout')
        router.push({ path: '/login' })
        Message.error('token过期，请重新登录')
        return false
      }
      if (error.response.status === 403) {
        router.push({ path: '/login' })
        Message.error('权限已失效，请登录重新获取权限')
      }
    }
  }
)

service.get = function(url, params) {
  return service({
    method: 'get',
    url,
    params
  })
}

export default service
