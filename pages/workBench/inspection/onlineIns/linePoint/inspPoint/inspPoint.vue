<template>
	<view class="container">
		<view class="list" @tap="toPoint('电器工程')">
			<view class="listL">电器工程</view>
			<view class="listR">
				<image src="../../../../../../static/img/you.png" class="listRImg" mode=""></image>
			</view>
		</view>
		<view class="list" @tap="toPoint('钢筋安装、吊运、套筒')">
			<view class="listL">钢筋安装、吊运、套筒</view>
			<view class="listR">
				<text>已完成</text>
				<image src="../../../../../../static/img/you.png" class="listRImg" mode=""></image>
			</view>
		</view>
		<view class="list" @tap="toPoint('落地式脚手架搭设')">
			<view class="listL">落地式脚手架搭设</view>
			<view class="listR">
				<text>已完成</text>
				<image src="../../../../../../static/img/you.png" class="listRImg" mode=""></image>
			</view>
		</view>
		<view class="list" @tap="toPoint('塔式起重机')">
			<view class="listL">塔式起重机</view>
			<view class="listR">
				<text>已完成</text>
				<image src="../../../../../../static/img/you.png" class="listRImg" mode=""></image>
			</view>
		</view>
		<view class="list" @tap="toPoint('高处作业')">
			<view class="listL">高处作业</view>
			<view class="listR">
				<text>已完成</text>
				<image src="../../../../../../static/img/you.png" class="listRImg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			let line=options.line||'';
			let point=options.point||'';
			
			if(line&&point){
				let title=line+'-'+point;
				uni.setNavigationBarTitle({
					title:title
				})
			}
		},
		methods: {
			toPoint(name){
				uni.navigateTo({
					url:'inspPointTypeClass/inspPointTypeClass?name='+name
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
