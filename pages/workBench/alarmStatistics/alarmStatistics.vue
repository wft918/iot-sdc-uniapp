<!-- 告警统计 -->
<template>
	<view class="alarmStatistics">
		<!-- 今日告警分析 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>今日告警分析</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);display: flex;">
				<view style="width: 50%;height: 100%;">
					<index-ring-right :ringWidth="20" :value="alarmTotal" :alarmData="alarmData"></index-ring-right>
				</view>
				<view style="width: 50%;height: 100%;display: flex;align-items: center;padding-left: 20rpx;box-sizing: border-box;">
					<view v-if="alarmData.length">
						<view v-for="item in alarmData" :key="item.name" style="margin-bottom: 20rpx;">
							<text style="color: #333333;font-size: 28rpx;">{{item.name}}：</text>
							<text style="color: #18a4fe;font-size: 28rpx;">{{item.value}}</text>
						</view>
						<!-- <view style="margin-top: 20rpx;">
							<text style="color: #333333;font-size: 28rpx;">未处理今日告警：</text>
							<text style="color: #f64505;font-size: 28rpx;">{{noAlarmNum}}</text>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<!-- 仅7天告警条数分析 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>近7天告警条数分析</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<index-bar :yTitle="'条'" :xValue="alarmTsXvalue" :yValue="alarmTsYvalue" :name="'告警条数'"></index-bar>
			</view>
		</view>
		<!-- 机房告警处理TOP 5 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>机房告警处理TOP 5</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<com-bar :nameOne="'已处理'" :nameTwo="'未处理'" :xValue="jfXvalue" :yValueOne="jfYvalueOne" :yValueTwo="jfYvalueTwo" :yTitle="'%'"></com-bar>
			</view>
		</view>
		<!-- 设备告警处理TOP 5 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>设备告警处理TOP 5</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<com-bar :nameOne="'已处理'" :nameTwo="'未处理'" :legend="false" :colorList="['#45b0e4','#b4b0b0']" :xValue="sbXvalue" :yValueOne="sbYvalueOne" :yValueTwo="sbYvalueTwo" :yTitle="'%'"></com-bar>
			</view>
		</view>
		<!-- 今日设备类型占比 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>今日设备类型占比</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<pie :legend="false" :colorList="['#f4b43c','#1cdc95','#2899fb']" :dataList="sblxzbList"></pie>
			</view>
		</view>
		<!-- 今日设备告警等级占比 -->
		<view style="width: 98%;height: 500rpx;border-radius: 10rpx;margin: 0 auto;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view style="width: 99%;height: 88rpx;line-height: 88rpx;margin: 0 auto;border-bottom: 1px solid #e6e6e6;box-sizing: border-box;padding-left: 20rpx;font-size: 32rpx;color: #333333;">
				<text>今日设备告警等级占比</text>
			</view>
			<view style="width: 100%;height: calc(100% - 88rpx);">
				<pie :legend="false" :colorList="['#f4b43c','#fd3d49','#f97534','#299cfb','#299cfb']" :dataList="sbgjdjzbList"></pie>
			</view>
		</view>
	</view>
</template>

<script>
	import indexRingRight from '@/components/index/index-ring-right.vue'
	import indexBar from '@/components/index/index-bar.vue'
	import comBar from '@/components/dataBoard/comprehensiveAnalysis/uchart/comp-bar.vue'
	import pie from '@/components/publicPie/pie.vue'
	export default {
		data() {
			return {
				// 今日告警分析
				alarmTotal:'0',
				alarmData: [],
				// 近七天告警条数分析
				alarmTsXvalue:[],
				alarmTsYvalue:[],
				// 机房告警处理TOP5
				jfXvalue:[],
				jfYvalueOne:[],
				jfYvalueTwo:[],
				// 设备告警处理YOP5
				sbXvalue:[],
				sbYvalueOne:[],
				sbYvalueTwo:[],
				// 今日设备类型占比
				sblxzbList:[],
				// 今日设备告警等级占比
				sbgjdjzbList:[]
			}
		},
		components: {
			indexRingRight,
			indexBar,
			comBar,
			pie
		},
		onShow() {
			this.getYqId()
		},
		methods: {
			//获取园区id
			getYqId() {
				this.$http.getYqId().then(data => {
					console.log(data,'园区id---------->');
					
					if(data && data.data.records.length) {
						this.getAlarmHandleSituationApp(data.data.records[0].id)
						this.getAlarmNum(data.data.records[0].id)
						this.getRoomAlarmDealRank(data.data.records[0].id)
						this.getDeviceAlarmRank(data.data.records[0].id)
						this.getDeviceTypePec(data.data.records[0].id)
						this.getAlarmLevel(data.data.records[0].id)
					}
				})
			},
			// 今日告警分析
			getAlarmHandleSituationApp(id) {
				let params = {
					siteId:id
				}
				this.$http.getAlarmHandleSituationApp(params).then(data => {
					// console.log(data,'今日告警分析——------------------->')
					if(data && data.code == 0) {
						if(data.data && data.data.length) {
							let totalNum = 0
							this.alarmData = []
							data.data.forEach(item => {
								totalNum += item.num
								this.alarmData.push({
									name:item.dealStatusDes,
									value:parseFloat(item.num)
								})
							})
							this.alarmTotal = String(totalNum)
						}
					}
				})
			},
			// 近七天告警条数统计
			getAlarmNum(id) {
				let params = {
					siteId:id
				}
				this.$http.getAlarmNum(params).then(data => {
					console.log(data,'近七天告警条数统计---------------------->')
					if(data && data.code == 0) {
						this.alarmTsXvalue = []
						this.alarmTsYvalue = []
						if(data.data.length) {
							data.data.forEach(item => {
								this.alarmTsXvalue.push(item.label.split('-').slice(1).join('-'))
								this.alarmTsYvalue.push(parseFloat(item.value))
							})
						}
					}
				})
			},
			// 机房告警处理 TOP 5
			getRoomAlarmDealRank(id) {
				let params = {
					siteId:id
				}
				this.$http.getRoomAlarmDealRank(params).then(data => {
					// console.log(data,'机房告警处理 TOP 5--------------------->')
					if(data && data.code == 0) {
						this.jfXvalue = []
						this.jfYvalueOne = []
						this.jfYvalueTwo = []
						if(data.data.length) {
							data.data.forEach(item => {
								this.jfXvalue.push(item.label.split('/')[item.label.split('/').length - 1])
								this.jfYvalueOne.push(parseFloat(item.down))
								this.jfYvalueTwo.push(parseFloat(item.yet))
							})
						}
					}
				})
			},
			// 设备告警处理 TOP 5
			getDeviceAlarmRank(id) {
				let params = {
					siteId:id
				}
				this.$http.getDeviceAlarmRank(params).then(data => {
					// console.log(data,'设备告警处理 TOP 5--------------------->')  
					if(data && data.code == 0) {
						this.sbXvalue = []
						this.sbYvalueOne = []
						this.sbYvalueTwo = []
						if(data.data.length) {
							data.data.forEach(item => {
								this.sbXvalue.push(item.label)
								this.sbYvalueOne.push(parseFloat(item.down))
								this.sbYvalueTwo.push(parseFloat(item.yet))
							})
						}
					}
				})
			},
			// 今日类型占比
			getDeviceTypePec(id) {
				let params = {
					siteId:id
				}
				this.$http.getDeviceTypePec(params).then(data => {
					// console.log(data,'今日类型占比--------------------->')
					if(data && data.code == 0) {
						if(data.data.length) {
							this.sblxzbList = data.data.map(item => ({name:item.label,value:parseFloat(item.value)}))
						}
					}
				})
			},
			// 今日设备告警等级占比
			getAlarmLevel(id) {
				let params = {
					siteId:id
				}
				this.$http.getAlarmLevel(params).then(data => {
					// console.log(data,'今日设备告警等级占比--------------------->')
					if(data && data.code == 0) {
						if(data.data.length) {
							this.sbgjdjzbList = data.data.map(item => ({name:item.label,value:parseFloat(item.value)}))
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.alarmStatistics {
		width: 100%;
		background-color: #f4f6f7;
		padding-top: 15rpx;
		box-sizing: border-box;
	}

</style>
