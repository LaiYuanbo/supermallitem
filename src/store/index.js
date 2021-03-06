import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations.js"
import actions from "./actions.js"
import getters from "./getters.js"

//注册组件
Vue.use(Vuex)
//创建store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
//挂载实例

export default store