import API from '@/api'
import { Message } from 'element-ui'

console.log('APIS:', API)

const state = {
  articleSingle: {},
  pictureTypes: [],
  pictureList: [],
  imgToken: null
}

const actions = {
  // 新增文章
  async createArticle({ commit, state }, { data, callback }) {
    let res = await API.createArticle(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res.data)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 获取图片服务器TOKEN
  async getImgToken({ commit, state }) {
    let res = await API.imgToken()
    if (res) {
      if (res.code === 0) {
        commit('IMG_TOKEN', res.data.token)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 图片上传
  async upload({ commit, state }, { data, callback }) {
    let res = await API.upload(data)
    if (res.status === 200) {
      typeof callback == 'function' && callback(res.data)
    } else {
      Message.error(res.msg || 'error')
    }
  },
  // 删除图片
  async deleteImg({ commit, state }, { data: data, callback }) {
    let res = await API.deleteImg(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 获取单条文章
  async getArticleSingle({ commit, state }, { data, callback }) {
    let res = await API.getArticleSingle(data)
    if (res) {
      if (res.code == 0) {
        commit('ARTICLESINGLE', res.data.current)
        typeof callback == 'function' && callback(res.data)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 更新单条文章
  async updateArticleSingle({ commit, state }, { data, callback }) {
    let res = await API.updateArticleSingle(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res.data)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 创建图片类型
  async createPictureType({ commit, state }, { data, callback }) {
    let res = await API.createPictureType(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 上传图片到分类
  async createImgItem({ commit, state }, { data: data, callback }) {
    let res = await API.createImgItem(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 更新图片到分类
  async updateImgItem({ commit, state }, { data: data, callback }) {
    let res = await API.updateImgItem(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 获取图片类型
  async getPictureType({ commit, state }, data) {
    let res = await API.getPictureType(data)
    if (res) {
      if (res.code == 0) {
        commit('PICTURE_TYPES', res.data)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 更新图片类型
  async updatePictureType({ commit, state }, { data: data, callback }) {
    let res = await API.updatePictureType(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  },
  // 删除图片类型
  async delePictureType({ commit, state }, { data: data, callback }) {
    let res = await API.delePictureType(data)
    if (res) {
      if (res.code == 0) {
        typeof callback == 'function' && callback(res)
      } else {
        Message.error(res.msg || 'error')
      }
    }
  }
}

const mutations = {
  ['ARTICLESINGLE'](state, data) {
    state.articleSingle = data
  },
  PICTURE_TYPES(state, payload) {
    state.pictureTypes = payload
  },
  IMG_TOKEN(state, payload) {
    state.imgToken = payload
  }
}

export default {
  state,
  actions,
  mutations
}
