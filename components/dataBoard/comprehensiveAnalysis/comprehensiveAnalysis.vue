<!-- 综合分析 -->
<template>
	<view style="width: 100%;background-color: #f3f5f6;">
		<!-- <view style="width: 100%;height: 58rpx;color: #999999;font-size: 28rpx;line-height: 58rpx;padding-left: 15rpx;box-sizing: border-box;">2021年9月28日 数据已更新</view> -->
		<view style="width: 98%;height: 450rpx;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;align-content: flex-start;margin-top: 15rpx;">
			<view style="width: 49%;height: 48%;border-radius: 10rpx;background-color: #dce4f9;padding: 25rpx 0 0 25rpx;box-sizing: border-box;">
				<view style="color: #333333;">设备统计</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 30rpx;">设备数量：{{sbObj.num}}台</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 18rpx;">在线率：{{sbObj.percent}}</view>
			</view>
			<view style="width: 49%;height: 48%;border-radius: 10rpx;background-color: #e0d1e8;padding: 25rpx 0 0 25rpx;box-sizing: border-box;position: relative;">
				<view style="color: #333333;">能耗统计</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 30rpx;">今日总耗电：{{nhObj.total}}KW</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 18rpx;">今日园区 PUE：{{nhObj.pueNum}}</view>
				
				<view @tap="slectClick" class="select" style="position: absolute;top: 5rpx;right: 12rpx;height: 65rpx;width: 150rpx;text-align: center;line-height: 65rpx;color: #666666;font-size: 30rpx;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
					{{selectText}}
				</view>
			</view>
			<view style="width: 49%;height: 48%;border-radius: 10rpx;background-color: #cee3f5;margin-top: 15rpx;padding: 25rpx 0 0 25rpx;box-sizing: border-box;">
				<view style="color: #333333;">告警统计</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 30rpx;">今日告警数量：{{gjObj.dayNum}}</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 18rpx;">本周告警数量：{{gjObj.weekNum}}</view>
			</view>
			<view style="width: 49%;height: 48%;border-radius: 10rpx;background-color: #f5e9e7;margin-top: 15rpx;padding: 25rpx 0 0 25rpx;box-sizing: border-box;">
				<view style="color: #333333;">巡查统计</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 30rpx;">今日巡查任务：{{xcObj.num1}}</view>
				<view style="color: #63657C;font-size: 26rpx;margin-top: 18rpx;">今日巡查发现问题：{{xcObj.num2}}</view>
			</view>
		</view>
		
		<!-- 各机房设备在线率 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;margin-top: 40rpx;background-color: #FFFFFF;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>各机房设备在线率</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<comp-bar :colorList="['#177cfe','#feae33']" :xValue="jfxValue" :yValueOne="jfyValue1" :yValueTwo="jfyValue2" :rotateLabel="true"></comp-bar>
			</view>
		</view>
		<!-- 数据中心告警统计 -->
		<view style="width: 98%;height: 550rpx;border-radius: 10rpx;margin: 0 auto;margin-top: 15rpx;background-color: #FFFFFF;">
			<view style="position: relative;width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>数据中心告警统计</text>
				<view style="position: absolute;top: 0;right: 20rpx;height: 100%;line-height: 88rpx;color: #999999;font-size: 30rpx;">单位：条</view>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);display: flex;">
				<view style="width: 50%;height: 100%;">
					<view style="width: 100%;height: 65%;">
						<comp-pie :colorList="['#009afb','#f14200','#feae33']" :value="totalLeft" :deviceData="deviceDataOne"></comp-pie>
					</view>
					<view style="width: 100%;height: 35%;padding-left: 30rpx;box-sizing: border-box;display: flex;flex-wrap: wrap;">
						<view style="width: 50%;text-align: center;">
							<text style="color: #666666;">未确认：</text>
							<text style="color: #6b6b6b;font-weight: 600;">{{sjzxObjLeft.length?sjzxObjLeft[0].num:''}}</text>
						</view>
						<view style="width: 50%;text-align: center;">
							<text style="color: #666666;">已确认：</text>
							<text style="color: #6b6b6b;font-weight: 600;">{{sjzxObjLeft.length?sjzxObjLeft[1].num:''}}</text>
						</view>
						<view style="margin-top: 10rpx;width: 50%;text-align: center;">
							<text style="color: #666666;">已消除：</text>
							<text style="color: #6b6b6b;font-weight: 600;">{{sjzxObjLeft.length?sjzxObjLeft[2].num:''}}</text>
						</view>
					</view>
				</view>
				<view style="width: 50%;height: 100%;">
					<view style="width: 100%;height: 65%;">
						<comp-pie :colorList="['#f14200','#009afb','#6ad389','#ffb647']" :value="totalRight" :deviceData="deviceDataTwo"></comp-pie>
					</view>
					<view style="width: 100%;height: 35%;display: flex;flex-wrap: wrap;">
						<view style="width: 50%;text-align: center;" v-for="item in sjzxObjRight" :key="item.level">
							<text style="color: #666666;">{{item.levelDec}}：</text>
							<text style="color: #6b6b6b;font-weight: 600;">{{item.num || '0'}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 能耗数据统计 -->
		<view style="width: 98%;height: 400rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-top: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">能耗数据统计</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<comp-bar :colorList="['#45b0e4','#b4b0b0']" :xValue="xValue" :yValueOne="yValue1" :yValueTwo="yValue2" :rotateLabel="true" :legend="false"></comp-bar>
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
	import compBar from './uchart/comp-bar.vue'
	import compPie from './uchart/comp-pie.vue'
	export default {
		data() {
			return {
				isShow:false,
				selectText:'--',
				deviceDataOne:[],
				deviceDataTwo:[],
				totalLeft:'0',//数据中心左边总数
				totalRight:'0',//数据中心右边总数
				xValue:[],
				yValue1:[],
				yValue2:[],
				jfxValue:[],
				jfyValue1:[],
				jfyValue2:[],
				
			}
		},
		props:['faList','sbObj','nhObj','gjObj','xcObj','jfsb','sjzxObjLeft','sjzxObjRight','nhsjObj'],
		watch: {
			faList(newValue) {
				this.selectText = newValue[1].planName
			},
			sjzxObjLeft(newValue) {
				if(newValue.length) {
					this.totalLeft = String(newValue[0].num + newValue[1].num + newValue[2].num)
					this.deviceDataOne = [
						{
							name:'未确认',
							value:newValue[0].num
						},
						{
							name:'已确认',
							value:newValue[1].num
						},
						{
							name:'已消除',
							value:newValue[2].num
						}
					]
				}
			},
			sjzxObjRight(newValue) {
				if(newValue.length) {
					let totalNum = 0
					newValue.forEach(item => {
						totalNum += item.num
					})
					this.totalRight = String(totalNum)
					this.deviceDataTwo = newValue.map(item => ({name:item.levelDec,value:item.num}))
				}
			},
			
			nhsjObj(newValue) {
				// console.log(newValue,'能耗数据统计--------------------------->')
				this.xValue = []
				this.yValue1 = []
				this.yValue2 = []
				newValue.forEach(item => {
					this.xValue.push(item.label)
					this.yValue1.push(parseFloat(item.value))
					this.yValue2.push(0)
				})
			},
			jfsb(newValue) {
				this.jfxValue = newValue.xValue
				this.jfyValue1 = newValue.yValueOne
				this.jfyValue2 = newValue.yValueTwo
			}
		},
		components:{
			compBar,
			compPie
		},
		methods: {
			// 打开弹出层
			slectClick() {
				this.isShow = true
			},
			// 选择方案
			fnClick(...data) {
				this.isShow = false
				this.selectText = data[1]
				this.$emit('faChang1',data[0])
			}
			
		}
	}
</script>

<style scoped>
	.select {
		background-image: url('../../../static/img/select.png');
		background-size: 100% 100%;
	}
	.falist:active {
		background-color: rgba(28,126,229,0.3);
		color: white;
	}
</style>
