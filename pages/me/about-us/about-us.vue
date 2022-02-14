<template>
	<view class="container">
		<image src="../../../static/img/logo.png" class="abLogo" mode=""></image>
		<view class="baninfo">V1.0.1</view>
		<view class="manageArea" style="margin-top: 124rpx;">
			<view class="manageOut" >
				<view class="manageItem">
					<text>项目名称</text>
					<text class="you" style='right: 60rpx;top: 32rpx;width: 120rpx;'>智慧园区</text>
				</view>
			</view>
			<view class="manageOut" >
				<view class="manageItem"style='border: none;' @tap="showQr()">
					<text>app下载二维码</text>
					<image src="../../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" class="popSy">
			<image src="../../../static/img/qrdownload.png" class="qrimg" mode=""></image>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			showQr(){
				this.$refs.popup.open('top')
			},
		}
	}
</script>

<style scoped lang="scss">
	.container{
		height: calc(100vh - 150rpx);
		background-color: $coltf9;
		padding-top: 150rpx;
		box-sizing: border-box;
	}
.abLogo{
	width: 261rpx;
	height: 137rpx;
	display: block;
	margin: 0 auto;
}
.baninfo{
	width: 100%;
	text-align: center;
	color: $colsix3;
	margin-top: 40rpx;
}
.manageArea {
		width: 100%;
		background-color: white;
	}

	.manageOut {
		background-color: white;
		transition: ease 100ms;
		color:$style-text;
	}

	.manageOut:active {
		background-color: $style-click;
		color: $style-white;
	}

	.manageItem {
		width: 710rpx;
		height: 114rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1rpx solid #dcdcdc;
		position: relative;
		font-size: 30rpx;
		font-weight: 400;

	}

	.imgC {
		width: 60rpx;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.you {
		width: 34rpx;
		height: 34rpx;
		position: absolute;
		top: 46rpx;
		right: 28rpx;
		font-size: 30rpx;
		color: #a0a0a0;
	}
	.popSy{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.qrimg{
		width: 400rpx;
		height: 400rpx;
		top: 300rpx;
		left: 175rpx;
	}
</style>
