<!-- 公告页面 -->
<template>
	<view style="width: 100%;height: 100vh;background-color: #f6f5fa;">
		<view style="width: 100%;height: 100%;" v-if="noticeList.length">
			<view v-for="(item,index) in noticeList" :key="item.id" style="width: 100%;height: 100rpx;padding: 0 15rpx;box-sizing: border-box;background-color: #FFFFFF;display: flex;justify-content: space-between;margin-bottom: 15rpx;">
				<view style="height: 100%;line-height: 100rpx;">
					<text>{{item.title}}</text>
				</view>
				<view style="height: 100%;color: #333333;line-height: 100rpx;">
					<text style="color: #999999;font-size: 23rpx;">{{item.date}}</text>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100%;padding-top: 250rpx;box-sizing: border-box;" v-else>
			<image style="width: 76%;margin: 0 auto;display: block;" src="../../../static/img/noNotice.png" mode=""></image>
			<view style="width: 100%;text-align: center;font-size: 35rpx;color: #999999;">暂无公告</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList:[],//公告数据列表
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getNoticeData()
		},
		onBackPress() { 
			
		},
		methods: {
			// 获取我的公告数据
			getNoticeData() {
				let params = {
					current:'1',
					msgCategory:'1'
				}
				this.$http.getNoticeData(params).then(data => {
					console.log(data,'我的公告----------------->')
					if(data) {
						// this.noticeList = data.data.records
						this.noticeList = []
						data.data.records.forEach((item,index) => {
							this.noticeList.push({
								title:item.expand.announcementTitle,
								// content:'',
								id:item.id,
								anntId:item.anntId,
								date:item.updateDate || item.createDate
							})
							console.log(this.noticeList,'------->>>>>noticelist')
							// this.getSdcannouncement(item.anntId,index)
						})
					}
				})
			},
			// 查询详情
			getSdcannouncement(id,index) {
				this.$http.getSdcannouncement(id).then(data => {
					console.log(data,'详情---------------------->')
					if(data) {
						this.$set(this.noticeList[index],'content',data.data[0].msgContent)
						// this.noticeList[index].content = data.data[0].msgContent
					}
				})
			},
		}
	}
</script>

<style>

</style>
