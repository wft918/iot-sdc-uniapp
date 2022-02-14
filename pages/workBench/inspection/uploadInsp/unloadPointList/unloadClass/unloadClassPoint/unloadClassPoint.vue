<template>
	<view class="container">
			<view class="list" @tap="toPoint(item)" v-for="item in list">
				<view class="listL">{{item.name}}</view>
				<view class="listR">
					<text :style="item.isFinshed!='已完成'?'color:#999999':''">{{item.isFinshed!='已完成'?'未完成':'已完成'}}</text>
					<image src="../../../../../../../static/img/you.png" class="listRImg" mode=""></image>
				</view>
			</view>
			<view class="nodata" v-if="list.length===0">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				parentId:'',
				list:[]
			}
		},
		onLoad(options) {
			this.id=options.id||'';
			this.parentId=options.parentId||'';
			console.log(options);
			
		},
		onShow() {
			this.getList();
		},
		methods: {
			toPoint(res){
				uni.navigateTo({
					url:'./unloadInspecific/unloadInspecific?id='+this.id+'&parentId='+res.id
				})
			},
			getList(){
				let data={
					type:2,
					parent:this.parentId,
					recordId:this.id,
					list:[]
				};
				console.log(data);
				
				this.$http.inspectRiskTree(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						if(res.list.length>0){
							this.list=res.list;
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
	.nodata{
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999999;
	}
</style>
