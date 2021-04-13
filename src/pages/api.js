/*
 * @Author: your name
 * @Date: 2019-11-20 14:41:50
 * @LastEditTime: 2019-12-04 17:31:10
 * @LastEditors: flyemow
 * @Description: In User Settings Edit
 * @FilePath: \saas-html-spd:\uface\boss\src\views\uface-boss\api.js
 */
import fetch from '@/utils/http'
import api from '@/api'
const prefix = ''
/*
 *  文章列表-跳转-(add,view,delete)
 */
const routeAcount = {
  Add(params = {}) {
    return { name: `articleAdd`, path: `/add`, params: params }
  },
  Edit(params = {}) {
    return { name: `articleEdit`, path: `/edit`, query: params }
  }
}
/*
 * 文章列表-API
 */
export const articleManage = {
  initList: params => {
    return fetch.get(`${prefix}${api.pages}`, params)
  },
  add: params => {
    return fetch.post(`${prefix}${api.create}`, params)
  },
  // update: params => {
  //   return fetch.put(`${prefix}${api.curd}`, params)
  // },
  // view: params => {
  //   return fetch.get(`${prefix}${api.curd}`, params)
  // },
  delete: params => {
    return fetch.delete(`${prefix}${api.pageCurd}/${params}`)
  }
}
/*
 * 图片类型-API
 */
export const imageTypes = {
  initList: params => {
    return fetch.get(`${prefix}${api.pictureType}`, params)
  }
}

/*
 * 图片列表
 */
export const pictureList = {
  initList: params => {
    return fetch.get(`${prefix}${api.pictureList}`, params)
  }
}

export { routeAcount }
