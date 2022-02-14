<template>
	<view class="container">
		<image :src="avatar?avatar:'../../static/images/defaultAvatar.png'"  class="avatarimg" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:''
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			let _this=this;
			uni.showActionSheet({
				  itemList: ['从相册选择', '保存到本地',],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						_this.sheetSec(res.tapIndex);
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
						
				    }
			})
		},
		onShow() {
			this.avatar=uni.getStorageSync('avatar')||'';
		},
		methods: {
			saveHeadImgFile() {
			   const that = this;
			   			uni.downloadFile({
			   				url:this.avatar,
			   				success: res => {
			   					if (res.statusCode === 200) {
			   						uni.saveImageToPhotosAlbum({
			   							filePath: res.tempFilePath,
			   							success: function() {
											uni.showToast({
												title:'保存成功！',
												icon:'none',
												duration:800
											})
			   							},
			   							fail: function() {
											uni.showToast({
												title:'保存失败，请稍后重试！',
												icon:'none',
												duration:800
											})
			   							}
			   						});
			   					} else {
									uni.showToast({
										title:'下载失败！',
										icon:'none',
										duration:800
									})
			   					}
			   				}
			   			});
			},
			sheetSec(index){
				let _this=this;
				if(index=='0'){
					   uni.navigateTo({
					   	url:'./imgcut/imgcut'
					   })
				}else{
					this.saveHeadImgFile();
				}
			}
		}
	}
</script>

<style scoped>
.container{
	height: 100vh;
	background-color: #000000;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.avatarimg{
	width: 100%;height: 100vw;
}
</style>
