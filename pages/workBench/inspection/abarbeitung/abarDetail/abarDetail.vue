<template>
	<view class="container">
		<view class="infoOut">
			<view class="infoTitle">
				<view class="infoTitleText">基本信息</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">项目名称</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" :value="userInfo.projectName" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">巡检地点</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" value="7#配电箱" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">上报时间</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" value="2021-05-18 10:12:21" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">问题类型</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" value="个体防护措施-正确佩戴安全带、 安全帽" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>

		</view>
		<view class="infoOut" style="margin-top: 16rpx;">
			<view class="infoTitle">
				<view class="infoTitleText">李四-巡检员</view>
			</view>
			<view class="inputInfo" style="border: 0;">
				<view class="inputInfoL">*现场照片</view>
				<view class="inputInfoR" style='text-align: left;'>
					<text style='font-size: 24rpx;text-align: left;color: #aaaaaa;'>最多上传3张</text>
				</view>
			</view>
			<view class="imgUpdate">
				<image src="../../../../../static/img/hezi.png" class="updateBtnImg" mode=""></image>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">*问题描述</view>
				<view class="inputInfoR">
					<input type="text" placeholder="输入问题描述" disabled="true" value="具体问题描述" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">创建时间</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" value="2021-05-18 05:24:43" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>
		</view>

		<view class="infoOut" style="margin-top: 16rpx;">
			<view class="infoTitle">
				<view class="infoTitleText">整改信息</view>
			</view>
			<view class="inputInfo" style="border: 0;">
				<view class="inputInfoL">*现场照片</view>
				<view class="inputInfoR" style='text-align: left;'>
					<text style='font-size: 24rpx;text-align: left;color: #aaaaaa;'>最多上传3张</text>
				</view>
			</view>
			<view class="imgUpdate">
				<view class="updateBtn" @tap="secImg">
					<image src="/static/img/addImg.png" class="updateBtnIcon" mode=""></image>
					<view class="updateBtnText">上传照片</view>
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">*问题描述</view>
				<view class="inputInfoR">
					<input type="text" @confirm="closeInput" placeholder="输入问题描述" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
		</view>
		<view class="infoOut" style="margin-top: 16rpx;">
			<view class="infoTitle">
				<view class="infoTitleText">指派信息</view>
			</view>
			
			<view class="inputInfo" @tap="secPerson()">
				<view class="inputInfoL">*指派人员</view>
				<view class="inputInfoR">
					<view class='inputInfoRPack'>
						<input type="text" :value="secPersonInfo.name" placeholder="请选择"
							placeholder-style="color:#aaa;" disabled="true" />
					</view>
					<image src="/static/img/you.png" class="inputInfoRPackMore" mode=""></image>
				</view>
			</view>
			<view class="textList">
				<view class="textItem">2021-05-18 11:20:11 由 张三 验收，未通过。</view>
			</view>
		
		</view>
<view class="subBtns">
	<view class="sendBtn1">指派</view>
	<view class="sendBtn">提交</view>
</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eveType: [{
						name: '建造',
						type: 1
					},
					{
						name: '电力',
						type: 2
					},
					{
						name: '环境',
						type: 3
					},
				],
				proType: [{
						name: '安全检查',
						type: 1
					},
					{
						name: '环境检查',
						type: 2
					},
					{
						name: '文明施工',
						type: 3
					},
				],
				index1: 0,
				index2: 0,
				userInfo: {},
				date: '',
				endDate: '',
				startDate: '',
				secPersonInfo: {
					name: ''
				},
				questionClass: ''
			}
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userinfo'));
		},
		onShow() {
			uni.$on("handleFun", res => {
				console.log(res)
				this.secPersonInfo = res;
				// 清除监听
				uni.$off('handleFun');
			});
		},
		methods: {

			change2(e) {
				console.log(e);
				this.index2 = e.detail.value;
			},
			secImg() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			bindDateChange(e) {
				console.log(e);
				this.date = e.detail.value;
			},
			secPerson() {
				uni.navigateTo({
					url: '../../secContacts/secContacts?id=' + this.secPersonInfo.id
				})
			},

		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		/* height: 100vh; */
		background-color: #f0f0f5;
		padding-top: 10rpx;
		padding-bottom: 110rpx;
	}

	.infoOut {
		width: 100%;
		height: auto;
		background-color: white;
	}

	.infoTitle {
		width: 100%;
		height: 100rpx;
		background-color: white;
		box-sizing: border-box;
		border-bottom: 1rpx solid #F0F0F5;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.infoTitleText {
		width: 100%;
		height: 36rpx;
		border-left: 8rpx solid #0193E9;
		color: #3D3D3D;
		font-size: 30rpx;
		line-height: 32rpx;
		font-weight: 700;
		box-sizing: border-box;
		padding-left: 20rpx;
	}

	.inputInfo {
		width: 690rpx;
		margin: 0 auto;
		height: 100rpx;
		border-bottom: 1rpx solid #F0F0F5;
		line-height: 100rpx;
		display: flex;
		font-size: 30rpx;
		color: #545454;
	}

	.inputInfoL {
		flex: 2;
		text-align: left;
	}

	.inputInfoR {
		flex: 5;
		text-align: right;
		position: relative;
	}

	.inart {
		width: 100%;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.inputInfoRPack {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		/* background-color: #00AAFF; */
		box-sizing: border-box;
		padding-right: 50rpx;
	}

	.inputInfoRPack input {
		width: 100%;
		height: 100%;
		line-height: 100rpx;
		/* background-color: #007AFF; */
		font-size: 30rpx;
	}

	.inputInfoRPackMore {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: 10rpx;
		top: 37rpx;
	}

	.imgUpdate {
		width: 750rpx;
		margin: 0 auto;
		height: 200rpx;
		/* background-color: #00AAFF; */
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.updateBtn {
		width: 150rpx;
		height: 150rpx;
		border: 1rpx solid #D2D2D2;
		margin-left: 30rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		padding: 10rpx 0;
	}

	.updateBtnIcon {
		width: 50rpx;
		height: 50rpx;
		/* background-color: #007AFF; */
	}

	.updateBtnText {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #C9C9C9;

	}

	.updateBtnImg {
		width: 150rpx;
		height: 150rpx;
		margin-left: 30rpx;
	}

	.imgUpdateItem {
		width: 210rpx;
		height: 150rpx;
		background-color: #aaaaaa;
		margin-left: 30rpx;
	}
.subBtns{
	width: 750rpx;
	height: 90rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	
}
	.sendBtn {
		flex: 1;
		height: 100%;
		background: #0193e9;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		color: white;
		transition: ease 100ms;
	}

	.sendBtn:active {
		background-color: #aa00ff;
	}
	.sendBtn1 {
		flex: 1;
		height: 100%;
		background:#E6E7E7;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		color: #0193e9;
		transition: ease 100ms;
	}
	
	.sendBtn1:active {
		color: white;
		background-color: #e7a7cb;
	}
	.textList{
		padding:40rpx 0;
	}
	.textItem{
		width:100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #4c4c4c;
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
</style>
