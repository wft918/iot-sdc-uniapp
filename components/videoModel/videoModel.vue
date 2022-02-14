<!-- 视频组件 -->
<template>
	<view style="width: 100%;height: 100%;">
		<video :id="id" style="width: 100%;height: 100%;" class="video-js vjs-default-skin" preload="auto">
			<source :src="url" type="application/x-mpegURL">
		</video>
	</view>
</template>

<script>
	import videojs from 'video.js'
	// import 'videojs-contrib-hls'
	// import "@videojs/http-streaming"
	export default {
		data() {
			return {
				player:null,
			}
		},
		props: {
			id: {
				type:String,
			},
			url: {
				type:String,
				default: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8'
			}
		},
		watch: {
			url() {
				this.init()
			}
		},
		
		onShow() {
			this.init()
		},
		methods: {
			init() {
				// 播放器初始化
				this.$nextTick(() => {
					this.player = videojs(this.id, {
						bigPlayButton: false,
						textTrackDisplay: false,
						posterImage: false,
						errorDisplay: false,
						controlBar: { //总控制条
							//这里可以自己控制各小组件的顺序和显示方式
							children: [{
									name: 'playToggle'
								}, // 播放按钮
								{
									name: 'currentTimeDisplay'
								}, // 当前已播放时间
								{
									name: 'progressControl'
								}, // 播放进度条
								{
									name: 'durationDisplay'
								}, // 总时间
								{
									name: 'audioTrackButton'
								},
								{ // 倍数播放
									name: 'playbackRateMenuButton',
									'playbackRates': [0.5, 1, 1.5, 2, 2.5]
								},
								{
									name: 'volumePanel', // 音量控制
									// inline: false, // 不使用水平方式
								},
							],
							PictureInPictureToggle: true, //画中画
							FullscreenToggle: true // 全屏
						},
						controls: true, //是否显示控件
						loop: true, //循环播放
						muted: true //静音模式 、、 解决首次页面加载播放。
					}, function() {
						this.play() // 自动播放
					})
				})
			}
		}
	}
</script>

<style scoped>
	@import url("video.js/dist/video-js.css");
</style>
