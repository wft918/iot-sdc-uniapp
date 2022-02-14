<template>
	<view class="container">
		<okingtz-cropper style="padding-top: 80rpx;" @uploadSuccess="uploadSuccess" :image="img"
			saveButtonBackgroundColor="#07c160" selectButtonBackgroundColor="#159efc"></okingtz-cropper>

	</view>
</template>

<script>
	import OkingtzCropper from '@/uni_modules/okingtz-cropper/components/okingtz-cropper/okingtz-cropper'
	export default {
		data() {
			return {
				img: '/static/testavatar.jpg',
				calcimg: '',
				sec: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.img = uni.getStorageSync('avatar') || '';
		},
		components: {
			OkingtzCropper
		},
		methods: {
			// 3.定义自己的回调函数
			uploadSuccess(tempFilePath) {
				let _self = this;
				console.log('tempFilePath_->', tempFilePath)
				let url = uni.getStorageSync('url') + '/admin/sys-file/upload';
				console.log(url);
				var token = "Bearer " + uni.getStorageSync('ACCESS_TOKEN');
				uni.uploadFile({
					url: url,
					filePath: tempFilePath,
					name: 'file',
					header: {
						'content-type': 'multipart/form-data;',
						'Authorization': token
					},
					success: function(uploadFileRes) {
						console.log(JSON.parse(uploadFileRes.data));
						if (uploadFileRes.statusCode == '200' && JSON.parse(uploadFileRes.data).code === 0) {
							_self.arvtarSub(JSON.parse(uploadFileRes.data));

						}
					}
				});
			},
			arvtarSub(info) {
				console.log(info);
				let data = {
					username: uni.getStorageSync('userinfo').username,
					password: '',
					newpassword1: '',
					newpassword2: '',
					avatar: info.data.url,
					phone: ''
				};
				console.log(data);
				this.$http.userEdit(data).then((res) => {
					console.log(res);
					if (res.code === 0 && res.data) {
						uni.showToast({
							title: '修改成功！',
							icon: 'none',
							duration: 800
						})
						uni.setStorageSync('updateAvatar', true);
						setTimeout(() => {
							uni.navigateBack({
								delta: 2
							})
						}, 800)
					}
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		height: 100vh;
		background-color: #666666;
		box-sizing: border-box;
	}
</style>
