<template>
	<view class="deviceDetails">
		<!-- 设备信息 -->
		<view style="width: 100%;height: 350rpx;background-color: #fff;margin-bottom: 15rpx;">
			<view style="width: 96%;height: 88rpx;padding-left: 15rpx;line-height: 88rpx;color: #333333;font-size: 32rpx;margin: 0 auto;font-weight: 600;border-bottom: 1px solid #ededed;">设备信息</view>
			<view style="width: 96%;height: calc(100% - 88rpx);color: #4D4D4D;font-size: 28rpx;margin: 0 auto;">
				<view style="margin-top: 15rpx;">
					<text>设备名称：</text>
					<text>{{sbObj.name || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>设备编码：</text>
					<text>{{sbObj.code || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>设备类型：</text>
					<text>{{sbObj.typeName || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>设备位置：</text>
					<text>{{sbObj.siteName || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>报警时间：</text>
					<text>{{sbObj.updateDate || '暂无数据'}}</text>
				</view>
			</view>
		</view>
		<!-- 历史事件 -->
		<view style="width: 100%;height: 300rpx;background-color: #fff;margin-bottom: 15rpx;">
			<view style="width: 96%;height: 88rpx;padding-left: 15rpx;line-height: 88rpx;color: #333333;font-size: 32rpx;margin: 0 auto;font-weight: 600;border-bottom: 1px solid #ededed;">历史事件</view>
			<view style="width: 96%;height: calc(100% - 88rpx);color: #4D4D4D;font-size: 28rpx;margin: 0 auto;">
				<view style="margin-top: 15rpx;">
					<text>时间：</text>
					<text>{{lsObj.updateDate || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>类型：</text>
					<text>{{lsObj.param || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>内容：</text>
					<text>{{lsObj.content || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>操作人：</text>
					<text>{{lsObj.updateBy || '暂无数据'}}</text>
				</view>
			</view>
		</view>
		<!-- 告警历史 -->
		<view style="width: 100%;height: 350rpx;background-color: #fff;margin-bottom: 15rpx;">
			<view style="width: 96%;height: 88rpx;padding-left: 15rpx;line-height: 88rpx;color: #333333;font-size: 32rpx;margin: 0 auto;font-weight: 600;border-bottom: 1px solid #ededed;">告警历史</view>
			<view style="width: 96%;height: calc(100% - 88rpx);color: #4D4D4D;font-size: 28rpx;margin: 0 auto;">
				<view style="margin-top: 15rpx;">
					<text>告警等级：</text>
					<text>{{gjObj.alarmLevel == 1?'一级告警':gjObj.alarmLevel == 2?'二级告警':gjObj.alarmLevel == 3?'三级告警':gjObj.alarmLevel == 4?'四级告警':'暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>告警状态：</text>
					<text>{{gjObj.setStatus == 0?'未确认':gjObj.setStatus == 1?'已确认':'已消除'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>告警分类：</text>
					<text>{{gjObj.alarmTypeDesc || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>告警上报时间：</text>
					<text>{{gjObj.alarmTime || '暂无数据'}}</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>告警消除时间：</text>
					<text>{{gjObj.alarmEndTime || '暂无数据'}}</text>
				</view>
			</view>
		</view>
		<!-- 遥测  遥信  遥调  遥控 -->
		<view style="width: 100%;height: 250rpx;background-color: #FFFFFF;">
			<view style="width: 100%;height: 68rpx;background-color: #f4f6f7;display: flex;">
				<view style="width: 25%;height: 100%;display: flex;justify-content: center;">
					<view @tap="subClick(1)" :class="['subClass',{'currentClass': currentIndex == 1}]">遥测信息</view>
				</view>
				<view style="width: 25%;height: 100%;display: flex;justify-content: center;">
					<view @tap="subClick(2)" :class="['subClass',{'currentClass': currentIndex == 2}]">遥信信息</view>
				</view>
				<view style="width: 25%;height: 100%;display: flex;justify-content: center;">
					<view @tap="subClick(3)" :class="['subClass',{'currentClass': currentIndex == 3}]">遥调操作</view>
				</view>
				<view style="width: 25%;height: 100%;display: flex;justify-content: center;">
					<view @tap="subClick(4)" :class="['subClass',{'currentClass': currentIndex == 4}]">遥控操作</view>
				</view>
			</view>
			<view style="width: 96%;color: #4D4D4D;font-size: 28rpx;margin: 0 auto;">
				<component :is="currentComponennt" :dataList="toDataList"></component>
			</view>
		</view>
	</view>
</template>

<script>
	import telemeter from '@/components/realtimeMonitor/deviceDetails/telemeter.vue' //遥测
	import remoteSignaling from '@/components/realtimeMonitor/deviceDetails/remoteSignaling.vue' //遥信
	import remoteAdjustment from '@/components/realtimeMonitor/deviceDetails/remoteAdjustment.vue' //遥调
	import remoteControl from '@/components/realtimeMonitor/deviceDetails/remoteControl.vue' //遥控
	export default {
		data() {
			return {
				currentIndex:1,
				sbObj:{},
				lsObj:{},
				gjObj:{},
				currentComponennt:'telemeter',
				botInfoList:[],
				toDataList:[]
			}
		},
		components: {
			telemeter,
			remoteSignaling,
			remoteControl,
			remoteAdjustment
		},
		onLoad(option) {
			let info = JSON.parse(option.info)
			this.sbObj = info
			console.log(this.sbObj,'info------------------------>')
			this.getSdcdeviceeventlogPage(this.sbObj.id)
			this.getSdcsimulatoralarmPage(this.sbObj.id)
			this.getSdcdeviceindicatorPage(this.sbObj.id)
		},
		onShow() {
			
		},
		onBackPress() {
			
		},
		methods: {
			subClick(index) {
				this.currentIndex = index
				if(index == 1) {
					this.currentComponennt = 'telemeter'
					this.$nextTick(() => {
						let dList = this.botInfoList.filter(item => item.type == '3')
						if(dList.length) {
							dList.forEach(item => {
								item.deviceName = this.sbObj.name
							})
						}
						this.toDataList = dList
					})
				}else if(index == 2) {
					this.currentComponennt = 'remoteSignaling'
					this.$nextTick(() => {
						this.toDataList = this.botInfoList.filter(item => item.type == '4')
					})
				}else if(index == 3) {
					this.currentComponennt = 'remoteAdjustment'
					this.$nextTick(() => {
						this.toDataList = this.botInfoList.filter(item => item.type == '1')
					})
				}else if(index == 4) {
					this.currentComponennt = 'remoteControl'
					this.$nextTick(() => {
						this.toDataList = this.botInfoList.filter(item => item.type == '2')
					})
				}
			},
			// 历史事件
			getSdcdeviceeventlogPage(id) {
				let params = {
					deviceId:id
				}
				this.$http.getSdcdeviceeventlogPage(params).then(data => {
					// console.log(data,'历史事件--------------------->')
					if(data && data.data.records.length) {
						this.lsObj = data.data.records[0]
					}
				})
			},
			// 告警历史
			getSdcsimulatoralarmPage(id) {
				let params = {
					deviceCode:id
				}
				this.$http.getSdcsimulatoralarmPage(params).then(data => {
					// console.log(data,'告警历史--------------------->')
					if(data && data.code == 0) {
						if(data.data.records.length) {
							this.gjObj = data.data.records[0]
						}
					}
				})
			},
			// 遥测--遥信--遥调--遥控
			getSdcdeviceindicatorPage(id) {
				let params = {
					deviceId:id
				}
				this.$http.getSdcdeviceindicatorPage(params).then(data => {
					// console.log(data,'tab--------------------->')
					if(data && data.code == 0) {
						if(data.data.records.length) {
							this.botInfoList = data.data.records
							let dList = data.data.records.filter(item => item.type == '3') //遥测
							if(dList.length) {
								dList.forEach(item => {
									item.deviceName = this.sbObj.name
								})
							}
							this.toDataList = dList
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.deviceDetails {
		width: 100%;
		box-sizing: border-box;
		padding-top: 15rpx;
		background-color: #f6f5fa;
	}
	
	.subClass {
		display: inline-block;
		height: 100%;
		line-height: 68rpx;
		color: #666666;
		font-size: 30rpx;
	}
	
	.currentClass {
		color: #177CFE;
		border-bottom: 2px solid #177CFE;
		box-sizing: border-box;
	}
</style>
