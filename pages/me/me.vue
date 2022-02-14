<template>
	<view class="container" :style="{height: winH +'rpx'}">
		<view class="navEara">
			<view class="navTitle" :style="{height: navH+'px'}">
				<view class="navTitleCont">
					<text>我的</text>
				</view>
			</view>
			<view class="userInfo">
				<image class="avatar" @tap="toDetail('avatar')"
					:src="avatar?avatar:'../../static/img/defaultAvatar.png'"></image>
				<view class="userContent">
					<view class="userName" @tap="toDetail('no-nick')">{{userInfo.username}}</view>
					<view class="welcome">欢迎来到此平台</view>
				</view>
			</view>
		</view>
		<view class="manageArea">
			<view class="manageOut" @tap="toDetail('pro')">
				<view class="manageItem">
					<view class="imgC">
						<image src="../../static/img/mePro.png" style="width: 38rpx;height: 38rpx;" mode=""></image>
					</view>
					<text>项目管理</text>
					<image src="../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
			<view class="manageOut">
				<view class="manageItem" style="border: none;" @tap="toDetail('pwd')">
					<view class="imgC">
						<image src="../../static/img/mexgmm.png" style="width: 32rpx;height: 31rpx;" mode=""></image>
					</view>
					<text>修改密码</text>
					<image src="../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
		</view>
		<view class="manageArea" style="margin-top: 20rpx;">
			<view class="manageOut">
				<view class="manageItem" @tap="toDetail('help')">
					<view class="imgC">
						<image src="../../static/img/mehelp.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
					</view>
					<text>帮助中心</text>
					<image src="../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
			<view class="manageOut">
				<view class="manageItem" @tap="toDetail('aboutUs')">
					<view class="imgC">
						<image src="../../static/img/aboutme.png" style="width: 37rpx;height: 37rpx;" mode=""></image>
					</view>
					<text>关于我们</text>
					<image src="../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
			<view class="manageOut">
				<view class="manageItem" @tap="toDetail('news')">
					<view class="imgC">
						<image src="../../static/img/menews.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
					</view>
					<text>消息通知</text>
					<image src="../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
			<view class="manageOut">
				<view class="manageItem" style="border: none;" @tap="update()">
					<view class="imgC">
						<image src="../../static/img/mebbsj.png" style="width: 36rpx;height: 36rpx;" mode="">
						</image>
					</view>
					<text>版本更新</text>
					<text class="you" style='right: 100rpx;'>V1.0.1</text>
					<image src="../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>

		</view>
		<view class="logout" @tap="logOut">退出登录</view>
	</view>
</template>

<script>
	// import { mapMutations } from 'vuex'; 
	export default {
		data() {
			return {
				winH: 0,
				navH: 0,
				defproject: {},
				userInfo: {},
				avatar: '',
			}
		},
		onLoad() {
			let _this = this;
			this.avatar = uni.getStorageSync('avatar') || '';
			this.userInfo = uni.getStorageSync('userinfo');
			uni.setStorageSync('updateAvatar', true);
			uni.getSystemInfo({
				success(res) {
					_this.navH = res.statusBarHeight + 40;
					_this.winH = res.windowHeight * 2 + 326;
				}
			});
		},
		onShow() {
			this.getUserInfo();
		},
		methods: {
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
					} else {
						uni.showToast({
							title:'获取用户信息失败！',
							icon:'none',
							duration:2000
						})
					}
				})
			},
			toDetail(page) {
				console.log(page);
				if (page == 'pwd') {
					uni.navigateTo({
						url: './changepwd/changepwd'
					})
				} else if (page == 'pro') {
					this.getProInfo();
				} else if (page == 'aboutUs') {
					uni.navigateTo({
						url: './about-us/about-us'
					})
				} else if (page == 'help') {
					uni.navigateTo({
						url: './help-and-Advice/help-and-Advice'
					})
				} else if (page == 'news') {
					uni.navigateTo({
						url: './news-set/news-set'
					})
				} else if (page == 'nick') {
					uni.navigateTo({
						url: './changenick/changenick?nick=' + this.userInfo.username
					})
				} else if (page == 'avatar') {
					uni.navigateTo({
						url: './changeavatar/changeavatar'
					})
				}
			},
			getProInfo() {
				let _this = this;
				this.$http.getProjectsByUser().then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
						if (res.dataList.length > 0) {
							this.itemList = res.dataList;
							let arr = [];
							for (let a in this.itemList) {
								arr.push(this.itemList[a].projectName);
							}
							uni.showActionSheet({
								itemList: arr,
								itemColor: '#0193E9',
								success: function(e) {
									console.log("返回值: ", e);
									if (_this.itemList[e.tapIndex].id != _this.defproject.id) {
										_this.defproject = _this.itemList[e.tapIndex];
										uni.setStorageSync('defproject', JSON.stringify(_this.itemList[
											e.tapIndex]));
										uni.showToast({
											title: '切换成功！',
											icon: 'none',
											duration: 800,
											position: 'bottom'
										})
										setTimeout(() => {
											uni.switchTab({
												url: '../index/index'
											})
										}, 800)
									}
								},
								fail: function(res) {
									console.log(res.errMsg);
								}
							});
							// uni.setStorageSync('defproject',JSON.stringify(res.dataList[0]));
						}
					}

				})
			},
			update() {
				console.log(123);
				var _this = this;
				uni.getSystemInfo({
					success: function(res) {
						console.log(res);
						console.log(res.platform);
						let data = {
							mobileType: '',
							buildNo: '1',
							versionCode: uni.getStorageSync('version') | '1'
						};
						if (res.platform == 'android') {
							data.mobileType = "A";
						} else {
							// ios	
							data.mobileType = "I"
						}
						console.log(data);
						_this.$http.versionCheck(data).then((e) => {
							console.log(e);
							if (e.code === 0) {
								if (e.data[0]) {
									uni.showToast({
										title: '当前为最新版本！',
										icon: 'none',
										duration: 1600
									})
								} else {
									if (res.platform == 'android') {
										uni.showModal({
											title: '提示',
											content: '有新版本，立即下载更新？',
											success(vres) {
												if (vres.confirm) {
													_this.showFly(d.data[3]);
												}
											}

										})
									} else {
										uni.showToast({
											title: '有新版本，请前往appStore更新。',
											icon: 'none',
											duration: 1600
										})
									}
								}

							}
						})
					}
				});
			},
			showFly(url) {
				// console.log(result.data.data.loadUrl);
				let _this = this;
				const downloadTask = uni.downloadFile({
					url: url, //仅为示例，并非真实的资源
					success: (res) => {
						console.log(res);
						if (res.statusCode === 200) {
							console.log('下载成功');

							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: function(res) {
									const savedFilePath = res.savedFilePath;
									// 打开文件
									uni.openDocument({
										filePath: savedFilePath,
										success: function(res) {

										},
									});
								},
								fail: function(err) {
									uni.showLoading({
										title: '保存失败',
									})
								}
							});
						} else {
							uni.showToast({
								title: '下载失败！',
								icon: 'none',
								duration: 800
							})
						}
					},
				});
				downloadTask.onProgressUpdate((res) => {
					_this.startDown = true;
					_this.calcPro(res.progress);

				});

			},
			logOut() {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '即将退出登录？',
					success(res) {
						if (res.confirm) {
							console.log('logout')
							_this.$http.logOut().then((res) => {
								console.log(res)
								if (res.data.code === 0) {
									uni.showToast({
										title: '已退出当前用户！',
										icon: 'none',
										duration: 600,
										position: 'bottom'
									})
									uni.setStorageSync('ACCESS_TOKEN', '')
									// uni.setStorageSync('REFRESH_TOKEN', '')
									uni.setStorageSync('EXPIRES_IN', '')
									uni.setStorageSync('TENANT_ID', '')
									uni.setStorageSync('DEPT_ID', '')
									setTimeout(() => {
										uni.reLaunch({
											url: '../login/login'
										})
									}, 600);
								}else{
									uni.showToast({
										title:res.data.msg ,
										icon: 'none',
										duration: 1000,
									})
								}
							})
						}
					}
				})



			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		// height: 1776rpx;
		background-color: $style-bg;
	}

	.navEara {
		width: 100%;
		height: 416rpx;
		background-image: url('../../static/img/meBgTop.png');
		background-size: 100% 100%;
	}

	.navTitle {
		width: 100%;
		background-color: rgba(0, 0, 0, 0);
		position: relative;
	}

	.navTitleCont {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		color: white;
		font-size: 36rpx;
		text-align: center;
		line-height: 80rpx;
	}

	.userInfo {
		width: 100%;
		height: 120rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		/* background-color: #4CD964; */
		margin-top: 46rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}

	.userContent {
		width: 540rpx;
		height: 90rpx;
		margin-left: 20rpx;
		color: white;
	}

	.userName {
		width: 100%;
		height: 52rpx;
		line-height: 52rpx;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 34rpx;
		font-weight: 400;
	}

	.welcome {
		width: 100%;
		height: 38rpx;
		line-height: 38rpx;
		font-size: 24rpx;
	}

	.manageArea {
		width: 100%;
		background-color: white;
	}

	.manageOut {
		background-color: white;
		transition: ease 100ms;
		color: $style-text;
	}

	.manageOut:active {
		background-color: $style-click;
		color: $style-white;
	}

	.manageItem {
		width: 710rpx;
		height: 114rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1rpx solid #dcdcdc;
		position: relative;
		font-size: 30rpx;
		font-weight: 400;

	}

	.imgC {
		width: 60rpx;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.you {
		width: 34rpx;
		height: 34rpx;
		position: absolute;
		top: 46rpx;
		right: 28rpx;
		font-size: 24rpx;
		color: #a0a0a0;
	}

	.logout {
		width: 570rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background-color: $style-white;
		color: $style-blue;
		border: none;
		outline: none;
		font-size: 30rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 150rpx auto 0 auto;
		transition: ease 100ms;
	}

	.logout:active {
		background-color: $style-blue;
		color: $style-white;
	}
</style>
