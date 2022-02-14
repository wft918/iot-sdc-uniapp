<template>
	<view class="container">
		<view class="common">我的反馈</view>
		<view v-show="melist.length===0" style="text-align: center;font-size: 26rpx;line-height: 80rpx;">暂无我的反馈</view>
		<view class="manageArea">
			<view class="manageOut"  v-for="(item,index) in melist">
				<view class="manageItem" :style="index===melist.length-1?'border:none':''" @tap="toDetail(item)">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="common">常见问题？</view>
		<view class="manageArea">
			<view class="manageOut"  v-for="(item1,index1) in list">
				<view class="manageItem" :style="index1===list.length-1?'border:none':''" @tap="toDetail(item1)">
					<text>{{item1.title}}</text>
				</view>
			</view>
			
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				melist:[],
				list:[
					// {question:'教学视频',id:'1'},
			
				]
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			uni.navigateTo({
				url:'./addadvice/addadvice'
			})
		},
		onShow() {
			this.getMeList();
			this.getCommomList();
		},
		methods: {
			getMeList(){
			this.$http.feedbackMe().then((res)=>{
				console.log(res);
				if(res.code===0&&res.data.length>0){
					this.melist=res.data;
				}
			})
			},
			getCommomList(){
				this.$http.listFAQ().then((res)=>{
					console.log(res);
					if(res.code===0&&res.data.length>0){
						this.list=res.data;
					}
				})
			},
			toDetail(res){
				console.log(res);
				let data=JSON.stringify(res);
				uni.navigateTo({
					url:'./advice-detail/advice-detail?data='+data
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.container{
	min-height: 100vh;
	background-color: $coltf9;
}
.common{
	color: #999999;
	font-size: 24rpx;
	width: 100%;
	height: 60rpx;
	line-height: 60rpx;
	box-sizing: border-box;
	padding-left: 32rpx;
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
