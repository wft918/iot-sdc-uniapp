<template>
	<view class="container">
		<view class="together">
			<scroll-view class="togetherL" scroll-y="trye">
				<view class="togetherLItem" :class="index==index1?'sectogetherLItem':''" @tap="secInOne(index)" v-for="(item,index) in list">
					<view class="togetherLItemT">{{item.name}}</view>
				</view>
			</scroll-view>
			<scroll-view class="togetherR" scroll-y="trye">
				<view class="nodata" v-if="list1.length===0">该风险类型暂无风险点数据</view>
				<view class="togetherRItem" v-for="(item,index) in list1" @tap="toPoint(item.id)">
					<view class="togetherRItemIn">
						<view class="">{{item.name}}</view>
						<view class="blueT" :style="item.isFinshed!='已完成'?'color:#999999':''">{{item.isFinshed!='已完成'?'未完成':'已完成'}}</view>
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
				id:'',
				list0:[],
				list:[],
				list1:[],
				index0:0,
				index1:0,
				index2:0,
				projectName:'',
				pjId:'',
				widthN:0
			}
		},
		onLoad(options) {
			this.userInfo = uni.getStorageSync('userinfo');
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
		onShow() {
		},
		methods: {
			secInOne(res){
				if(this.index1!=res){
					this.index1=res;
					this.list1=[];
					this.index2=0;
					let _this=this;
					uni.getNetworkType({
					    success: function (res) {
					        console.log(res);
							let type=res.networkType;
							if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
								_this.getList1(_this.list[_this.index1].id);
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
				url:'queSItemDetail/queSItemDetail?id='+this.list[this.index1].id+'&parentId='+res
			})
		},
			getList(id){
				let data={
					type:1,
					
				};
				console.log(data);
				this.$http.inspectRiskTree(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						if(res.list.length>0){
							console.log(res.list.length);
							this.dataCache1(res.list);
							
						}
					}
				})
			},
			dataCache1(data){
				this.openSQL();
				DB.selectTableData("clasesec1")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("contact表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==1){
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
					DB.createTable("clasesec1", sql)
						.then(res => {
							console.log('创建clasesec1表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData1(data) {
				let open = DB.isOpen();
				if (open) {
						let sql = `'${1}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("clasesec1", sql, condition)
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
					DB.selectTableData("clasesec1")
						.then(res => {
							console.log("contact表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==1){
										this.list=JSON.parse(arr[p1].children);
										console.log(this.list);
										let _this=this;
										uni.getNetworkType({
										    success: function (res) {
										        console.log(res);
												let type=res.networkType;
												if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
													_this.getList1(_this.list[0].id);
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
					DB.updateTableData("clasesec1", data1, "id", 1)
						.then(res => {
							console.log("更新clasesec1表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
			getList1(id){
				let data={
					type:2,
					parent:id
				};
				console.log(data);
				
				this.$http.inspectRiskTree(data).then((res)=>{
					console.log(res);
					if(res.code===200&&res.success){
						if(res.list.length>0){
							this.dataCache2(res.list,id)
							// this.list1=res.list;
						}
					}
				})
			},
			dataCache2(data,id){
				this.openSQL();
				DB.selectTableData("clasesec2")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("clasesec2表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.list[this.index1].id){
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
					DB.createTable("clasesec2", sql)
						.then(res => {
							console.log('创建clasesec2表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData2(data) {
				console.log(data.length);
				let open = DB.isOpen();
				console.log(this.list[this.index1].id);
				if (open) {
						let sql = `'${this.list[this.index1].id}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("clasesec2", sql, condition)
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
					DB.selectTableData("clasesec2")
						.then(res => {
							console.log("clasesec2表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==this.list[this.index1].id){
										this.list1=JSON.parse(arr[p1].children);
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
					DB.updateTableData("clasesec2", data1, "id", this.list[this.index1].id)
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
	background-color: #ffbcd2;
}
.headerSecBox{
	min-width: 100vw;
	display: flex;
	height: 90rpx;
	justify-content: flex-start;
	flex-wrap: nowrap;
}
.headerSecItem{
	width: 33vw;
	height: 100%;
	line-height: 90rpx;
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
		background: #007AFF;
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
