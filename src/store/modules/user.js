// import Cookies from 'js-cookie'
import API from '@/api'
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  getUserInfo,
  removeUserInfo
} from '@/utils'
import { Message } from 'element-ui'
import { menus } from '../../data/menus'
const state = {
  menus: JSON.parse(sessionStorage.getItem('menus')),
  roles: [],
  userInfo: getUserInfo(),
  token: getToken()
}

const getters = {
  userInfo: state => state.userInfo,
  menus: state => state.menus
}

const actions = {
  async login({ commit }, params) {
    const res = await API.login(params)
    if (res && res.code === 0) {
      const { data } = res
      commit('SET_MENUS', menus)
      commit('SET_USERINFO', data.userInfo)
      commit('SET_TOKEN', data.token)
    } else {
      return Error(res)
    }
  },
  async logout({ commit }) {
    const res = await API.logout()
    if (res && res.code === 0) {
      Message({
        message: '退出成功',
        type: 'success',
        duration: 1e3
      })
      commit('SET_TOKEN', '')
      removeUserInfo()
      removeToken()
    } else {
      return Error(res)
    }
  }
}
const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
    sessionStorage.setItem('menus', JSON.stringify(menus))
  },
  SET_TOKEN: (state, token) => {
    setToken(token)
    state.token = token
  },
  SET_USERINFO: (state, info) => {
    setUserInfo(info)
    state.userInfo = info
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
