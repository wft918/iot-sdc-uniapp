<template>
	<view class="container">
		<view class="quesTitle">反馈问题类型</view>
		<view class='typeBox'>
			<view class="type" :class="item.sec?'secd':''" @tap="changeType(index)" v-for="(item,index) in typeList">{{item.type}}</view>
		</view>
		<view class="quesTitle">反馈问题标题</view>
		<input type="text" v-model="title" class="queTitle" placeholder="请输入问题标题">
		<textarea class="adviceText" v-model="advice" @input="calcNum" maxlength="200" placeholder="请输入反馈信息" />
		<view class="num"><text style="color: #333333;">{{num}}</text>/200</view>
		<view class="sub" @tap="addfeed()">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList:[
					{type:'类型一',sec:false},
					{type:'类型二',sec:false},
					{type:'类型三',sec:false},
					{type:'类型四',sec:false},
					{type:'类型五',sec:false}
				],
				num:0,
				advice:'',
				title:'',
				onoff:true
			}
		},
		methods: {
			calcNum(e){
				this.num=e.target.value.length;
			},
			changeType(index){
				if(this.typeList[index].sec){
					this.typeList[index].sec=false;
				}else{
					for(let a of this.typeList){
						a.sec=false;
					}
					this.typeList[index].sec=true;
				}
			},
			addfeed(){
				let type=null;
				for(let a in this.typeList){
					if(this.typeList[a].sec){
						type=a+1;
						break;
					}
				}
				if(!type){
					uni.showToast({
						title:'请选择问题类型',
						icon:'none',
						duration:1200
					})
					return;
				}
				if(!this.title){
					uni.showToast({
						title:'请填写问题标题',
						icon:'none',
						duration:1200
					})
					return;
				}
				if(!this.advice){
					uni.showToast({
						title:'请填写反馈信息',
						icon:'none',
						duration:1200
					})
					return;
				}
				
				let user=uni.getStorageSync('userinfo');
				console.log(user);
				let data={
					userId:user.userId,
					title:this.title,
					description:this.advice,
					type:this.type,
					isAnswer:0,
					mobileType:'1',
					versionCode:'1',
					faq:"0"
					
				};
				console.log(data);
				this.$http.feedbackAdd(data).then((res)=>{
					console.log(res);
					if(res.code===0&&res.data){
					uni.showToast({
						title:'提交成功！',
						icon:'none',
						duration:1200
					})
					setTimeout(()=>{
						uni.navigateBack({
							
						})
					},1200)
					}
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
.quesTitle{
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	color: $colsix9;
	box-sizing: border-box;
	padding: 0 32rpx;
}
.typeBox{
	width: 686rpx;
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.type{
	width: 215rpx;
	height: 68rpx;
	line-height: 68rpx;
	border-radius: 34rpx;
	background-color: $colwhite;
	color: $colsix6;
	text-align: center;
	margin-right: 12rpx;
	margin-top: 16rpx;
	transition: ease 100ms; 
}
.secd{
	background-color: #159EFC;
	color: $colwhite;
}
.adviceText{
	width: 676rpx;
	height: 334rpx;
	background-color: white;
	margin: 20rpx auto 0 auto;
	font-size: 28rpx;
	color: $colsix3;
	box-sizing: border-box;
	padding: 26rpx;
}
.num{
	width: 676rpx;
	height: 60rpx;
	line-height: 60rpx;
	margin: 0 auto;
	font-size: 24rpx;
	text-align: right;
	color: $colsix9;
}
.sub{
	width: 684rpx;
	height: 86rpx;
	background: $col159efc;
	border-radius: 43rpx;
	line-height: 86rpx;
	position: fixed;
	bottom: 52rpx;
	left: 33rpx;
	color: $colwhite;
	letter-spacing: 12rpx;
	text-align: center;
	font-size: 32rpx;
	transition: ease 100ms; 
}
.sub:active{
background-color: $col007AFF;
}
.queTitle{
	width: 706rpx;
	height: 60rpx;
	background-color: #eee;
	border: 0;
	display: block;
	font-size: 30rpx;
	margin: 0 auto;
	box-sizing: border-box;
	padding: 0 20rpx;
}
</style>
