<template>
	<view class="container">
		<input type="text" class="changeIn" v-model="nick" />
		<view class="changeInTip">
			<text>好的昵称在工作中更能让人记住你。</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nick:''
			}
		},
		onLoad(options) {
			this.nick=options.nick;
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			this.changeNick();
		},
		methods: {
			changeNick(){
				let data={
					flag:'name',
					username:this.nick
				};
				console.log(data);
				this.$http.uplateAvatar(data).then((res)=>{
					console.log(res);
					if(res.code===0&&res.data){
						uni.showToast({
							title:'保存成功！',
							icon:'none',
							duration:1000
						})
						setTimeout(()=>{
							uni.navigateBack({
								
							})
						},1000)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.container{
	min-height: 100vh;
	background-color: $coltf9;
	box-sizing: border-box;
	padding-top:24rpx;
}
.changeIn{
	width: 696rpx;
	height: 88rpx;
	line-height: 88rpx;
	border-bottom: 1rpx solid $colsix6;
	font-size: 30rpx;
	color: $colsix3;
	margin: 0 auto;
}
.changeInTip{
	width: 696rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
	color: $colsix9;
	margin: 0 auto;
}
</style>
