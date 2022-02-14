<template>
	<view class="container">
		<view class="headerSec">
			<view class="headerSecItem" @tap="toOtherType(1)">
				<image class="headerSecItemImg" src="../../../static/img/onlineIns.png"></image>
				<view class="headerSecItemText">线上巡检</view>
			</view>
			<view class="headerSecItem" @tap="toOtherType(2)">
				<image class="headerSecItemImg" src="../../../static/img/underLineIns.png"></image>
				<view class="headerSecItemText">线下巡检</view>
			</view>
			<view class="headerSecItem" @tap="toOtherType(3)">
				<image class="headerSecItemImg" src="../../../static/img/hiddenIns.png"></image>
				<view class="headerSecItemText">隐患排查</view>
			</view>
			<view class="headerSecItem" @tap="toOtherType(4)">
				<image class="headerSecItemImg" src="../../../static/img/changeIns.png"></image>
				<view class="headerSecItemText">整改</view>
			</view>
			<view class="headerSecItem" @tap="toOtherType(5)">
				<image class="headerSecItemImg" src="../../../static/img/testIns.png"></image>
				<view class="headerSecItemText">验收</view>
			</view>
		</view>
		<view class="taskBox">
			<view class="taskTitle">
				<text>线上计划巡检任务</text>
				<text class='taskTitleR'>总数：15</text>
			</view>
			<view class="taskInfoBox">
				<view class="taskInfoItem">
					<view class="bigText1">4</view>
					<view class="smallText">待完成</view>
				</view>
				<view class="taskInfoItem">
					<view class="bigText2">5</view>
					<view class="smallText">已超期</view>
				</view>
				<view class="taskInfoItem">
					<view class="bigText3">6</view>
					<view class="smallText">总事项</view>
				</view>
			</view>
		</view>
		<view class="taskBox">
			<view class="taskTitle">
				<text>整改任务</text>
				<text class='taskTitleR'>总数：15</text>
			</view>
			<view class="taskInfoBox">
				<view class="taskInfoItem">
					<view class="bigText1">4</view>
					<view class="smallText">待完成</view>
				</view>
				<view class="taskInfoItem">
					<view class="bigText2">5</view>
					<view class="smallText">已超期</view>
				</view>
				<view class="taskInfoItem">
					<view class="bigText3">6</view>
					<view class="smallText">总事项</view>
				</view>
			</view>
		</view>
		<view class="taskBox">
			<view class="taskTitle">
				<text>验收任务</text>
				<text class='taskTitleR'>总数：15</text>
			</view>
			<view class="taskInfoBox">
				<view class="taskInfoItem">
					<view class="bigText1">4</view>
					<view class="smallText">待完成</view>
				</view>
				<view class="taskInfoItem">
					<view class="bigText2">5</view>
					<view class="smallText">已超期</view>
				</view>
				<view class="taskInfoItem">
					<view class="bigText3">6</view>
					<view class="smallText">总事项</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				secTypeIndex: 1,
				userInfo:{},
				pageData:[],
				
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			uni.navigateTo({
				url: '../addposb/addposb'
			})
		},
		onLoad() {
			this.userInfo=JSON.parse(uni.getStorageSync('userinfo'));
			console.log(this.userInfo);
		},
		onShow() {
			// this.getdealing();
		},
		methods: {
			toOtherType(type){
				if(type=='1'){
					uni.navigateTo({
						url:'onlineIns/onlineIns'
					})
				}else if(type=='2'){
					uni.navigateTo({
						url:'uploadInsp/uploadInsp'
					})
				}else if(type=='3'){
					uni.navigateTo({
						url:'hiddenTtrouble/hiddenTtrouble'
					})
				}else if(type=='4'){
					uni.navigateTo({
						url:'abarbeitung/abarbeitung'
					})
				}else if(type=='5'){
					uni.navigateTo({
						url:'checking/checking'
					})
				}
			},
			changeType(res) {
				if (res != this.secTypeIndex) {
					this.secTypeIndex = res;
					if(res=='1'){
						this.getdealing();
					}else{
						this.getdealt();
					}
				}
			},
			getdealing() {
				let data = {
					userId: this.userInfo.id
				};
				this.$http.todoInspectList(data).then((res) => {
					console.log('qwer', res);
					this.pageData=[];
					if (res.code === 200 & res.success) {
						if(res.data.list.length>0){
							this.pageData=res.data.list;
						}
					}
				})
			},
			getdealt() {
				let data = {
					userId: this.userInfo.id
				};
				this.$http.finishInspectList(data).then((res) => {
					console.log('qwer1', res)
					this.pageData=[];
					if (res.code === 200 & res.success) {
						if(res.data.list.length>0){
							this.pageData=res.data.list;
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		position: relative;
		height: 100vh;
		background-color: #F0F0F5;
	}
.headerSec{
	width: 100%;
	height: 188rpx;
	/* background-color: #00AAFF; */
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.headerSecItem{
	width: 100rpx;
	height: 140rpx;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	align-items: center;
}
.headerSecItemImg{
	width: 96rpx;
	height: 96rpx;
}
.headerSecItemText{
	width: 100%;
	font-size: 24rpx;
	text-align:center;
	margin-top: 15rpx;
}
.taskBox{
	width: 100%;
	height: 300rpx;
	background-color: white;
	margin-top: 20rpx;
}
.taskTitle{
	width: 690rpx;
	height: 86rpx;
	border-bottom: 1rpx solid #F0F0F5;
	line-height: 85rpx;
	color: #545454;
	font-size: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
}
.taskTitleR{
	font-size: 24rpx;
}
.taskInfoBox{
	width: 690rpx;
	margin: 0 auto;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.taskInfoItem{
	width: 180rpx;
	text-align: center;height: 120rpx;
	margin: 0 20rpx;
}
.bigText1{
	font-size: 48rpx;
	color: #FA8C34;
	font-weight: 700;
}
.bigText2{
	font-size: 48rpx;
	color: #FF6262;
	font-weight: 700;
}
.bigText3{
	font-size: 48rpx;
	color: #0193E9;
	font-weight: 700;
}
.smallText{
	font-size: 24rpx;
	color: #545454;
}
</style>
