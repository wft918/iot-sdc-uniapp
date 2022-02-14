<!-- 告警详情 -->
<template>
	<view class="deviceDetails">
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">设备名称</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.deviceName}}</view>
		</view>
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">告警级别</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{$dictUtils.getDictLabel('alarm_level',item.alarmLevel)}}</view>
		</view>
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 20rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">告警分类</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.alarmTypeDesc}}</view>
		</view>
		
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 20rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">设备位置</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.siteName}}</view>
		</view>	
		
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">告警原因</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.alarmCodeDesc}}</view>
		</view>
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">房间负责人</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.managerUsers}}</view>
		</view>
		<!-- <view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">告警分类</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.alarmTypeDesc}}</view>	
		</view> -->
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">告警处理</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{$dictUtils.getDictLabel('tele_alarm_deal_status',item.dealStatus)}}</view>
		</view>
		<!-- view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 2rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">处理方法</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">******  网络恢复</view>
		</view>
		<view style="width: 100%;height: 88rpx;background-color: #fff;padding: 0 20rpx;box-sizing: border-box;display: flex;justify-content: space-between;line-height: 88rpx;margin-bottom: 20rpx;">
			<view style="height: 100%;color: #333333;font-size: 30rpx;">备注</view>
			<view style="height: 100%;color: #666666;font-size: 26rpx;">{{message.alarmRemark1}}</view>
		</view> -->
		
		
		
		<!-- view style="width: 100%;padding: 0 20rpx;box-sizing: border-box;background-color: #FFFFFF;">
			<view style="font-size: 30rpx;color: #333333;width: 100%;height: 80rpx;line-height: 80rpx;margin-bottom: 10rpx;">上传图片</view>
			<view style="width: 100%;display: flex;justify-content: space-between;flex-wrap: wrap;">
				<view style="width: 23%;height: 180rpx;background-color: red;margin-bottom: 15rpx;"></view>
				<view style="width: 23%;height: 180rpx;background-color: red;margin-bottom: 15rpx;"></view>
				<view style="width: 23%;height: 180rpx;background-color: red;margin-bottom: 15rpx;"></view>
				<view style="width: 23%;height: 180rpx;background-color: red;margin-bottom: 15rpx;"></view>
				<view style="width: 23%;height: 180rpx;background-color: red;margin-bottom: 15rpx;"></view>
				 
			</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:''
			}
		},
		filters: {
			alarmLevelFilter(alarmLevel) {
				const alarmLevelObj = {
					1:'一级告警',
					2:'二级告警',
					3:'三级告警',
					4:'四级告警'
				}
				return alarmLevelObj[parseFloat(alarmLevel)]
			}
		},
		onLoad(option) {
			this.message = JSON.parse(option.msg)
			console.log(this.message,'msg------------------>')
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.deviceDetails {
		width: 100%;
		background-color: #f3f3f3;
		padding-top: 15rpx;
		box-sizing: border-box;
	}
</style>
