<template>
	<view class="container">
		<view class='topOp'>
			<view class="searchA">
				<view class="searchAL">
					<input type="text" @input="calcSearChar()" @confirm="searchTitle()" v-model="searchText" class="searchALIn" placeholder="请输入关键字搜索" placeholder-style="color:#bbb" />
				</view>
				<view class="searchAR" @tap="searchTitle()">
					<image src="../../../../static/img/sea.png" class="seaIcon" mode=""></image>
				</view>
			</view>
			<scroll-view class="topNav" scroll-x="true">
				<view class="topNavX">
					<view class="topNavItem" @tap="changeIndex(0)" :class="secIndex=='0'?'secC':''">所有</view>
					<view class="topNavItem" @tap="changeIndex(1)" :class="secIndex=='1'?'secC':''">由我创建</view>
					<view class="topNavItem" @tap="changeIndex(2)" :class="secIndex=='2'?'secC':''">指派给我</view>
					<view class="topNavItem" @tap="changeIndex(3)" :class="secIndex=='3'?'secC':''">未解决</view>
					<view class="topNavItem" @tap="changeIndex(4)" :class="secIndex=='4'?'secC':''">待验收</view>
					<view class="topNavItem" @tap="changeIndex(5)" :class="secIndex=='5'?'secC':''">已完成</view>
					<view class="secLine" :class="{'secl1':(secIndex=='1'),'secl2':(secIndex=='2'),'secl3':(secIndex=='3'),'secl4':(secIndex=='4'),'secl5':(secIndex=='5'),}"></view>
				</view>
			</scroll-view>
		</view>
		<view class="list" @tap='toDetail(item)' v-for="(item,index) in list">
			<image src="../../../../static/img/wks.png" class="statusImg" v-if="item.state=='1'" mode=""></image>
			<image src="../../../../static/img/zgz.png" class="statusImg" v-if="item.state=='2'" mode=""></image>
			<image src="../../../../static/img/dys.png" class="statusImg" v-if="item.state=='3'" mode=""></image>
			<image src="../../../../static/img/wtg.png" class="statusImg" v-if="item.state=='5'" mode=""></image>
			<image src="../../../../static/img/ywc.png" class="statusImg" v-if="item.state=='6'" mode=""></image>
			<!-- <image src="../../../../static/img/ygq.png" class="statusImg" v-if="item.overdued=='1'" mode=""></image> -->
			
			<view class="listBox">
				<view class="listBoxL">
					<view class="title">{{item.title}}</view>
					<view class="creatTime">{{item.createDate}}</view>
					<view class="content">{{item.content}}</view>
					<view class="endTime">{{item.deadline}}截止<text class="deadLine" v-show="item.overdued=='1'">已逾期</text></view>
				</view>
				<view class="listBoxR">
					<image :src="imgUrl+item.photoPath" class="listBoxRImg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="noData" v-show="list.length===0">{{warnText}}</view>
		
	</view>
</template>

<script>
	import DB from "../../../../static/script/sqlite.js"
	export default {
		data() {
			return {
				secIndex:0,
				userInfo:{},
				list:[],
				imgUrl:'',
				searchText:'',
				warnText:'暂无数据',
				listAll:[]
			}
		},
		onLoad() {
			this.imgUrl=uni.getStorageSync('url');
			console.log(this.imgUrl);
			this.userInfo=uni.getStorageSync('userinfo');
			console.log(this.userInfo);
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
						_this.selectTableData();
						
					}
			    }
			});
		},
		onPullDownRefresh() {
		this.getList();
			 setTimeout(function () {
			            uni.stopPullDownRefresh();
			        }, 1000);
		},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url:'../hiddenTtrouble/hiddenTtrouble'
		})
	},
		methods: {
			calcSearChar(e){
				if(!this.searchText){
					this.getList();
				}
			},
			searchTitle(){
				if(this.searchText!=''){
					plus.key.hideSoftKeybord();
					let data = {
						title:this.searchText
					};
					console.log(data);
					this.$http.inspectProblemList(data).then((res) => {
						console.log( res)
						this.list=[];
						if (res.code === 200 & res.success) {
							if(res.page.list.length>0){
								this.list=res.page.list;
							}else{
								this.warnText='未搜索都内容'
							}
						}
					})
				}else{
					uni.showToast({
						title:'请先输入关键字！',
						icon:'none',
						duration:1000
					})
				}
			},
			getList() {
				let data = {};
				if(this.secIndex=='0'){
					
				}else if(this.secIndex=='1'){
					data={
						reportMan:this.userInfo.userId
					};
				}
				else if(this.secIndex=='2'){
					data={
						solveMan:this.userInfo.userId
					};
				}else if(this.secIndex=='3'){
					data={
						stateStr:'1,5'
					};
				}else if(this.secIndex=='4'){
					data={
						stateStr:3
					};
				}else if(this.secIndex=='5'){
					data={
						stateStr:6
					};
				}
				this.$http.inspectProblemList(data).then((res) => {
					console.log('qwer1', res)
					this.list=[];
					if (res.code === 200 & res.success) {
						if(res.page.list.length>0){
							// this.calcList(res.page.list);
							this.dataCache(res.page.list);
						}else{
							this.warnText='暂无数据'
						}
					}
				})
			},
			dataCache(data){
					console.log(data.length);
					this.openSQL();
					DB.selectTableData("quality")
						.then(res => {
							console.log("quality表数据", res);
							console.log(res.length);
							if(res.length){
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
							'"children" BLOB,"id" text';
						// 创建表 DB.createTable(表名, 表的列)
						DB.createTable("quality", sql)
							.then(res => {
								console.log('创建quality表成功');
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
							DB.insertTableData("quality", sql, condition)
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
						DB.selectTableData("quality")
							.then(res => {
								console.log("quality表数据", res.length);
								if(res.length){
									this.calcList(JSON.parse(res[0].children));
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
				let arr=data;
					let data1 = `children = '${JSON.stringify(arr)}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("quality", data1, "id", 1)
						.then(res => {
							console.log("更新quality表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
			calcList(list){
				let data=list;
				for(let d in data){
					if(data[d].photoPath){
						let strs= new Array(); //定义一数组
						strs=data[d].photoPath.split(";"); //字符分割
						// console.log(strs);
						data[d].photoPath=strs[0];
					}
				}
				this.list=data;
				this.listAll=data;
				console.log(data);
			},
			toDetail(res){
					// uni.navigateTo({
					// 	url:'abarDetail/abarDetail'
					// })
					uni.navigateTo({
						url:'../checking/checking?id='+res.id
					})
				
			},
			changeIndex(res){
				if(res!=this.secIndex){
					this.secIndex=res;
					this.getList();
				}
			},
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	min-height: calc(100vh - 240rpx);
	padding-top: 220rpx;
	background-color: #f0f0f5;
	padding-bottom: 20rpx;
}
.topOp{
	width: 100%;
	height:200rpx ;
	background-color: #ffffff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	box-sizing: border-box;
	padding-top: 20rpx;
}
.searchA{
	width: 690rpx;
	height: 80rpx;
	border: 1rpx solid #0193E9;
	margin: 0 auto;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
}
.searchAL{
	width: 570rpx;
	height: 78rpx;
	/* background-color: #59a1ff; */
}
.searchALIn{
	width: 570rpx;
	height: 78rpx;
	display: block;
	padding: 0 20rpx;
	color: #333;
	font-size: 30rpx;
}
.searchAR{
	width: 120rpx;
	height: 78rpx;
	background-color: #0193E9;
	font-size: 28rpx;
	color: white;
	text-align: center;
	line-height: 78rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.searchAR:active{
	background-color: #007AFF;
}
.seaIcon{
	width: 60rpx;
	height: 60rpx;
}
.topNav{
	width:100%;
	height: 90rpx;
	background-color: white;
	
}
.topNavX{
	width: 120vw;
	height: 90rpx;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.topNavItem{
	width: 20vw;
	height: 100%;
	line-height: 90rpx;
	color: #646464;
	font-size: 26rpx;
	text-align: center;
	position: relative;
	transition: 200ms ease-in-out;
	}
	.secC{
		color: #0193E9;
	}
	.secLine{
		width: 11vw;
		height: 4rpx;
		background-color: #0193E9;
		position: absolute;
		bottom: 0;
		left: 4.5vw;
		transition: 200ms ease-in-out;
	}
	.secl1{
		left: 24.5vw;
	}
	.secl2{
		left: 44.5vw;
	}
	.secl3{
		left: 64.5vw;
	}
	.secl4{
		left: 84.5vw;
	}
	.secl5{
		left: 104.5vw;
	}
.list{
    width: 100%;
	height: 320rpx;
	background-color: white;
	margin-bottom: 20rpx;
	position: relative;
	box-sizing: border-box;
	padding-top: 48rpx;
}
.statusImg{
		width: 91rpx;
		height: 87rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
.listBox{
	width: 690rpx;
	height: 220rpx;
	/* background-color: #BAD0EC; */
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.listBoxL{
	width: 440rpx;
	height: 220rpx;
	/* background-color: #55aaff; */
}
.listBoxR{
	width: 200rpx;
	height: 220rpx;
	/* background-color: #ffaa00; */
}
.listBoxRImg{
	width: 200rpx;
	height: 200rpx;
	background-color: #cccccc;
}
.title{
	width: 100%;
	height: 48rpx;
	line-height: 48rpx;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 28rpx;
	color: #393939;
	font-weight: 700;
	/* background-color: #007AFF; */
}
.creatTime{
	width: 100%;
	line-height: 60rpx;
	color: #A8A7A7;
	font-size: 26rpx;
}
.content{
	width: 100%;
	line-height: 36rpx;
	height: 72rpx;
	color: #707070;
	font-size: 26rpx;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  /* display: box; */
	  line-clamp: 2;
	  box-orient: vertical;
}
.endTime{
	color: #0193E9;
	font-size: 22rpx;
	margin-top: 16rpx;
}
.noData{
	width: 100%;
	line-height: 200rpx;
	color: #999;
	text-align: center;
	font-size: 26rpx;
}
.deadLine{
	width: 80rpx;
	font-size: 24rpx;
	height: 36rpx;
	padding: 0 12rpx;
	background-color: #fd544e;
	color: white;
	text-align: center;
	border-radius: 8rpx;
	margin-left: 10rpx;
}
</style>
