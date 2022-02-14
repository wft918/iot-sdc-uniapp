<template>
	<view class="container">
		<view class="infoOut">
			<view class="infoTitle">
				<view class="infoTitleText">基本信息</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">风险类型</view>
				<view class="inputInfoR">
					<input type="text"  disabled="true" :value="proInfo.typeName" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">风险点</view>
				<view class="inputInfoR">
					<input type="text"  disabled="true" :value="proInfo.pointName" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">风险源</view>
				<view class="inputInfoR">
					<input type="text"  disabled="true" :value="proInfo.sourceName" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo" style="border: 0;">
				<view class="inputInfoL">检查项</view>
				<view class="inputInfoR">
					<input type="text"  disabled="true" :value="proInfo.itemName" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
		</view>
		<view class="infoOut" style="margin-top: 16rpx;">
			<view class="infoTitle">
				<view class="infoTitleText">问题信息</view>
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
						<image class="imgListItemImg" @tap="preImg(index3)" :src="checkImgSo(item3)?item3:imgUrl+item3"
							mode=""></image>
						<image class="deleteImg" @tap="deleteImg(index3)"
							src='../../../../../../../../../static/img/close.png'></image>
					</view>
					<image  v-show="imgs.length<3" @tap="secImg()"
						src="../../../../../../../../../static/img/uploadImgBgBtn.png" class="imgListBtn"
						mode=""></image>
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>问题标题</view>
				<view class="inputInfoR">
					<input type="text" @confirm="closeInput" placeholder="输入问题标题" v-model="questionTitle" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>问题描述</view>
				<!-- <view class="inputInfoR">
					<input type="text" placeholder="输入问题描述" v-model="questionInfo" class="inart" placeholder-style="color:#aaa;" />
				</view> -->
			</view>
			<view style="padding-bottom: 20rpx;">
				<textarea @confirm="closeInput"  class="quesContent" placeholder-style="color:#aaa;" placeholder="输入问题描述" v-model="questionInfo"  />
			</view>
		</view>
		
		<view class="infoOut" style="margin-top: 16rpx;">
			<view class="infoTitle">
				<view class="infoTitleText">整改信息</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL">检查位置</view>
				<view class="inputInfoR">
					<input type="text" disabled="true" placeholder="请填写" v-model="proInfo.sdcSiteName" class="inart" placeholder-style="color:#aaa;" />
				</view>
			</view>
			<view class="inputInfo">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>整改期限</view>
				<view class="inputInfoR">
					<picker mode="date" :style="date?'':'color:#aaa'" class='inputInfoRPack' :value="date"  @change="bindDateChange">
						<view>{{date?date:'选择日期'}}</view>
					</picker>
					<image src="/static/img/you.png" class="inputInfoRPackMore" mode=""></image>
				</view>
			</view>
			<view class="inputInfo" @tap="secPerson()">
				<view class="inputInfoL"><text style="color:#aa282e;">*</text>指派给</view>
				<view class="inputInfoR">
					<view class='inputInfoRPack'>
						<input type="text"  :value="secPersonInfo.username" placeholder="选择整改人" placeholder-style="color:#aaa;" disabled="true" />
					</view>
					<image src="/static/img/you.png" class="inputInfoRPackMore" mode=""></image>
				</view>
			</view>
		</view>

		<view class="sendBtn" @tap="$HClick(checkInfo(0))">提交</view>
	</view>
</template>

<script>
	import DB from "../../../../../../../../../static/script/sqlite.js"
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				
				index1: 0,
				index2: 0,
				userInfo: {},
				date:'',
				endDate:'',
				startDate:'',
				secPersonInfo:{'username':'',"userId": "",},
				questionClass:'',
				imgs:[],
				imgUrl:'',
				positionName:'',
				onoff:true,
				questionInfo:'',
				questionTitle:'',
				proInfo:{}
			}
		},
		onLoad(options) {
			this.userInfo = uni.getStorageSync('userinfo');
			console.log(options);
			console.log(this.userInfo);
			this.proInfo=options;
			console.log(this.proInfo);
			this.imgUrl=uni.getStorageSync('url');
			
		},
		onShow() {
			console.log(this.getTime());
			  uni.$on("handleFun", res => {
				  console.log(res)
			        this.secPersonInfo = res;
			        // 清除监听
			        uni.$off('handleFun');
			    });
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						uni.showModal({
							title:'提示',
							content:'当前为网络环境，是否继续暂存数据至本地？',
							success(e) {
								if(e.confirm){
									_this.checkInfo(1);
								}
							}
						})
					}else{
						_this.checkInfo(1);
					}
			    }
			});
		},
		methods: {
			checkImgSo(res){
				if(res.indexOf("admin/sys-file/planplat") == -1){
					return true;
				}else{
					return false;
				}
			},
			closeInput(){
				plus.key.hideSoftKeybord();
			},
			change2(e) {
				console.log(e);
				this.index2 = e.detail.value;
			},
			secImg() {
				let _this = this;
				let token = uni.getStorageSync('ACCESS_TOKEN');
				let num=3-this.imgs.length;
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
										console.log(uploadFileRes);
										console.log(JSON.parse(uploadFileRes.data));
										console.log(JSON.parse(uploadFileRes.data).data);
										_this.calcImg(JSON.parse(uploadFileRes.data).data.url);
									},
									fail: (err) => {
										console.log(err);
										pathToBase64(res.tempFilePaths[b])
										  .then(base64 => {
										    console.log(base64)
											_this.imgs.push(base64);
										  })
										  .catch(error => {
										    console.error(error)
										  })
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
				let url =[];
				for(let a in this.imgs){
					let imgItem=this.imgs[a]
					if(this.checkImgSo(imgItem)){
					url.push(imgItem);
					}else{
					let lr=this.imgUrl+imgItem;
					url.push(lr);	
					}
				}
				uni.previewImage({
					current:res3,
					indicator: 'default',
					urls: url
				})
			},
			bindDateChange(e){
				console.log(e);
				this.date=e.detail.value;
			},
			secPerson(){
				uni.navigateTo({
					url:'../../../../../../secContacts/secContacts?id='+this.secPersonInfo.userId
				})
			},
			getTime(){
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
			sub(st){
				let path='';
				if(this.imgs.length>0){
					for(let a of this.imgs){
						path+=a+';'
					}
					path=path.slice(0,path.length-1);
				}
				let dateNum=this.date+' 23:59:59';
				console.log(path);
				let data={
					recordId:this.proInfo.id,	
					siteId:this.proInfo.siteId,
					siteName:this.proInfo.siteName,
					title:this.questionTitle,
					checkItemId:this.proInfo.checkId,	
					reportTime:this.getTime(),
					reportMan:this.userInfo.id,
					reportManName:this.userInfo.name,
					photoPath:path,	
					content:this.questionInfo,
					siteId:this.proInfo.sdcSiteId,
					siteName:this.proInfo.sdcSiteName,
					inspectLocation:this.positionName,	
					problemSource:1,
					deadline:dateNum,
					solveMan:this.secPersonInfo.userId,
					solveManName:this.secPersonInfo.username,
					state:1,
					acceptMan:'',	
					acceptManName:'',
				};
				console.log(data);
				if(st){
					this.dataCache1(data);
					return;
				}
				this.$http.inspectResultProblemSave(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						uni.showToast({
							title:res.msg,
							icon:'none',
							position:'center',
							duration:800,
						})
						setTimeout(()=>{
							uni.navigateBack({
								animationType:'slide-out-bottom'
							})
						},800)
					}
				})
			},
			dataCache1(data){
				this.openSQL();
				DB.selectTableData("questionclass")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("分类详情表数据", res);
							console.log(res.length);
							this.insertTableData1(data);
							this.selectTableData1();
						}else{
						this.createTable1();
						this.insertTableData1(data);
						this.selectTableData1();
						}
					})
					.catch(error => {
						console.log("查询失败", error);
						this.createTable1();
						this.insertTableData1(data);
						this.selectTableData1();
					});
				// DB.deleteTableData("classdata", "id", this.siteId)
				// 	.then(res => {
				// 		console.log("删除表数据成功");
				// 	})
			},
			// 打开数据库
			openSQL(data) {
				// 这个是查询有没有打开数据库
				let open = DB.isOpen();
				console.log("数据库状态", open ? "开启" : "关闭");
				if (!open) {
					DB.openSqlite()
						.then(res => {
							console.log('数据库已打开');
						})
						.catch(error => {
							console.log(error);
							console.log("数据库开启失败");
						});
				}
			},
			// 创建表
			createTable1(data) {
					let sql =
						'"time" text,"children" BLOB';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("questionclass", sql)
						.then(res => {
							console.log('创建point1表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData1(data) {
				let open = DB.isOpen();
				let timer=this.getTime();
				console.log(timer);
				if (open) {
						let sql = `'${timer}','${JSON.stringify(data)}'`;
						let condition = "'time','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("questionclass", sql, condition)
							.then(res => {
								console.log('保存本地成功');
								uni.showToast({
									title:'保存本地数据成功！',
									position:'bottom',
									duration:800
								})
								setTimeout(()=>{
									uni.navigateBack({
										
									})
								},800);
							})
							.catch(error => {
								console.log("失败", error);
							});
				} else {
					console.log("数据库未打开");
				}
			},
			// 查询表数据
			selectTableData1() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("questionclass")
						.then(res => {
							console.log("questionclass表数据", res);
							console.log(res.length);
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					console.log("数据库未打开");
				}
			},
			checkInfo(netType){
				let state=false;
				let _this=this;
				if(this.imgs.length===0){
					state=true;
					uni.showToast({
						title:'请至少上传一张现场照片！',
						icon:'none',
						duration:800
					})
					return;
				}
				if(!this.questionInfo){
					state=true;
					uni.showToast({
						title:'请填写问题描述！',
						icon:'none',
						duration:800
					})
					return;
				}
				if(!this.questionTitle){
					state=true;
					uni.showToast({
						title:'请填写问题标题！',
						icon:'none',
						duration:800
					})
					return;
				}
				if(!this.date){
					state=true;
					uni.showToast({
						title:'请选择整改期限！',
						icon:'none',
						duration:800
					})
					return;
				}
				if(!this.secPersonInfo.userId){
					state=true;
					uni.showToast({
						title:'请选择整改人！',
						icon:'none',
						duration:800
					})
					return;
				}
				if(!state){
					if(netType){
						_this.sub(1);
					}else{
						_this.sub(0);
					}
					
				}
			}
			
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
	.inputInfoRPack input{
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

	.imgUpdateItem {
		width: 210rpx;
		height: 150rpx;
		background-color: #aaaaaa;
		margin-left: 30rpx;
	}

	.sendBtn {
		width: 750rpx;
		height: 90rpx;
		background: #0193e9;
		position: fixed;
		bottom: 0;
		left: 0;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		color: white;
		transition: ease 200ms;
	}

	.sendBtn:active {
		background-color: #aa00ff;
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
	.quesContent{
		width: 660rpx;
		height: 200rpx;
		box-sizing: border-box;
		padding:  0 20rpx;
		border: 1rpx solid #dddddd;
		margin: 0 auto 20rpx auto;
		display: block;
		line-height: 48rpx;
		outline: none;
		font-size: 30rpx;
		color: #545454;
	}
</style>
