<template>
	<view class="container">
		<view class="searchOut">
			<view class="searchBox">
				<image src="/static/img/search.png" class="searchBtn" mode=""></image>
				<input type="text" value="" class='searchInput' placeholder="请输入联系人姓名" v-model="searchStr"
					@input="startSe()" />
			</view>
		</view>
		<scroll-view class="scrollIv" :style="{height: scrollH+'px'}" scroll-y="true" :scroll-into-view='secFirstChar'
			scroll-with-animation="ease">
			<view v-show="!searchStr">
				<view v-for="(item,index) in friendList" :key="index+'username'" :id="item.charact"
					v-if="item.data.length>0">
					<view class="charactName">{{item.charact}}</view>
					<view class="contactList" v-for="(item1,index1) in item.data" :key="item1.id"
						:style="index1==(item.data.length-1)?'	padding-bottom: 30rpx;':''">
						<view class="contactListItem" @tap='seMore(item1)'>
							<image src="/static/img/defaultAvatar.png" class="friIMg" mode=""></image>
							<view class="friName">{{item1.username}}</view>
						</view>
						<image src="../../../../static/img/secContact.png" v-show="secInfo.userId==item1.userId"
							class="secContact"></image>
					</view>
				</view>
			</view>
			<view v-show="searchStr">
				<view v-show="searchList.length===0" class="noData">没有找到联系人</view>
				<view class="contactList" v-show="searchList.length>0" v-for="(item1,index1) in searchList"
					:key="index1+'hetomi1'">
					<view class="contactListItem" @tap='seMore(item1)'>
						<image
							:src="item1.headPortraitUrl?item1.headPortraitUrl:'../../../../static/img/defaultAvatar.png'"
							class="friIMg" mode=""></image>
						<view class="friName">{{item1.name}}</view>
					</view>
					<image src="../../../../static/img/secContact.png" v-show="secInfo.userId==item1.userId"
						class="secContact">
					</image>
				</view>
			</view>

		</scroll-view>

		<view class="rightGuide">
			<view class="rightGuideItem" :class="secCharIndex==index2?'RGS':''" @tap="secChar(index2,item2)"
				v-for="(item2,index2) in charactGuideList" :key="item2">{{item2}}</view>
		</view>
	</view>
</template>

<script>
	import {
		chinesecharToPinyin
	} from '../../../../common/getLetter.js'
	import DB from "../../../../static/script/sqlite.js"
	export default {
		data() {
			return {
				searchStr: '',
				friendList: [{
						charact: 'A',
						data: []
					},
					{
						charact: 'B',
						data: []
					},
					{
						charact: 'C',
						data: []
					},
					{
						charact: 'D',
						data: []
					},
					{
						charact: 'E',
						data: []
					},
					{
						charact: 'F',
						data: []
					},
					{
						charact: 'G',
						data: []
					},
					{
						charact: 'H',
						data: []
					},
					{
						charact: 'J',
						data: []
					},
					{
						charact: 'K',
						data: []
					},
					{
						charact: 'L',
						data: []
					},
					{
						charact: 'M',
						data: []
					},
					{
						charact: 'N',
						data: []
					},
					{
						charact: 'O',
						data: []
					},
					{
						charact: 'P',
						data: []
					},
					{
						charact: 'Q',
						data: []
					},
					{
						charact: 'R',
						data: []
					},
					{
						charact: 'S',
						data: []
					},
					{
						charact: 'T',
						data: []
					},
					{
						charact: 'W',
						data: []
					},
					{
						charact: 'X',
						data: []
					},
					{
						charact: 'Y',
						data: []
					},
					{
						charact: 'Z',
						data: []
					},
				],
				charactGuideList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
					'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				secCharIndex: null,
				secFirstChar: '',
				scrollH: 0,
				userInfo: {},
				searchList: [],
				secInfo: {
					userId: ''
				}
			}
		},
		onLoad(options) {
			this.secInfo.userId = options.userId || '';
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					// console.log(res);
					let navH = res.statusBarHeight;
					let winH = res.windowHeight;
					if (res.platform == 'android') {
						_this.scrollH = winH - navH - 40;
						// console.log(_this.scrollH);
					}
				}
			})
			this.userInfo = uni.getStorageSync('userinfo');
			console.log(this.userInfo);
			this.getUserInfo();
		},
		onShow() {
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.contactListInfo();
					}else{
						_this.selectTableData();
					}
			    }
			});
		},
		onNavigationBarButtonTap(e) {
			console.log(e);
			uni.$emit("handleFun", this.secInfo);
			uni.navigateBack()
		},
		methods: {
			getUserInfo() {
				this.$http.userInfo().then((res) => {
					// console.log(res);
					if (res.code === 0) {
						uni.setStorageSync('userinfo', res.data.sysUser);
						this.userInfo = uni.getStorageSync('userinfo');
					} else {
						uni.showToast({
							title: '获取用户信息失败！',
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			startSe() {
				console.log(this.friendList);
				if (this.searchStr) {
					let arr = [];
					for (let a of this.friendList) {
						for (let b of a.data) {
							console.log(b.allName)
							if (b.name.search(this.searchStr) != -1 | b.allName.search(this.searchStr) != -1) {
								arr.push(b);
							}
						}
					}
					this.searchList = arr;
				}
				// console.log(this.searchList);
			},
			contactListInfo() {
				let _this = this;
				let commoneUrl = uni.getStorageSync('url');
				let accessToken = uni.getStorageSync('ACCESS_TOKEN');
				console.log(this.userInfo.userId);
				let urls = commoneUrl + '/admin/user/page';
				console.log(urls);
				uni.request({
					url: urls,
					data: {
						current: 1,
						size:10000
					},
					method: "GET",
					dataType: 'json',
					header: {
						'content-type': 'application/json',
						'Authorization': 'Bearer ' + accessToken
					},
					success: function(res) {
						console.log(res)
						if (res.statusCode === 200 & res.data.code === 0) {
							if (res.data.data.records.length > 0) {
								_this.dataCache(res.data.data.records);
							}
						}

					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			dataCache(data) {
				this.openSQL();
				DB.selectTableData("friendlist")
					.then(res => {
						console.log(res.length);
						if (res.length) {
							console.log("classall表数据", res);
							console.log(res.length);
							if (res.length > 0) {
								let isHave = false;
								let arr = res;
								for (let p1 in arr) {
									if (arr[p1].id ==1) {
										isHave = true;
										break;
									}
								}
								if (isHave) {
									this.updateTableData(data);
								} else {
									this.insertTableData(data);
								}
								this.selectTableData();
							}
						} else {
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
				// DB.deleteTableData("friendlist", "id", "1")
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
				DB.createTable("friendlist", sql)
					.then(res => {
						console.log('创建friendlist表成功');
					})
					.catch(error => {
						console.log("创建表失败");
					});
			},
			// 新增表数据
			insertTableData(data) {
				let open = DB.isOpen();
				if (open) {
					let sql = `'${1}','${JSON.stringify(data)}'`;
					let condition = "'id','children'";
					// 新增 DB.insertTableData(表名, 对应表头列的数据)
					DB.insertTableData("friendlist", sql, condition)
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
					DB.selectTableData("friendlist")
						.then(res => {
							console.log("friendlist表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr = res;
							if (res.length > 0) {
								for (let p1 in arr) {
									if (arr[p1].id == 1) {
										this.dataPre(JSON.parse(arr[p1].children));
										break;
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
			updateTableData(data) {
				let data1 = `children = '${JSON.stringify(data)}'`;
				// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
				DB.updateTableData("friendlist", data1, "id", 1)
					.then(res => {
						console.log("更新friendlist表成功");
					})
					.catch(error => {
						console.log("修改失败", error);
					});
			},
			secChar(res, res1) {
				this.secCharIndex = res;
				this.secFirstChar = res1
			},
			seMore(res) {
				console.log(res);
				this.secInfo = res;


			},
			dataPre(res) {
				let data = res;
				for (let a of data) {
					let isletter2 = /^[a-zA-Z]+$/.test(a.username.charAt(0));
					if (isletter2) {
						a.allName = a.username.charAt(0).toUpperCase();
					} else {
						a.allName = chinesecharToPinyin(a.username)
					}
					console.log(a.allName);
					for (let b of this.friendList) {
						if (a.allName.substr(0, 1) == b.charact) {
							b.data.push(a);
						}
					}
				}

			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
	}

	.searchOut {
		width: 100%;
		height: auto;
		background-color: white;
		padding-top: 20rpx;
	}

	.searchBox {
		width: 664rpx;
		height: 60rpx;
		margin: 0 auto 50rpx auto;
		background: #f1f1f1;
		border-radius: 30px;
		position: relative;
	}

	.searchInput {
		width: 664rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30px;
		padding-left: 60rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #333333;
	}

	.searchBtn {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		top: 18rpx;
		left: 24rpx;
	}

	.scrollIv {
		width: 100%;
		/* height: 1000rpx; */
		/* background-color: #4CD964; */
	}

	.charactName {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		background: #e6e6e6;
		box-sizing: border-box;
		font-size: 22rpx;
		color: #828282;
		font-weight: 400;
		padding: 0 30rpx;
	}

	.contactList {
		width: 100%;
		background-color: white;
		position: relative;
	}

	.contactListItem {
		width: 690rpx;
		height: 100rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 0 auto;
		border-bottom: 1rpx solid #F6F6F6;
		position: relative;
	}

	.friIMg {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #e6e6e6;
	}

	.friName {
		width: 580rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 24rpx;
		color: #828282;
		margin-left: 20rpx;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.rightGuide {
		width: 60rpx;
		height: 832rpx;
		/* background-color: #4CD964; */
		position: fixed;
		right: 0;
		top: 168rpx;
	}

	.rightGuideItem {
		width: 100%;
		text-align: center;
		height: 32rpx;
		line-height: 32rpx;
		font-size: 24rpx;
		color: 828282;
	}

	.RGS {
		color: #ff5500;
	}

	.noData {
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		font-size: 30rpx;
		color: #888;
	}

	.secContact {
		width: 35rpx;
		height: 23rpx;
		position: absolute;
		right: 100rpx;
		top: 38rpx;
	}
</style>
