<!-- 告警信息 -->
<template>
	<view class="alarmMsg">
		<!-- 顶部 -->
		<view style="width: 100%;height: 220rpx;position: fixed;top: 0;background-color: #f2f5f7;z-index: 99;">
			<view style="width: 100%;height: 120rpx;display: flex;background-color: #FFFFFF;">
				<view style="width: 50%;height: 100%;color: #333333;font-size: 30rpx;display: flex;justify-content: center;align-items: center;">
					<view style="text-align: center;" @tap="handleData('no')">
						<view style="color: #333333;font-size: 30rpx;">未处理（条）</view>
						<view style="color: #FF0909;font-size: 32rpx;">{{noHandleNum}}</view>
					</view>
				</view>
				<view style="width: 50%;height: 100%;color: #333333;font-size: 30rpx;display: flex;justify-content: center;align-items: center;">
					<view style="text-align: center;" @tap="handleData('yes')">
						<view style="color: #333333;font-size: 30rpx;">已处理（条）</view>
						<view style="color: #0CB046;font-size: 32rpx;">{{handleNum}}</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 100rpx;display: flex;justify-content: space-around;align-items: center;">
				<view @tap="dayClick(index)" :class="{'currentClass': currentIndex == index}" v-for="(item,index) in dayList" :key="item.value" style="width: 17%;height: 65%;background-color: #dfe0e1;text-align: center;line-height: 65rpx;color: #666666;border-radius: 10rpx;">{{item.label}}</view>
				<view @tap="selectRoom" class="sx" style="width: 17%;height: 65%;background-color: #dfe0e1;text-align: center;line-height: 65rpx;color: #666666;border-radius: 10rpx;">房间</view>
			</view>
		</view>
		
		<view v-for="(item,index) in renderAlarmMsgData" :key="item.id" style="width: 100%;height: 350rpx;background-color: #FFFFFF;margin-bottom: 15rpx;">
			<view @tap="deviceDetails(item)" class="txtSelect" style="width: 100%;height: 80rpx;border-bottom: 1px solid #ebf2f7;box-sizing: border-box;position: relative;line-height: 80rpx;">
				<text style="color: #333333;font-size: 32rpx;font-weight: 600;margin-left: 20rpx;">{{item.deviceName}}</text>
				<image src="../../../static/img/newsR.png"
					style="position: absolute;right: 30rpx;top: 50%;transform: translateY(-50%);width: 20rpx;height: 30rpx;">
				</image>
			</view>
			<view style="width: 100%;height: calc(100% - 80rpx);color: #4D4D4D;padding: 15rpx 0 0 30rpx;box-sizing: border-box;">
				<view style="margin-top: 15rpx;width: 100%;">
					<text>报警分类：</text>
					<text>{{item.alarmTypeDesc}}</text>
				</view>
				<view style="margin-top: 15rpx;width: 100%;">
					<text>报警级别：</text>
					<text>{{$dictUtils.getDictLabel('alarm_level',item.alarmLevel)}}</text>
				</view>
				<view style="margin-top: 15rpx;width: 100%;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
					<text>设备位置：</text>
					<text>{{item.siteName}}</text>
				</view>
				<view style="margin-top: 15rpx;width: 100%;">
					<text>报警时间：</text>
					<text>{{item.alarmTime}}</text>
				</view>
				<view style="margin-top: 15rpx;width: 100%;">
					<text>处理状态：</text>
					<text>{{$dictUtils.getDictLabel('tele_alarm_deal_status',item.dealStatus)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dayList:[
					{
						label:'今日',
						value:'0'
					},
					{
						label:'7天',
						value:'1'
					},
					{
						label:'15天',
						value:'2'
					},
					{
						label:'全部',
						value:'3'
					}
				],
				currentIndex:0,
				handleNum:0, //已处理
				noHandleNum:0,//未处理
				alarmMsgData:[],//所有告警消息
				renderAlarmMsgData:[], //渲染的告警消息
				queryId:'',
				managerUsers:''//告警通知人
			}
		},
		onLoad() {
			this.getYqId()  //告警信息查询
		},
		onShow() {
			// $on 监听事件
			uni.$on('addressList',id => {
				// console.log(id,'这个子页面传过来的房间id--------------------->')
				this.queryId = id
				if(this.currentIndex == 0) {
					this.getSdcsimulatoralarmPage(this.queryId,this.get_date(0))
				}else if(this.currentIndex == 1) {
					this.getSdcsimulatoralarmPage(this.queryId,this.get_date(-7))
				}else if(this.currentIndex == 2) {
					this.getSdcsimulatoralarmPage(this.queryId,this.get_date(-15))
				}else if(this.currentIndex == 3) {
					this.getSdcsimulatoralarmPage(this.queryId,'')
				}
			})
		},
		methods: {
			//获取园区id
			getYqId() {
				this.$http.getYqId().then(data => {
					console.log(data,'园区id---------->')
					if(data && data.data.records.length) {
						this.queryId = data.data.records[0].id
						this.managerUsers = data.data.records[0].managerUsers
						this.getSdcsimulatoralarmPage(this.queryId,this.get_date(0))
					}
				})
			},
			// 告警信息查询
			getSdcsimulatoralarmPage(id,startTime) {
				if(startTime) {
					startTime = startTime + ' ' + '00:00:00'
				}
				let params = {
					siteId:id,
					startTime:startTime
				}
				this.$http.getSdcsimulatoralarmPage(params).then(data => {
					// console.log(data,'告警信息----------------------------->')
					if(data && data.data.records.length) {
						this.alarmMsgData = data.data.records
						this.renderAlarmMsgData = data.data.records
						this.handleNum = this.alarmMsgData.filter(item => item.dealStatus == 1).length  //已处理
						this.noHandleNum = this.alarmMsgData.filter(item => item.dealStatus == 0).length  // 未处理
					}else {
						this.alarmMsgData = []
						this.renderAlarmMsgData = []
						this.handleNum = 0
						this.noHandleNum = 0
					}
				})
			},
			
			// 点击已处理  未处理
			handleData(flag) {
				if(flag == 'no') {
					this.renderAlarmMsgData = this.alarmMsgData.filter(item => item.dealStatus == 0)
				}else if(flag == 'yes') {
					this.renderAlarmMsgData = this.alarmMsgData.filter(item => item.dealStatus == 1)
				}
			},
			
			
			// 选择天数
			dayClick(index) {
				this.currentIndex = index
				if(this.currentIndex == 0) {
					this.getSdcsimulatoralarmPage(this.queryId,this.get_date(0))
				}else if(this.currentIndex == 1) {
					this.getSdcsimulatoralarmPage(this.queryId,this.get_date(-7))
				}else if(this.currentIndex == 2) {
					this.getSdcsimulatoralarmPage(this.queryId,this.get_date(-15))
				}else if(this.currentIndex == 3) {
					this.getSdcsimulatoralarmPage(this.queryId,'')
				}
			},
			// 房间筛选
			selectRoom() {
				uni.navigateTo({
					url:'selectRoom/selectRoom'
				})
			},
			// 详情
			deviceDetails(msg) {
				msg.managerUsers = this.managerUsers
				msg = JSON.stringify(msg)
				uni.navigateTo({
					url:'deviceDetails/deviceDetails?msg=' + msg
				})
			},
			
			
			/**
			 * 获取指定时间的日期
			 * @params 正是今天之后的日期、负是今天前的日期
			 * @return 2020-08-22
			 * */
			get_date(num) {
			  var date1 = new Date();
			  //今天时间
			  var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
			  var date2 = new Date(date1);
			  date2.setDate(date1.getDate() + num);
			  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
			  var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
			  return time2;
			},
			addZero(num){//补0
				if(parseInt(num) < 10){
					num = '0'+num;
				}
				return num;
			},
			  
		}
	}
</script>

<style scoped>
.alarmMsg {
	width: 100%;
	height: 100vh;
	background-color: #f2f5f7;
	padding-top: 220rpx;
	box-sizing: border-box;
}
.sx {
	background-image: url('../../../static/img/select.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.txtSelect:active {
	background-color: #f5f7fa;
	box-shadow: 0 0 20rpx 6rpx rgba(255, 255, 255, 0.4);
}

.currentClass {
	background-color: #deecff!important;
}
</style>
