<!-- 数据看板 -->
<template>
	<view class="container">
		<!-- tab切换 -->
		<view class="tab">
			<view>
				<view @tap="tabClick(1)" :class="['subtitle',{'selectSubtitle':currentIndex == 1}]">综合分析</view>
			</view>
			<view>
				<view @tap="tabClick(2)" :class="['subtitle',{'selectSubtitle':currentIndex == 2}]">能耗数据</view>
			</view>
			<view>
				<view @tap="tabClick(3)" :class="['subtitle',{'selectSubtitle':currentIndex == 3}]">动环数据</view>
			</view>
		</view>
		<view class="dataContent">
			<!-- 综合分析 -->
			<comprehensive-analysis @faChang1="faChang1" v-if="currentIndex === 1" :faList="faList" :sbObj="sbObj" :nhObj="nhObj" :gjObj="gjObj" :xcObj="xcObj" :jfsb="jfsb" :sjzxObjLeft="sjzxObjLeft" :sjzxObjRight="sjzxObjRight" :nhsjObj="nhsjObj"></comprehensive-analysis>
			<!-- 能耗数据 -->
			<energy-consumption @faChange2="faChange2" v-if="currentIndex === 2" :pueList="pueList" :ConsumeInWeekList="ConsumeInWeekList" :itPercent="itPercent" :itTotal="itTotal" :itData="itData" :pue="pue" :pueDataList="pueDataList" :faList="faList"></energy-consumption>
			<!-- 动环数据 -->
			<moving-ring v-if="currentIndex === 3" :online="online" :offline="offline" :total="total" :alarm="alarm" :deviceData="deviceData" :deviceTypeData="deviceTypeData" :trendObj="trendObj" :rankData="rankDataList"></moving-ring>
		</view>
	</view>
</template>

<script>
	import comprehensiveAnalysis from '@/components/dataBoard/comprehensiveAnalysis/comprehensiveAnalysis.vue'
	import energyConsumption from '@/components/dataBoard/energyConsumption/energyConsumption.vue'
	import movingRing from '@/components/dataBoard/movingRing/movingRing.vue'
	export default {
		data() {
			return {
				currentIndex:1,
				faList:[],//方案数据
				// 综合分析
				sbObj: {
					num:'0',
					percent:'0%'
				},
				nhObj: {
					total:'0',
					pueNum:'0'
				},
				gjObj: {
					dayNum:'0',
					weekNum:'0'
				},
				xcObj: {
					num1:'0',
					num2:'0'
				},
				jfsb: {
					xValue:[],
					yValueOne:[],
					yValueTwo:[]
				},
				sjzxObjLeft:{},
				sjzxObjRight:{},
				nhsjObj:{},
				// 动环
				online:0,
				offline:0,
				alarm:0,
				total:0,
				deviceData:[],
				deviceTypeData:[],//设备类型统计
				trendObj:{},
				rankDataList:[],
				// 能耗
				itPercent:'0%',
				itTotal:0,
				itData:[],
				pue:'0',
				pueDataList:[],
				pueList:[],
				ConsumeInWeekList:{},//各项设备周能耗
				
			}
		},
		components: {
			comprehensiveAnalysis,
			energyConsumption,
			movingRing
		},
		onLoad() {
			console.log('页面首次加载--->')
		},
		onShow() {
			this.currentIndex = 1
			this.getYqId()
			console.log('页面显示--->')
		},
		onHide() {
			console.log('页面隐藏--->')
		},
		methods: {
			tabClick(index) {
				this.currentIndex = index
				this.getYqId()
				// if(index == 1) {//综合分析
					
				// }else if(index == 2) {//能耗数据
				
					
				// }else if(index == 3) {//动环数据
					
				// }
			},
			//获取园区id
			getYqId() {
				this.$http.getYqId().then(data => {
					console.log(data,'园区id---------->')
					if(data && data.data.records.length) {
						if(this.currentIndex == 1) {
							this.getDeviceStatistic(data.data.records[0].id) //设备统计
							this.getAlarmStatistic(data.data.records[0].id) //告警统计
							this.getInspectStatisticApp(data.data.records[0].id)
							this.getRoomDeviceOnlineRank(data.data.records[0].id) //各机房设备在线率
							this.getSjzxLeft(data.data.records[0].id) //数据中心告警统计
							this.getSjzxRight(data.data.records[0].id) //数据中心告警统计
							this.getPowerDataStatistic(data.data.records[0].id) //能耗数据统计
							this.getConfig(data.data.records[0].id)
						}else if(this.currentIndex == 2) {
							this.getConfig(data.data.records[0].id)
							this.getPueRank(data.data.records[0].id)
						}else if(this.currentIndex == 3) {
							this.getDeviceStatusStatistic(data.data.records[0].id)
							this.getDeviceTypeStatisticApp(data.data.records[0].id)
							this.getRoomAlarmNumRank(data.data.records[0].id)
							this.getAlarmTrend(data.data.records[0].id)
						}
						
					}
				})
			},
			//  ------------------------------------------综合分析----------------------------------
			// 选择方案
			faChang1(id) {
				// console.log(id,'方案id------------------------------>')
				this.getPowerStatistic(id)
			},
			// 设备统计
			getDeviceStatistic(id) {
				let params = {
					siteId:id
				}
				this.$http.getDeviceStatistic(params).then(data => {
					// console.log(data,'设备统计------------------------------------------------------>')
					if(data) {
						this.sbObj.num = data.data.deviceNum || 0
						this.sbObj.percent = data.data.onlinePercent + '%'
					}
				})
			},
			// 能耗统计
			getPowerStatistic(planId) {
				let params = {
					planId:planId
				}
				this.nhObj.total = 0
				this.pueNum = 0
				this.$http.getPowerStatistic(params).then(data => {
					// console.log(data,'能耗统计-------------------------->')
					if(data) {
						this.nhObj.total = data.data.total || 0
						this.nhObj.pueNum = data.data.pue || 0
					}
				})
			},
			// 告警统计
			getAlarmStatistic(id) {
				let params = {
					siteId:id
				}
				this.$http.getAlarmStatistic(params).then(data => {
					// console.log(data,'告警统计------------------------------>')
					if(data) {
						this.gjObj.dayNum = data.data.todayAlarmNum || 0
						this.gjObj.weekNum = data.data.weekAlarmNum || 0
					}
				})
			},
			// 巡查统计
			getInspectStatisticApp(id) {
				let params = {
					siteId:id
				}
				this.$http.getInspectStatisticApp(params).then(data => {
					// console.log(data,'巡查统计------------------------------>')
					if(data) {
						this.xcObj.num1 = data.data.planNum || 0
						this.xcObj.num2 = data.data.problemNum || 0
					}
				})
			},
			// 各机房设备在线率
			getRoomDeviceOnlineRank(id) {
				let params = {
					siteId:id
				}
				this.$http.getRoomDeviceOnlineRank(params).then(data => {
					// console.log(data,'各机房设备在线率------------------------------>')
					if(data) {
						this.jfsb = {
							xValue:[],
							yValueOne:[],
							yValueTwo:[]
						}
						data.data.forEach(item => {
							this.jfsb.xValue.push(item.label)
							this.jfsb.yValueOne.push(parseFloat(item.value))
							this.jfsb.yValueTwo.push(0)
						})
					}
				})
			},
			// 数据中心告警统计
			getSjzxLeft(id) {
				let params = {
					siteId:id
				}
				this.$http.getSjzxLeft(params).then(data => {
					// console.log(data,'数据中心告警统计--左------------------------------>')
					if(data) {
						this.sjzxObjLeft = data.data
					}
				})
			},
			// 数据中心告警统计
			getSjzxRight(id) {
				let params = {
					siteId:id
				}
				this.$http.getSjzxRight(params).then(data => {
					// console.log(data,'数据中心告警统计--右------------------------------>')
					if(data) {
						this.sjzxObjRight = data.data
					}
				})
			},
			// 能耗数据统计
			getPowerDataStatistic(id) {
				let params = {
					siteId:id
				}
				this.$http.getPowerDataStatistic(params).then(data => {
					// console.log(data,'能耗数据统计------------------------------>')
					if(data) {
						this.nhsjObj = data.data
					}
				})
			},
			
			
			// 方案  ------------------------------------------能耗----------------------------------
			getConfig(id) {
				let params = {
					siteId:id
				}
				this.$http.getConfig(params).then(data => {
					// console.log(data,'方案------------------>')
					this.faList = data.data
					if(this.currentIndex == 1) {
						this.getPowerStatistic(data.data[1].id)//能耗统计
					}else if(this.currentIndex == 2) {
						// this.getPueRank(data.data[1].id)
						this.getPueAndConsume(data.data[1].id)
						this.getConsumeInWeek(data.data[1].id)
					}else if(this.currentIndex == 3) {
						
					}
				})
			}, 
			// 选择方案
			faChange2(planId) {
				// console.log(planId,'planId--------------------------->')
				// this.getPueRank(planId)
				this.getPueAndConsume(planId)
				this.getConsumeInWeek(planId)
			},
			// 获取园区pue
			getPueAndConsume(id) {
				let params = {
					planId:id
				}
				this.$http.getPueAndConsume(params).then(data => {
					// console.log(data,'园区pue---------------->')
					if(data) {
						// 用电
						this.itPercent = data.data.itPercent + '%'
						this.itTotal = data.data.total
						this.itData = [{
							name:'能耗',
							value:parseFloat(data.data.it)
						},{
							name:'其他',
							value:parseFloat(data.data.other)
						}]
						// pue
						this.pue = String(data.data.pue)
						this.pueDataList = [{
							name:'pue',
							value:parseFloat(data.data.pue)
						},{
							name:'其他',
							value:3
						}]
					}
				})
			},
			// 各项设备周能耗
			getConsumeInWeek(id) {
				let params = {
					planId:id
				}
				this.$http.getConsumeInWeek(params).then(data => {
					// console.log(data,'各项设备周能耗--------------------->')
					if(data) {
						this.ConsumeInWeekList = data.data
					}
				})
			},
			// 当前pue排行
			getPueRank(id) {
				let params = {
					siteId:id
				}
				this.$http.getPueRank(params).then(data => {
					console.log(data,'当前pue排行--------------->') 
					if(data && data.data.length) {
						let sign = data.data[0].value + 1
						let pList = []
						data.data.forEach(item => {
							pList.push({
								label:item.label,
								value:Number(parseInt((item.value/sign) * 100).toFixed(0)),
								dataValue:item.value,
								id:item.id
							})
						})
						this.pueList = pList
					}
				}) 
			},
			// ---------------------------------------动环----------------------------------
			// 设备运行状态监视
			getDeviceStatusStatistic(id) {
				let params = {
					siteId:id
				}
				// this.isShow = false
				this.$http.getDeviceStatusStatistic(params).then(data => {
					// console.log(data,  '设备运行状态监视---------------------->')
					if(data.data) {
						// this.$nextTick(() => {
							this.online = data.data.online
							this.offline = data.data.offline
							this.alarm = data.data.alarm
							this.total = parseFloat(data.data.all)
							this.deviceData = [
								{
									name:'在线',
									value:parseFloat(data.data.online)
								},
								{
									name:'离线',
									value:parseFloat(data.data.offline)
								},
								{
									name:'告警',
									value:parseFloat(data.data.alarm)
								}
							]
						// })
					}
				})
			},
			// 设备类型统计
			getDeviceTypeStatisticApp(id) {
				let params = {
					siteId:id
				}
				this.$http.getDeviceTypeStatisticApp(params).then(data => {
					// console.log(data,'设备类型统计------------------------>')
					if(data && data.data.length) {
						this.deviceTypeData = data.data
					}
				})
			},
			// 近7日机房告警数量排行
			getRoomAlarmNumRank(id) { 
				let params = {
					siteId:id
				}
				this.$http.getRoomAlarmNumRank(params).then(data => {
					console.log(data,'近7日机房告警数量排行------------------------>')
					if(data && data.data.length) {
						let rankData = []
						let sign = parseInt(data.data[0].value) + 10
						data.data.forEach(item => {
							rankData.push({
								id:item.id,
								label:item.label.split('/')[item.label.split('/').length - 1],
								dataValue:parseInt(item.value),
								value:Number(((item.value / sign) * 100).toFixed(0))
							})
						})
						this.rankDataList = rankData
					}
				})
			},
			// 近7日机房告警数量趋势
			getAlarmTrend(id) { 
				let params = {
					siteId:id
				}
				this.$http.getAlarmTrend(params).then(data => {
					// console.log(data,'近7日机房告警数量趋势------------------------>')
					if(data) {
						this.trendObj = data.data
					}
				})
			}
		}
	}
</script>

<style scoped>
.container{
	width: 750rpx;
	height: 100vh;
	background-color: #f3f5f6!important;
	padding-top: 88rpx;
}
.tab {
	position: fixed;
	top: 0;
	width: 100%;
	height: 88rpx;
	background-color: #f3f5f6;
	display: flex;
	z-index: 99;
}
.tab > view {
	width: calc(100%/3);
	height: 100%;
	line-height: 88rpx;
	display: flex;
	justify-content: center;
}
.subtitle {
	height: 100%;
	font-size: 32rpx;
	color: #999999;
}
.selectSubtitle {
	color: #177CFE;
	border-bottom: 2px solid #177CFE;
}
.dataContent {
	width: 100%;
}
</style>
