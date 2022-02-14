<template>
	<view class="content">
		<!-- 分列式 -->
		<view class="Sudoku">
			<view class="SudokuBox" v-for="(item,index) in data">
				<view class="SudokuBoxTitle">{{item.name}}</view>
				<view class="suFlex-box">
					<view @tap='tabClick(item1.name)' class="suFlex-box-item flex-sa-c-dc" v-for="(item1,index1) in item.children">
						<image v-if="index===0&&index1===0" src="../../static/workBenchNew/xj.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===0&&index1===1" src="../../static/workBenchNew/wdxj.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===0&&index1===2" src="../../static/workBenchNew/wtzz.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===0&&index1===3" src="../../static/workBenchNew/wdwt.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===1&&index1===0" src="../../static/workBenchNew/gjxx.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===1&&index1===1" src="../../static/workBenchNew/wdgj.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===1&&index1===2" src="../../static/workBenchNew/tj.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===1&&index1===3" src="../../static/workBenchNew/wdgg.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===2&&index1===0" src="../../static/workBenchNew/ssjk.png"
							class="suFlex-box-item-icon" mode=""></image>
						<image v-else-if="index===2&&index1===1" src="../../static/workBenchNew/spjk.png"
							class="suFlex-box-item-icon" mode=""></image>
						<view class="suFlex-box-item-text ta-c">{{item1.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DB from "../../static/script/sqlite.js"
	export default {
		data() {
			return {
				data: []
			}
		},
		onLoad() {
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.getMenuInfo();
					}else{
						_this.openSQL();
						_this.selectTableData();
					}
			    }
			});
		},
		methods: {
			getMenuInfo() {
				let data = {
					module: 'app'
				};
				this.$http.menuInfo(data).then((res) => {
					console.log(res);
					if(res.code===0){
						console.log(res,'res-------------------->')
						// this.data=res.data;
						this.dataCache(res.data);
					}
				})
			},
			dataCache(data){
				this.openSQL();
				DB.selectTableData("workbench")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("contact表数据", res);
							console.log(res.length);
							this.updateTableData(data);
							this.selectTableData();
						}else{
						this.createTable();
						this.insertTableData(data);	
						this.selectTableData();
						}
					})
					.catch(error => {
						console.log("查询失败", error);
						this.createTable();
						this.insertTableData(data);
						this.selectTableData();
					});
				// DB.deleteTableData("workbench", "name", "巡检管理")
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
			createTable(data) {
					let sql =
						'"id" INTEGER,"parentId" INTEGER,"children" BLOB,"name" text';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("workbench", sql)
						.then(res => {
							console.log('创建workbench表成功');
						})
						.catch(error => {
							this.showToast("创建表失败");
						});
				
			},
			// 新增表数据
			insertTableData(data) {
				let open = DB.isOpen();
				if (open) {
					let arr = data;
					arr.map(item => {
						let sql = `'${item.id}','${item.parentId}','${JSON.stringify(item.children)}','${item.name}'`;
						let condition = "'id','parentId','children','name'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("workbench", sql, condition)
							.then(res => {
								console.log('新增数据成功');
							})
							.catch(error => {
								console.log("失败", error);
							});
					})
				} else {
					console.log("数据库未打开");
				}
			},
			// 查询表数据
			selectTableData() {
				let open = DB.isOpen();
				if (open) {
					// 查询表 DB.selectTableData(表名,查询条件列名,查询条件列值)
					DB.selectTableData("workbench")
						.then(res => {
							console.log("contact表数据", res);
							// this.listData = res;
							console.log(res.length);
							for(let t in res){
								console.log(res[t]);
								res[t].children=JSON.parse(res[t].children);
							}
							this.data=res;
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
				let arr = data;
				arr.map(item => {
					let data = `children = '${JSON.stringify(item.children)}',name = '${item.name}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("workbench", data, "id", item.id)
						.then(res => {
							console.log("更新workbench表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
				})
			},
			tabClick(name) {
				console.log(name);
				let url='';
				if(name=='告警信息'){
					url='./alarmMsg/alarmMsg';
				}else if(name=='我的告警'){
					url='./myAlarm/myAlarm';
				}else if(name=='告警统计'){
					url='./alarmStatistics/alarmStatistics';
				}else if(name=='我的公告'){
					url='./notice/notice';
				}else if(name=='实时监控'){
					url='./realtimeMonitor/realtimeMonitor';
				}else if(name=='视频监控'){
					url='./videoMonitor/videoMonitor';
				}else if(name=='巡检任务'){
					url='./inspection/uploadInsp/uploadInsp';
				}else if(name=='问题追踪'){
					url='./inspection/abarbeitung/abarbeitung';
				}
				if(url){
					uni.navigateTo({
						url: url
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		width: 100%;
		min-height: 100vh;
		background-color: $work-bg;
	}

	.Sudoku {
		width: 100%;
		height: auto;
		padding-top: 23rpx;
	}

	.SudokuBox {
		width: 706rpx;
		height: auto;
		margin: 0 auto;
		background-color: $work-con-bg;
		padding-bottom: 23rpx;
		margin-bottom: 23rpx;
	}

	.SudokuBoxTitle {
		width: 100%;
		height: 88rpx;
		padding-left: 26rpx;
		box-sizing: border-box;
		line-height: 88rpx;
		font-weight: 700;
		color: $work-con-title;
		border-bottom: 1rpx solid #E8E8E8;
	}

	.suFlex-box {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

	}

	.suFlex-box-item {
		width: 25%;
		height: 200rpx;
		color: $work-con-text;
		font-size: 24rpx;
	}

	.suFlex-box-item:active {
		animation-name: bounce;
	}

	.suFlex-box-item-icon {
		width: 78rpx;
		height: 78rpx;
		margin-top: 20rpx;
	}

	.suFlex-box-item-text {
		width: 90%;
		height: 40rpx;
		line-height: 40rpx;
		position: relative;
		top: -20rpx;
	}

	.SudokuBox1 {
		width: 707rpx;
		height: auto;
		margin: 0 auto;
		background-color: inherit;
		padding-bottom: 23rpx;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.SudokuBox1-art-item {
		width: 234rpx;
		height: 240rpx;
		background-color: $work-con-bg;
		margin-bottom: 1rpx;
		color: $work-con-text;
		font-size: 24rpx;
	}

	.SudokuBox1-art-item:active {
		animation-name: bounce;
	}

	.sai1 {
		margin-right: 1rpx;
	}
</style>
