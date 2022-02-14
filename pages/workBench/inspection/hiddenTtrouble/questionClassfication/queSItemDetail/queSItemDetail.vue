<template>
	<view class="container">
		<view class="detailList" v-for="(item,index) in list">
			<view class="detailItem" @tap="openMore(index)">
				<view class="detailName">{{item.name}}</view>
				<image src="../../../../../../static/img/you.png" class="detailRight" :class="index==openNumIndex?'detailRight1':''" mode=""></image>
			</view>
			<view class="itemCont" v-show="openNumIndex==index">
				<view class="itemContItem" v-for="(item1,index1) in item.children" @tap="secNum(index,index1)">
					<image src="../../../../../../static/img/secOneOff.png" v-if="index1!=secNumIndex" class="itemContItemL" mode=""></image>
					<image src="../../../../../../static/img/secOneOn.png" v-else class="itemContItemL" mode=""></image>
					<view class="itemContItemR">
						<text>{{item1.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DB from "../../../../../../static/script/sqlite.js"
	export default {
		data() {
			return {
				list:[
					
				],
				openNumIndex:null,
				secIndex:null,
				secNumIndex:null,
				id:'',
				parentId:''
			}
		},
		onNavigationBarButtonTap(e) {
					console.log(this.secIndex,this.secNumIndex);
					if(this.secIndex!=null&&this.secNumIndex!=null){
						let data=this.list[this.secIndex].children[this.secNumIndex];
						uni.$emit("haveClass", data);
						uni.navigateBack({
							delta:2
						})
					}else{
						uni.showToast({
							title:'您还未选择内容！',
							icon:'none',
							duration:800
						})
					}
					
				},
		onLoad(options) {
			this.id = options.id || '';
			this.parentId = options.parentId || '';
			console.log(options);
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.getList();
					}else{
						_this.openSQL();
						_this.selectTableData();
					}
			    }
			});
		},
		methods: {
			getList() {
				let data = {
					type: 3,
					parent: this.parentId,
					recordId: this.id,
					
				};
				console.log(data);
				uni.showLoading({
					title: '数据加载中...'
				})
				this.$http.inspectRiskTree(data).then((res) => {
					console.log(res);
					uni.hideLoading();
					if (res.code === 200 && res.success) {
						console.log(res.list.length)
						if (res.list.length > 0) {
							this.dataCache(res.list);
						}
					}
				}).then((err) => {
					uni.hideLoading();
					// console.log(err);
				})
			},
			dataCache(data){
				this.openSQL();
				DB.selectTableData("classallsec")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("classallsec表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.parentId){
										isHave=true;
										break;
									}
								}
								if(isHave){
								this.updateTableData(data);	
								}else{
									this.insertTableData(data);
								}
								this.selectTableData();
							}
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
			createTable(data) {
					let sql =
						'"id" text,"children" BLOB';
					// 创建表 DB.createTable(表名, 表的列)
					DB.createTable("classallsec", sql)
						.then(res => {
							console.log('创建classallsec表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
			},
			// 新增表数据
			insertTableData(data) {
				let open = DB.isOpen();
				if (open) {
						let sql = `'${this.parentId}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("classallsec", sql, condition)
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
					DB.selectTableData("classallsec")
						.then(res => {
							console.log("classallsec表数据", res);
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==this.parentId){
										this.list=JSON.parse(arr[p1].children);
									    break;
									}
								}
							}
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
					let data1 = `children = '${JSON.stringify(data)}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("classallsec", data1, "id", this.parentId)
						.then(res => {
							console.log("更新classallsec表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
			openMore(res){
				if(res==this.openNumIndex){
					this.openNumIndex=null;
				}else{
					this.openNumIndex=res;
				}
			},
			secNum(res,res1){
				this.secIndex=res;
				if(res1==this.secNumIndex){
					this.secNumIndex=null;
				}else{
					this.secNumIndex=res1;
				}
			},
			calcInfo(res){
				console.log(res);
				for(let a in this.list){
					for(let b in this.list[a].content){
						console.log(this.list[a].content[b].id);
						if(this.list[a].content[b].id==res){
							this.secIndex=a;
							this.secNumIndex=b;
							this.openNumIndex=a;
						}
					}
				}
				console.log(this.secIndex,this.secNumIndex)
			}
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	padding-top: 10rpx;
}
.detailList{
	width: 100%;
	height: auto;
}
.detailItem{
		width: 690rpx;
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
		margin: 0 auto;
		border-bottom: 1rpx solid #F0F0F5;
		font-size: 30rpx;
		color: #545454;
}
.detailName{
	width: 90%;
	box-sizing: border-box;
overflow-x: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
.detailRight{
	width: 32rpx;
	height: 32rpx;
	position: absolute;
	right: 0;
	top: 34rpx;
	transition: 200ms ease-in;
}
.detailRight1{
	transform: rotate(-90deg);
}
.itemCont{
	width: 100%;
	height: auto;
	background-color: #F3F6F8;
	}
.itemContItem{
		width: 690rpx;
		height: auto;
		line-height: 40rpx;
		font-size: 26rpx;
		color: #545454;
		display: flex;
		justify-content: flex-start;
		margin: 0 auto;
		padding: 20rpx 0;
	}
	.itemContItemL{
		width: 22rpx;
		height: 22rpx;
		position: relative;
		top: 12rpx;
	}
	.itemContItemR{
		width: 650rpx;
		margin-left: 15rpx;
	}
</style>
