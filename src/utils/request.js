import axios from 'axios';
import store from '../store'
import router from '../router'
import { Message , MessageBox } from 'element-ui'

/**
 * 封装的全局ajax请求0
 */
let ajaxSubmitFlag=true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL='/op-service-authentication';
axios.defaults.timeout = 600000;
axios.defaults.validateStatus=function (status) {
	return status >= 200 && status < 404; // 默认的
};

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});


// 添加响应拦截器
let loginFlag = false;  //防止一次彈出多個窗口
axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	if(response.data.code == 306 || response.data.code == 401){ //多人登陸
		if(loginFlag) return response;;
		loginFlag = true;
		MessageBox.alert(response.data.msg, store.state.lang=="en"?"Note":'溫馨提示', {
			confirmButtonText: store.state.lang=="en"?"Confrim":'确定',
			type: 'warning',
		}).finally(() => {
			loginFlag = false;
			router.push({
				path:'/login',
				query: {
					quit: true, // 直接退出，不做提示
				}
			})//token失效，直接退出
		})
	}else{
		//return;
		return response;
	}
	
}, function(error) {
	console.log('err' + error) // for debug
    Message({
      message: error.message || "接口請求錯誤，請稍後重試。",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
});

//处理data
function dataS(data){
	let val='';
	for(let key in data){
		val=val+'&'+key+'='+data[key];
	}
	return val.slice(1,val.length);
};


/**
 * GET 请求 {es6解构赋值}
 * @param type 包含url信息
 * @param data 需要发送的参数
 * @returns {Promise}
 * @constructor
 */
export default {
	
	HttpGet(url, data={},isSubmit=false) {
		if(!ajaxSubmitFlag && isSubmit){
			return false
		}
		let token;
		let cs_admin=['/agent/qryPlcBaseInfos']
		if(cs_admin.indexOf(url) != -1){ 
			axios.defaults.baseURL='/op-service-admin-cs';
		} else {
			axios.defaults.baseURL='/op-service-authentication';
		}
		data.token=token;
		axios.defaults.headers.get["token"] = token;
		// 创建一个promise对象
		let promise = new Promise((resolve, reject) => {
			if(isSubmit){
				ajaxSubmitFlag=false;
			}
			axios.get(url, {
					params: data
				})
				.then((res) => {
					if(isSubmit){
						ajaxSubmitFlag=true;
					}
					resolve(res.data);	
				})
				.catch((res) => {
					if(isSubmit){
						ajaxSubmitFlag=true;
					}
					reject(res);
				})
		})
		return promise;
	},
	/**
	 * POST 请求
	 * @param type Object 包含url信息
	 * @param data Object 需要发送的参数
	 * @param urlData Object 需要拼接到地址栏的参数
	 * @returns {Promise}
	 * @constructor
	 */
	HttpPost(url, data={}, contentType='application/x-www-form-urlencoded', isSubmit=false,fileType,typeBlob) {
		if(!ajaxSubmitFlag && isSubmit){
			return false
		}
		const options = {};
		const { download } = data;
		if (download) {
			delete data.download;
			options.responseType = "blob";
		}
		if(typeBlob === "blob"){
			options.responseType = "blob";
		}
		let token;
		data.token=token;
		let cs_admin=['/agent/qryPlcBaseInfos']
			
		if (cs_admin.indexOf(url) != -1){ 
			axios.defaults.baseURL='/op-service-admin-cs';
		}else {
			axios.defaults.baseURL='/op-service-authentication';
		}
		if(contentType=="json"){
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			url=url+"?token="+token;
		}else if(contentType == 'uploadFile') {
			axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
			axios.defaults.headers.post['processData'] = false;
			url=url+"?token="+token;
		}else if(contentType == 'uploadFileCrm') {
			axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
			axios.defaults.headers.post['processData'] = false;
		}else if(contentType==false){
			axios.defaults.headers.post['Content-Type'] = false;
			axios.defaults.headers.post['processData'] = false;
			url=url+"?token="+token;
		}else{
			axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			data=dataS(data);
		}


		// 创建一个promise对象
		let promise = new Promise((resolve, reject) => {
			if(isSubmit){
				ajaxSubmitFlag=false;
			}
			axios.post(url,data,options)
				.then((res) => {
					if(isSubmit){
						ajaxSubmitFlag=true;
					}
					//resolve(res.data);
					//现金价值信导出
					if(url.indexOf('/cashValue/exportCashValueExcel') > -1 || url.indexOf('/cashValue/downLoadCashValueFile') > -1 || fileType == 'excel') {
						resolve(res);
					}


					if(res && res.data) {
						resolve(res.data);
					}else{
						resolve(res);
					}
				})
				.catch((res) => {
					if(isSubmit){
						ajaxSubmitFlag=true;
					}
					reject(res);
					
				})
		})
		return promise;
	}
}	

