<template>
	<view class="container">
		<view class="container">
			<view class="detailList" v-for="(item,index) in list">
				<view class="detailItem" @tap="openMore(index)">
					<view class="detailName">{{item.name}}</view>
					<image src="../../../../../../../../static/img/you.png" class="detailRight"
						:class="index==openNumIndex?'detailRight1':''" mode=""></image>
				</view>
				<view class="itemCont" v-show="openNumIndex==index">
					<view class="itemContItemOut" :style="index1===0?'margin:0;':''"
						v-for="(item1,index1) in item.children">
						<view class="itemContItem" v-if="item1.checkItem.itemType=='3'">
							<view class="itemContItemL"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>{{item1.name}}</view>
							<view class="itemContItemR" v-show="item1.checkItem.textItem">
								<view class="itemContItemRItem" @tap="fullImple(index,index1,0,item1.checkItem.itemType,item1.checkItem.textItem.qualifiedName)">
									<image src="../../../../../../../../static/img/secOneOn.png"
										v-if="item1.checkItem.textItem.selected=='0'" class="itemContItemRImg" mode="">
									</image>
									<image src="../../../../../../../../static/img/secOneOff.png" v-else
										class="itemContItemRImg" mode=""></image>
									<text>{{item1.checkItem.textItem.qualifiedName||'落实'}}</text>
								</view>
								<view class="itemContItemRItem" @tap="fullImple(index,index1,1,item1.checkItem.itemType,item1.checkItem.textItem.unqualifiedName)">
									<image src="../../../../../../../../static/img/secOneOn.png"
										v-if="item1.checkItem.textItem.selected=='1'" class="itemContItemRImg" mode="">
									</image>
									<image src="../../../../../../../../static/img/secOneOff.png" v-else
										class="itemContItemRImg" mode=""></image>
									<text>{{item1.checkItem.textItem.unqualifiedName||'未落实'}}</text>
								</view>
							</view>
							<view class="textItem" v-show="item1.checkItem.textItem">
								<input type="text" @confirm="closeInput"  v-if="item1.checkItem.textItem.multipleLines!='1'"
									v-model="item1.checkItem.textItem.defaultValue" class="textItemOne" />
								<textarea @confirm="closeInput" v-model="item1.checkItem.textItem.defaultValue"
									v-if="item1.checkItem.textItem.multipleLines=='1'" class="textItemTwo" placeholder="" />
							</view>
						</view>
						<view class="itemContItem" v-if="item1.checkItem.itemType=='2'">
							<view class="itemContItemL"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>{{item1.name}}</view>
							<view class="itemContItemR" style="justify-content: flex-end;">
								<input type="number"  @confirm="closeInput" v-model="item1.checkItem.numberItem.defaultValue" class="numberItem" />
							</view>
						</view>
						<view class="itemContItem" v-if="item1.checkItem.itemType=='1'">
							<view class="itemContItemL" style="width: 690rpx;"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>{{item1.name}}</view>
							<view class="itemContItemR" style="width: 690rpx;margin-top: 20rpx;">
								<view class="itemContItemRItem"
									@tap="fullImple(index,index1,index2,item1.checkItem.itemType,item1.checkItem.optionType)"
									v-for="(item2,index2) in item1.checkItem.optionItemList">
									<image src="../../../../../../../../static/img/secOneOn.png" v-if="item2.selected=='1'"
										class="itemContItemRImg" mode=""></image>
									<image src="../../../../../../../../static/img/secOneOff.png" v-else
										class="itemContItemRImg" mode=""></image>
									<text>{{item2.optionName}}</text>
								</view>
							</view>
						</view>
						<view class="itemContItem" v-if="item1.checkItem.itemType=='4'">
							<view class="itemContItemL"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>{{item1.name}}</view>
							<view class="itemContItemR">
								<view class="itemContItemRItem" @tap="fullImple(index,index1,0,item1.checkItem.itemType,item1.checkItem.photoQualifiedName)">
									<image src="../../../../../../../../static/img/secOneOn.png"
										v-if="item1.checkItem.photoSelected=='0'" class="itemContItemRImg" mode=""></image>
									<image src="../../../../../../../../static/img/secOneOff.png" v-else
										class="itemContItemRImg" mode=""></image>
									<text>{{item1.checkItem.photoQualifiedName||'落实'}}</text>
								</view>
								<view class="itemContItemRItem" @tap="fullImple(index,index1,1,item1.checkItem.itemType,item1.checkItem.photoUnqualifiedName)">
									<image src="../../../../../../../../static/img/secOneOn.png"
										v-if="item1.checkItem.photoSelected=='1'" class="itemContItemRImg" mode=""></image>
									<image src="../../../../../../../../static/img/secOneOff.png" v-else
										class="itemContItemRImg" mode=""></image>
									<text>{{item1.checkItem.photoUnqualifiedName||'未落实'}}</text>
								</view>
							</view>
							<view class="photo" v-for="(item2,index2) in item1.checkItem.photoItemList">
								<view class="photoName">{{item2.placeName}}</view>
								<view class="imgList">
									<view class="imgListItem" v-for="(item3,index3) in item2.imgs">
										<image class="imgListItemImg" @tap="preImg(index,index1,index2,index3)" :src="checkImgSo(item3)?item3:imgUrl+item3"
											mode=""></image>
										<image class="deleteImg" @tap="deleteImg(index,index1,index2,index3)"
											src='../../../../../../../../static/img/close.png'></image>
									</view>
									<image v-show="item2.imgs.length<item2.num" @tap="secImg(index,index1,index2,item2.num)"
										src="../../../../../../../../static/img/uploadImgBgBtn.png" class="imgListBtn"
										mode=""></image>
								</view>
							</view>
						</view>
					    <view v-if="item1.checkItem.itemType=='5'">
							<view class="itemContItem" style='justify-content: space-between;'  >
								<view class="itemContItemL" style="width: 200rpx;"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>监测的设备</view>
								<view class="itemContItemR" style="justify-content: flex-end; width: 400rpx;">
									<input type="text" disabled="true" v-model="item1.checkItem.deviceItem.deviceName" class="numberItem" style="width: 380rpx;" />
								</view>
							</view>
							<view class="itemContItem" style='justify-content: space-between;' >
								<view class="itemContItemL" style="width: 200rpx;"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>选择监测点</view>
								<view class="itemContItemR" style="justify-content: flex-end; width: 400rpx;"  >
									<input disabled="true"   v-model="item1.checkItem.deviceItem.param" class="numberItem" style="width: 380rpx;" />
								</view>
							</view>
							<view class="itemContItem" style='justify-content: space-between;' >
								<view class="itemContItemL" style="width: 200rpx;"><text style="color:#aa282e;" v-if='item1.checkItem.required'>*</text>默认值</view>
								<view class="itemContItemR" style="justify-content: flex-end; width: 400rpx;" >
									<input  type="number"  @confirm="closeInput" v-model="item1.checkItem.deviceItem.value" class="numberItem" style="width: 380rpx;" />
								</view>
							</view>
							
						</view>
						
					</view>
		
				</view>
			</view>
			<view class="submitInfo" v-if="this.state=='1'" @tap="$HClick(checkItem(0))">提交</view>
		</view>
	</view>
</template>

<script>
	import DB from "../../../../../../../../static/script/sqlite.js"
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				list: [
				
				],
				openNumIndex: null,
				onoff: true,
				id: '',
				parentId: '',
				imgUrl:'' ,
				projectName:'',
				pjId:'',
				classId:'',
				id:'',
				recordId:'',
				siteId:'',
				siteName:'',
				state:'',
				pindex1:null,
				pindex2:null,
				sdcSiteName:'',
				sdcSiteId:''
			}
		},
	onNavigationBarButtonTap(e) {
		console.log(this.state);
		let _this=this;
		if(this.state=='1'){
		uni.getNetworkType({
		    success: function (res) {
		        console.log(res);
				let type=res.networkType;
				if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
					uni.showModal({
						title:'提示',
						content:'当前为网络环境，是否继续暂存数据至本地？',
						success(e) {
							if(e.confirm){
								_this.checkItem(1);
							}
						}
					})
				}else{
					_this.checkItem(1);
				}
		    }
		});
		
		}else{
			uni.showToast({
				title:'巡检任务已完成，无法操作。',
				icon:'none',
				duration:1000
			})
		}
	},
		onLoad(options) {
			this.imgUrl=uni.getStorageSync('url');
			this.id=options.id||'';
			this.projectName=options.projectName||'';
			this.pjId=options.pjId||'';
			this.classId=options.classId||'';
			this.recordId=options.recordId||'';
			this.siteId=options.siteId||'';
			this.siteName=options.siteName||'';
			this.state=options.state||'';
			this.sdcSiteName=options.sdcSiteName||'',
			this.sdcSiteId=options.sdcSiteId;
			// this.state=1;
			console.log(options);
			console.log(this.siteId,this.siteName);
			let _this=this;
			uni.getNetworkType({
			    success: function (res) {
			        console.log(res);
					let type=res.networkType;
					if(type=='wifi'||type=='4g'||type=='5g'||type=='3g'){
						_this.getList2();
					}else{
						_this.openSQL();
						_this.selectTableData();
					}
			    }
			});
		},
		methods: {
			checkImgSo(res){
				if(res.indexOf("admin/sys-file/planplat") == -1){
					return true;
				}else{
					return false;
				}
			},
			secParId(event){
				console.log(event.detail.value);
				let index=event.detail.value;
				this.list[this.pindex1].children[this.pindex2].checkItem.deviceItem.param=this.list[this.pindex1].children[this.pindex2].checkItem.deviceItem.records[index].param;
				this.list[this.pindex1].children[this.pindex2].checkItem.deviceItem.paramId=this.list[this.pindex1].children[this.pindex2].checkItem.deviceItem.records[index].paramId;
				this.list[this.pindex1].children[this.pindex2].checkItem.deviceItem.value=Number(this.list[this.pindex1].children[this.pindex2].checkItem.deviceItem.records[index].value);
				
			},
			getList2(){
				let data={
					siteId:this.siteId,
					recordId:this.recordId,
					nodeId:this.id
				};
				console.log(data);
				uni.showLoading({
					title: '数据加载中...'
				})
				this.$http.inspectSitereeList(data).then((res)=>{
					console.log(res);
					uni.hideLoading();
					if(res.code===200&&res.success){
						if(res.data.length>0){
							this.dataCache(res.data);
						}
					}
				}).then((err) => {
					uni.hideLoading();
					// console.log(err);
				})
			},
			dataCache(data){
				this.openSQL();
				DB.selectTableData("classall")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("classall表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.classId){
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
					DB.createTable("classall", sql)
						.then(res => {
							console.log('创建classall表成功');
						})
						.catch(error => {
							console.log("创建表失败");
						});
			},
			// 新增表数据
			insertTableData(data) {
				let open = DB.isOpen();
				if (open) {
						let sql = `'${this.classId}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("classall", sql, condition)
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
					DB.selectTableData("classall")
						.then(res => {
							console.log("classall表数据", res);
							// this.listData = res;
							console.log(res.length);
							let arr=res;
							if(res.length>0){
								for(let p1 in arr){
									if(arr[p1].id==this.classId){
										this.calcInfo(JSON.parse(arr[p1].children));
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
					DB.updateTableData("classall", data1, "id", this.classId)
						.then(res => {
							console.log("更新point1表成功");
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
			closeInput(){
				plus.key.hideSoftKeybord();
			},
			openMore(res) {
				if (res == this.openNumIndex) {
					this.openNumIndex = null;
				} else {
					this.openNumIndex = res;
				}
			},
			fullImple(res, res1, res2, res3, res4) {
				// console.log(res, res1, res2, res3, res4);
				console.log(this.state);
				if(this.state=='1'){
					uni.showToast({
						title:'巡检任务已完成，无法操作。',
						icon:'none',
						duration:1000
					})
				return;
				}
				if (res3 == '3') {
					this.list[res].children[res1].checkItem.textItem.selected = res2;
					if(res4==this.list[res].children[res1].checkItem.textItem.unqualifiedName){
						this.showWarn(this.list[res].children[res1].checkItem,res3,this.list[res].children[res1].parentIds,this.list[res].children[res1].id);
					}
				} else if (res3 == '4') {
					this.list[res].children[res1].checkItem.photoSelected = res2;
					if(res4==this.list[res].children[res1].checkItem.photoUnqualifiedName){
						this.showWarn(this.list[res].children[res1].checkItem,res3,this.list[res].children[res1].parentIds,this.list[res].children[res1].id);
					}
				} else if (res3 == '1') {
					if (res4 == '1') {
						if (this.list[res].children[res1].checkItem.optionItemList[res2].selected == '1') {
							this.list[res].children[res1].checkItem.optionItemList[res2].selected = 0;
							if(this.list[res].children[res1].checkItem.optionItemList[res2].qualified=='1'){
								this.showWarn(this.list[res].children[res1].checkItem,res3,this.list[res].children[res1].parentIds,this.list[res].children[res1].id);
							}
						} else {
							this.list[res].children[res1].checkItem.optionItemList[res2].selected = 1;
							if(this.list[res].children[res1].checkItem.optionItemList[res2].qualified!='1'){
								this.showWarn(this.list[res].children[res1].checkItem,res3,this.list[res].children[res1].parentIds,this.list[res].children[res1].id);
							}
						}
					} else {
						for (let a = 0; a < this.list[res].children[res1].checkItem.optionItemList.length; a++) {
							this.list[res].children[res1].checkItem.optionItemList[a].selected = 0;
						}
						this.list[res].children[res1].checkItem.optionItemList[res2].selected = 1;
							if(this.list[res].children[res1].checkItem.optionItemList[res2].qualified!='1'){
								this.showWarn(this.list[res].children[res1].checkItem,res3,this.list[res].children[res1].parentIds,this.list[res].children[res1].id);
							}
					}
			
				}
			},
			showWarn(res,res1,res2,res3){
				console.log(res);
				console.log(res1);
				let _this=this;
				uni.showModal({
					title:'提示',
					content:'该选项录入为不合格，是否立即反馈问题？',
					success(e) {
						if(e.confirm){
							let strs= new Array(); //定义一数组
							strs=res2.split(","); //字符分割
							console.log(strs);
							let checkId=strs[1]+','+strs[2]+','+strs[3]+','+res3;
							uni.navigateTo({
							    url: 'questionsBack/questionsBack?proName='+_this.projectName+'&typeName='+res.typeName+
								'&pointName='+res.pointName+'&sourceName='+res.sourceName+'&itemName='+res.itemName+'&id='+
								_this.id+'&pjId='+_this.pjId+'&checkId='+checkId+'&siteId='+_this.siteId+'&siteName='+_this.siteName+
								'&sdcSiteId='+_this.sdcSiteId+'&sdcSiteName='+_this.sdcSiteName
								})
						}
						
					}
				})
			},
			secImg(res0, res1, res2, res3) {
				// if(this.state!='1'){
				// 	uni.showToast({
				// 		title:'订单已完成，无法操作。',
				// 		icon:'none',
				// 		duration:1000
				// 	})
				// return;
				// }
				let _this = this;
				let token = uni.getStorageSync('ACCESS_TOKEN');
				let num = this.list[res0].children[res1].checkItem.photoItemList[res2].imgs.length || 0;
				if (res3 - num <= 0) {
					uni.showToast({
						title: '已达上传上限！',
						icon: 'none',
						position: 'center'
					})
					return;
				}
				uni.chooseImage({
					count: res3 - num, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths);
						if (res.tempFilePaths.length > 0) {
							
							for (let b = 0; b < res.tempFilePaths.length; b++) {
								let mUrl=uni.getStorageSync('url');			
								uni.uploadFile({
									url: mUrl +
										'/admin/sys-file/upload', //仅为示例，非真实的接口地址
									filePath: res.tempFilePaths[b],
									name: 'file',
									formData: {
										'user': 'test'
									},
									header: {
										'Authorization':'Bearer ' + token
									},
									success: (uploadFileRes) => {
										console.log(uploadFileRes);
										// console.log(JSON.parse(uploadFileRes.data));
										console.log(JSON.parse(uploadFileRes.data).data);
										_this.calcImg(res0, res1, res2, res3, JSON.parse(
											uploadFileRes.data).data.url);
									},
									fail: (err) => {
										console.log(err);
										pathToBase64(res.tempFilePaths[b])
										  .then(base64 => {
										    console.log(base64)
											_this.list[res0].children[res1].checkItem.photoItemList[res2].imgs.push(base64);
										  })
										  .catch(error => {
										    console.error(error)
										  })
										
									}
								});
							}
			
						}
					}
				});
			},
			calcImg(res0, res1, res2, res3, res4) {
				this.list[res0].children[res1].checkItem.photoItemList[res2].imgs.push(res4);
			
			},
			deleteImg(res0, res1, res2, res3) {
				this.list[res0].children[res1].checkItem.photoItemList[res2].imgs.splice(res3, 1);
			},
			preImg(res0, res1, res2, res3) {
				let url =[];
				for(let a in this.list[res0].children[res1].checkItem.photoItemList[res2].imgs){
					let imgItem=this.list[res0].children[res1].checkItem.photoItemList[res2].imgs[a];
					if(this.checkImgSo(imgItem)){
						url.push(imgItem);
					}else{
					let lr=this.imgUrl+imgItem;
					url.push(lr);	
					}
				}
				uni.previewImage({
					current:res3,
					indicator: 'default',
					urls: url
				})
			},
			calcInfo(res) {
				let list = res;
				for (let a in list) {
					for (let b in list[a].children) {
						if (list[a].children[b].checkItem.itemType == '4') {
							for (let c in list[a].children[b].checkItem.photoItemList) {
								list[a].children[b].checkItem.photoItemList[c].imgs = [];
							}
							if(list[a].children[b].checkItem.inspectResult&&list[a].children[b].checkItem.inspectResult.photoValue.length>0){
								console.log(121);
								for(let e in list[a].children[b].checkItem.inspectResult.photoValue){
									for(let f in list[a].children[b].checkItem.photoItemList){
										if(list[a].children[b].checkItem.inspectResult.photoValue[e].site==list[a].children[b].checkItem.photoItemList[f].placeName){
											let strs= new Array(); //定义一数组
											strs=list[a].children[b].checkItem.inspectResult.photoValue[e].photos.split(";"); //字符分割
											console.log(strs);
											if(!strs[strs.length-1]){
												strs.pop();
											}
											list[a].children[b].checkItem.photoItemList[f].imgs.push(...strs);
										}
									}
								}
							}
						} else if (list[a].children[b].checkItem.itemType == '1') {
							// console.log(list[a].children[b].checkItem.inspectResult.inspectResult)
							if (!list[a].children[b].checkItem.inspectResult) {
			
							} else {
								if (list[a].children[b].checkItem.optionType == '1') {
									// 多选
									if(list[a].children[b].checkItem.inspectResult&&list[a].children[b].checkItem.inspectResult.optionValue){
										let strs1= new Array(); //定义一数组
										strs1=list[a].children[b].checkItem.inspectResult.optionValue.split(";"); //字符分割
										console.log(strs1);
										for(let j in list[a].children[b].checkItem.optionItemList){
											list[a].children[b].checkItem.optionItemList[j].selected=0;
										} 
										for(let h in strs1){
											for(let i in list[a].children[b].checkItem.optionItemList){
												console.log(list[a].children[b].checkItem.optionItemList[i].optionName,strs1[h]);
												if(strs1[h]==list[a].children[b].checkItem.optionItemList[i].optionName){
													list[a].children[b].checkItem.optionItemList[i].selected=1;
												}
											}
										}
										console.log(list[a].children[b].checkItem.optionItemList);
									}
									
								} else {
									// 单选
									for (let d in list[a].children[b].checkItem.optionItemList) {
										if (list[a].children[b].checkItem.optionItemList[d].optionName != list[a].children[
												b].checkItem.inspectResult.optionValue) {
											list[a].children[b].checkItem.optionItemList[d].selected = 0;
										} else {
											list[a].children[b].checkItem.optionItemList[d].selected = 1;
										}
									}
								}
							}
						}else if (list[a].children[b].checkItem.itemType == '3'){
							// 文本
							if(list[a].children[b].checkItem.inspectResult&&list[a].children[b].checkItem.inspectResult.textValue){
								list[a].children[b].checkItem.textItem.defaultValue=list[a].children[b].checkItem.inspectResult.textValue;
								
								if(list[a].children[b].checkItem.inspectResult.qualified){
									list[a].children[b].checkItem.textItem.selected=0;
								}else{
									list[a].children[b].checkItem.textItem.selected=1;
								}
							}	
						}else if (list[a].children[b].checkItem.itemType == '2'){
							// 数字
							if(list[a].children[b].checkItem.inspectResult&&list[a].children[b].checkItem.inspectResult.numberValue){
								list[a].children[b].checkItem.numberItem.defaultValue=list[a].children[b].checkItem.inspectResult.numberValue;
							}
						}
						else if(list[a].children[b].checkItem.itemType == '5'){
							this.parIdInfo(list[a].children[b].checkItem.deviceItem.deviceId,list[a].children[b].checkItem.deviceItem.paramId,a,b);
							if(!list[a].children[b].checkItem.deviceItem){
								list[a].children.splice(b,1);
							}else{
								if(list[a].children[b].checkItem.inspectResult&&list[a].children[b].checkItem.inspectResult.numberValue){
									list[a].children[b].checkItem.deviceItem.value=Number(list[a].children[b].checkItem.inspectResult.numberValue);
								}else{
									list[a].children[b].checkItem.deviceItem.value=null;
								}
							}
						}
					}
				}
				console.log(list);
				this.list = list;
			},
			parIdInfo(id1,id2,idx1,idx2){
				this.pindex1=idx1;
				this.pindex2=idx2;
				let data={
					deviceId:id1,
					paramId:id2,
					current:1,
					size:1
				};
				if(id1){
					console.log(data);
					this.$http.sdcdeviceindicator(data).then((res)=>{
						console.log(res);
						if(res.code===0&&res.data.records.length>0){
							this.list[idx1].children[idx2].checkItem.deviceItem.value=res.data.records[0].value;
						}
					})
					}
			},
			checkItem(type){
				let haveRequired=false;
				for(let r in this.list){
					for (let s in this.list[r].children) {
						if(this.list[r].children[s].checkItem.required){
							console.log(this.list[r].children[s].checkItem.itemType);
							if (this.list[r].children[s].checkItem.itemType == '1') {
									let isp=false;
										for(let t in this.list[r].children[s].checkItem.optionItemList){
											if(this.list[r].children[s].checkItem.optionItemList[t].selected){
												isp=true;
												break;
											}
										}
									if(!isp){
										haveRequired=true;
										this.showAlert(type);
										return;
									}
							}else if(this.list[r].children[s].checkItem.itemType == '2'){
								if(!this.list[r].children[s].checkItem.numberItem.defaultValue){
									this.showAlert(type);
									return;
								}
							}else if(this.list[r].children[s].checkItem.itemType == '3'){
								if(!this.list[r].children[s].checkItem.textItem.defaultValue){
									this.showAlert(type);
									return;
								}
							}else if(this.list[r].children[s].checkItem.itemType == '4'){
								for (let v in this.list[r].children[s].checkItem.photoItemList) {
								if(this.list[r].children[s].checkItem.photoItemList[v].imgs.length=='0'){
									this.showAlert(type);
									return;
								}
								}
							}else if(this.list[r].children[s].checkItem.itemType == '5'){
								if(!this.list[r].children[s].checkItem.deviceItem.value){
									this.showAlert(type);
									return;
								}
							}
						}
						
					}
				}
				if(!haveRequired){
					this.saveNow(type);
				}
			},
			showAlert(type){
				let _this=this;
				uni.showModal({
					title:'提示',
					content:'必填项未填写，是否提交?',
					success(res) {
						if(res.confirm){
							_this.saveNow(type);
						}
					}
				})
			},
			saveNow(type) {
				let arr = [];
				for (let a in this.list) {
					for (let b in this.list[a].children) {
						let data = {};
						data.recordId = this.recordId;
						data.siteId = this.siteId;
						data.siteName = this.siteName;
						data.qualified = 0;
						data.photoValue=[];
						data.type = this.list[a].children[b].checkItem.itemType;
						data.isFinished=1;
						data.checkId = this.classId + ',' + this.id + ',' + this.list[a].id + ',' + this.list[a].children[
							b].id;
						console.log(this.list[a].children[b].checkItem.itemType);
						if (this.list[a].children[b].checkItem.itemType == '1') {
							if (this.list[a].children[b].checkItem.optionType == '1') {
								data.optionValue = '';
								for (let c in this.list[a].children[b].checkItem.optionItemList) {
									if (this.list[a].children[b].checkItem.optionItemList[c].selected) {
										data.optionValue += this.list[a].children[b].checkItem.optionItemList[c]
											.optionName + ';';
											if(this.list[a].children[b].checkItem.optionItemList[c].qualified=='1'){
												data.qualified = 1;
											}
									}
								}
								if(data.optionValue){
										data.optionValue=data.optionValue.slice(0,data.optionValue.length-1);
								}
								if(this.list[a].children[b].checkItem.optionRelation){
									for (let f in this.list[a].children[b].checkItem.optionItemList) {
										if (this.list[a].children[b].checkItem.optionItemList[f].selected&&this.list[a].children[b].checkItem.optionItemList[f].qualified=='1') {
													data.qualified = 1;
										}
									}
								}else{
									let val=1;
									for (let g in this.list[a].children[b].checkItem.optionItemList) {
										if (this.list[a].children[b].checkItem.optionItemList[g].selected&&this.list[a].children[b].checkItem.optionItemList[g].qualified!='1') {
													val = 0;
										}
									}
									data.qualified=val;
								}
								data.optionValue=data.optionValue.slice(0,data.optionValue.length-1);
							} else {
								for (let c in this.list[a].children[b].checkItem.optionItemList) {
									if (this.list[a].children[b].checkItem.optionItemList[c].selected) {
										
										data.optionValue = this.list[a].children[b].checkItem.optionItemList[c]
											.optionName;
											if(this.list[a].children[b].checkItem.optionItemList[c].qualified){
												data.qualified=1;
											}
									}
								}
							}
						} else if (this.list[a].children[b].checkItem.itemType == '2') {
							data.numberValue = this.list[a].children[b].checkItem.numberItem.defaultValue;
							if(data.numberValue>=this.list[a].children[b].checkItem.numberItem.lowerLimit&&data.numberValue<=this.list[a].children[b].checkItem.numberItem.upperLimit){
								data.qualified = 1;
							}
						} else if (this.list[a].children[b].checkItem.itemType == '3') {
							data.textValue = this.list[a].children[b].checkItem.textItem.defaultValue;
							console.log('须先按着：：',this.list[a].children[b].checkItem.textItem.selected);
							if(this.list[a].children[b].checkItem.textItem.selected=='0'){
								data.qualified = 1;
							}
						} else if (this.list[a].children[b].checkItem.itemType == '4') {
							if(this.list[a].children[b].checkItem.photoSelected=='0'){
								data.qualified = 1;
							}
							console.log('changdu'+this.list[a].children[b].checkItem.photoItemList.length);
							if (this.list[a].children[b].checkItem.photoItemList.length > 0) {
								let arr = [];
								for (let c in this.list[a].children[b].checkItem.photoItemList) {
									let obj = {};
									obj.site = this.list[a].children[b].checkItem.photoItemList[c].placeName;
									obj.photos = '';
									if (this.list[a].children[b].checkItem.photoItemList[c].imgs.length > 0) {
										for (let d in this.list[a].children[b].checkItem.photoItemList[c].imgs) {
											obj.photos += this.list[a].children[b].checkItem.photoItemList[c].imgs[d] + ';';
										}
										obj.photos=obj.photos.slice(0,obj.photos.length-1);
									}
									arr.push(obj);
								}
								data.photoValue = arr;
							}
						} else if (this.list[a].children[b].checkItem.itemType == '5') {
							data.numberValue = this.list[a].children[b].checkItem.deviceItem.value;
							if(data.numberValue>=this.list[a].children[b].checkItem.deviceItem.lowerLimit&&data.numberValue<=this.list[a].children[b].checkItem.deviceItem.upperLimit){
								data.qualified = 1;
							}
						}
						arr.push(data);
					}
				}
				console.log(arr);
				if(type){
					this.localDeal(arr);
					return;
				}
				this.$http.inspectResultSave(arr).then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
							uni.showToast({
								title:'提交成功！',
								position:'bottom',
								duration:800
							})
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},800);
					}
				})
			},
			localDeal(arr){
				console.log('缓存至本地');
				this.dataCache1(arr);
			},
			dataCache1(data){
				this.openSQL();
				DB.selectTableData("classdata")
					.then(res => {
						console.log(res.length);
						if(res.length){
							console.log("分类详情表数据", res);
							console.log(res.length);
							if(res.length>0){
								let isHave=false;
								let arr=res;
								for(let p1 in arr){
									if(arr[p1].id==this.siteId){
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
				// DB.deleteTableData("classdata", "id", this.siteId)
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
					DB.createTable("classdata", sql)
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
						let sql = `'${this.siteId}','${JSON.stringify(data)}'`;
						let condition = "'id','children'";
						// 新增 DB.insertTableData(表名, 对应表头列的数据)
						DB.insertTableData("classdata", sql, condition)
							.then(res => {
								console.log('保存本地成功');
								uni.showToast({
									title:'保存内容成功！',
									position:'bottom',
									duration:800
								})
								setTimeout(()=>{
									uni.navigateBack({
										
									})
								},800);
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
					DB.selectTableData("classdata")
						.then(res => {
							console.log("contact表数据", res);
							console.log(res.length);
						})
						.catch(error => {
							console.log("查询失败", error);
						});
				} else {
					console.log("数据库未打开");
				}
			},
			// 修改表数据
			updateTableData1(data) {
					let data1 = `children = '${JSON.stringify(data)}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("classdata", data1, "id", this.siteId)
						.then(res => {
							console.log("更新数据成功");
							uni.showToast({
								title:'更新本地数据成功！',
								position:'bottom',
								duration:800
							})
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},800);
						})
						.catch(error => {
							console.log("修改失败", error);
						});
			},
		}
	}
</script>

<style scoped>
.container {
		width: 100%;
		padding-top: 10rpx;
		padding-bottom: 110rpx;
	}

	.detailList {
		width: 100%;
		height: auto;
	}

	.detailItem {
		width: 690rpx;
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
		margin: 0 auto;
		border-bottom: 1rpx solid #F0F0F5;
		font-size: 30rpx;
		color: #545454;
	}

	.detailName {
		width: 90%;
		box-sizing: border-box;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detailRight {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		right: 0;
		top: 34rpx;
		transition: 200ms ease-in;
	}

	.detailRight1 {
		transform: rotate(-90deg);
	}

	.itemCont {
		width: 100%;
		height: auto;
	}

	.itemContItemOut {
		width: 100%;
		height: auto;
		background-color: #f3f6f8;
		margin-top: 20rpx;
	}

	.itemContItem {
		width: 690rpx;
		height: auto;
		line-height: 40rpx;
		font-size: 26rpx;
		color: #545454;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin: 0 auto;
		padding: 20rpx 0;
	}

	.itemContItemL {
		width: 390rpx;
		min-height: 40rpx;
		margin-left: 15rpx;
		/* background-color: #D7E7FB; */
	}

	/* 	.itemContItemL{
		width: 22rpx;
		height: 22rpx;
		position: relative;
		top: 12rpx;
	} */
	.itemContItemR {
		width: 260rpx;
		margin-left: 15rpx;
		/* background-color: #007AFF; */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.numberItem {
		width: 230rpx;
		height: 48rpx;
		line-height: 48rpx;
		border: 1rpx solid #B1B1B1;
		font-size: 26rpx;
		color: #333;
		box-sizing: border-box;
		padding: 0 30rpx;
	}

	.itemContItemRItem {
		flex: 1;
		/* text-align: center; */
	}

	.itemContItemRImg {
		width: 22rpx;
		height: 22rpx;
		vertical-align: middle;
		position: relative;
		top: -2rpx;
		margin-left: 0rpx;
	}

	.submitInfo {
		width: 100%;
		height: 90rpx;
		background: #0193e9;
		font-size: 30rpx;
		color: #ffffff;
		text-align: center;
		line-height: 90rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10;
		transition: 200ms ease;
	}

	.submitInfo:active {
		background-color: #0661e9;
	}

	.textItem {
		width: 100%;
		/* background-color: #00AAFF; */
		margin-top: 20rpx;
		height: auto;
	}

	.textItemOne {
		width: 660rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #333;
		margin: 20rpx auto 0 auto;
		border: 1rpx solid #B1B1B1;
		box-sizing: border-box;
		padding: 0 15rpx;
	}

	.textItemTwo {
		width: 660rpx;
		height: 200rpx;
		line-clamp: 4;
		line-height: 48rpx;
		font-size: 28rpx;
		color: #333;
		margin: 20rpx auto 0 auto;
		border: 1rpx solid #B1B1B1;
		box-sizing: border-box;
		padding: 0 15rpx;
	}

	.photo {
		width: 100%;
		height: auto;
	}

	.photoName {
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: #545454;
		box-sizing: border-box;
		padding-left: 30rpx;
	}

	.imgList {
		width: 690rpx;
		height: auto;
		display: flex;
		margin-top: 20rpx;
		justify-content: flex-start;

	}

	.imgListBtn {
		width: 150rpx;
		height: 150rpx;
		margin-right: 28rpx;
	}

	.imgListItem {
		width: 150rpx;
		height: 150rpx;
		margin-right: 28rpx;
		position: relative;
	}

	.imgListItemImg {
		width: 100%;
		height: 100%;
	}

	.deleteImg {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right: -20rpx;
		top: -30rpx;
	}
</style>
