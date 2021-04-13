import fetch from '@/utils/http'
import axios from 'axios'
export default {
  login: params => {
    return fetch.post(`/api/login`, params)
  },
  logout: params => {
    return fetch.get(`/api/logout`, params)
  },
  upload: data => {
    // let req = {
    //   url: `http://upload.qiniup.com`,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data; boundary=' + new Date().getTime()
    //   },
    //   data: data
    // }
    // return fetch(req)
    return axios({
      url: 'http://upload.qiniup.com',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + new Date().getTime()
      },
      method: 'POST'
    })
    // axios.post(`http://upload.qiniup.com`, data.formData)
  },
  imgToken: params => {
    return fetch.get(`/api/img-token`, params)
  },
  createArticle: params => {
    return fetch.post(`/api/page/create`, params)
  },
  getArticleSingle: params => {
    return fetch.get(`/api/page/single/${params}`)
  },
  updateArticleSingle: params => {
    return fetch.put(`/api/page/single/${params}`, params)
  },
  pageCurd: `/api/page/single`,
  pages: `/api/page`,
  pictureType: '/api/photo/type',
  pictureList: '/api/photo',
  // createImg: '/api/photo/single',
  createPictureType: params => {
    return fetch.post(`/api/photo/type`, params)
  },
  createImgItem: params => {
    return fetch.post(`/api/photo/single`, params)
  },
  updateImgItem: params => {
    return fetch.put(`/api/photo/single/${params.id}`, params)
  },
  deleteImg: params => {
    return fetch.delete(`/api/photo/single/${params}`)
  },
  delePictureType: params => {
    return fetch.delete(`/api/photo/type/${params}`)
  },
  updatePictureType: params => {
    return fetch.put(`/api/photo/type`, params)
  },
  getPictureType: params => {
    return fetch.get(`/api/photo/type`, params)
  }
}
