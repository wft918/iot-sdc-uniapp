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
						<view class="xz" v-for="(item,index) in yqDataList" :key="item.id" @tap="yqSelectChange(item.id,item.name)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 楼宇 -->
				<u-collapse-item index="1" v-if="lyIsshow" :open="lyOpen">
					<template slot="title">
						<view>楼宇</view>
						<view>{{lyText}}</view>
					</template>
					<view v-if="lyDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in lyDataList" :key="item.id" class="xz" @tap="lySelectChange(item.id,item.name)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 楼层 -->
				<u-collapse-item index="2" v-if="lcIsshow" :open="lcOpen">
					<template slot="title">
						<view>楼层</view>
						<view>{{lcText}}</view>
					</template>
					<view v-if="lcDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in lcDataList" :key="item.id" class="xz" @tap="lcSelectChange(item.id,item.name)">{{item.name}}</view>
					</view>
				</u-collapse-item>
				<!-- 房间号 -->
				<u-collapse-item index="3" v-if="fjIsshow" :open="fjOpen">
					<template slot="title">
						<view>房间号</view>
						<view>{{fjText}}</view>
					</template>
					<view v-if="fjhDataList.length" style="width: 85%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;text-align: center;color: #4A4A4A;font-size: 28rpx;">
						<view v-for="(item,index) in fjhDataList" :key="item.id" :class="{'currentFjcls': toObj.toId == item.id}" class="fj" @tap="fjSelectChange(item.id,item.name)">{{item.name}}</view>
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
				yqText:'--',
				lyText:'--',
				lcText:'--',
				fjText:'--',
				yqOpen:true,
				lyOpen:false,
				lyIsshow:false,
				lcOpen:false,
				lcIsshow:false,
				fjOpen:false, 
				fjIsshow:false,
				yqDataList:[],//园区data
				lyDataList:[],//楼宇data
				lcDataList:[],//楼层data
				fjhDataList:[],//房间号data
				toObj: {
					toId:'',
					toName:''
				}
				
			}
		},
		onShow() {
			this.getTree()
		},
		methods: {
			// 查询房间
			getTree() {
				this.$http.getTree().then(data => {
					console.log(data,'树形结构-------------->')
					if(data && data.data.length) {
						this.yqDataList = data.data
						this.$nextTick(() => {
							this.$refs.collapse.init()
						})
					}
				})
			},
			collapseChange(index) {
				console.log(index)
			},
			// 选择一个园区
			yqSelectChange(...data) {
				this.lcOpen =false
				this.fjOpen = false
				this.lcIsshow =false
				this.fjIsshow = false
				this.lyIsshow = true
				this.lyOpen = true
				this.yqOpen = false
				this.percent = 25
				this.lyDataList = this.yqDataList.filter(item => item.id == data[0])[0].children
				this.yqText = data[1]
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择一个楼宇
			lySelectChange(...data) {
				this.fjOpen = false
				this.fjIsshow = false
				this.lcIsshow = true
				this.lcOpen = true
				this.lyOpen = false
				this.percent = 50
				this.lcDataList = this.lyDataList.filter(item => item.id == data[0])[0].children
				this.lyText = data[1]
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择一个楼层
			lcSelectChange(...data) {
				this.fjIsshow = true
				this.fjOpen = true
				this.lcOpen = false
				this.percent = 75
				this.fjhDataList = this.lcDataList.filter(item => item.id == data[0])[0].children
				this.lcText = data[1]
				this.$nextTick(() => {
					this.$refs.collapse.init()
				})
			},
			// 选择房间号
			fjSelectChange(id,name) {
				this.percent = 100
				this.toObj.toId = id
				this.toObj.toName = name
				
				console.log(this.toObj,'toObj------------------------------------->')
			},
			
			
			// 筛选返回上个页面
			back() {
				if(!this.toObj.toId) {
					this.$refs.uToast.show({
						title: '请选择一个房间',
						type: 'warning'
					})
					return
				}
				// $emit 触发事件  （携带参数的名称，参数内容）
				uni.$emit('realtimeMonitor',this.toObj)
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
	
	.currentFjcls {
		background-color: #deecff!important;
	}
</style>
