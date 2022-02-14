<template>
	<view class="container">
		<view class="content">
			<view class="userQue">
				<text>{{data.description}}</text>
			</view>
			<view class="answer">
				<image src="../../../../../static/img/rootAvr.png"class="rootava" mode=""></image>
				<text>{{data.answer!=''?data.answer:'暂无反馈结果'}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				data:{}
			}
		},
		onLoad(options) {
			this.data=JSON.parse(options.data);
			console.log(this.data);
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.container{
	background-color: $coltf9;
	padding-top: 20rpx;
	}
.content{
		width:706rpx ;
		height: auto;
		padding-top: 30rpx;
		background-color: $colwhite;
		margin: 0 auto;
		box-shadow: 0 0 40rpx 6rpx rgba(66,66,66,0.4);
	}
	.userQue{
		width: 650rpx;
		height: auto;
		border-bottom: 1rpx solid $colta0;
		color: $colsix6;
		font-size: 30rpx;
		line-height: 48rpx;
		margin: 0 auto;
		padding-bottom: 24rpx;
	}
	.answer{
	width: 650rpx;
	height: auto;
	color: $colsix9;
	font-size: 24rpx;
	line-height: 50rpx;
	margin: 0 auto;	
	padding:40rpx 0;
	}
	.rootava{
	width: 50rpx;
	height: 50rpx;
	vertical-align: middle;
	margin-right: 20rpx;
	word-wrap:break-word;
	}
</style>
