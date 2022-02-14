<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// uni.setStorageSync('url','http://10.128.193.2:9080');
			uni.setStorageSync('url','http://114.242.26.182:21080');
			console.log(uni.getStorageSync('ACCESS_TOKEN'));
			if(uni.getStorageSync('ACCESS_TOKEN')){
				console.log(1);
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			doUpData() {
			    uni.showLoading({
			        title: '更新中……'
			    })
			    uni.downloadFile({//执行下载
			        url: '***', //下载地址
			        success: downloadResult => {//下载成功
			            uni.hideLoading();
			            if (downloadResult.statusCode == 200) {
			                uni.showModal({
			                    title: '',
			                    content: '更新成功，确定现在重启吗？',
			                    confirmText: '重启',
			                    confirmColor: '#EE8F57',
			                    success: function(res) {
			                        if (res.confirm == true) {
			                            plus.runtime.install(//安装
			                                downloadResult.tempFilePath, {
			                                    force: true
			                                },
			                                function(res) {
			                                    utils.showToast('更新成功，重启中');
			                                    plus.runtime.restart();
			                                }
			                            );
			                        }
			                    }
			                });
			            }
			        }
			    });
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	 /* #ifndef APP-PLUS-NVUE */
	    /* @import './common/uni.css'; */
	    /* #endif*/
		.container{
			width: 100%;
			min-height: 100vh;
			font-size: 28upx;
			line-height: 1.8;
			background: #FFFFFF;
			color: #333333;
		}
		/*flex 弹性布局*/
		
		.flex-c{/*左右居中*/
			display:flex;
			justify-content:center;
		}
		.flex-c-c{/*左右上下居中*/
			display:flex;
			justify-content:center;
			align-items: center;
		}
		
		.flex-bet{/*两端对齐*/
			display:flex;
			justify-content:space-between;
		}
		
		.flex-bet-c{/*两端对齐 上下居中*/
			display:flex;
			justify-content:space-between;
			align-items:center;
		}
		
		
		
		
		.flex-sa{/*两端对齐右边距*/
			display:flex;
			justify-content:space-around;
		}
		
		.flex-sa-c{/*两端对齐右边距 上下居中*/
			display:flex;
			justify-content:space-around;
			align-items:center;
		}
		.flex-sa-c-dc{/*两端对齐右边距 竖式 上下居中*/
			display:flex;
			justify-content:space-around;
			align-items:center;
			flex-direction: column;
		}
		
		/*浮动布局*/
		
		.fot-lt{/*左浮动*/
			float:left;
		}
		
		.fot-rt{/*右浮动*/
			float:right;
		}
		
		
		
		/*其他常用样式*/
		.ta-c{
			text-align: center;
		}
		.text-beyond{/*文本内容超宽度省略号显示 单行*/
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width:100%;
		}
		
		.text-beyond-multi{/*文本内容超宽度省略号显示 多行*/
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}
</style>
