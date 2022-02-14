<!-- 能耗数据 -->
<template>
	<view style="width: 100%;background-color: #f3f5f6;">
		<!-- IT设备能耗统计 -->
		<view style="width: 98%;height: 400rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-top: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;position: relative;">
				<text>IT设备能耗统计</text>
				<view @tap="slectClick" class="select" style="position: absolute;top: 50%;right: 16rpx;transform: translateY(-50%);height: 65rpx;width: 250rpx;text-align: center;line-height: 65rpx;color: #666666;font-size: 30rpx;">
					{{selectText}}
				</view>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);display: flex;">
				<view style="width: 50%;height: 100%;">
					<view style="width: 100%;height: 80%;">
						<comp-pie :colorList="['#0298ff','#f84200']" :value="itPercent" :deviceData="itData" :subTitle="'今日能耗'"></comp-pie>
					</view>
					<view style="width: 100%;height: 20%;display: flex;justify-content: center;align-items: center;">
						<view style="color: #666666;">
							IT今日用电:{{itTotal}}W
						</view>
					</view>
				</view>
				<view style="width: 50%;height: 100%;">
					<view style="width: 100%;height: 80%;">
						<comp-pie :colorList="['#dddff2','#2ac34d']" :value="pue" :deviceData="pueDataList" :subTitle="'PUE'"></comp-pie>
					</view>
					<view style="width: 100%;height: 20%;display: flex;justify-content: center;align-items: center;">
						<view style="color: #666666;">
							今日PUE{{pue}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 各项设备周能耗 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;margin-top: 15rpx;background-color: #FFFFFF;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">各项设备周能耗</view>
			<view style="width: 100%;height: 412rpx;">
				<bar-stack :ConsumeInWeekList="ConsumeInWeekList"></bar-stack>
			</view>
		</view>
		<!-- 当前PUE排行 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;margin-top: 15rpx;background-color: #FFFFFF;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">当前PUE排行</view>
			<view style="width: 100%;height: 412rpx;">
				<!-- <bar-stack></bar-stack> -->
				<ranking :data="pueList" :centerWidth="'65%'" :rightWidth="'27%'"></ranking>
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
	import compPie from '../comprehensiveAnalysis/uchart/comp-pie.vue'
	import barStack from './uchart.vue/barStack.vue'
	import ranking from './rank/ranking.vue'
	export default {
		data() {
			return {
				isShow:false,
				selectText:'--'//方案名称
			}
		},
		props: ['pueList','itPercent','itTotal','itData','pue','pueDataList','ConsumeInWeekList','faList'],
		watch: {
			faList(newValue) {
				this.selectText = newValue[1].planName
			}
		},
		components: {
			compPie,
			barStack,
			ranking
		},
		methods: {
			slectClick() {
				this.isShow = true
			},
			// 选择方案
			fnClick(...data) {
				// console.log('选择方案------------->')
				this.isShow = false
				this.selectText = data[1]
				this.$emit('faChange2',data[0])
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
