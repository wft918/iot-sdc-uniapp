<template>
	<view class="container">
		<!-- <view class="list" @tap="toPoint(item)" v-for="item in list">
			<view class="listL">{{item.name}}</view>
			<view class="listR">
				<text :style="item.isFinshed!='已完成'?'color:#999999':''">{{item.isFinshed!='已完成'?'未完成':'已完成'}}</text>
				<image src="../../../../../../static/img/you.png" class="listRImg" mode=""></image>
			</view>
		</view>
		<view class="nodata" v-if="list.length===0">暂无数据</view> -->
		<view class="together">
			<scroll-view class="togetherL" scroll-y="trye">
				<view class="togetherLItem" :class="index==index1?'sectogetherLItem':''" @tap="secInOne(index)" v-for="(item,index) in list">
					<view class="togetherLItemT">{{item.name}}</view>
					<image src="../../../../../../static/img/classSucc.png" v-show="item.isFinshed=='已完成'" class="classSucee" mode=""></image>
				</view>
			</scroll-view>
			<scroll-view class="togetherR" scroll-y="trye">
				<view class="nodata" v-if="list1.length===0"><image class="nodataI" src="../../../../../../static/img/loading.gif" mode=""></image></view>
				<view class="togetherRItem" v-for="(item,index) in list1" @tap="toPoint(item.id)">
					<view class="togetherRItemIn">
						<view class="">{{item.name}}</view>
						<view class="blueT" :style="item.isFinshed!='已完成'?'color:#999999':''">{{item.isFinshed!='已完成'?'未完成':'已完成'}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				list:[],
				list1:[],
				index1:0,
				index2:0,
				projectName:'',
				pjId:'',
				state:''
			}
		},
		onLoad(options) {
			this.id=options.id||'';
			this.pjId=options.pjId||'';
			this.projectName=options.proName||'';
			this.state=options.state||'';
			console.log(this.id);
			if(this.state!='1'){
				const currentWebview = this.$mp.page.$getAppWebview();
						currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
							text: ' '
						});
			}
		},
		onShow() {
			this.getList();
		},
		onNavigationBarButtonTap() {
			console.log(this.state);
			if(this.state=='1'){
			this.inspectIsFinished();	
			}
		},
		methods: {
			inspectIsFinished() {
				let _this = this;
						let isF = false;
						for (let a in this.list) {
							if (this.list[a].isFinshed == '已完成') {
								isF = true;
							}
						}
						if (isF) {
							let data = {
								id: this.id,
								inspectState: 2,
							};
							console.log(data);
							_this.$http.inspectUpdateState(data).then((res) => {
								console.log(res);
								if (res.code === 200 && res.success) {
									uni.showToast({
										title: '提交成功！',
										icon: 'none'
									})
									setTimeout(()=>{
										uni.navigateBack({
											
										})
									},1000)
								}
							})
						} else {
							uni.showToast({
								title: '至少要有一个完成类型！',
								icon: 'none',
								duration: 1000
							})
						}	
			},
			secInOne(res){
				if(this.index!=res){
					this.index1=res;
					this.list1=[];
					this.getList1(this.list[res].id);
				}
				
			},
		toPoint(res){
			uni.navigateTo({
				url:'unloadClassPoint/unloadInspecific/unloadInspecific?id='+this.id+'&parentId='+res+'&proName='+this.projectName+'&pjId='+this.pjId+'&recordId='+this.id+"&classId="+this.list[this.index1].id+'&state='+this.state
			})
		},
			getList(){
				let data={
					type:1,
					parent:'',
					recordId:this.id,
					
				};
				console.log(data);
				this.$http.inspectRiskTree(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						if(res.list.length>0){
							this.list=res.list;
							this.getList1(res.list[this.index1].id);
						}
					}
				})
			},
			getList1(res){
				let data={
					type:2,
					parent:res,
					recordId:this.id
				};
				console.log(data);
				
				this.$http.inspectRiskTree(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						if(res.list.length>0){
							this.list1=res.list;
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	height: auto;
	/* padding-top: 20rpx; */
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
	.nodata{
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999999;
	}
	.nodataI{
		width: 32rpx;
		height: 32rpx;
	}
	.together{
		width: 100%;
		height: 100vh;
		background: #007AFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.togetherL{
		width: 240rpx;
		height: 100%;
		background-color: white;
	}
	.togetherR{
		width: 510rpx;
		height: 100%;
		background-color: #f0f0f5;
	}
	.togetherLItem{
		width: 100%;
		line-height: 48rpx;
		color: #7D7D7D;
		position: relative;
		padding: 20rpx 0;
		/* margin-top: 10rpx; */
		transition: 100ms ease;
	}
	.sectogetherLItem{
		background-color: #f0f0f5;
		color: #333;
	}
	.togetherLItemT{
		width: 180rpx;
		margin: 0 auto;
		font-size: 26rpx;
	}
	.classSucee{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
	.togetherRItem{
		width: 100%;
		line-height: 48rpx;
		color: #424242;
		font-size: 28rpx;
		padding: 20rpx 0;
		transition: 100ms ease;
	}
	.togetherRItem:active{
		background-color: white;
	}
	.togetherRItemIn{
		width: 90%;
		margin: 0 auto;
	}
	.blueT{
		color: #0193E9;
		font-size: 24rpx;
	}
</style>
