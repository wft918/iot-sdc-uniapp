<template>
	<view class="container">
		<view class="manageArea">
			<view class="manageOut">
				<view class="manageItem" @tap="toDetail('1')">
					<text>热门问题</text>
					<image src="../../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
			<view class="manageOut">
				<view class="manageItem" @tap="toDetail('2')">
					<text>教学视频</text>
					<image src="../../../static/img/you.png" class="you" mode=""></image>
				</view>
			</view>
			<view class="manageOut">
				<view class="manageItem" style="border: none;" @tap="toDetail('3')">
					<text>意见和反馈</text>
					<image src="../../../static/img/you.png" class="you" mode=""></image>
				</view>
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
		methods: {
			toDetail(res) {
				var url = '';
				switch (true) {
					case res == '1':
						url = "1";
						break;
					case res == '2':
						url = "2";
						break;
					case res == '3':
						url = "./advice/advice";
						break;
				}
				console.log(url);
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
		height: 100vh;
		background-color: $style-bg;
	}

	.manageArea {
		width: 100%;
		background-color: white;
	}

	.manageOut {
		background-color: white;
		transition: ease 100ms;
		color: $style-text;
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
		font-size: 24rpx;
		color: #a0a0a0;
	}
</style>
