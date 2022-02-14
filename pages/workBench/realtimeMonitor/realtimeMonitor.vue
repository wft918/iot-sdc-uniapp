<!-- 实时监控页面 -->
<template>
	<view class="realtimeMonitor">
		<view class="tabBarTop">
			<view>
				<view @tap="tabbarClick('1')" :class="['selectClass',{'currentClass': currentIndex == '1'}]">动力</view>
			</view>
			<view>
				<view @tap="tabbarClick('2')" :class="['selectClass',{'currentClass': currentIndex == '2'}]">环境</view>
			</view>
			<view>
				<view @tap="tabbarClick('3')" :class="['selectClass',{'currentClass': currentIndex == '3'}]">暖通</view>
			</view>
			<view>
				<view @tap="tabbarClick('5')" :class="['selectClass',{'currentClass': currentIndex == '5'}]">消防</view>
			</view>
			<view>
				<view @tap="tabbarClick('4')" :class="['selectClass',{'currentClass': currentIndex == '4'}]">安防</view>
			</view>
		</view>
		 
		<view class="conttent">
			<view class="sx" @tap="sxTap">
				{{selectText}}
			</view>
			<view v-if="photoList.length" style="width: 100%;">
				<view v-for="(item,index) in photoList" :key="item.id" class="photo" style="position: relative;">
					<image style="width: 100%;height: 100%;" :src="$url + item.siteImg" mode=""></image>
					<!-- 小设备图片 -->
					<image @tap="smallDeviceClick(item)" style="width: 50rpx;height: 50rpx;position: absolute;" :style="{'left':item.x + 'rpx','top':item.y + 'rpx'}" v-for="(item,index) in smallDeviceList" :key="item.id" :src="item.deviceStatus == '0'?$url + item.typeNormalImg : $url + item.typeAbnormalImg" mode=""></image>
				</view>
			</view>
			<view v-if="!photoList.length" class="photo">
				<image style="width: 100%;height: 100%;" src="../../../static/img/noNotice.png" mode=""></image>
				<view style="width: 100%;text-align: center;font-size: 35rpx;color: #999999;">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:'1',
				selectText:'筛选',
				sxList:[],
				photoList:[],
				fjId:'',
				smallDeviceList:[]
			}
		},
		onLoad() {
			
		},
		onShow() {
			uni.$on('realtimeMonitor',Obj => {
				
				console.log(Obj,'这个子页面传过来的房间Obj--------------------->')
				this.selectText = Obj.toName
				this.getBySiteSys(Obj.toId)
			})
		},
		methods: {
			// 点击tabbar
			tabbarClick(index) {
				this.currentIndex = index
				if(this.fjId) {
					this.getSdcdevicePage(index)
				}
			},
			//设备详情
			 smallDeviceClick(item) {
				 uni.navigateTo({
				 	url:'./deviceDetails/deviceDetails?info=' + JSON.stringify(item)
				 })
			 },
			 // 点击筛选
			 sxTap() {
				 uni.navigateTo({
				 	url:"./selectRoom/selectRoom"
				 })
			 },
			 // 获取房间
			 getBySiteSys(id) {
				 let params = {
				 	siteId:id
				 }
				this.$http.getBySiteSys(params).then(data => {
					console.log(data,'房间---------------------------->')
					if(data && data.code == 0) {
						if(data.data.length) {
							this.photoList = []
							this.photoList.push(data.data[0].roomInfos[0])
							this.fjId = this.photoList[0].id
							this.getSdcdevicePage('1')
							// data.data.forEach(item => {
							// 	if(item.roomInfos.length) {
							// 		item.roomBFName = item.roomInfos[0].roomBuildingName
							// 	}else {
							// 		item.roomBFName = item.parentName + item.name
							// 	}
							// })
							// this.sxList = data.data
							// this.selectText = this.sxList[0].roomBFName
							// this.photoList = this.sxList[0].roomInfos
							// this.photoList.forEach((item,index) => {
							// 	this.getSdcdevicePage(item.id,index)
							// })
						}
					}
				})
			 },
			 // 获取小设备
			 getSdcdevicePage(code) {
				 let params = {
					 siteId: this.fjId,
					 sysCode:code
				 }
				 this.$http.getSdcdevicePage(params).then(data => {
					 console.log(data,'小设备-------------------->')
					 if(data && data.code == 0) {
						 this.smallDeviceList = []
						 if(data.data.records.length) {
							 this.smallDeviceList = data.data.records
						 }
					 }
				 })
			 }
		}
	}
</script>

<style scoped>
	.realtimeMonitor {
		width: 100%;
		height: 100vh;
		background-color: #f6f5fa;
	}
	
	.tabBarTop {
		width: 100%;
		height: 88rpx;
		display: flex;
	}
	.tabBarTop > view {
		width: 20%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
	
	.selectClass {
		height: 100%;
		display: inline-block;
		line-height: 88rpx;
		color: #737373;
		font-size: 32rpx;
	}
	
	.currentClass {
		color: #177CFE;
		border-bottom: 2px solid #177CFE;
		box-sizing: border-box;
	}
	
	.conttent {
		width: 100%;
		padding: 15rpx;
		box-sizing: border-box;
	}
	
	.sx {
		width: 250rpx;
		height: 60rpx;
		display: inline-block;
		background-image: url('../../../static/img/select.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		text-align: center;
		line-height: 60rpx;
		color: #666666;
		margin-left: 25rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.photo {
		width: 98%;
		height: 500rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}
</style>
