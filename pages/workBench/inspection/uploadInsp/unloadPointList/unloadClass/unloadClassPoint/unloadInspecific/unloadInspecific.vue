<template>
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
						<view class="itemContItemL">{{item1.name}}</view>
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
						<view class="itemContItemL">{{item1.name}}</view>
						<view class="itemContItemR" style="justify-content: flex-end;">
							<input type="number"  @confirm="closeInput" v-model="item1.checkItem.numberItem.defaultValue" class="numberItem" />
						</view>
					</view>
					<view class="itemContItem" v-if="item1.checkItem.itemType=='1'">
						<view class="itemContItemL" style="width: 690rpx;">{{item1.name}}</view>
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
						<view class="itemContItemL">{{item1.name}}</view>
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
									<image class="imgListItemImg" @tap="preImg(index,index1,index2,index3)" :src="imgUrl+item3"
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
				</view>

			</view>
		</view>
		<view class="submitInfo" v-if="this.state=='1'" @tap="$HClick(checkItem())">提交</view>
	</view>
</template>

<script>
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
				recordId:'',
				classId:'',
				state:''
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(this.state);
			if(this.state=='1'){
			this.saveNow(0);
			}
		},
		onLoad(options) {
			this.id = options.id || '';
			this.classId = options.classId || '';
			this.parentId = options.parentId || '';
			this.pjId = options.pjId || '';
			this.projectName=options.proName||'';
			this.recordId=options.recordId||'';
			this.state=options.state||'';
			console.log(this.recordId);
			console.log(options);
			let mUrl=uni.getStorageSync('url');
			this.imgUrl=mUrl + '/images';
			if(this.state!='1'){
				const currentWebview = this.$mp.page.$getAppWebview();
						currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
							text: ' '
						});
			}
			this.getList();
		},
		onShow() {

		},
		methods: {
			closeInput(){
				plus.key.hideSoftKeybord();
			},
			getList() {
				let data = {
					type: 3,
					parent: this.parentId,
					recordId: this.id,
					list: []
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
							// this.list=res.list;
							console.log(res.list[0].children.length)
							this.calcInfo(res.list);
						}
					}
				}).then((err) => {
					uni.hideLoading();
					// console.log(err);
				})
			},
			openMore(res) {
				if (res == this.openNumIndex) {
					this.openNumIndex = null;
				} else {
					this.openNumIndex = res;
				}
			},
			fullImple(res, res1, res2, res3, res4) {
				if(this.state!='1'){
					let text='';
					if(this.state=='2'){
						text='订单已完成，无法操作。'
					}else if(this.state=='3'){
						text='订单已取消，无法操作。'
					}
					uni.showToast({
						title:text,
						icon:'none',
						duration:1000
					})
				return;
				}
				console.log(res, res1, res2, res3, res4);
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
						} else {
							this.list[res].children[res1].checkItem.optionItemList[res2].selected = 1;
							if(this.list[res].children[res1].checkItem.optionItemList[res2].qualified!='1'){
								this.showWarn(this.list[res].children[res1].checkItem,res3,this.list[res].children[res1].parentIds,this.list[res].children[res1].id);
							}
						}
					} else {
						console.log(1);
						for (let a = 0; a < this.list[res].children[res1].checkItem.optionItemList.length; a++) {
							this.list[res].children[res1].checkItem.optionItemList[a].selected = 0;
						}
						console.log(this.list[res].children[res1].checkItem.optionItemList);
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
							    url: 'unloadQuestion/unloadQuestion?proName='+_this.projectName+'&typeName='+res.typeName+
								'&pointName='+res.pointName+'&sourceName='+res.sourceName+'&itemName='+res.itemName+'&id='+_this.id+'&pjId='+_this.pjId+'&checkId='+checkId
								})
						}
						
					}
				})
			},
			secImg(res0, res1, res2, res3) {
				if(this.state!='1'){
					let text='';
					if(this.state=='2'){
						text='订单已完成，无法操作。'
					}else if(this.state=='3'){
						text='订单已取消，无法操作。'
					}
					uni.showToast({
						title:'订单已完成，无法操作。',
						icon:'none',
						duration:1000
					})
				return;
				}
				let _this = this;
				let token = uni.getStorageSync('token');
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
						console.log(JSON.stringify(res.tempFilePaths));
						if (res.tempFilePaths.length > 0) {
							// uni.showLoading({
							// 	title:'上传中...'
							// })
							for (let b = 0; b < res.tempFilePaths.length; b++) {
								let mUrl=uni.getStorageSync('url');
								uni.uploadFile({
									url: mUrl +
										'/inspect/inspectRecord/getPicpath', //仅为示例，非真实的接口地址
									filePath: res.tempFilePaths[b],
									name: 'file',
									formData: {
										'user': 'test'
									},
									header: {
										token: token
									},
									success: (uploadFileRes) => {
										console.log(JSON.parse(uploadFileRes.data));
										console.log(JSON.parse(uploadFileRes.data).data);
										_this.calcImg(res0, res1, res2, res3, JSON.parse(
											uploadFileRes.data).data);
									},
									fail: (err) => {
										console.log(err);
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
					let lr=this.imgUrl+this.list[res0].children[res1].checkItem.photoItemList[res2].imgs[a];
					url.push(lr);
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
						console.log(list[a].children[b].checkItem.itemType)
						if (list[a].children[b].checkItem.itemType == '4') {
							// console.log(list[a].children[b].checkItem.itemType)
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
								}
							}	
						}else if (list[a].children[b].checkItem.itemType == '2'){
							// 数字
							if(list[a].children[b].checkItem.inspectResult&&list[a].children[b].checkItem.inspectResult.numberValue){
								list[a].children[b].checkItem.numberItem.defaultValue=list[a].children[b].checkItem.inspectResult.numberValue;
							}
						}
					}
				}
				this.list = list;
			},
			quesBack() {
				uni.navigateTo({
					url: 'unloadQuestion/unloadQuestion'
				})
			},
			checkItem(){
				let haveRequired=false;
				for(let r in this.list){
					for (let s in this.list[r].children) {
						if(this.list[r].children[s].checkItem.required){
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
										this.showAlert();
										return;
									}
							}else if(this.list[r].children[s].checkItem.itemType == '2'){
								if(!this.list[r].children[s].checkItem.numberItem.defaultValue){
									this.showAlert();
									return;
								}
							}else if(this.list[r].children[s].checkItem.itemType == '3'){
								if(!this.list[r].children[s].checkItem.textItem.defaultValue){
									this.showAlert();
									return;
								}
							}else if(this.list[r].children[s].checkItem.itemType == '4'){
								for (let v in this.list[r].children[s].checkItem.photoItemList) {
								if(this.list[r].children[s].checkItem.photoItemList.imgs.length===0){
									this.showAlert();
									return;
								}
								}
							}
						}
						
					}
				}
				if(!haveRequired){
					console.log('sdfdsfv');
					this.saveNow(1);
				}
			},
			showAlert(){
				let _this=this;
				uni.showModal({
					title:'提示',
					content:'必填项未填写，是否提交?',
					success(res) {
						if(res.confirm){
							_this.saveNow(1);
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
							data.qualified = 0;
						data.photoValue=[];
						data.type = this.list[a].children[b].checkItem.itemType;
						
						data.isFinished=type;
						data.checkId = this.classId + ',' + this.parentId + ',' + this.list[a].id + ',' + this.list[a].children[
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
								if(data.optionValue){
										data.optionValue=data.optionValue.slice(0,data.optionValue.length-1);
								}
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
							if(this.list[a].children[b].checkItem.textItem.selected=='0'){
								data.qualified = 1;
							}
						} else if (this.list[a].children[b].checkItem.itemType == '4') {
							if(this.list[a].children[b].checkItem.photoSelected=='0'){
								data.qualified = 1;
							}
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
						}
						arr.push(data);
					}
				}
				console.log(arr);
				this.$http.inspectResultSave(arr).then((res) => {
					console.log(res);
					if (res.code === 200 && res.success) {
						if (type=='1') {
							uni.showToast({
								title:'提交成功！',
								position:'bottom',
								duration:800
							})
							setTimeout(()=>{
								uni.navigateBack({
									
								})
							},800);
						}else{
							uni.showToast({
								title:'保存成功！',
								position:'bottom',
								duration:800
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
