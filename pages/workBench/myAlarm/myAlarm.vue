<!-- 我的告警 -->
<template>
	<view class="alarmMsg">
		<view style="width: 100%;height: 120rpx;display: flex;background-color: #FFFFFF;">
			<view style="width: 50%;height: 100%;color: #333333;font-size: 30rpx;display: flex;justify-content: center;align-items: center;">
				<view style="text-align: center;">
					<view style="color: #333333;font-size: 30rpx;">未处理（条）</view>
					<view style="color: #FF0909;font-size: 32rpx;">32</view>
				</view>
			</view>
			<view style="width: 50%;height: 100%;color: #333333;font-size: 30rpx;display: flex;justify-content: center;align-items: center;">
				<view style="text-align: center;">
					<view style="color: #333333;font-size: 30rpx;">已处理（条）</view>
					<view style="color: #0CB046;font-size: 32rpx;">12</view>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 100rpx;display: flex;justify-content: space-around;align-items: center;">
			<view @tap="dayClick(index)" :class="{'currentClass': currentIndex == index}" v-for="(item,index) in dayList" :key="item.value" style="width: 17%;height: 65%;background-color: #dfe0e1;text-align: center;line-height: 65rpx;color: #666666;border-radius: 10rpx;">{{item.label}}</view>
		</view>
		
		<view style="width: 100%;height: 320rpx;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view @tap="deviceDetails" class="txtSelect" style="width: 100%;height: 80rpx;border-bottom: 1px solid #ebf2f7;box-sizing: border-box;position: relative;line-height: 80rpx;">
				<text style="color: #333333;font-size: 32rpx;font-weight: 600;margin-left: 20rpx;">B2 USA性能超值</text>
				<image src="../../../static/img/newsR.png"
					style="position: absolute;right: 30rpx;top: 50%;transform: translateY(-50%);width: 20rpx;height: 30rpx;">
				</image>
			</view>
			<view style="width: 100%;height: calc(100% - 80rpx);color: #4D4D4D;padding: 15rpx 0 0 30rpx;box-sizing: border-box;">
				<view style="margin-top: 15rpx;">
					<text>报警分类：</text>
					<text>机柜DHJSDJ</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>报警级别：</text>
					<text>机柜DHJSDJ</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>设备位置：</text>
					<text>机柜DHJSDJ</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>报警时间：</text>
					<text>机柜DHJSDJ</text>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 320rpx;background-color: #FFFFFF;">
			<view class="txtSelect" style="width: 100%;height: 80rpx;border-bottom: 1px solid #ebf2f7;box-sizing: border-box;position: relative;line-height: 80rpx;">
				<text style="color: #333333;font-size: 32rpx;font-weight: 600;margin-left: 20rpx;">B2 USA性能超值</text>
				<image src="../../../static/img/newsR.png"
					style="position: absolute;right: 30rpx;top: 50%;transform: translateY(-50%);width: 20rpx;height: 30rpx;">
				</image>
			</view>
			<view style="width: 100%;height: calc(100% - 80rpx);color: #4D4D4D;padding: 15rpx 0 0 30rpx;box-sizing: border-box;">
				<view style="margin-top: 15rpx;">
					<text>报警分类：</text>
					<text>机柜DHJSDJ</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>报警级别：</text>
					<text>机柜DHJSDJ</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>设备位置：</text>
					<text>机柜DHJSDJ</text>
				</view>
				<view style="margin-top: 15rpx;">
					<text>报警时间：</text>
					<text>机柜DHJSDJ</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dayList:[
					{
						label:'今日',
						value:'1'
					},
					{
						label:'7天',
						value:'2'
					},
					{
						label:'15天',
						value:'3'
					},
					{
						label:'30天',
						value:'4'
					},
					{
						label:'45天',
						value:'5'
					}
				],
				currentIndex:0
			}
		},
		methods: {
			// 详情
			deviceDetails() {
				// uni.navigateTo({
				// 	url:'../alarmMsg/deviceDetails/deviceDetails'
				// })
			},
			// 选择天数
			dayClick(index) {
				this.currentIndex = index
			}
		}
	}
</script>

<style scoped>
.alarmMsg {
	width: 100%;
	height: 100vh;
	background-color: #f2f5f7;
}
.sx {
	background-image: url('../../../static/img/select.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.txtSelect:active {
	background-color: #f5f7fa;
	box-shadow: 0 0 20rpx 6rpx rgba(255, 255, 255, 0.4);
}

.currentClass {
	background-color: #deecff!important;
}

</style>
