<!-- 动环数据 -->
<template>
	<view style="width: 100%;background-color: #f3f5f6;">
		<!-- 设备运行情况 -->
		<view style="width: 98%;height: 400rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-top: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">设备运行情况</view>
			<view style="width: 100%;height: calc(100% - 88rpx);display: flex;">
				<view style="width: 50%;height: 100%;">
					<comp-pie :value="'总数'" :colorList="['#009aff','#f14200']" :deviceData="deviceData" :subTitle="total" :ringWidth="25" :titleFontSize="20" :subTitleFontSize="25"></comp-pie>
				</view>
				<view style="width: 50%;height: 100%;color: #666666;font-size: 25rpx;padding: 10rpx;box-sizing: border-box;display: flex;align-items: center;font-size: 32rpx;">
					<view>
						<view>在线：{{online}}台</view>
						<view style="margin: 10rpx 0;">离线：{{offline}}台</view>
						<view>告警：{{alarm}}台</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 98%;height: 400rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-top: 15rpx;">
			<com-bar :xValue="typeXvalue" :yValueOne="typeYvalueOne" :yValueTwo="typeYvalueTwo" :colorList="['#019aff','#feae33']"></com-bar>
		</view>
		<!-- 近7日机房告警数量排行 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;margin-top: 15rpx;background-color: #FFFFFF;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">近7日机房告警数量排行</view>
			<view style="width: 100%;height: 412rpx;">
				<!-- <com-bar :xValue="['动力','环境','暖通','消防','安防']" :colorList="['#019aff','#feae33']"></com-bar> -->
				<ranking :data="rankData"></ranking>
			</view>
		</view>
		<!-- 近7日机房告警数趋势 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;margin-top: 15rpx;background-color: #FFFFFF;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">近7日机房告警数量趋势</view>
			<view style="width: 100%;height: 412rpx;">
				<moving-area :xValue="xValue" :yValue="yValue"></moving-area>
			</view>
		</view>
	</view>
</template>

<script>
	import compPie from '../comprehensiveAnalysis/uchart/comp-pie.vue'
	import comBar from '../comprehensiveAnalysis/uchart/comp-bar.vue'
	import movingArea from './uchart/movingArea.vue'
	import ranking from '../energyConsumption/rank/ranking.vue'
	export default {
		data() {
			return {
				xValue:[],
				yValue:[],
				typeXvalue:[],
				typeYvalueOne:[],
				typeYvalueTwo:[]
			}
		},
		props: ['online','offline','total','alarm','deviceData','deviceTypeData','trendObj','rankData'],
		watch: {
			trendObj(newValue) {
				this.xValue = newValue.label.map(item => {
					if(item != null) {
						item = item.split('-').slice(1).join('-')
					}
					return item
				}),
				// console.log(this.xValue,'xValue----------------------->')
				this.yValue = newValue.value.map(item => parseFloat(item))
			},
			deviceTypeData(newValue) {
				console.log(newValue,'device------------->')
				this.typeXvalue = []
				this.typeYvalueOne = []
				this.typeYvalueTwo = []
				newValue.forEach(item => {
					this.typeXvalue.push(item.label.slice(0,2))
					this.typeYvalueOne.push(parseFloat(item.onlineNum))
					this.typeYvalueTwo.push(parseFloat(item.alarmNum))
				})
			}
		},
		// computed: {
		// 	subTitle() {
		// 		return String(this.online + this.offline)
		// 	}
		// },
		components: {
			compPie,
			comBar,
			movingArea,
			ranking
		},
		
	}
</script>

<style>
</style>
