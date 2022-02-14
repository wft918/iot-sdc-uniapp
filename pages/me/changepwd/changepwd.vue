<template>
	<view class="container">
		<view class="title">请您为账号{{userInfo.username}}修改密码</view>
		<view class="pwdT">旧密码</view>
		<view class="pwIN">
			<view class="pwINL">请输入旧密码</view>
			<view class="pwINR">
				<uni-easyinput class='easyP' :inputBorder="false" type="password" v-model="passwordOld" placeholder="请输入旧密码"></uni-easyinput>
			</view>
		</view>
		<view class="pwdT">新密码 <text class="NewPwd">（密码须包含大小字母、数字、特称字符三种字符）</text></view>
		<view class="pwIN">
			<view class="pwINL">请输入新密码</view>
			<view class="pwINR">
				<uni-easyinput class='easyP' :inputBorder="false" type="password" v-model="passwordNew" placeholder="请输入新密码"></uni-easyinput>
			</view>
		</view>
		<view class="line">
			<view class="lineIn"></view>
		</view>
		<view class="pwIN">
			<view class="pwINL">请输入新密码</view>
			<view class="pwINR">
				<uni-easyinput class='easyP' :inputBorder="false" type="password" v-model="passwordCon" placeholder="请确认新密码"></uni-easyinput>
			</view>
		</view>
		<view class="saveNewPwd" @tap="$HClick(saveNewPwd)">保存新密码</view>
		<view class="succ" :class="showSu?'succ1':''">
			<view class="alertInfo" :class="showSu?'alertInfo1':''">
				<image class="alertImg" src="../../../static/img/safe.png"></image>
				<view class="succT">修改成功</view>
				<view class="contentT">您的密码已经修改生效，请重新登录</view>
				<view class="toLogin" @tap="toLogin()">立即登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../../common/md5.js'
	export default {
		data() {
			return {
				userInfo:{},
				phone:'',
				passwordOld:'',
				passwordNew:'',
				passwordCon:'',
				onoff:true,
				showSu:false
			}
		},
		onLoad() {
			this.userInfo=uni.getStorageSync('userinfo');
			console.log(this.userInfo);
				// let p=this.userInfo.mobile;
				// console.log(uni.getStorageSync('lastpwd'));
			// this.passwordOld=uni.getStorageSync('lastpwd')||'';
			// this.calcPhone();
		},
		onBackPress() {
			if(!this.showSu){
				uni.switchTab({
					url:'../me'
				})
			}
			return true;
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					"animationType": "slide-in-bottom",
					url:'../../login/login?type=4'
				})
			},
			calcPhone(){
				let p=this.userInfo.mobile;
				let n=p.length-7;
				let x='';
				for(let a=0;a<n;a++){
					x+='*';
				}
				this.phone=p.substr(0,3)+x+p.substr((p.length-4),4);
			},
			saveNewPwd(){
				if(!this.passwordOld){
					uni.showToast({
						title:'请输入旧密码！',
						icon:'none',
						duration:600
					})
					return;
				}
				if(!this.passwordNew){
					uni.showToast({
						title:'请输入新密码！',
						icon:'none',
						duration:600
					})
					return;
				}
				if(!this.passwordCon){
					uni.showToast({
						title:'请输入确认密码！',
						icon:'none',
						duration:600
					})
					return;
				}
				if(this.passwordCon!=this.passwordNew){
					uni.showToast({
						title:'确认密码与新密码不一致！',
						icon:'none',
						duration:600
					})
					return;
				}
				// let agreedata=this.agreeCheck();
				// if(!agreedata){
				// 	return;
				// }//密码合规检查
				let userinfo=uni.getStorageSync('userinfo');
				let data={
					username:userinfo.username,
					password:this.passwordOld,
					newpassword1:this.passwordNew
				};
				let data1={userDto:data};
				console.log(data);
				this.$http.userEdit(data).then((res)=>{
					console.log(res);
					if(res.code===0&&res.data){
							this.showSu=true;
							// uni.removeStorageSync('token');
						}else{
							uni.showToast({
								title:res.msg,
								icon:'none',
								duration:600
							})
					}
				})
			},
			agreeCheck(){
				var str = this.passwordNew;
				//验证是否是中文
				var pattern = new RegExp("[\u4E00-\u9FA5]+");
				if(pattern.test(str)){
				   uni.showToast({
				   	title:'密码中不能含有中文字符！',
					icon:'none',
					duration:1200
				   })
				   return false;
				}
				 
				//验证是否是英文
				 
				var pattern2 = new RegExp("[A-Z]+");
				if(!pattern2.test(str)){
				 uni.showToast({
				 	title:'密码中缺少大写字母！',
				 	icon:'none',
				 	duration:1200
				 })
				 return false;
				}
				var pattern3 = new RegExp("[a-z]+");
				if(!pattern3.test(str)){
				 uni.showToast({
				 	title:'密码中缺少小写字母！',
				 	icon:'none',
				 	duration:1200
				 })
				 return false;
				}
				 
				//验证是否是数字
				 
				var pattern4 = new RegExp("[0-9]+");
				if(!pattern4.test(str)){
				 uni.showToast({
				 	title:'密码中缺少数字！',
				 	icon:'none',
				 	duration:1200
				 })
				 return false;
				}
				var pattern5 = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
				　　if (!pattern5.test(str)){
				　　　　uni.showToast({
							title:'密码中缺少特殊字符！',
							icon:'none',
							duration:1200
				        })
						return false;
				　　}
				return true;
			},
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	height: 100vh;
	background-color: #f0f0f5;
}
.title{
	width: 100%;
	height: 200rpx;
	background-color: white;
	line-height: 200rpx;
	text-align: center;
	color: #545454;
	font-size: 30rpx;
}
.pwdT{
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	box-sizing: border-box;
	padding: 0 30rpx;
	font-size: 30rpx;
	color: #999;
}
.pwIN{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	box-sizing: border-box;
	padding: 0 30rpx;
	font-size: 26rpx;
	color: #333;
	background-color: white;
	display: flex;
	align-items: center;
}
.pwINL{
	flex: 1;
	height: 100%;
}
.pwINR{
	flex: 2;
	/* background-color: #55ff00; */
}
.easyP{
	/* background-color: #aaff00; */
}
.line{
	width: 100%;
	height: 1rpx;
	background-color: white;
}
.lineIn{
	width: 690rpx;
	margin: 0 auto;
	height: 1rpx;
	background-color: #f0f0f5;
}
.saveNewPwd{
	width: 630rpx;
	height: 100rpx;
	margin: 300rpx auto 0 auto;
	background: #0193E9;
	color: #FFFFFF;
	font-size: 30rpx;
	text-align: center;
	letter-spacing: 4rpx;
	line-height: 100rpx;
	border-radius: 12rpx;
	box-shadow: 0 0 20rpx 10rpx rgba(255,255,255,0.2);
}
.saveNewPwd:active{
	background-color: #007AFF;
}
.succ{
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0,0.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: -10;
	display: flex;
	opacity: 0;
	justify-content: space-around;
	align-items: center;
	transition: ease 400ms; 
}
.succ1{
	z-index: 10;
	opacity: 1;
}
.alertInfo{
	width: 560rpx;
	height: 660rpx;
	background-color: white;
	border-radius: 20rpx;
	position: relative;
	opacity: 0;
	top: 2000rpx;
	transition: ease 400ms;
}
.alertInfo1{
	opacity: 1;
	top: -160rpx;
}
.alertImg{
	width: 300rpx;
	height: 300rpx;
	display: block;
	margin: 40rpx auto 0 auto;
}
.contentT{
	width: 100%;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 26rpx;
	color: #333;
}
.succT{
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 30rpx;
	color: #000;
	font-weight: 700;
}
.toLogin{
	width: 480rpx;
	height: 80rpx;
	background-color: #0193E9;
	color: white;
	font-size: 28rpx;
	text-align: center;
	line-height: 80rpx;
	margin: 30rpx auto 0 auto;
	border-radius: 12rpx;
	letter-spacing: 4rpx;
}
.toLogin:active{
	background-color: #007AFF;
}
.NewPwd{
	font-size: 26rpx;
	color: #AAAAAA;
}
</style>
