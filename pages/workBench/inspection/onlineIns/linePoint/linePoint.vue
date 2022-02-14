<template>
	<view class="container">
		<scroll-view class="headerSec" scroll-x="true">
			
				<view class="headerSecItem" @tap="secZero(index)" v-for="(item0,index) in list0 " :class="index0===index?'hSI':''">
					<text>{{item0.siteName}}</text>
				</view>
		
		</scroll-view>
		<view class="together">
			<scroll-view class="togetherL" scroll-y="trye">
				<view class="nodata" v-if="list1.length===0">暂无数据</view>
				<view class="togetherLItem" :class="index==index1?'sectogetherLItem':''" @tap="secInOne(index)" v-for="(item,index) in list1">
					<view class="togetherLItemT">{{item.name}}</view>
				</view>
			</scroll-view>
			<scroll-view class="togetherR" scroll-y="trye">
				<view class="nodata" v-if="list2.length===0">该风险类型暂无风险点数据</view>
				<view class="togetherRItem" v-for="(item,index) in list2" @tap="toPoint(item.id)">
					<view class="togetherRItemIn">
						<view class="">{{item.name}}</view>
						<view class="blueT" :style="item.isFinshed!='1'?'color:#999999':''">{{item.isFinshed!='1'?'未完成':'已完成'}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import DB from "../../../../../static/script/sqlite.js"
	export default {
		data() {
			return {
				title:'',
				id:'',
				projectId:'',
				id:'',
				list0:[],
				list1:[],
				list2:[],
				index0:0,
				index1:0,
				index2:0,
				projectName:'',
				pjId:'',
				widthN:0,
				state:'',
				sdcSiteName:'',
				sdcSiteId:''
			}
		},
		onLoad(options) {
			console.log(options);
			let title=options.line||'';
			this.title=options.line||'';
			this.id=options.id||'';
			this.state=options.state||'';
			this.projectId=options.projectId||'';
		},
		onNavigationBarButtonTap() {
			console.log(this.state);
			if(this.state=='0'){
			this.inspectIsFinished();	
			}
		},
		onShow() {
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.getList();
					}else{
						_this.openSQL();
						_this.selectTableData1();
					}
			    }
			});
		},
		methods: {
			inspectIsFinished(res) {
				let _this = this;
				let data = {
					recordId: this.id,
					routeId: this.projectId
				};
				console.log(data);
				this.$http.inspectIsFinished(data).then((res1) => {
					console.log(res1);
					if (res1.code === 200 && res1.success) {
						if (res1.data) {
							let data = {
								id: this.id,
								inspectState: 2,
							};
							console.log(data);
							_this.$http.inspectUpdateState(data).then((res) => {
								console.log(res);
								if (res.code === 200 && res.success) {
									uni.showToast({
										title: '提交成功！',
										icon: 'none'
									})
									setTimeout(()=>{
										uni.navigateBack({
											
										})
									},1000)
								}
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '有未完成的检查项，是否确认提交？',
								success(e) {
									if (e.confirm) {
										let data = {
											id: _this.id,
											inspectState: 2,
										};
										console.log(data);
										_this.$http.inspectUpdateState(data).then((res) => {
											console.log(res);
											if (res.code === 200 && res.success) {
												uni.showToast({
													title: '提交成功！',
													icon: 'none'
												})
												setTimeout(()=>{
													uni.navigateBack({
														
													})
												},1000)
											}
										})
									}
			
								}
							})
						}
					}
				})
			},
			secZero(res){
			if(this.index0!=res){
				this.index0=res;
				this.list1=[];
				this.list2=[];
				this.index1=0;
				this.index2=0;
				let _this=this;
				uni.getNetworkType({
				    success: function (res) {
				        console.log(res);
						let type=res.networkType;
						if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
							_this.getList1();
						}else{
							_this.openSQL();
							_this.selectTableData1();
						}
				    }
				});
				}
				
				
			},
			secInOne(res){
				if(this.index1!=res){
					this.index1=res;
					this.list2=[];
					this.index2=0;
					console.log(this.list1);
					let _this=this;
					uni.getNetworkType({
					    success: function (res) {
					        console.log(res);
							let type=res.networkType;
							if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
								_this.getList2(_this.list1[res].id);
							}else{
								_this.openSQL();
								_this.selectTableData2();
							}
					    }
					});
				}
				
			},
			toPoint(res){
				console.log(res);
				uni.navigateTo({
					url:'inspPoint/inspPointTypeClass/inspecific/inspecific?siteId='+this.list0[this.index0].id+'&siteName='+this.list0[this.index0].siteName+'&recordId='+
					this.id+'&id='+res+'&classId='+this.list1[this.index1].id+'&projectName='+this.title+'&pjId='+this.projectId+'&state='+this.state+"&sdcSiteName="+this.sdcSiteName+
					'&sdcSiteId='+this.sdcSiteId
				})
			},
			getList(){
				let data={
					id:this.projectId,
					recordId:this.id
				};
				console.log(data);
				this.$http.inspectRouteQueryById(data).then((res)=>{
					console.log(res);
					console.log(res.inspectRoute.siteList.length);
					if(res.code===200&&res.success){
							this.dataCache1(res.inspectRoute);
					}
				})
			},
			dataCache1(data){
				this.openSQL();
				DB.selectTableData("point1")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("contact表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.id){
										isHave=true;
										break;
									}
								}
								if(isHave){
								this.updateTableData1(data);	
								}else{
									this.insertTableData1(data);
								}
								this.selectTableData1();
							}
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
				// DB.deleteTableData("point1", "id", "c9e6df615ef64bf88560e188a1c82c2e")
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
						'"id" text,"children" BLOB';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("point1", sql)
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
				if (open) {
						let sql = `'${this.id}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("point1", sql, condition)
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
			selectTableData1() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("point1")
						.then(res => {
							console.log("contact表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==this.id){
										this.list0=JSON.parse(arr[p1].children).siteList;
										this.sdcSiteId=JSON.parse(arr[p1].children).sdcSiteId;
										this.sdcSiteName=JSON.parse(arr[p1].children).sdcSiteName;
										console.log(this.list0);
										let _this=this;
										uni.getNetworkType({
										    success: function (res) {
										        console.log(res);
												let type=res.networkType;
												if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
													_this.getList1();
												}else{
													_this.openSQL();
													_this.selectTableData2();
												}
										    }
										});
									}
								}
							}
							
							// this.data=res;
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					this.showToast("数据库未打开");
				}
			},
			// 修改表数据
			updateTableData1(data) {
					let data1 = `children = '${JSON.stringify(data)}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("point1", data1, "id", this.id)
						.then(res => {
							console.log("更新point1表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
			getList1(){
				let data={
					siteId:this.list0[this.index0].id,
					recordId:this.id,
					
				};
				console.log(data);
				this.$http.inspectSitereeList(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						if(res.data.length>0){
							// this.list1=res.data;
							// this.getList2();
							this.dataCache2(res.data);
						}
					}
				})
			},
			dataCache2(data){
				this.openSQL();
				DB.selectTableData("point2")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("contact1表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.list0[this.index0].id){
										isHave=true;
										break;
									}
								}
								if(isHave){
								this.updateTableData2(data);	
								}else{
									this.insertTableData2(data);
								}
								this.selectTableData2();
							}
						}else{
						this.createTable2();
						this.insertTableData2(data);
						this.selectTableData2();
						}
					})
					.catch(error => {
						console.log("查询失败", error);
						this.createTable2();
						this.insertTableData2(data);
						this.selectTableData2();
					});
				// DB.deleteTableData("workbench", "name", "巡检管理")
				// 	.then(res => {
				// 		console.log("删除表数据成功");
				// 	})
			},
			// 创建表
			createTable2(data) {
					let sql =
						'"id" text,"children" BLOB';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("point2", sql)
						.then(res => {
							console.log('创建point2表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData2(data) {
				let open = DB.isOpen();
				if (open) {
						let sql = `'${this.list0[this.index0].id}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("point2", sql, condition)
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
			selectTableData2() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("point2")
						.then(res => {
							console.log("contact1表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==this.list0[this.index0].id){
										this.list1=JSON.parse(arr[p1].children);
										let _this=this;
										uni.getNetworkType({
										    success: function (res) {
										        console.log(res);
												let type=res.networkType;
												if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
													_this.getList2();
												}else{
													_this.openSQL();
													_this.selectTableData3();
												}
										    }
										});
									}
								}
							}
							
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					console.log("数据库未打开");
				}
			},
			// 修改表数据
			updateTableData2(data) {
					let data1 = `children = '${JSON.stringify(data)}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("point2", data1, "id", this.list0[this.index0].id)
						.then(res => {
							console.log("更新point2表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
			getList2(){
				let data={
					siteId:this.list0[this.index0].id,
					recordId:this.id,
					nodeId:this.list1[this.index1].id
				};
				console.log(data);
				this.$http.inspectSitereeList(data).then((res)=>{
					console.log(res.data);
					if(res.code===200&&res.success){
						if(res.data.length>0){
							// this.list2=res.data;
							this.dataCache3(res.data);
						}
					}
				})
			},
			dataCache3(data){
				this.openSQL();
				DB.selectTableData("point3")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("contact2表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.list1[this.index1].id){
										isHave=true;
										break;
									}
								}
								if(isHave){
								this.updateTableData3(data);	
								}else{
									this.insertTableData3(data);
								}
								this.selectTableData3();
							}
						}else{
						this.createTable3();
						this.insertTableData3(data);
						this.selectTableData3();
						}
					})
					.catch(error => {
						console.log("查询失败", error);
						this.createTable3();
						this.insertTableData3(data);
						this.selectTableData3();
					});
				// DB.deleteTableData("point3", "id", "adef58de0a564b1899796dc4022f56a5")
				// 	.then(res => {
				// 		console.log("删除表数据成功");
				// 	})
			},
			// 创建表
			createTable3(data) {
					let sql =
						'"id" text,"children" BLOB';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("point3", sql)
						.then(res => {
							console.log('创建point3表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData3(data) {
				let open = DB.isOpen();
				if (open) {
						let sql = `'${this.list1[this.index1].id}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("point3", sql, condition)
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
			selectTableData3() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("point3")
						.then(res => {
							console.log("contact2表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==this.list1[this.index1].id){
										this.list2=JSON.parse(arr[p1].children);
									}
								}
							}
							
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					console.log("数据库未打开");
				}
			},
			// 修改表数据
			updateTableData3(data) {
					let data1 = `children = '${JSON.stringify(data)}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("point3", data1, "id", this.list1[this.index1].id)
						.then(res => {
							console.log("更新point2表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	height: auto;
	/* padding-top: 20rpx; */
}
.headerSec{
	width: 100vw;
	height: 90rpx;
	background-color: #fff;
	 overflow: hidden;
	        white-space: nowrap;
}
.headerSecItem{
	width: 25vw;
	height: 100%;
	line-height: 90rpx;
    display: inline-block;
	text-align: center;
	font-size: 26rpx;
	color: #545454;
	box-sizing: border-box;
	padding: 0 12rpx;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.hSI{
	color: #0193E9;
	border-bottom: 1rpx solid #0193E9;
}
	.nodata{
		width: 100%;
		line-height: 200rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999999;
	}
	.together{
		width: 100%;
		height: calc(100vh - 90rpx);
		/* background: #007AFF; */
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.togetherL{
		width: 240rpx;
		height: 100%;
		background-color: white;
	}
	.togetherR{
		width: 510rpx;
		height: 100%;
		background-color: #f0f0f5;
	}
	.togetherLItem{
		width: 100%;
		line-height: 48rpx;
		color: #7D7D7D;
		position: relative;
		padding: 20rpx 0;
		/* margin-top: 10rpx; */
		transition: 100ms ease;
	}
	.sectogetherLItem{
		background-color: #f0f0f5;
		color: #333;
	}
	.togetherLItemT{
		width: 180rpx;
		margin: 0 auto;
		font-size: 26rpx;
	}
	.classSucee{
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
	.togetherRItem{
		width: 100%;
		line-height: 48rpx;
		color: #424242;
		font-size: 28rpx;
		padding: 20rpx 0;
		transition: 100ms ease;
	}
	.togetherRItem:active{
		background-color: white;
	}
	.togetherRItemIn{
		width: 90%;
		margin: 0 auto;
	}
	.blueT{
		color: #0193E9;
		font-size: 24rpx;
	}
</style>
