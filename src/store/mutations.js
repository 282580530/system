import router from "@/router";
import {
	USER_LOGIN,
	USER_LOGINOUT,
} from './mutation-types.js'

import { setStore, removeStore, setLocalStore } from '@/utils/mUtils'
export default {
	[USER_LOGIN](state, userInfo) {
        console.log(userInfo,'userInfo111');
		setStore("userInfo", JSON.stringify(userInfo));
		state.userHasLogin = true;
		state.userInfo = userInfo;
	},
	[USER_LOGINOUT](state) {
		removeStore("userInfo");
		state.userInfo = {};
	},
  	

}