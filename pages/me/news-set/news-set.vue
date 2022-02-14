<template>
	<view class="container">
		<view class="newItem">
			<text>铃声</text>
			  <switch class='swFr' :checked="news[0]" color="#4ca5fe"  @change="switch1Change" />
		</view>
		<view class="newItem">
			<text>震动</text>
			  <switch class='swFr' :checked="news[1]" color="#4ca5fe"  @change="switch2Change" />
		</view>
		<view class="newItem">
			<text>勿扰模式</text>
			  <switch class='swFr' :checked="news[2]" color="#4ca5fe"  @change="switch3Change" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news:[]
			}
		},
		onLoad() {
			this.news=uni.getStorageSync('news');
		},
		methods: {
			switch1Change(e){
				
				if(this.news[0]){
					this.$set(this.news,0,false);
				}else{
					if(this.news[1]||this.news[2]){
						if(this.news[1]&&this.news[2]){
							this.$set(this.news,0,true);
							this.$set(this.news,1,false);
							this.$set(this.news,2,false);
						}else if(this.news[1]&&!this.news[2]){
							this.$set(this.news,0,true);
							this.$set(this.news,1,false);
						}else if(!this.news[1]&&this.news[2]){
							this.$set(this.news,0,true);
							this.$set(this.news,2,false);
						}
					}else{
						this.$set(this.news,0,true);
					}
				}
				uni.setStorageSync('news',this.news);
			},
			switch2Change(e){
			if(this.news[1]){
					this.$set(this.news,1,false);
				}else{
					if(this.news[0]||this.news[2]){
						if(this.news[0]&&this.news[2]){
							this.$set(this.news,1,true);
							this.$set(this.news,0,false);
							this.$set(this.news,2,false);
						}else if(this.news[0]&&!this.news[2]){
							this.$set(this.news,1,true);
							this.$set(this.news,0,false);
						}else if(!this.news[0]&&this.news[2]){
							this.$set(this.news,1,true);
							this.$set(this.news,2,false);
						}
					}else{
						this.$set(this.news,1,true);
						uni.vibrateShort({
						    success: function () {
						        console.log('success');
						    }
						});
					}
				}
				uni.setStorageSync('news',this.news);
			console.log(uni.getStorageSync('news'));
			},
			switch3Change(e){
				if(this.news[2]){
					this.$set(this.news,2,false);
				}else{
					if(this.news[0]){
						this.$set(this.news,0,false);
					}
					if(this.news[1]){
						this.$set(this.news,1,false);
					}
					this.$set(this.news,2,true);
				}
				uni.setStorageSync('news',this.news);
				console.log(uni.getStorageSync('news'));
			},
			msg_remind(type)
				{
					if(type=='vibrate')
					{
						//震动
						plus.device.vibrate(500);
					}
					else
					{
						//声音
						let main = plus.android.runtimeMainActivity();
						let RingtoneManager = plus.android.importClass("android.media.RingtoneManager");
						let uri = RingtoneManager.getActualDefaultRingtoneUri(main, RingtoneManager.TYPE_NOTIFICATION);  
						let MediaPlayer = plus.android.importClass("android.media.MediaPlayer");  
						let player = MediaPlayer.create(main, uri);  
						player.setLooping(false);  
						player.prepare();  
						player.start();
					}
					
				},
			openSettings() {
			   uni.getSystemInfo({  
			    success(res) {  
			     if(res.platform == 'ios'){
			      plus.runtime.openURL("app-settings://");
			     } else if (res.platform == 'android'){
			      var main = plus.android.runtimeMainActivity();  
			      var Intent = plus.android.importClass("android.content.Intent");
			      var mIntent = new Intent('android.settings.SOUND_SETTINGS');
			      main.startActivity(mIntent);
			     }
			    }
			   });
		}
		}
	}
</script>

<style scoped lang="scss">
.container{
	min-height: 100vh;
	background-color: $colwhite;
}
.newItem{
	width: 702rpx;
	height: 130rpx;
	line-height: 130rpx;
	color: $colsix3;
	border-bottom: 1rpx solid $coltf2;
	margin: 0 auto;
}
.swFr{
	float: right;
	transform: scale(0.8,0.8);
}
</style>
