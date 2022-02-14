<template>
	<view class="container">
		<view class="startInps">
			<view class="startInpsBtn" @tap="startInspBtn()">开始巡检</view>
		</view>
		<scroll-view scroll-y="true" class="scrollA">
			<uni-swipe-action>
				<uni-swipe-action-item style="margin-bottom: 20rpx;" v-for="(item,index) in list"
					:right-options="item.options" @click="swipeClick($event, item.id)">
					<view class="inspItem" @tap="startInsp(item)">
						<image src="../../../../../static/img/xjz.png" v-show="item.inspectState=='1'" class="statusImg"
							mode=""></image>
						<image src="../../../../../static/img/ywc.png" v-show="item.inspectState=='2'" class="statusImg"
							mode=""></image>
						<image src="../../../../../static/img/yqx.png" v-show="item.inspectState=='3'" class="statusImg"
							mode=""></image>
						<view class="inspItemL">
							<view class="taskTime">{{item.updateDate}}</view>
							<view class="taskName">{{item.taskName}}</view>
							<view class="taskAll">
								<text>共 {{item.qualifiedNum+item.unqualifiedNum}} 项</text>
								<text style="margin-left: 16rpx;">正常{{item.qualifiedNum}} 项</text>
								<text style="margin-left: 16rpx;">异常 </text><text
									style="color: #fe7676;">{{item.unqualifiedNum}}</text><text> 项</text>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
		

		<!-- <view class="nodata" v-if="list.length===0">暂无数据</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				id: '',
				projectName: '',
				list: [],
				onoff: false
			}
		},
		onLoad(options) {
			this.userInfo = JSON.parse(uni.getStorageSync('userinfo'));
			console.log(this.userInfo);
			this.projectName = options.name || '';
			this.id = options.id || '';
			if (this.projectName) {
				uni.setNavigationBarTitle({
					title: this.projectName
				})
			}
		},
		onPullDownRefresh() {
			this.getList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.getList();
		},
		methods: {
			swipeClick(e, id) {
				if (!this.onoff) {
					this.onoff = true;
					setTimeout(() => {
						this.onoff = false;
					}, 1000)
				} else {
					return;
				}
				let {
					content
				} = e;
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认取消？',
					success: res => {
						if (res.confirm) {
							let data = {
								id: id,
								inspectState: 3,
							};
							console.log(data);
							_this.$http.inspectUpdateState(data).then((res) => {
								console.log(res);
								if (res.code === 200 && res.success) {
									uni.showToast({
										title: '已取消',
										icon: 'none'
									})
									_this.getList();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
	
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			startInspBtn() {
				// console.log(this.id);
				let data = {
					projectId: this.id,
					projectName: this.projectName,
					inspectState: 1,
					startTime: this.getTime(),
					inspectMan: this.userInfo.id,
					inspectManName: this.userInfo.name
				};
				console.log(data);
				this.$http.inspectRecordSave(data).then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
						this.getList();
					} else {
						uni.showToast({
							title: '请求失败！',
							icon: 'none'
						});
					}
				})
			},
			getList() {
				let data = {
					projectId: this.id,
					projectName: this.projectName,
					inspectMan: this.userInfo.id,
					inspectManName: this.userInfo.name,
					inspectType: 0
				};
				console.log(data);
				this.$http.inspectRecord(data).then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
						if (res.page.list.length > 0) {
							this.list = res.page.list;
							for (let a in this.list) {
								if(this.list[a].inspectState!='3'&&this.list[a].inspectState!='2'){
									this.list[a].options = [{
										text: '取消',
										style: {
											backgroundColor: '#ff0000'
										}
									}];
								}
							}
						}
					}
				})
			},
			startInsp(res) {
				uni.navigateTo({
					url: './unloadClass/unloadClass?id=' + res.id + '&proName=' + this.projectName + '&pjId=' +
						this.id+'&state='+res.inspectState
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		position: relative;
		height: auto;
		min-height: 100vh;
		background-color: #F0F0F5;
	}

	.inspItem {
		width: 100%;
		height: 200rpx;
		background-color: white;
		box-sizing: border-box;
		padding: 0 30rpx 0 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.inspItemL {
		width: 620rpx;
		height: 160rpx;
		/* background-color: #3FB0FF; */
	}

	.taskName {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rx;
		font-weight: 700;
		color: #393939;
		text-overflow: ellipsis;
		overflow-x: hidden;
		white-space: nowrap;
	}

	.taskTime {
		height: 50rpx;
		line-height: 50rpx;
		color: #333;
		font-size: 30rpx;
	}

	.taskAll {
		width: 100%;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 24rpx;
		color: #6f6f6f;
	}
	.inspItemR {
		width: 140rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background: linear-gradient(#0193e9 0%, #68bef1 100%);
		border-radius: 24rpx;
		color: white;
		font-size: 24rpx;
	}

	.inspItemR:active {
		background: linear-gradient(#68bef1 100%, #0193e9 0%);
	}

	.inspItemR1 {
		width: 140rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background-color: #bad0ec;
		border-radius: 24rpx;
		color: white;
		font-size: 24rpx;
	}

	.inspItemRC {
		width: 140rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background-color: #ccc;
		border-radius: 24rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.inspItemRC:active {
		background-color: #999;
	}

	.statusImg {
		width: 91rpx;
		height: 87rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.nodata {
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999999;
	}

	.startInps {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
	}

	.startInpsBtn {
		width: 400rpx;
		height: 100rpx;
		border-radius: 20rpx;
		line-height: 100rpx;
		background-color: #0193E9;
		color: white;
		font-size: 30rpx;
		text-align: center;
	}

	.startInpsBtn:active {
		background-color: #007AFF;
	}
	.scrollA{
		width: 100%;
		height: calc(100vh - 200rpx);
		/* background-color: #007AFF; */
	}
</style>
