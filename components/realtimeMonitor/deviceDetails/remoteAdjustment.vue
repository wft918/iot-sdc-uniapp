<!-- 遥调组件 -->
<template>
	<view style="width: 100%;height: 100%;">
		<view style="width: 100%;height: 80rpx;background-color: red;display: flex;background-color: #e4e7ed;">
			<view style="width: 50%;height: 100%;text-align: center;line-height: 80rpx;color: #909399;font-size: 28rpx;">参数</view>
			<view style="width: 50%;height: 100%;text-align: center;line-height: 80rpx;color: #909399;font-size: 28rpx;">参数值</view>
		</view>
		<view v-if="dataList.length" style="width: 100%;">
			<view v-for="(item,index) in dataList" :key="item.id" style="width: 100%;height: 80rpx;display: flex;">
				<view style="width: 50%;height: 100%;text-align: center;line-height: 80rpx;color: #909399;font-size: 28rpx;">{{item.param || '--'}}</view>
				<view style="width: 50%;height: 100%;text-align: center;line-height: 80rpx;color: #909399;font-size: 28rpx;">{{item.value || '--'}}</view>
			</view>
		</view>
		<view v-else style="width: 100%;" >
			<image style="width: 76%;margin: 0 auto;display: block;" src="../../../static/img/noNotice.png" mode=""></image>
			<view style="width: 100%;text-align: center;font-size: 35rpx;color: #999999;">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			dataList: {
				type:Array,
				default:() => []
			}
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
</style>
