<!-- 房间筛选 -->
<template>
	<view style="width: 100%;height: 100vh;background-color: #fafafa;">
		<view style="width: 100%;transform: translateY(-10rpx);">
			<u-line-progress :percent="percent" :show-percent="false" :round="false" activeColor="#f8e4ca"></u-line-progress>
		</view>
		<view style="width: 100%;">
			<u-collapse ref="collapse" @change="collapseChange" :arrow="false">
				<!-- 园区 -->
				<u-collapse-item index="0" :open="yqOpen">
					<template slot="title">
						<view>园区</view>
						<view>{{yqText}}</view>
					</template>
					<view v-if="yqDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view class="xz" v-for="(item,index) in yqDataList" :key="item.id" @tap="yqSelectChange(item)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 楼栋 -->
				<u-collapse-item index="1" v-if="ldShow" :open="ldOpen">
					<template slot="title">
						<view>楼栋</view>
						<view>{{ldText}}</view>
					</template>
					<view v-if="ldDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in ldDataList" :key="item.id" class="xz" @tap="ldSelectChange(item)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 楼层 -->
				<u-collapse-item index="2" v-if="lcShow" :open="lcOpen">
					<template slot="title">
						<view>楼层</view>
						<view>{{lcText}}</view>
					</template>
					<view v-if="lcDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in lcDataList" :key="item.id" class="xz" @tap="lcSelectChange(item)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 楼号 -->
				<u-collapse-item index="3" v-if="lhShow" :open="lhOpen">
					<template slot="title">
						<view>楼号</view>
						<view>{{lhText}}</view>
					</template>
					<view v-if="lhDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in lhDataList" :key="item.id" class="xz" @tap="lhSelectChange(item)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 摄像头 -->
				<u-collapse-item index="4" v-if="sxtShow" :open="sxtOpen">
					<template slot="title">
						<view>摄像头</view>
						<view>{{sxtText}}</view>
					</template>
					<view v-if="sxtDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in sxtDataList" :key="item.id" class="fj" :class="{'currentSxtcls':toObj.toId == item.id}" @tap="sxtSelectChange(item)">{{item.name}}</view>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		
		
		<view @tap="back()" style="position: fixed;bottom: 0;width: 100%;height: 100rpx;background-color: #059bf7;color: #FFFFFF;font-size: 30rpx;text-align: center;line-height: 100rpx;">筛选</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				percent:0,
				// 园区
				yqText:'--',
				yqOpen:true,
				yqDataList:[],
				// 楼栋
				ldText:'--',
				ldShow:false,
				ldOpen:false,
				ldDataList:[],
				// 楼层
				lcText:'--',
				lcShow:false,
				lcOpen:false,
				lcDataList:[],
				// 楼号
				lhText:'--',
				lhShow:false,
				lhOpen:false,
				lhDataList:[],
				// 摄像头
				sxtText:'--',
				sxtShow:false,
				sxtOpen:false,
				sxtDataList:[],
				
				toObj: {
					toId:'',
					toName:''
				}
				
			}
		},
		onShow() {
			this.getTreeByTopType()
		},
		methods: {
			// 查询摄像头列表
			getTreeByTopType() {
				this.$http.getTreeByTopType().then(data => {
					console.log(data,'摄像头树形结构-------------->')
					if(data && data.code == 0) {
						if(data.data.length) {
							this.yqDataList = data.data
							this.$nextTick(() => {
								this.$refs.collapse.init()
							})
						}
					}
				})
			},
			collapseChange(index) {
				console.log(index)
			},
			// 选择一个园区
			yqSelectChange(item) {
				this.sxtOpen = false
				this.sxtShow = false
				this.lhOpen = false
				this.lhShow = false
				this.lcOpen = false
				this.lcShow = false
				this.ldShow = true
				this.ldOpen = true
				this.yqOpen = false
				this.percent = 20
				this.ldDataList = item.children
				this.yqText = item.name
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择一个楼栋
			ldSelectChange(item) {
				console.log(item,'楼栋---------------------->')
				this.sxtOpen = false
				this.sxtShow = false
				this.lhOpen = false
				this.lhShow = false
				this.lcShow = true
				this.lcOpen = true
				this.ldOpen = false
				this.percent = 40
				this.lcDataList = item.children
				this.ldText = item.name
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择一个楼层
			lcSelectChange(item) {
				this.sxtOpen = false
				this.sxtShow = false
				this.lhShow = true
				this.lhOpen = true
				this.lcOpen = false
				this.percent = 60
				this.lhDataList = item.children
				this.lcText = item.name
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择一个楼号
			lhSelectChange(item) {
				this.sxtShow = true
				this.sxtOpen = true
				this.lhOpen = false
				this.percent = 80
				this.sxtDataList = item.children
				this.lhText = item.name
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择一个摄像头
			sxtSelectChange(item) {
				this.percent = 100
				this.toObj.toId = item.id
				this.toObj.toName = item.name
				
				console.log(this.toObj,'toObj--------------------------->')
			},
			
			
			// 筛选返回上个页面
			back() {
				if(!this.toObj.toId) {
					this.$refs.uToast.show({
						title: '请选择一个摄像头',
						type: 'warning'
					})
					return
				}
				// $emit 触发事件  （携带参数的名称，参数内容）
				uni.$emit('videoMonitor',this.toObj)
				uni.navigateBack({
					delta:1
				})
			} 
		}
	}
</script>

<style scoped>
	.xz {
		width: 48%;
		height: 96rpx;
		margin-top: 10rpx;
		background-color: #dfe0e1;
		line-height: 96rpx;
	}
	.fj {
		width: 96%;
		height: 96rpx;
		margin-top: 10rpx;
		background-color: #dfe0e1;
		line-height: 96rpx;
	}
	
	.currentSxtcls {
		background-color: #deecff!important;
	}
</style>
