<template>
	<view class="container">
		<view class="infoOut">
			<view class="infoTitle">
				<view class="infoTitleText">基本信息</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">巡检地点</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" :value="dataInfo.siteName" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">上报时间</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" :value="dataInfo.reportTime" class="inart"
						placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">问题类型</view>
				<view class="inputInfoR">
					<input type="text" disabled="true"
						v-if="dataInfo.typeName&&dataInfo.pointName&&dataInfo.sourceName&&dataInfo.itemName"
						:value="dataInfo.typeName+'-'+dataInfo.pointName+'-'+dataInfo.sourceName+'-'+dataInfo.itemName"
						class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>

		</view>
		<view class="infoOut" style="margin-top: 16rpx;" v-for="(item,index) in dataInfo.recordList">
			<view class="infoTitle">
				<view class="infoTitleText">
					<text>{{item.handleType=='1'?'创建':item.handleType=='2'?'整改':'验收'}}信息</text>
					<!-- <text style="float: right; font-weight: 400;">{{item.handleManName}}</text> -->
					</view>
			</view>
			<view class="inputInfo" style="border: 0;">
				<view class="inputInfoL">现场照片</view>
			</view>
			<view style="width: 690rpx;margin: 0 auto;" v-show="!item.photoPath">
				<text  style="font-size: 28rpx;color: #aaaaaa;">无{{item.handleType=='1'?'创建':item.handleType=='2'?'整改':'验收'}}图片</text>
			</view>
			<view class="imgUpdate" v-show="item.photoPath">
				<view class="imgList">
					<view class="imgListItem"   v-for="(item1,index1) in item.imgs" >
						<image class="imgListItemImg" @tap="preImg1(item.imgs,index1)"   :src="item1"  
							 mode="">
						</image>
					</view>
				</view>
			</view>
			<view class="inputInfo" style="border: none;">
				<view class="inputInfoL">{{item.handleType=='1'?'创建':item.handleType=='2'?'整改':'验收'}}描述</view>
			</view>
			<view class="questionContent">
				<text>{{item.handleContent}}</text>
			</view>
			<view class="infoOut">
				<view class="textList">
					<view class="textItem" >{{item.updateDate}} 由 {{item.handleManName}}
						{{item.handleType=='1'?'创建':item.handleType=='2'?'整改':'验收'}}。</view>
				</view>
			</view>
		</view>
		<view class="infoOut" style="margin-top: 16rpx;" v-show="dataInfo.state=='1'||dataInfo.state=='5'">
			<view class="infoTitle">
				<view class="infoTitleText">整改信息</view>
			</view>
			<view class="inputInfo" style="border: 0;">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>现场照片</view>
				<view class="inputInfoR" style='text-align: left;'>
					<text style='font-size: 24rpx;text-align: left;color: #aaaaaa;'>最多上传3张</text>
				</view>
			</view>
			<view class="imgUpdate">
				<view class="imgList">
					<view class="imgListItem" v-for="(item3,index3) in imgs">
						<image class="imgListItemImg" @tap="preImg(index3)" :src="imgUrl+item3" mode=""></image>
						<image class="deleteImg" @tap="deleteImg(index3)" src='../../../../static/img/close.png'>
						</image>
					</view>
					<image v-show="imgs.length<3" @tap="secImg()" src="../../../../static/img/uploadImgBgBtn.png"
						class="imgListBtn" mode=""></image>
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">整改描述</view>
			</view>
			<view style="padding-bottom: 20rpx;">
				<textarea class="quesContent1" placeholder-style="color:#aaa;" placeholder="整改描述"
					v-model="questionInfo" />
			</view>
		</view>

		<view class="infoOut" style="margin-top: 16rpx;" v-show="dataInfo.state=='3'">
			<view class="infoTitle">
				<view class="infoTitleText">验收信息</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>验收结果</view>
				<view class="inputInfoR" style="display: flex;">
					<view class="itemContItemRItem" @tap="fullImple(1)">
						<image src="../../../../static/img/secOneOn.png" v-if="pass" class="itemContItemRImg" mode="">
						</image>
						<image src="../../../../static/img/secOneOff.png" v-else class="itemContItemRImg" mode="">
						</image>
						<text style="margin-left: 16rpx;">通过</text>
					</view>
					<view class="itemContItemRItem" @tap="fullImple(2)">
						<image src="../../../../static/img/secOneOn.png" v-if="!pass" class="itemContItemRImg" mode="">
						</image>
						<image src="../../../../static/img/secOneOff.png" v-else class="itemContItemRImg" mode="">
						</image>
						<text style="margin-left: 16rpx;">未通过</text>
					</view>
				</view>
			</view>
			<view class="inputInfo" style="border: 0;">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>现场照片</view>
				<view class="inputInfoR" style='text-align: left;'>
					<text style='font-size: 24rpx;text-align: left;color: #aaaaaa;'>最多上传3张</text>
				</view>
			</view>
			<view class="imgUpdate">
				<view class="imgList">
					<view class="imgListItem" v-for="(item3,index3) in imgs">
						<image class="imgListItemImg" @tap="preImg(index3)" :src="imgUrl+item3" mode=""></image>
						<image class="deleteImg" @tap="deleteImg(index3)" src='../../../../static/img/close.png'>
						</image>
					</view>
					<image v-show="imgs.length<3" @tap="secImg()" src="../../../../static/img/uploadImgBgBtn.png"
						class="imgListBtn" mode=""></image>
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">问题描述</view>
			</view>
			<view style="padding-bottom: 20rpx;">
				<textarea class="quesContent1"  @confirm="" placeholder-style="color:#aaa;" placeholder="处理问题描述"
					v-model="questionInfo" />
			</view>
		</view>
		<view class="infoOut" style="margin-top: 16rpx;" v-show="dataInfo.state!='6'&&dataInfo.state!='3'">
			<view class="infoTitle">
				<view class="infoTitleText">指派信息</view>
			</view>
			<view class="inputInfo" @tap="secPerson()">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>指派人员</view>
				<view class="inputInfoR">
					<view class='inputInfoRPack'>
						<input type="text" :value="secPersonInfo.username" placeholder="请选择" placeholder-style="color:#aaa;"
							disabled="true" />
					</view>
					<image src="/static/img/you.png" class="inputInfoRPackMore" mode=""></image>
				</view>
			</view>
		</view>
		<view class="infoOut" style="margin-top: 20rpx;">
			<view class="textList">
				<view class="textItem" v-for="item in dataInfo.recordList">{{item.updateDate}} 由 {{item.handleManName}}
					{{item.handleType=='1'?'创建':item.handleType=='2'?'整改':'验收'}}。</view>
			</view>
		</view>
<view class="signature" v-show="showCanvas">
	<canvas class="mycanvas" canvas-id="mycanvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
	<view class="footer">
		<view class="left" @click="finish">保存</view>
		<view class="right" @click="clear">清除</view>
		<view class="close" @click="close">关闭</view>
	</view>
</view>
<!-- <image :src="imgUrl+signature" mode=""></image> -->
		<view class="subBtns" v-show="dataInfo.state!='6'">
			<view class="sendBtn1" v-show="dataInfo.state!='6'&&dataInfo.state!='3'" @tap='$HClick(save(1))'>指派</view>
			<view class="sendBtn" @tap='$HClick(save(2))'>提交</view>
		</view>
	</view>
</template>

<script>
	var x = 20;
		var y =20;
	export default {
		data() {
			return {
				showCanvas:false,
				ctx:'',         //绘图图像
				points:[],       //路径点集合 
				signature:'',
				index1: 0,
				index2: 0,
				userInfo: {},
				date: '',
				endDate: '',
				startDate: '',
				secPersonInfo: {
					username: ''
				},
				questionClass: '',
				pass: false,
				id: '',
				dataInfo: {},
				imgUrl: '',
				imgs: [],
				questionInfo: '',
				onoff: true
			}
		},
		onLoad(options) {
			this.imgUrl =uni.getStorageSync('url');
			this.userInfo =uni.getStorageSync('userinfo');
			this.id = options.id || '';
			this.getDetail();
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
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			save(e) {
				if (e == '1') {
					if (!this.secPersonInfo.userId) {
						uni.showToast({
							title: '请选择指派人！',
							icon: 'none',
							duration: 800
						})
						return;
					}
				}else{
					if(this.dataInfo.state=='1'||this.dataInfo.state=='3'||this.dataInfo.state=='5'){
						if (this.imgs.length===0) {
							uni.showToast({
								title: '请上传现场照片！',
								icon: 'none',
								duration: 800
							})
							return;
						}
					}
					if(this.dataInfo.state=='1'){
						if (!this.secPersonInfo.userId) {
							uni.showToast({
								title: '请选择指派人！',
								icon: 'none',
								duration: 800
							})
							return;
						}
					}
					if(this.dataInfo.state=='3'){
						if (!this.questionInfo) {
							uni.showToast({
								title: '请填写验收描述！',
								icon: 'none',
								duration: 800
							})
							return;
						}
					}
				}
				let path = '';
				if (this.imgs.length > 0) {
					for (let a of this.imgs) {
						path += a + ';'
					}
					path = path.slice(0, path.length - 1);
				}
				console.log(path);
				let dateNum = this.getTime();
				console.log(dateNum);
				let pass = '';
				if (e == '1') {
					pass = '0';
				} else {
					if (this.dataInfo.state == '3') {
						if (this.pass) {
							pass = '1';
							if(!this.signature){
								this.saveSig();
								return;
							}
						} else {
							pass = '0';
						}
					}else{
						pass = '1';
					}
				}
				let type = '';
				if (this.dataInfo.state == '1' || this.dataInfo.state == '5') {
					type = '2';
				} else if (this.dataInfo.state == '3') {
					type = '3';
				}

				let data = {
					problemId: this.id,
					handleType: type, //1-创建问题；2-整改；3-验收
					handleState: pass, //1-操作了（提交整改or验收通过）；0- -验收操作时未通过or整改时指派
					handleContent: this.questionInfo,
					signPic:this.signature,
					photoPath: path,
					handleMan: this.userInfo.id,
					handleManName: this.userInfo.name,
					targetMan: this.secPersonInfo.userId,
					targetManName: this.secPersonInfo.username,
					handleTime: dateNum,
					
				};
				// let data1={};
				// data1.handleRecord=data;
				console.log(data);
				this.$http.handleRecordSave(data).then((res) => {
					console.log('qwer1', res)
					if (res.code === 200 & res.success) {
						if (e == '1') {
							uni.showToast({
								title: '指派成功！',
								icon: 'none',
								duration:800
							})
							setTimeout(() => {
								uni.navigateBack({

								})
							}, 800);
						} else {
							uni.showToast({
								title: '提交成功！',
								icon: 'none',
								duration:800
							})
							setTimeout(() => {
								uni.navigateBack({

								})
							}, 800);
						}
					}
				})
			},
			saveSig(){
				uni.setNavigationBarTitle({
					title:'手写签名'
				})
				this.createCanvas();
			},
			getDetail() {
				let data = {
					id: this.id
				};
				this.$http.inspectProblemQueryById(data).then((res) => {
					console.log('qwer1', res)
					this.list = [];
					if (res.code === 200 & res.success) {
						this.calcData(res.inspectProblem);
					}
				})
			},
			calcData(res){
				let data=res;
				if(data.photoPath){
					let strs= new Array(); //定义一数组
					strs=data.photoPath.split(";"); //字符分割
					data.imgs=[];
					if(!strs[strs.length-1]){
						strs.pop();
					}
					for(let b in strs){
						data.imgs.push(this.imgUrl+strs[b]);
					}
				}
				
				for(let a in data.recordList){
					if(data.recordList[a].photoPath){
						let strs1= new Array(); //定义一数组
						strs1=data.recordList[a].photoPath.split(";"); //字符分割
						if(!strs1[strs1.length-1]){
							strs1.pop();
						}
						data.recordList[a].imgs=[];
						for(let d in strs1){
							data.recordList[a].imgs.push(this.imgUrl+strs1[d]);
						}
					}
				}
				console.log(data);
				this.dataInfo=data;
			},
			change2(e) {
				console.log(e);
				this.index2 = e.detail.value;
			},
			secImg() {
				let _this = this;
				let token = uni.getStorageSync('ACCESS_TOKEN');
				let num = 3 - this.imgs.length;
				uni.chooseImage({
					count: num, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						if (res.tempFilePaths.length > 0) {
							for (let b = 0; b < res.tempFilePaths.length; b++) {
								let mUrl=uni.getStorageSync('url');
								uni.uploadFile({
									url: mUrl +
										'/admin/sys-file/upload', //仅为示例，非真实的接口地址
									filePath: res.tempFilePaths[b],
									name: 'file',
									formData: {
										'user': 'test'
									},
									header: {
										'Authorization':'Bearer ' + token
									},
									success: (uploadFileRes) => {
										console.log(JSON.parse(uploadFileRes.data));
										console.log(JSON.parse(uploadFileRes.data).data);
										_this.calcImg(JSON.parse(uploadFileRes.data).data.url);
									},
									fail: (err) => {
										console.log(err);
									}
								});
							}
						}
					}
				});
			},
			calcImg(res4) {
				this.imgs.push(res4);
			},
			deleteImg(res3) {
				this.imgs.splice(res3, 1);
			},
			preImg(res3) {
				let url = [];
				for (let a in this.imgs) {
					let lr = this.imgUrl + this.imgs[a];
					url.push(lr);
				}
				uni.previewImage({
					current: res3,
					indicator: 'default',
					urls: url
				})
			},
			preImg1(res3,res4) {
				uni.previewImage({
					current:res4,
					indicator: 'default',
					urls: res3
				})
			},
			bindDateChange(e) {
				console.log(e);
				this.date = e.detail.value;
			},
			secPerson() {
				uni.navigateTo({
					url: '../secContacts/secContacts'
				})
			},
			fullImple(res) {
				if (res == '1') {
					this.pass = true;
				} else {
					this.pass = false;
				}
			},
			//关闭并清空画布
					close:function(){
						uni.setNavigationBarTitle({
							title:'任务详情'
						})
						this.showCanvas = false;
						this.clear();
					},
					//创建并显示画布
					createCanvas:function(){
						this.showCanvas = true;
						
						this.ctx = uni.createCanvasContext("mycanvas",this);   //创建绘图对象
						
						//设置画笔样式
						this.ctx.lineWidth = 4;
						this.ctx.lineCap = "round"
						this.ctx.lineJoin = "round"
					},
					//触摸开始，获取到起点
					touchstart:function(e){
						let startX = e.changedTouches[0].x;
						let startY = e.changedTouches[0].y;
						let startPoint = {X:startX,Y:startY};
						this.points.push(startPoint);
						//每次触摸开始，开启新的路径
						this.ctx.beginPath();
					},
					
					//触摸移动，获取到路径点
					touchmove:function(e){
						let moveX = e.changedTouches[0].x;
						let moveY = e.changedTouches[0].y;
						let movePoint = {X:moveX,Y:moveY};
						this.points.push(movePoint);       //存点
						let len = this.points.length;
						if(len>=1){
							this.draw();                   //绘制路径
						}
						
					},
					
					// 触摸结束，将未绘制的点清空防止对后续路径产生干扰
					touchend:function(){                   
						this.points=[];
					},
					
					/* ***********************************************
					#   绘制笔迹
					#	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
					#	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
					#	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
					************************************************ */
					draw: function() {
						let point1 = this.points[0]
						let point2 = this.points[1]
						this.points.shift()
						this.ctx.moveTo(point1.X, point1.Y)
						this.ctx.lineTo(point2.X, point2.Y)
						this.ctx.stroke()
						this.ctx.draw(true)
					},
					
					//清空画布
					clear:function(){
						let that = this;
						uni.getSystemInfo({
							success: function(res) {
								let canvasw = res.windowWidth;
								let canvash = res.windowHeight;
								that.ctx.clearRect(0, 0, canvasw, canvash);
								that.ctx.draw(true);
							},
						})
					},
					//完成绘画并保存到本地
					finish:function(){
						let that = this;
						let token = uni.getStorageSync('token');
						let mUrl=uni.getStorageSync('url');
						uni.canvasToTempFilePath({
						  canvasId: 'mycanvas',
						  success: function(res) {
							  console.log(res)
							  console.log(mUrl +'/inspect/inspectProblem/getPicpath');
								if(res.tempFilePath){
									uni.uploadFile({
										url: mUrl +'/inspect/inspectProblem/getPicpath', //仅为示例，非真实的接口地址
										filePath: res.tempFilePath,
										name: 'file',
										formData: {
											'user': 'test'
										},
										header: {
											token: token
										},
										success: (uploadFileRes) => {
											console.log(JSON.parse(uploadFileRes.data));
											if(JSON.parse(uploadFileRes.data).code===200){
												that.signature=JSON.parse(uploadFileRes.data).data;
														that.clear();
														uni.setNavigationBarTitle({
															title:'任务详情'
														})
														that.showCanvas = false;
														that.save(2);
											}
										},
										fail: (err) => {
											console.log(err);
										}
									});
								}
							//上传到服务器
							
							// that.api.uploadFile({
							// 	url: 'user/upload/one',
							// 	filePath: res.tempFilePath,
							// 	name: 'file',
							// 	success: (uploadFileRes) => {
							// 		console.log(uploadFileRes)
							// 		that.signature = uploadFileRes.data.url;
							// 		that.clear();
							// 		that.showCanvas = false;
							// 	}
							// })
							//保存到本地
							/* 
							
							let path = res.tempFilePath;
							uni.saveImageToPhotosAlbum({
								filePath:path,
							}) */
						  } 
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
		background-color: #cccccc;
	}

	.imgUpdateItem {
		width: 210rpx;
		height: 150rpx;
		background-color: #aaaaaa;
		margin-left: 30rpx;
	}

	.subBtns {
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
		background: #E6E7E7;
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

	.textList {
		padding: 40rpx 0;
	}

	.textItem {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #4c4c4c;
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.itemContItemR {
		width: 230rpx;
		margin-left: 15rpx;
		/* background-color: #007AFF; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.itemContItemRItem {
		flex: 1;
		/* text-align: center; */
	}

	.itemContItemRImg {
		width: 22rpx;
		height: 22rpx;
		vertical-align: middle;
		position: relative;
		top: -2rpx;
		margin-left: 10rpx;
	}

	.questionContent {
		width: 690rpx;
		height: auto;
		margin: -16rpx auto 0 auto;
		line-height: 48rpx;
		border: none;
		outline: none;
		font-size: 30rpx;
		color: #545454;
		box-sizing: border-box;
		padding: 0 20rpx;
		/* border: 1rpx solid #ccc; */
		background-color: rgba(240,240,240,0.5);
	}

	.imgList {
		width: 690rpx;
		height: auto;
		display: flex;
		margin: 20rpx auto 0 auto;
		justify-content: flex-start;

	}

	.imgListBtn {
		width: 150rpx;
		height: 150rpx;
		margin-right: 28rpx;
	}

	.imgListItem {
		width: 150rpx;
		height: 150rpx;
		margin-right: 28rpx;
		position: relative;
	}

	.imgListItemImg {
		width: 100%;
		height: 100%;
	}

	.deleteImg {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: -20rpx;
		top: -30rpx;
	}

	.quesContent1 {
		width: 660rpx;
		height: 200rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		border: 1rpx solid #dddddd;
		margin: 0 auto 20rpx auto;
		display: block;
		line-height: 48rpx;
		outline: none;
		font-size: 30rpx;
		color: #545454;
	}

	.textList {
		padding: 40rpx 0;
	}

	.textItem {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #4c4c4c;
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.signature {position: fixed;top:0;left: 0;z-index: 999;width:100%;height: 100vh;background: #fff;}
		page{
			background: #fff;
		}
		.container {
			padding: 20rpx 0 120rpx 0;
			box-sizing: border-box;
		}
		.title{
			height:50upx;
			line-height: 50upx;
			font-size: 16px;
		}
		.mycanvas{
			width: 100%;
			height: calc(100vh - 200upx);
			background-color: #ECECEC;
		}
		.footer{
			font-size: 14px;
			height: 150upx;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
		.left,.right,.close{
			line-height: 100upx;
			height: 100upx;
			width: 220upx;
			text-align: center;
			font-weight: bold;
			color: white;
			border-radius: 5upx;
		}
		.left{
			background: #007AFF;
		}
		.right{
			background:orange;
		}
		.close {
			background:#A3A3A3;
		}

</style>
