<!-- 视频监控 -->
<template>
	<view class="videoMonitor">
		<view style="width: 100%;height: 100rpx;position: relative;line-height: 100rpx;margin-bottom: 15rpx;">
			<text style="color: #333333;font-size: 28rpx;">{{cameraName}}</text>
			<view @tap="selectVideo" class="sx">筛选</view>
		</view>
		<view class="video">
			<video :src="videoUrl" style="width: 100%;height: 100%;" type="video/mp4" :show-mute-btn="true" :autoplay="true" :loop="true" :muted="true" :controls="true" :page-gesture="true"></video>
			<!-- <iframe style="width: 100%;height: 100%;" :src="iframeUrl" frameborder="0"></iframe> -->
		</view>
		<!-- <view class="transfer">
			<view class="hf kz">
				<image @tap="hfShow = !hfShow" style="width: 40rpx;height: 40rpx;" :src="hfShow?'../../../static/img/hf.png':'../../../static/img/hf1.png'" mode=""></image>
			</view>
			<view class="jk kz">
				<image @tap="jkShow = !jkShow" style="width: 71rpx;height: 40rpx;" :src="jkShow?'../../../static/img/jk.png':'../../../static/img/jk1.png'" mode=""></image>
			</view>
			<view class="zd kz">
				<image @tap="zdShow = !zdShow" style="width: 71rpx;height: 40rpx;" :src="zdShow?'../../../static/img/zd.png':'../../../static/img/zd1.png'" mode=""></image>
			</view>
			<view class="gq kz">
				<image @tap="gqShow = !gqShow" style="width: 71rpx;height: 40rpx;" :src="gqShow?'../../../static/img/gq.png':'../../../static/img/gq1.png'" mode=""></image>
			</view>
			<view class="qp kz">
				<image @tap="qpShow = !qpShow" style="width: 40rpx;height: 40rpx;" :src="qpShow?'../../../static/img/qp.png':'../../../static/img/qp1.png'" mode=""></image>
			</view>
		</view> -->
		
		
		
		<!-- 云台控制 ------  暂时注掉--  勿删！！ -->
		<<!-- view style="width: 500rpx;height: 500rpx;border-radius: 50%;background-color: #f0f0f0;margin: 0 auto;position: relative;">
			<image @touchstart="ptzCamera('up')" @touchend="ptzCamera('stop')" src="../../../static/img/ss.png" style="position: absolute;left: 50%;top: 80rpx;transform: translateX(-50%);width: 60rpx;height: 36rpx;" mode=""></image>
			<image @touchstart="ptzCamera('down')" @touchend="ptzCamera('stop')" src="../../../static/img/xx.png" style="position: absolute;left: 50%;bottom: 80rpx;transform: translateX(-50%);width: 60rpx;height: 36rpx;" mode=""></image>
			<image @touchstart="ptzCamera('left')" @touchend="ptzCamera('stop')" src="../../../static/img/zz.png" style="position: absolute;left: 80rpx;top: 50%;transform: translateY(-50%);width: 36rpx;height: 60rpx;" mode=""></image>
			<image @touchstart="ptzCamera('right')" @touchend="ptzCamera('stop')" src="../../../static/img/yy.png" style="position: absolute;right: 80rpx;top: 50%;transform: translateY(-50%);width: 36rpx;height: 60rpx;" mode=""></image>
			<image src="../../../static/img/zhongxin.png" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 85rpx;height: 85rpx;" mode=""></image>
		</view> -->
		
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8',
				// videoUrl:'http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8'
				hfShow:false,
				jkShow:false,
				zdShow:false,
				gqShow:false,
				qpShow:false,
				cameraName:'右侧先筛选一个摄像头',//筛选的摄像头名称
				cameraId:'',   //筛选的摄像头id
				deviceInfo:{}, //设备信息
				controSpeed:30  //控制速度
				// iframeUrl:'http://80.grd2b7e7.puyjim0a.05a41e.grapps.cn/'
			}
		},
		onLoad() {

		},
		onShow() {
			uni.$on('videoMonitor',Obj => {
				// console.log(Obj,'这个子页面传过来的摄像头Obj--------------------->')
				this.cameraName = Obj.toName
				this.cameraId = Obj.toId
				this.getSdcdevicePage()
			})
		},
		methods: {
			// 筛选
			selectVideo() {
				uni.navigateTo({
					url:"./selectCamera/selectCamera"
				})
			},
			// // 控制
			// control(flag) {
			// },
			// 根据摄像头id获取devicechannel和channel
			getSdcdevicePage() {
				let params = {
					id:this.cameraId
				}
				this.$http.getSdcdevicePage(params).then(data => {
					// console.log(data,'根据摄像头id获取的设备信息----------------------->')
					if(data && data.code == 0) {
						this.deviceInfo = data.data.records[0]
						if(this.deviceInfo.videoSourceType == '1') { //国标摄像头
							this.playVideo()
						}else {  //拉流
							this.getPullFlow()
						}
					}
				})
			},
			// 开始播放
			playVideo() {
				new Promise((resolve,reject) => {
					uni.request({
						url:this.$videoUrl + ':18080/api/play/start/' + this.deviceInfo.devicechannel + '/' + this.deviceInfo.channel,
						// url:this.$videoUrl + ':18080/api/play/start/44010200491180000001/34020000001320000016',
						method:'GET',
						success: (res) => {
							resolve(res.data)
						},
						error: (err) => {
							reject(err)
						}
					})
				}).then(data => {
					// console.log(data,'播放视频------------------------------------>')
					if(data && data.code == 0) {
						if(data.data) {
							this.videoUrl = data.data.flv
							// this.iframeUrl = 'http://192.168.67.13:18080/#/play/wasm/' + encodeURIComponent('ws://192.168.67.13:18080/rtp/' + this.deviceInfo.devicechannel + '_' + this.deviceInfo.channel + '.flv')
						}
					}
				})
			},
			// 开始播放  拉流
			getPullFlow() {
				this.videoUrl = `${this.$videoUrl}:8080/${this.deviceInfo.streamApp}/${this.deviceInfo.streamId}.live.mp4`
			},
			
			// 云台控制
			ptzCamera(command) {
				if(!this.cameraId) {
					this.$refs.uToast.show({
						title: '请先选择一个摄像头',
						type: 'warning '
					})
					return
				}
				if(this.deviceInfo.expand.appearanceType != '1') {
					this.$refs.uToast.show({
						title: '只有球机可使用云台控制,请确认摄像头类型!',
						type: 'warning '
					})
					return
				}
				new Promise((resolve,reject) => {
					uni.request({
						// url:this.$videoUrl +  '/api/ptz/control/' + this.deviceInfo.devicechannel + '/' + this.deviceInfo.channel + '?command=' + command + '&horizonSpeed=' + this.controSpeed + '&verticalSpeed=' + this.controSpeed + '&zoomSpeed=' + this.controSpeed,
						url:this.$videoUrl +  '/api/ptz/control/' + '44010200491180000001' + '/' + '34020000001320000016' + '?command=' + command + '&horizonSpeed=' + this.controSpeed + '&verticalSpeed=' + this.controSpeed + '&zoomSpeed=' + this.controSpeed,
						method:'POST',
						success:(res) => {
							resolve(res)
						},
						error:(err) => {
							reject(err)
						}
					})
				}).then(res => {})
			},
			
			
		}
	}
</script>

<style scoped>
	.videoMonitor {
		width: 100%;
		height: 100vh;
		background-color: #fafafa;
		padding: 15rpx;
		box-sizing: border-box;
	}

	.sx {
		background-image: url('../../../static/img/select.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 17%;
		height: 65%;
		position: absolute;
		top: 50%;
		right: 10rpx;
		transform: translateY(-50%);
		background-color: #dfe0e1;
		text-align: center;
		line-height: 65rpx;
		color: #666666;
		border-radius: 10rpx;
	}

	.video {
		width: 100%;
		height: 500rpx;
		margin-bottom: 10rpx;
	}

	.transfer {
		width: 100%;
		height: 50rpx;
		display: flex;
		margin-bottom: 20rpx;
	}

	.kz {
		width: 25%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.kz>image {
		display: block;
	}
</style>
