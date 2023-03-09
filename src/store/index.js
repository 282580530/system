import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import { getStore } from '@/utils/mUtils'
Vue.use(Vuex)

const state = {
	userInfo:JSON.parse(sessionStorage.getItem("userInfo")) || {},
	userHasLogin:getStore('userInfo')?true:false,//admin登陆状态
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})