import axios from  '../utils/request'

/*API*/


//查詢賬號列表
export const accountList = (params) => {
	return axios.HttpPost('/account/queryUserList',params)
};
