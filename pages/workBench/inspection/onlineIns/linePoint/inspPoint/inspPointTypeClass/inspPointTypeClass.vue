<template>
	<view class="container">
			<view class="list" @tap="toPoint()">
				<view class="listL">配管、线槽、支架安装</view>
				<view class="listR">
					<image src="../../../../../../../static/img/you.png" class="listRImg" mode=""></image>
				</view>
			</view>
			<view class="list" @tap="toPoint()">
				<view class="listL">电线、电缆穿管和线槽敷设</view>
				<view class="listR">
					<text>已完成</text>
					<image src="../../../../../../../static/img/you.png" class="listRImg" mode=""></image>
				</view>
			</view>
			<view class="list" @tap="toPoint()">
				<view class="listL">配电柜（箱、盘）安装、配线</view>
				<view class="listR">
					<text>已完成</text>
					<image src="../../../../../../../static/img/you.png" class="listRImg" mode=""></image>
				</view>
			</view>
			<view class="list" @tap="toPoint()">
				<view class="listL">电气设备调试</view>
				<view class="listR">
					<text>已完成</text>
					<image src="../../../../../../../static/img/you.png" class="listRImg" mode=""></image>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:''
			}
		},
		onLoad(options) {
			let title=options.name||'';
			
			if(title){
				this.title=title;
				uni.setNavigationBarTitle({
					title:title
				})
			}
		},
		methods: {
			toPoint(){
				uni.navigateTo({
					url:'inspecific/inspecific?title='+this.title
				})
			}
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	height: auto;
	padding-top: 20rpx;
}
.list{
	width: 690rpx;
	height: 100rpx;
	line-height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	border-bottom: 1rpx solid #F0F0F5;
}
.listL{
	width: 400rpx;
	overflow-x: hidden;
	text-overflow: ellipsis;white-space: nowrap;
	font-size: 30rpx;
	color: #545454;
}
.listR{
	font-size: 30rpx;
	color: #0193E9;
}
.listRImg{
	width: 30rpx;
	height: 30rpx;
	vertical-align: middle;
	margin-left: 16rpx;
}

</style>
