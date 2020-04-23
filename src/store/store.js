import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || ''// 先从localStorage中获取数据
  },
  mutations: {
    // 存储token方法
    // 设置token等于外部传递进来的值
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    }
  },
  getters: {
  },
  actions: {
  }
})

export default store
