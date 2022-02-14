// 请求接口
import qs from 'qs'

let promise = null
//get请求封装
function getRequest(url,data,tqs){
	return promise = new Promise((resolve,reject) => {
			var getData =tqs?qs.stringify(data):data;
			let commoneUrl = uni.getStorageSync('url');
			let accessToken = uni.getStorageSync('ACCESS_TOKEN');
			console.log(commoneUrl + url);
			uni.request({
				url:commoneUrl + url,
				data:getData,
				method:"GET",
				dataType:'json',
				header:{
					'content-type':'application/json',
					'Authorization':'Bearer ' + accessToken
				},
				success:function(res){
					// console.log(res,'res------------->')
					if(res.statusCode === 200)
					{
						resolve(res.data);
					}else{
						resolve(res.data)
					}
				},
				error:function(e)
				{
					reject(e);
				}
			});
	});
}
//post请求封装
function postRequest(url,data){
	return promise = new Promise((resolve,reject) => {
		var postData = data;
		let commoneUrl = uni.getStorageSync('url');
		uni.request({
			url:commoneUrl + url,
			data:postData,
			method:'POST',
			header:{
				'content-type': 'application/x-www-form-urlencoded'
			},
			success:function(res)
			{
				// console.log(res);
				if(res.statusCode === 200 && res.data.resultCode == 0)
				{
					resolve(res.data);
				}else{
					resolve(res.data)
				}
			},
			error:function(e)
			{
				console.log(e);
				reject(e);
			}
		})
	});
}
// 登录请求
function loginRequest(username, password, code, randomStr, url){
	// let promise = null
	return promise = new Promise((resolve,reject) => {
		let grant_type = 'password'
		let dataObj = qs.stringify({'username': username, 'password': password})
		let params = qs.stringify({'randomStr': randomStr, 'code': code, 'grant_type': grant_type})
		console.log(dataObj);
		let commoneUrl = uni.getStorageSync('url');
		console.log(commoneUrl);
		uni.request({
			url:commoneUrl + url + '?' + params,
			data:dataObj,
			method:'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				isToken: false,
				'TENANT-ID': '1',
				'Authorization': 'Basic cGxhbnBsYXQ6cGxhbnBsYXQ='
			},
			success:function(res)
			{
				console.log(res);
				resolve(res)
				// if(res.statusCode === 200)
				// {
				// 	resolve(res.data);
				// }else{
				// 	resolve(res.data)
				// }
			},
			error:function(e)
			{
				console.log(e);
				reject(e);
			}
		})
	});
}
// 刷新token
function refreshToken(refresh_token, url){
	// let promise = null
	return promise = new Promise((resolve,reject) => {
		let grant_type = 'refresh_token'
		let params = qs.stringify({'refresh_token': refresh_token, 'grant_type': grant_type, 'scope': 'server'})
		let commoneUrl = uni.getStorageSync('url');
		uni.request({
			url:commoneUrl + url + '?' + params,
			method:'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'isToken': false,
				'TENANT-ID': '1',
				'Authorization': 'Basic cGxhbnBsYXQ6cGxhbnBsYXQ='
			},
			success:function(res)
			{
				console.log(res);
				resolve(res)
				// if(res.statusCode === 200)
				// {
				// 	resolve(res.data);
				// }else{
				// 	resolve(res.data)
				// }
			},
			error:function(e)
			{
				console.log(e);
				reject(e);
			}
		})
	});
}
// 携带token的请求
function headerRequest(method, url, dataObj) {
	let token = uni.getStorageSync('ACCESS_TOKEN');
	return promise = new Promise((resolve,reject) => {
		let commoneUrl = uni.getStorageSync('url');
		let accessToken = uni.getStorageSync('ACCESS_TOKEN');
		if(dataObj) {
			let reqData = qs.stringify(dataObj)
			uni.request({
				url:commoneUrl + url,
				data:reqData,
				method:method,
				header: {
					'Authorization': 'Bearer ' + accessToken
				},
				success:function(res)
				{
					resolve(res)
					
				},
				error:function(e)
				{
					reject(e);
				}
			})
		} else {
			uni.request({
				url:commoneUrl + url,
				method:method,
				header: {
					'Authorization': 'Bearer ' + accessToken
				},
				success:function(res)
				{
					resolve(res)
					
				},
				error:function(e)
				{
					reject(e);
				}
			})
		}
		
		
	});
}
//带tokenPOSTJson
function postHeaderRequest(url,data,isQs){
	return promise = new Promise((resolve,reject) => {
		var postData = data;
		let commoneUrl = uni.getStorageSync('url');
		let accessToken = uni.getStorageSync('ACCESS_TOKEN');
		var token="Bearer "+accessToken;
		let urls='';
		if(isQs){
			urls=commoneUrl + url+'?username='+postData.username+'&flag='+postData.flag
		}else{
			urls=commoneUrl + url;
		}
		console.log("请求的地址: ",urls);
		console.log(token);
		uni.request({
			url:urls,
			data:postData,
			method:'POST',
			header:
				{
					'content-type':'application/json',
					'Authorization':token
			},
			success:function(res)
			{
				// console.log(res);
				if(res.statusCode === 200 && res.data.resultCode == 0)
				{
					resolve(res.data);
				}else{
					resolve(res.data)
				}
			},
			error:function(e)
			{
				reject(e);
			}
		})
	});
}

//带tokenPOSTJson
function putHeaderRequest(url,data,){
	return promise = new Promise((resolve,reject) => {
		var postData = data;
		let commoneUrl = uni.getStorageSync('url');
		let accessToken = uni.getStorageSync('ACCESS_TOKEN');
		var token="Bearer "+accessToken;
		console.log(token);
		uni.request({
			url:commoneUrl+url,
			data:postData,
			method:'PUT',
			header:
				{
					'content-type':'application/json',
					'Authorization':token
			},
			success:function(res)
			{
				// console.log(res);
				if(res.statusCode === 200 && res.data.resultCode == 0)
				{
					resolve(res.data);
				}else{
					resolve(res.data)
				}
			},
			error:function(e)
			{
				reject(e);
			}
		})
	});
}
//带tokenPOSTform
function postHeaderFRequest(url,data){
	return promise = new Promise((resolve,reject) => {
		var postData = data;
		let commoneUrl = uni.getStorageSync('url');
		let accessToken = uni.getStorageSync('ACCESS_TOKEN');
		console.log('请求地址：',commoneUrl+url);
		uni.request({
			url:commoneUrl + url,
			data:postData,
			method:'POST',
			header:
				{
					'content-type':'application/x-www-form-urlencoded',
					'token':accessToken
			},
			success:function(res)
			{
				// console.log(res);
				if(res.statusCode === 200 && res.data.resultCode == 0)
				{
					resolve(res.data);
				}else{
					resolve(res.data)
				}
			},
			error:function(e)
			{
				reject(e);
			}
		})
	});
}
//token_Form
function postHeaderFormRequest(url,data){
	return promise = new Promise((resolve,reject) => {
		var postData = data;
		let commoneUrl = uni.getStorageSync('url');
		let accessToken = uni.getStorageSync('ACCESS_TOKEN');
		// console.log('请求地址：',commoneUrl+url);
		uni.request({
			url:commoneUrl + url,
			data:postData,
			method:'POST',
			header:
				{
					  "content-type": "application/x-www-form-urlencoded",
					'token':accessToken
			},
			success:function(res)
			{
				// console.log(res);
				if(res.statusCode === 200 && res.data.resultCode == 0)
				{
					resolve(res.data);
				}else{
					resolve(res.data)
				}
			},
			error:function(e)
			{
				reject(e);
			}
		})
	});
}
module.exports = {
	postRequest,
	loginRequest,
	headerRequest,
	refreshToken,
	postHeaderRequest,
	getRequest,
	postHeaderFormRequest,
	postHeaderFRequest,
	putHeaderRequest
}
