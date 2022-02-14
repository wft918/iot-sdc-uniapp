<template>
	<view class="container">
		<view class="inspItem" v-for="item in list" @tap="detailInto(item)">
			<image src="../../../../static/img/wks.png" v-show="item.inspectState=='0'" class="statusImg" mode="">
			</image>
			<image src="../../../../static/img/xjz.png" v-show="item.inspectState=='1'" class="statusImg" mode="">
			</image>
			<image src="../../../../static/img/ywc.png" v-show="item.inspectState=='2'" class="statusImg" mode="">
			</image>
			<!-- <image src="../../../../static/img/yqx.png" v-show="item.inspectState=='3'" class="statusImg" mode="">
			</image> -->
			<view class="inspItemL">
				<view class="taskTime">{{item.createDate}}</view>
				<view class="taskName">{{item.taskName}}</view>

				<view class="taskAll">
					<text>共 {{item.qualifiedNum+item.unqualifiedNum}} 项</text>
					<text style="margin-left: 16rpx;">正常{{item.qualifiedNum}} 项</text>
					<text style="margin-left: 16rpx;">异常 </text><text
						style="color: #fe7676;">{{item.unqualifiedNum}}</text><text> 项</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				inst:'',
				userInfo:{}
			}
		},
		onLoad(options) {
			this.userInfo = uni.getStorageSync('userinfo');
			console.log(this.userInfo);
			this.inst=options.inst;
			console.log(this.userInfo);
		},
		onShow() {
			this.getList();
		},
		onPullDownRefresh() {
			this.getList();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			detailInto(item){
				if(item.inspectState=='0'){
					this.startThisLine(item);
				}else{
					this.secThisLine(item);
				}
			},
			secThisLine(res) {
				uni.navigateTo({
					url: 'linePoint/linePoint?line=' + res.projectName + '&id=' + res.id + '&projectId=' + res
						.projectId+'&state='+res.inspectState
				})
			},
			getList() {
				let data = {
					projectId: '',
					projectName: '',
					inspectMan: this.userInfo.id,
					inspectManName: this.userInfo.name,
					inspectType: 1,
					pageSize:-1
				};
				console.log(data);
				this.$http.inspectRecord(data).then((res) => {
					console.log(res.page.list);
					if (res.code === 200 && res.success) {
						if (res.page.list.length > 0) {
							let arr=[];
							if(this.inst=='1'){
								for(let a of res.page.list){
									if(a.inspectState!='2'){
										arr.push(a)
									}
								}
								this.list=arr;
							}else if(this.inst=='2'){
							for(let b of res.page.list){
								if(b.startOverdue=='1'||b.endOverdue=='1'){
									arr.push(b);
								}
							}	
							this.list=arr;
							}else{
							this.list = res.page.list;	
							}
						}
					}
				})
			},
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
					this.secThisLine(item);
					}
				})
			},
			inspectIsFinished(res) {
				let _this = this;
				let data = {
					recordId: res.id,
					routeId: res.projectId
				};
				console.log(data);
				this.$http.inspectIsFinished(data).then((res1) => {
					console.log(res1);
					if (res1.code === 200 && res1.success) {
						if (res1.data) {
							let data = {
								id: res.id,
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
									_this.getList();
								}
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '有未完成的检查项，是否确认提交？',
								success(e) {
									if (e.confirm) {
										let data = {
											id: res.id,
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
												_this.getList();
											}
										})
									}

								}
							})
						}
					}
				})
			},
			closeInsp(res) {
				console.log(res);
				return;
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确认取消该巡检任务？',
					success(e) {
						if (e.confirm) {
							let data = {
								id: res.id,
								inspectState: 3,
							};
							console.log(data);
							_this.$http.inspectUpdateState(data).then((res) => {
								console.log(res);
								if (res.code === 200 && res.success) {
									uni.showToast({
										title: '提交成功！',
										icon: 'none'
									})
									_this.getList();
								}
							})
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		position: relative;
		padding-top: 20rpx;
		min-height: calc(100vh - 20rpx);
		background-color: #F0F0F5;
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
		margin-bottom: 20rpx;
	}

	.inspItemL {
		width: 620rpx;
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

	.inspItemROut {
		width: 140rpx;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
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

	.statusImg {
		width: 91rpx;
		height: 87rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
