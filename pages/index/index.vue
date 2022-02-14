<!-- 首页 -->
<template>
	<view class="container">
		<!-- logo -->
		<view class="navEara">
			<image src="../../static/img/indexTopBg.png" mode=""></image>
		</view>
		<!-- 喇叭 -->
		<view style="width: 100%;height: 52rpx;display: flex;align-items: center;" @tap="noticeClick">
			<!-- image src="../../static/img/laba.png"
				style="width: 20rpx;height: 20rpx;position: absolute;top: 50%;transform: translateY(-70%);"></image>
			<text style="color: #454545;font-size: 25rpx;margin-left: 4%;">智能建造相关信息</text> -->
			<view style="width: 100%;">
				<u-notice-bar bg-color="#ffffff" mode="horizontal" :list="list"></u-notice-bar>
			</view>
		</view>

		<view style="width: 100%;background-color: #f6f5fa;padding: 10rpx;box-sizing: border-box;">
			<!-- 设备运行监视 -->
			<view style="width: 99%;height: 460rpx;margin: 0 auto;display: flex;justify-content: space-between;margin-bottom: 15rpx;">
				<view style="width: 48.5%;height: 100%;background-color: #FFFFFF;border: 1px solid #FFFFFF;border-radius: 10rpx;">
					<view class="ct" style="width: 100%;height: 60rpx;line-height: 60rpx;padding: 0 10rpx;border-bottom: 1px solid #f6f5fa;box-sizing: border-box;position: relative;">
						<text style="color: #333333;font-size: 30rpx;">设备运行监视</text>
						<!-- <image src="../../static/img/newsR.png"
							style="position: absolute;right: 10rpx;top: 50%;transform: translateY(-50%);width: 20rpx;height: 30rpx;">
						</image> -->
					</view>
					<view style="width: 100%;height: calc(100% - 60rpx);padding: 5rpx;box-sizing: border-box;">
						<!-- uchart -->
						<view style="width: 100%;height: 67%">
							<index-ring-left :deviceData="deviceData"></index-ring-left>
						</view>
						<view
							style="width: 100%;height: 33%;color: #333333;font-size: 25rpx;padding-left: 10rpx;box-sizing: border-box;">
							<view>在线：{{online}}台</view>
							<view>离线：{{offline}}台</view>
							<view>告警：{{alarm}}台</view>
						</view>
					</view>
				</view>
				<view style="width: 48.5%;height: 100%;background-color: #FFFFFF;border: 1px solid #FFFFFF;border-radius: 10rpx;">
					<view class="ct" style="width: 100%;height: 60rpx;line-height: 60rpx;padding: 0 10rpx;border-bottom: 1px solid #f6f5fa;box-sizing: border-box;position: relative;">
						<text style="color: #333333;font-size: 30rpx;">告警处理状态监视</text>
						<!-- image src="../../static/img/newsR.png"
							style="position: absolute;right: 10rpx;top: 50%;transform: translateY(-50%);width: 20rpx;height: 30rpx;">
						</image> -->
					</view>
					<view style="width: 100%;height: calc(100% - 60rpx);padding: 5rpx;box-sizing: border-box;">
						<!-- uchart -->
						<view style="width: 100%;height: 67%;">
							<index-ring-right :alarmData="alarmData"></index-ring-right>
						</view>
						<view style="width: 100%;height: 33%;color: #333333;font-size: 25rpx;padding: 10rpx;box-sizing: border-box;">
							<view>未确认：{{wqr}}条</view>
							<view>已确认：{{yqr}}条</view>
							<view>已消除：{{yxc}}条</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 今日园区PUE -->
			<view style="width: 99%;height: 300rpx;border-radius: 15rpx;background-color: #FFFFFF;margin: 0 auto;margin-bottom: 15rpx;">
				<view
					style="width: 100%;height: 60rpx;line-height: 60rpx;padding: 0 10rpx;border-bottom: 1px solid #f6f5fa;box-sizing: border-box;position: relative;">
					<text style="color: #454545;font-size: 30rpx;">今日园区PUE</text>
					<view @tap="slectClick" class="select" style="position: absolute;top: 50%;right: 16rpx;transform: translateY(-50%);height: 45rpx;width: 230rpx;text-align: center;line-height: 45rpx;color: #666666;font-size: 28rpx;">
						{{selectText}}
					</view>
				</view>
				<view style="width: 100%;height: calc(100% - 60rpx);padding-top: 50rpx;box-sizing: border-box;">
					<!-- uchart -->
					<index-arc-bar :data="itPercent" :titleName="titleName"></index-arc-bar>
				</view>
			</view>
			<!-- 今日能耗统计 -->
			<view style="width: 99%;height: 400rpx;border-radius: 15rpx;background-color: #FFFFFF;margin: 0 auto;">
				<view
					style="width: 100%;height: 60rpx;line-height: 60rpx;padding: 0 10rpx;border-bottom: 1px solid #f6f5fa;box-sizing: border-box;">
					<text style="color: #454545;font-size: 30rpx;">今日能耗统计</text>
				</view>
				<view style="width: 100%;height: calc(100% - 60rpx);">
					<!-- uchart -->
					<index-bar :xValue="xValue" :yValue="yValue" :rotateLabel="true"></index-bar>
				</view>
			</view>
		</view>
		
		
		<!-- 弹出层 -->
		<u-popup v-model="isShow" mode="right" border-radius="14">
			<view style="width: 350rpx;height: 84rpx;border-bottom: 1rpx solid #dcdcdc;line-height: 84rpx;padding-left: 5rpx;box-sizing: border-box;color: #333333;font-size: 32rpx;font-weight: 600;">
				选择方案
			</view>
			<view @tap="fnClick(item.id,item.planName)" v-for="(item,index) in faList" :key="item.id" class="falist" style="width: 350rpx;height: 54rpx;border-bottom: 1rpx solid #dcdcdc;line-height: 54rpx;padding-left: 5rpx;box-sizing: border-box;color: #666666;font-size: 26rpx;">
				{{item.planName}}
			</view>
		</u-popup>
	</view>
</template>

<script>
	import indexRingLeft from '@/components/index/index-ring-left.vue'
	import indexRingRight from '@/components/index/index-ring-right.vue'
	import indexBar from '@/components/index/index-bar.vue'
	import indexArcBar from '@/components/index/index-arcbar.vue'
	export default {
		data() {
			return {
				winH: 0,
				navH: 0,
				defproject: {},
				userInfo: {},
				list: ['智慧园区相关信息'],
				online:0,
				offline:0,
				alarm:0,
				deviceData:[],
				wqr:0,
				yqr:0,
				yxc:0,
				alarmData:[],
				titleName:'',
				itPercent:'',
				xValue:[], //今日能耗统计x
				yValue:[] ,//今日能耗统计y
				isShow:false,//右侧弹窗显隐
				selectText:'--',
				faList:[] ,//方案列表
			}
		},
		components: {
			indexRingLeft,
			indexRingRight,
			indexBar,
			indexArcBar
		},
		onLoad() {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					console.log(res);
					_this.navH = res.statusBarHeight + 40;
					_this.winH = res.windowHeight * 2 + 326;
				}
			})
			// this.defproject=JSON.parse(uni.getStorageSync('defproject'));
			// this.userInfo=JSON.parse(uni.getStorageSync('userinfo'));
			// console.log(this.userInfo);
		},
		onShow() {
			this.getYqId() //获取园区id
		},
		// onBackPress() {
			
		// }
		methods: {
			// 跳转到公告页面
			noticeClick() {
				uni.navigateTo({
					url:'../workBench/notice/notice'
				})
			},
			slectClick() {
				this.isShow = true
			},
			// 选择方案
			fnClick(...data) {
				this.isShow = false
				this.selectText = data[1]
				this.getPueAndConsume(data[0])
				// this.getPowerRank(data[0])
			},
			//获取园区id
			getYqId() {
				this.$http.getYqId().then(data => {
					// console.log(data,'园区id---------->');
					
					if(data && data.data.records.length) {
						this.getDeviceStatusStatistic(data.data.records[0].id)
						this.getAlarmHandleSituation(data.data.records[0].id)
						this.getPowerRank(data.data.records[0].id)
						this.getConfig(data.data.records[0].id)
					}
				})
			},
			// 设备运行状态监视
			getDeviceStatusStatistic(id) {
				let params = {
					siteId:id
				}
				// this.isShow = false
				this.$http.getDeviceStatusStatistic(params).then(data => {
					// console.log(data,  '设备运行状态监视---------------------->')
					if(data.data) {
						this.deviceData = [
							{
								name:'在线',
								value:parseFloat(data.data.online)
							},
							{
								name:'离线',
								value:parseFloat(data.data.offline)
							},
							{
								name:'告警',
								value:parseFloat(data.data.alarm)
							}
						]
						this.online = data.data.online
						this.offline = data.data.offline
						this.alarm = data.data.alarm
						// this.isShow = true
						// console.log(this.deviceData,'devicedata----------------->')
					}
				})
			},
			// 告警处理状态监视
				getAlarmHandleSituation(id) {
				let params = {
					siteId:id
				}
				this.$http.getAlarmHandleSituation(params).then(data => {
					// console.log(data,  '告警处理状态监视---------------------->')
					this.alarmData = []
					if(data && data.data.length) {
						data.data.forEach(item => {
							if(item.dealStatusDes == '未确认') {
								this.wqr = item.num
								this.alarmData.push({
									name:item.dealStatusDes,
									value:parseFloat(item.num)
								})
							}else if(item.dealStatusDes == '已确认') {
								this.yqr = item.num
								this.alarmData.push({
									name:item.dealStatusDes,
									value:parseFloat(item.num)
								})
							}else if(item.dealStatusDes == '已消除') {
								this.yxc = item.num
								this.alarmData.push({
									name:item.dealStatusDes,
									value:parseFloat(item.num)
								})
							}
						})
						console.log(this.alarmData,'alarm----->>>>')
					}
				})
			},
			// 方案
			getConfig(id) {
				let params = {
					siteId:id
				}
				this.$http.getConfig(params).then(data => {
					// console.log(data,'方案------------------>')
					this.faList = data.data
					this.selectText = data.data[1].planName
					this.getPueAndConsume(data.data[1].id)
					// this.getPowerRank(data.data[1].id)
				})
			},
			// 获取园区pue
			getPueAndConsume(id) {
				let params = {
					planId:id
				}
				this.$http.getPueAndConsume(params).then(data => {
					console.log(data,'园区pue---------------->')
					if(data) {
						this.titleName = String(data.data.pue)
						this.itPercent = (parseFloat(data.data.pue)/3).toFixed(2)
					}
				})
			},
			// 今日能耗统计
			getPowerRank(id) {
				let params = {
					siteId:id
				}
				this.$http.getPowerRank(params).then(data => {
					console.log(data,'今日能耗统计---------------->') 
					this.xValue = []
					this.yValue = []
					if(data && data.data.length) {
						data.data.forEach(item => {
							this.xValue.push(item.label)
							this.yValue.push(parseFloat(item.value))
						})
					}
				})
			}
		}

	}
</script>

<style scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.navEara {
		width: 100%;
		height: 300rpx;
		/* margin-bottom: 10rpx; */
	}

	.navEara image {
		width: 100%;
		height: 100%;
		/* height: 416rpx;
			background-image: url('../../static/img/indexTopBg.png');
			background-size: 100% 100%; */
		}

	/* .ct:active {
		background-color: #f5f7fa;
		box-shadow: 0 0 20rpx 6rpx rgba(255, 255, 255, 0.4);
	} */
	
	.select {
		background-image: url('../../static/img/select.png');
		background-size: 100% 100%;
	}
	
	.falist:active {
		background-color: rgba(28,126,229,0.3);
		color: white;
	}
</style>
