<template>
	<view class="container">
		<view class="taskBox">
			<view class="taskTitle">
				<image src="../../../../static/img/inspOnLine.png"  class="taskTitleI" mode=""></image>
				<text style="font-weight: 700;">计划巡检任务</text>
				<text class='taskTitleR'>总数：{{onLineData.sum?onLineData.sum:'0'}}</text>
			</view>
			<view class="taskInfoBox" >
				<view class="taskInfoItem"@tap="toPro(1)">
					<view class="bigText1">{{onLineData.notFinished||0}}</view>
					<view class="smallText">待完成</view>
				</view>
				<view class="taskInfoItem" @tap="toPro(2)">
					<view class="bigText2">{{onLineData.overdued||0}}</view>
					<view class="smallText">已超期</view>
				</view>
				<view class="taskInfoItem" @tap="toPro(3)">
					<view class="bigText3">{{onLineData.sum?onLineData.sum:'0'}}</view>
					<view class="smallText">总事项</view>
				</view>
			</view>
		</view>
		<view class="taskBox" style='margin-top: 20rpx;height: auto;'>
			<view class="taskTitle">
				<image src="../../../../static/img/inspUnload.png"  style="width: 28rpx;height: 28rpx;top: 28rpx;" class="taskTitleI" mode=""></image>
				<text style="font-weight: 700;">巡检任务</text>
				<text class='taskTitleR'></text>
			</view>
			<scroll-view scroll-y="true" class="scrollA">
						<view class="inspItem"  v-for="(item,index) in list">
							<image src="../../../../static/img/xjz.png" v-show="item.inspectState=='1'" class="statusImg"
								mode=""></image>
							<image src="../../../../static/img/ywc.png" v-show="item.inspectState=='2'" class="statusImg"
								mode=""></image>
							<image src="../../../../static/img/yqx.png" v-show="item.inspectState=='3'" class="statusImg"
								mode=""></image>
							<image src="../../../../static/img/wks.png" v-show="item.inspectState=='0'" class="statusImg"
									mode=""></image>
							<view class="inspItemL">
								<view class="taskTime">{{item.createDate}}</view>
								<view class="taskName">{{item.projectName}}</view>
								<!-- <view class="taskAll">
									<text>共 {{item.qualifiedNum+item.unqualifiedNum}} 项</text>
									<text style="margin-left: 16rpx;">正常{{item.qualifiedNum}} 项</text>
									<text style="margin-left: 16rpx;">异常 </text><text
										style="color: #fe7676;">{{item.unqualifiedNum}}</text><text> 项</text>
								</view> -->
							</view>
							<view class="inspItemRAll">
								<view class="inspItemR1" @tap="swipeClick(item.id)" v-if="item.inspectState=='1'||item.inspectState=='0'">取消</view>
								<view class="inspItemR" @tap="startInsp(item)" v-if="item.inspectState=='1'||item.inspectState=='0'">{{item.inspectState=='1'?'继续':'开始'}}巡检</view>
								<view class="inspItemRC" @tap="startInsp(item)" v-if="item.inspectState=='2'||item.inspectState=='3'">详情</view>
							</view>
							
						</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import DB from "../../../../static/script/sqlite.js"
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				userInfo:{},
				list:[],
				onLineData:{},
				upIndex:0,
				classList:[],
				quesList:[],
				upIndex1:0
			}
		},
		onPullDownRefresh() {
			this.getList();
			this.getONlineList();
			 setTimeout(function () {
			            uni.stopPullDownRefresh();
			        }, 1000);
		},
		onLoad() {
			this.userInfo=uni.getStorageSync('userinfo');
		},
		onShow() {
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.getList();
						_this.getONlineList();
					}else{
						_this.openSQL();
						_this.selectTableData();
						_this.onLineData=uni.getStorageSync('onLineData');
					}
			    }
			});
		},
		onNavigationBarButtonTap(){
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.selectTableData1();
					}else{
						uni.showToast({
							title:'暂无网络，请稍后操作！',
							icon:'none',
							duration:1000
						})
					}
			    }
			});
		},
		methods: {
			startThisLine(item) {
				let data = {
					id: item.id,
					inspectState: 1,
				};
				console.log(data);
				this.$http.inspectUpdateState(data).then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
						item.inspectState='1';
					this.startInsp(item);
					}
				})
			},
			// 查询表数据
			selectTableData1() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("classdata")
						.then(res => {
							console.log("classdata表数据", res);
							console.log(res.length);
							if(res.length){
								this.classList=res;
								this.upIndex=0;
								this.updateClass();
							}else{
								this.selectTableData2();
							}
						})
						.catch(error => {
							console.log("查询失败", error);
							this.selectTableData2();
						});
				} else {
					console.log("数据库未打开");
				}
			},
			// 查询表数据
			selectTableData2() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("questionclass")
						.then(res => {
							// console.log("questionclass表数据", res);
							console.log(res.length);
							if(res.length){
								this.quesList=res;
								this.upIndex1=0;
								this.updateQes();
							}else{
								uni.showToast({
									title:'同步完成！',
									icon:'none',
									duration:1200
								})
							}
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					console.log("数据库未打开");
				}
			},
			updateClass(){
				console.log(this.classList.length);
				if(this.upIndex==this.classList.length){
					this.upIndex=0;
					this.selectTableData2();
				}else{
					this.upClassItem();
				}
			},
			updateQes(){
				console.log(this.quesList.length);
				if(this.upIndex1==this.quesList.length){
					uni.showToast({
						title:'同步完成！',
						icon:'none',
						duration:1200
					})
					this.upIndex1=0;
				}else{
					this.upQueItem();
				}
			},
			upQueItem(){
				let allItem=this.quesList[this.upIndex1];
				let arr=JSON.parse(allItem.children);
				let upImg=arr.photoPath.split(';');
				console.log(upImg.length);
				let mustUp=0;
				if(upImg.length){
					upImg.map((item)=>{
						if(this.checkImgSo(item)){
							mustUp++;
						}
					})
				}
				if(mustUp){
					this.upImgNow1(upImg);	
				}else{
					this.upDateing1(arr,allItem.id);
				}
				
			},
			upClassItem(){
			let allItem=this.classList[this.upIndex];
			let arr=JSON.parse(allItem.children);
				console.log(arr.solveManName);
				let upImg=[];
				for(let a in arr){
					if(arr[a].type==4){
						// console.log(arr[a].photoValue[0].photos);
						if(arr[a].photoValue[0].photos.length>0){
						upImg=arr[a].photoValue[0].photos.split(';');
						break;	
						}else{
							break;
						}
						
					}
				}
				let mustUp=0;
				if(upImg.length){
					upImg.map((item)=>{
						if(this.checkImgSo(item)){
							mustUp++;
						}
					})
				}
				if(mustUp){
					this.upImgNow(upImg);	
				}else{
					this.upDateing(arr,allItem.id);
				}
				
			},
			upImgNow(upImg){
				let arr=[];
				let _this = this;
				let token = uni.getStorageSync('ACCESS_TOKEN');
				let mUrl=uni.getStorageSync('url');
				let imgData=upImg;
				let mustIn=0;
				// console.log(imgData);
				for(let d in imgData){
					if(imgData[d].length<20){
						imgData.splice(d,1)
					}
					if(imgData[d].length>1000){
						imgData[d]='data:image/jpeg;'+imgData[d];
						mustIn++;
					}
				}
				// console.log(imgData.length);
				for(let a in imgData){
					if(this.checkImgSo(imgData[a])){
						// console.log(imgData[a]);
						base64ToPath(imgData[a])
						  .then(path => {
						    console.log(path)
							uni.uploadFile({
								url: mUrl +
									'/admin/sys-file/upload', //仅为示例，非真实的接口地址
								filePath: path,
								name: 'file',
								formData: {
									'user': 'test'
								},
								header: {
									'Authorization':'Bearer ' + token
								},
								success: (uploadFileRes) => {
									// console.log(uploadFileRes);
									// console.log(JSON.parse(uploadFileRes.data));
									// console.log(JSON.parse(uploadFileRes.data).data);
									imgData[a]=JSON.parse(uploadFileRes.data).data.url;
									mustIn--;
									console.log(mustIn);
									if(!mustIn){
										this.undateListItem(imgData);
									}
								},
								fail: (err) => {
									console.log(err);
								}
							});
						  })
						  .catch(error => {
						    console.error(error)
						  })
					}
				}
			},
			upImgNow1(upImg){
				let arr=[];
				let _this = this;
				let token = uni.getStorageSync('ACCESS_TOKEN');
				let mUrl=uni.getStorageSync('url');
				let imgData=upImg;
				let mustIn=0;
				// console.log(imgData);
				for(let d in imgData){
					if(imgData[d].length<20){
						imgData.splice(d,1)
					}
					if(imgData[d].length>1000){
						imgData[d]='data:image/jpeg;'+imgData[d];
						mustIn++;
					}
				}
				// console.log(imgData.length);
				for(let a in imgData){
					if(this.checkImgSo(imgData[a])){
						// console.log(imgData[a]);
						base64ToPath(imgData[a])
						  .then(path => {
						    console.log(path)
							uni.uploadFile({
								url: mUrl +
									'/admin/sys-file/upload', //仅为示例，非真实的接口地址
								filePath: path,
								name: 'file',
								formData: {
									'user': 'test'
								},
								header: {
									'Authorization':'Bearer ' + token
								},
								success: (uploadFileRes) => {
									// console.log(uploadFileRes);
									// console.log(JSON.parse(uploadFileRes.data));
									// console.log(JSON.parse(uploadFileRes.data).data);
									imgData[a]=JSON.parse(uploadFileRes.data).data.url;
									mustIn--;
									console.log(mustIn);
									if(!mustIn){
										this.undateListItem1(imgData);
									}
								},
								fail: (err) => {
									console.log(err);
								}
							});
						  })
						  .catch(error => {
						    console.error(error)
						  })
					}
				}
			},
			undateListItem(res){
				console.log(res);
				let dataOut=this.classList[this.upIndex];
				let arr=JSON.parse(dataOut.children);
				let imgChar='';
				res.map((item)=>{
					imgChar+=item+';';
				})
				imgChar=imgChar.slice(0,imgChar.length-1);
				for(let a in arr){
					if(arr[a].type==4){
						arr[a].photoValue[0].photos=imgChar;
						break;	
					}
				}
				this.upDateing(arr,dataOut.id);
				
			},
			undateListItem1(res){
				console.log(res);
				let dataOut=this.quesList[this.upIndex1];
				let arr=JSON.parse(dataOut.children);
				let imgChar='';
				res.map((item)=>{
					imgChar+=item+';';
				})
				imgChar=imgChar.slice(0,imgChar.length-1);
				arr.photoPath=imgChar;
				this.upDateing1(arr,dataOut.time);
			},
			upDateing(arr,id){
				console.log(arr);
				this.$http.inspectResultSave(arr).then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
							DB.deleteTableData("classdata", "id",id)
								.then(res => {
									console.log("删除表数据成功");
								})
							this.upIndex++;
							this.updateClass();
					}
				})
			},
			upDateing1(arr,time){
				this.$http.inspectResultProblemSave(arr).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						DB.deleteTableData("questionclass", "time",time)
							.then(res => {
								console.log("删除表数据成功");
							})
							this.upIndex1++;
							this.updateQes();
					}
				})
			},
			checkImgSo(res){
				if(res.indexOf('admin/sys-file/planplat') == -1){
					return true;
				}else{
					return false;
				}
			},
			startInsp(res) {
				console.log(res);
				if(res.inspectState=='0'){
					this.startThisLine(res);
					return;
				}else{
					uni.navigateTo({
						url: '../onlineIns/linePoint/linePoint?line=' + res.projectName + '&id=' + res.id + '&projectId=' + res
							.projectId+'&state='+res.inspectState
					})
				}
			},
			swipeClick(id) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认取消？',
					success: res => {
						if (res.confirm) {
							let data = {
								id: id,
								inspectState: 3,
							};
							console.log(data);
							_this.$http.inspectUpdateState(data).then((res) => {
								console.log(res);
								if (res.code === 200 && res.success) {
									uni.showToast({
										title: '已取消',
										icon: 'none'
									})
									_this.getList();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			
			},
			getList() {
				let data = {
					inspectMan: this.userInfo.userId,
					inspectManName: this.userInfo.username,
					inspectType: 1,
					pageSize:-1,
					delFlag:0
				};
				console.log(data);
				this.$http.inspectRecord(data).then((res) => {
					console.log(res.page.list);
					if (res.code === 200 && res.success) {
						if (res.page.list.length > 0) {
							this.dataCache(res.page.list);
						}
					}
				})
			},
			dataCache(data){
				console.log(data.length);
				this.openSQL();
				DB.selectTableData("online")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("contact表数据", res.length);
							this.updateTableData(data);
						}else{
						this.createTable();
						this.insertTableData(data);	
						}
						this.selectTableData();
					})
					.catch(error => {
						console.log("查询失败", error);
						this.createTable();
						this.insertTableData(data);
						this.selectTableData();
					});
				// DB.deleteTableData("online", "children", "")
				// 	.then(res => {
				// 		console.log("删除表数据成功");
				// 	})
			},
			// 打开数据库
			openSQL() {
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
			createTable(data) {
					let sql =
						'"children" BLOB,"id" INTEGER';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("online", sql)
						.then(res => {
							console.log('创建onlinelist表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData(data) {
				let open = DB.isOpen();
				if (open) {
						let sql = `'${JSON.stringify(data)}','1'`;
						let condition = "'children','id'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("online", sql, condition)
							.then(res => {
								console.log('新增数据成功');
							})
							.catch(error => {
								console.log("失败", error);
							});
					
				} else {
					console.log("数据库未打开");
				}
			},
			// 查询表数据
			selectTableData() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("online")
						.then(res => {
							console.log("contact表数据", res.length);
							this.list=JSON.parse(res[0].children);
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					this.showToast("数据库未打开");
				}
			},
			// 修改表数据
		updateTableData(data) {
			let arr=data;
				let data1 = `children = '${JSON.stringify(arr)}'`;
				// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
				DB.updateTableData("online", data1, "id", 1)
					.then(res => {
						console.log("更新online表成功");
					})
					.catch(error => {
						console.log("修改失败", error);
					});
		},
		
		getTimerTemp(date){
			return Date.parse(date);
		},
			getONlineList(){
				this.$http.inspectonline().then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						uni.setStorageSync('onLineData',res.data);
						this.onLineData=res.data;
					}
				})
			},
			
			toPro(res){
				return;
				uni.navigateTo({
					url:'../onlineIns/onlineIns?inst='+res
				})
			},
			toPoint(res){
				console.log('we');
				uni.navigateTo({
					url:'unloadPointList/unloadPointList?name='+res.projectName+'&id='+res.projectId
				})
			},
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	min-height: 100vh;
	background-color: #f0f0f5;

}
.list{
	width: 690rpx;
	height: 100rpx;
	line-height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	border-bottom: 1rpx solid #F0F0F5;
}
.listL{
	width: 400rpx;
	overflow-x: hidden;
	text-overflow: ellipsis;white-space: nowrap;
	font-size: 30rpx;
	color: #545454;
}
.listR{
	font-size: 30rpx;
	color: #0193E9;
}
.listRImg{
	width: 30rpx;
	height: 30rpx;
	vertical-align: middle;
	margin-left: 16rpx;
}
.taskBox{
	width: 100%;
	height: auto;
	background-color: white;
	margin-top: 20rpx;
}
.taskTitle{
	width: 690rpx;
	height: 86rpx;
	border-bottom: 1rpx solid #F0F0F5;
	line-height: 85rpx;
	color: #545454;
	font-size: 30rpx;
	display: flex;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
	position: relative;
	padding-left: 50rpx;
}
.taskTitleI{
	width: 26rpx;
	height: 23rpx;
	position: absolute;
	left: 0;
	top: 30rpx;
}
.taskTitleR{
	font-size: 24rpx;
}
.taskInfoBox{
	width: 690rpx;
	margin: 0 auto;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.taskInfoItem{
	width: 180rpx;
	text-align: center;height: 120rpx;
	margin: 0 20rpx;
}
.bigText1{
	font-size: 48rpx;
	color: #FA8C34;
	font-weight: 700;
}
.bigText2{
	font-size: 48rpx;
	color: #FF6262;
	font-weight: 700;
}
.bigText3{
	font-size: 48rpx;
	color: #0193E9;
	font-weight: 700;
}
.smallText{
	font-size: 24rpx;
	color: #545454;
}
	.inspItem {
		width: 100%;
		height: 200rpx;
		background-color: white;
		box-sizing: border-box;
		padding: 0 30rpx 0 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		margin-top: 16rpx;
	}

	.inspItemL {
		width: 420rpx;
		height: 160rpx;
		/* background-color: #3FB0FF; */
	}

	.taskName {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rx;
		font-weight: 700;
		color: #393939;
		text-overflow: ellipsis;
		overflow-x: hidden;
		white-space: nowrap;
	}

	.taskTime {
		height: 50rpx;
		line-height: 50rpx;
		color: #333;
		font-size: 30rpx;
	}

	.taskAll {
		width: 100%;
		height: 48rpx;
		line-height: 48rpx;
		font-size: 24rpx;
		color: #6f6f6f;
	}
	.inspItemRAll{
		width: 140rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.inspItemR {
		width: 140rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background: linear-gradient(#0193e9 0%, #68bef1 100%);
		border-radius: 24rpx;
		color: white;
		font-size: 24rpx;
	}

	.inspItemR:active {
		background: linear-gradient(#68bef1 100%, #0193e9 0%);
	}

	.inspItemR1 {
		width: 140rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background-color: #bad0ec;
		border-radius: 24rpx;
		color: white;
		font-size: 24rpx;
	}

	.inspItemRC {
		width: 140rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		background-color: #ccc;
		border-radius: 24rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.inspItemRC:active {
		background-color: #999;
	}

	.statusImg {
		width: 91rpx;
		height: 87rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
	.nodata {
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999999;
	}

	.startInps {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
	}
.scrollA{
		width: 100%;
		height: calc(100vh - 200rpx);
		margin: 0 auto;
		background-color: #f0f0f5;
	}
</style>
