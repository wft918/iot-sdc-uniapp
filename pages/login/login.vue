<template>
	<view class="container" @tap='closeSec'>
		<image src="../../static/img/loginBg.png" mode="" class="loginBg"></image>
		<view class="LoginOut">
			<view class="loginTi">
				<text class="loginTitle">登录
					<text class='loginTitleLine'></text>
				</text>
			</view>
			<view class="loginInOut">
				<uni-easyinput class="loginInOuten" :inputBorder="false" v-model="loginForm.username"
					placeholder="请输入用户名"></uni-easyinput>
			</view>
			<view class="loginInOut" style="margin-top: 40rpx;">
				<uni-easyinput :inputBorder="false" type="password" v-model="loginForm.password" placeholder="请输入密码">
				</uni-easyinput>
			</view>
			<view class="login-code" style="margin-top: 40rpx;">
				<uni-easyinput class="code-input" :maxlength="code.len" v-model="loginForm.code" placeholder="请输入验证码">
				</uni-easyinput>
				<view class="code-container">
					<text v-if="code.type == 'text'" class="login-code-img" @tap="refreshCode">{{ code.value }}</text>
					<img v-else :src="code.src" class="login-code-image" @tap="refreshCode"></img>
					<!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
				</view>
			</view>

			<!-- <view class="loginInOut" v-if="soulState" style="margin-top: 40rpx;">
				<uni-easyinput class="loginInOuten" maxlength="4"  :inputBorder="false" type="text" @confirm="login()" v-model="soulCode" placeholder="请输入授权码"></uni-easyinput>
			</view> -->
			<view class="loginButNC"
				:class="loginForm.username!=''&loginForm.password!=''&loginForm.code!=''?'loginBC':''"
				@tap="$HClick(login)">登录</view>
		</view>
		<!-- <view class="UpDate" :class="startDown?'UpDate1':''">
			<view class="UpDateBox">
				<view class="UpDateBoxT">{{proNum}}</view>
			<view class="UpDateBoxLine">
				<view class="uplIN" :style="{width:proNum}"></view>
			</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import md5 from '../../common/md5.js'
	import {
		randomLenNum,
		encryption
	} from '@/common/util/util.js'
	export default {
		data() {
			return {
				onoff:true,
				// phoneNum:'',
				// inputSta:'',
				seePwd: false,
				// startDown:false,
				// proNum:'0%',
				// cid:'',
				// soulCode:'',
				// soulState:'',

				loginForm: {
					username: '',
					password: '',
					code: '',
					redomStr: ''
				},
				code: {
					src: '/code',
					value: '',
					len: 4,
					type: 'image'
				},
			}
		},
		onBackPress() {
			return true;
		},
		onShow() {
			this.update();			
			this.refreshCode();
		},
		methods: {
			// calcPro(res){
			// 	this.proNum=res+'%';
			// 	if(res=='100'){
			// 		this.startDown=false;
			// 	}
			// },
			update() {
			    var _this = this;
				uni.getSystemInfo({
				    success: function (res) {
				        console.log(res);
				        console.log(res.platform);
						if(res.platform=='android'){
							let mUrl=uni.getStorageSync('url');
							uni.request({
							url: mUrl+'/api/v1/system/getMaxVersion',  //请求接口
							method: 'GET',
							data:{
								appType:1
							},
							success: result => {
							    console.log(result);
								if(result.data.code===200&&result.data.success){
									let version=uni.getStorageSync('version');
									console.log(version);
									if(version){
										if(version!=result.data.data.version){
											if(result.data.data.isForceUpdate=='1'){
												_this.showFly(result,false);
											}else{
												_this.showFly(result,true);
											}
										}
									}else{
										uni.setStorageSync('version',result.data.data.version);
									}
								}
							},
							})
						}else{
						// ios	

						}
				    }
				});
			},
			showFly(result,isFo){
			console.log(result.data.data.loadUrl);
				let _this=this;
				uni.showModal({
					title:'提示',
					content:'发现新版本，立即升级！',
					showCancel:isFo,
					success(e) {
						if(e.confirm){
							const downloadTask = uni.downloadFile({
							    url: result.data.data.loadUrl, //仅为示例，并非真实的资源
							    success: (res) => {
									console.log(res);
							        if (res.statusCode === 200) {
							            console.log('下载成功');

										 uni.saveFile({
													tempFilePath: res.tempFilePath,
													success: function (res) {
													  const savedFilePath = res.savedFilePath;
													  // 打开文件
													  uni.openDocument({
														filePath: savedFilePath,
														success: function (res) {

														},
													  });
													},
													fail: function (err) {
														uni.showLoading({
															title: '保存失败',
														})
													}
												  });
							        }else{
										uni.showToast({
											title:'下载失败！',
											icon:'none',
											duration:800
										})
									}
							    },
							});
							downloadTask.onProgressUpdate((res) => {
								_this.startDown=true;
							    _this.calcPro(res.progress);
							    // console.log('下载进度' + res.progress);
							    // console.log('已经下载的数据长度' + res.totalBytesWritten);
							    // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
							    // 测试条件，取消下载任务。
							    // if (res.progress > 50) {
							    //     downloadTask.abort();
							    // }
							});
						}
					}
				})
			},
			getUserInfo() {
				this.$http.userInfo().then((res) => {
					console.log(res);
					if (res.code === 0) {
						uni.setStorageSync('userinfo', res.data.sysUser);
						this.userInfo = uni.getStorageSync('userinfo');
						if (uni.getStorageSync('updateAvatar')) {
							this.avatar = uni.getStorageSync('url') +this.userInfo.avatar;
								console.log(this.avatar);
								uni.setStorageSync('avatar',this.avatar);
						}
					} 
				})
			},
			seeState() {
				if (this.inputSta == '') {
					this.seePwd = false;
				}
			},
			changeSee() {
				this.seePwd = !this.seePwd;
			},
			openSec() {
				this.secState = true;
			},
			closeSec() {
				this.secState = false;
			},
			login() {

				console.log('登录');
				let _this = this;
				if (!this.loginForm.username) {
					uni.showToast({
						title: '用户名不能为空！',
						icon: 'none',
						duration: 800
					})
					return;
				}
				if (!this.loginForm.password) {
					uni.showToast({
						title: '密码不能为空！',
						icon: 'none',
						duration: 800
					})
					return;
				}
				if (!this.loginForm.code) {
					uni.showToast({
						title: '请填写验证码！',
						icon: 'none',
						duration: 800
					})
					return;
				}
				const user = encryption({
					data: this.loginForm,
					key: 'vsvsvsvsvsvsvsvs',
					param: ['password']
				})
				this.$http.login(user.username, user.password, user.code, user.randomStr).then((res) => {
					console.log(res, '登录');
			  if (res.statusCode === 200 && !res.data.code) {
						uni.setStorageSync('ACCESS_TOKEN', res.data.access_token)
						uni.setStorageSync('REFRESH_TOKEN', res.data.refresh_token)
						uni.setStorageSync('EXPIRES_IN', res.data.expires_in)
						uni.setStorageSync('TENANT_ID', res.data.tenant_id)
						uni.setStorageSync('DEPT_ID', res.data.dept_id);
						this.getUserInfo();
						this.$dictUtils.refreshDictList()
						uni.showToast({
							title: '登录成功！',
							icon: 'none',
							duration: 800,
							position: 'bottom'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index?sType=login'
							})
						}, 800);
					}
					if (res.statusCode !== 200 && res.data.code === 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 800
						})
					}
				}).then((err) => {
					this.refreshCode()
					console.log(err);
				})
			},
			// getProInfo(){
			// 	this.$http.getProjectsByUser().then((res)=>{
			// 		console.log(res);
			// 		if(res.code===200&&res.success){
			// 			if(res.dataList.length>0){
			// 				uni.setStorageSync('defproject',JSON.stringify(res.dataList[0]));
			// 			}
			// 			if(this.type){
			// 				this.toindex();
			// 			}else{
			// 				uni.showToast({
			// 					title:'登录成功！',
			// 					icon:'none',
			// 					duration:800,
			// 					position:'bottom'
			// 				})
			// 				setTimeout(()=>{
			// 					uni.reLaunch({
			// 						url:'../index/index?sType=login'
			// 					})
			// 				},800);

			// 			}

			// 		}

			// 	})
			// },
			// webSocketOn() {
			// 				var token=uni.getStorageSync('token');
			// 				let _this=this;
			// 				console.log(token)
			// 				let socket=uni.getStorageSync('socket');
			// 				console.log(socket);
			// 				uni.connectSocket({
			// 					url:socket+'?token='+token.replace(/\"/g,'')
			// 				});
			// 				uni.onSocketOpen(function(res) {
			// 					console.log('WebSocket连接已打开！');
			// 				});
			// 				uni.onSocketError(function(res) {
			// 					console.log('WebSocket连接打开失败，请检查！');
			// 				});
			// 				uni.onSocketClose(function(res) {
			// 					console.log('WebSocket 已关闭！');
			// 				});
			// 			},
			// toindex(){
			// 	console.log(this.type)
			// 	if(this.type=='4'){
			// 		uni.switchTab({
			// 			url:'../myCenter/myCenter'
			// 		})
			// 	}

			// },
			// sendMessage(){
			// 	'use strict';
			// 	exports.main = async (event, context) => {
			// 	  try {
			// 	    const res = await uniCloud.sendSms({
			// 	      appid: '__UNI__BB2231F',
			// 	      smsKey: '137da9bdc77565669722e4df6bd8da5e',
			// 	      smsSecret: '9d5697bbda6de7b537cb812bfaf3edaa',
			// 	      phone: '15901171825',
			// 	      templateId: 'uniID_code',
			// 	      data: {
			// 	        name: 'DCloud',
			// 	        code: '123456',
			// 	        action: '注册',
			// 	        expMinute: '3',
			// 	      }
			// 	    })
			// 	    // 调用成功，请注意这时不代表发送成功
			// 	    console.log(res);
			// 	  } catch(err) {
			// 	    // 调用失败
			// 	    console.log(err.errCode)
			// 	    console.log(err.errMsg)
			// 	    return {
			// 	      code: err.errCode,
			// 	      msg: err.errMsg
			// 	    }
			// 	  }
			// 	};
			// },
			refreshCode() {
				this.loginForm.code = ''
				this.loginForm.randomStr = randomLenNum(this.code.len, true)
				this.code.type === 'text' ?
					(this.code.value = randomLenNum(this.code.len)) :
					(this.code.src = `${this.$url}/code?randomStr=${this.loginForm.randomStr}`)
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: white;
	}

	.loginBg {
		width: 100%;
		height: 614rpx;
	}

	.LoginOut {
		width: 630rpx;
		height: auto;
		background: #ffffff;
		border-radius: 11px;
		box-shadow: 0px -7px 27px 0px rgba(0, 0, 0, 0.10);
		margin: 0 auto;
		position: relative;
		top: -200rpx;
		padding-bottom: 60rpx;
	}

	.loginTi {
		width: 570rpx;
		height: 150rpx;
		line-height: 150rpx;
		border-bottom: 1rpx solid #EFEFF4;
		margin: 0 auto;
		box-sizing: border-box;
		padding-left: 60rpx;
		font-size: 40rpx;
		font-family: Source Han Sans CN Regular, Source Han Sans CN Regular-Regular;
		font-weight: 400;
		color: #262628;
	}

	.loginTitle {
		/* background-color: #007AFF; */
		position: relative;
	}

	.loginTitleLine {
		width: 80%;
		position: absolute;
		bottom: -20rpx;
		left: 10%;
		height: 8rpx;
		background-color: #01A0FE;
		border-radius: 3px;
	}

	.loginInOut {
		width: 480rpx;
		height: 72rpx;
		line-height: 70rpx;
		color: #000;
		font-size: 28rpx;
		border: 1rpx solid #efeff4;
		border-radius: 12rpx;
		margin: 66rpx auto 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.loginInOutDown {
		width: 120rpx;
		height: 100%;
		box-sizing: border-box;
		border-right: 1rpx solid #efeff4;
		position: relative;
		text-align: center;
	}

	.dt {
		width: 30rpx;
		height: 30rpx;
		vertical-align: text-bottom;
		margin-left: 10rpx;
	}

	.secAreaH {
		width: 100%;
		height: 280rpx;
		background-color: white;
		position: absolute;
		z-index: -10;
		bottom: 70rpx;
		opacity: 0;
		overflow-y: scroll;
		box-shadow: 0 0 20rpx 8rpx rgba(0, 0, 0, 0.1);
		transition: ease 200ms;
	}

	.secAreaS {
		opacity: 1;
		z-index: 10;
		bottom: -300rpx;
	}

	.secAreaItem {
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 28rpx;
		color: #0193E9;
	}

	.secdItem {
		background-color: #0193E9;
		color: white;
	}

	.loginInOuten {
		width: 360rpx;
		height: 100%;
		color: #000000;
		font-size: 28rpx;
		/* background-color: #01A0FE; */
		box-sizing: border-box;
	}

	.loginInOutenPwd {
		width: 100%;
		height: 100%;
		color: #000000;
		font-size: 28rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
		padding: 0 80rpx 0 20rpx;
		position: absolute;
		z-index: 1;
		background-color: white;
		letter-spacing: 6rpx;
	}

	.loginInOutenPwdH {
		width: 100%;
		height: 100%;
		line-height: 70rpx;
		box-sizing: border-box;
		padding: 0 80rpx 0 20rpx;
		position: absolute;
		top: 0;
		border-radius: 12rpx;
		left: 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		overflow-x: scroll;
		color: #888888;
		font-size: 28rpx;
	}

	.lioph {
		width: 12rpx;
		height: 12rpx;
		display: block;
		border-radius: 50%;
		background-color: #000000;
		margin-right: 10rpx;
	}

	.showPws {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top: 15rpx;
		z-index: 2;
	}

	.loginButNC {
		width: 480rpx;
		height: 72rpx;
		line-height: 70rpx;
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		margin-top: 80rpx;
		background-color: #A5A5A5;
		border-radius: 12rpx;
		margin: 80rpx auto 0 auto;
	}

	.loginBC {
		background-color: #01A0FE;
	}

	.loginBC:active {
		background-color: #3FB0FF;
	}

	.UpDate {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		opacity: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		transition: 100ms ease;
	}

	.UpDate1 {
		z-index: 10;
		opacity: 1;
	}

	.UpDateBox {
		width: 400rpx;
		height: 300rpx;
		/* background-color: white; */
		border-radius: 30rpx;
	}

	.UpDateBoxT {
		text-align: center;
		font-size: 36rpx;
		color: #ffffff;
		line-height: 80rpx;
	}

	.UpDateBoxLine {
		width: 100%;
		height: 20rpx;
		background-color: rgba(100, 100, 100, 0.8);
		border-radius: 10rpx;
		position: relative;
	}

	.uplIN {
		width: 0%;
		height: 20rpx;
		background: linear-gradient(to left, rgb(242, 112, 156), rgb(255, 148, 114));
		box-shadow: 0 3px 3px -10rpx rgb(242 112 156), 0 4rpx 10rpx rgb(242 112 156);
		border-radius: 10rpx;
		transition: ease 100ms;
		position: absolute;
		top: 0;
		left: 0;
	}

	.login-code {
		width: 480rpx;
		height: 72rpx;
		line-height: 70rpx;
		color: #000;
		font-size: 28rpx;
		/* border: 1rpx solid #efeff4; */
		/* border-radius: 12rpx; */
		margin: 66rpx auto 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.code-container {
		display: flex;
		justify-content: center;
		width: 240rpx;
		height: 72rpx;
	}

	.code-input {
		border: 1rpx solid #efeff4;
		border-radius: 12rpx;
	}

	.login-code-image {
		width: 180rpx;
		height: 72rpx;
	}
</style>
