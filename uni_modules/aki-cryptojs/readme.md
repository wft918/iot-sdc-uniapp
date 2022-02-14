# AES加解密 HmacSHA256散列算法 SDK aki-cryptojs
## 如何使用
### 安装SDK
在插件市场安装
### 安装依赖
在项目根目录：
```
cnpm i crypto-js --save
```
### 在script中引用
```
import akicryptojs from '@/uni_modules/aki-cryptojs/js_sdk/aki-cryptojs'
```
### 调用SDK
```
this.hash1 = akicryptojs.EncryptHmacSHA256(this.message1,this.key);
this.hash2 = akicryptojs.EncryptAES(this.message1,this.key,this.iv);
this.message2 = akicryptojs.DecryptAES(this.hash2,this.key,this.iv);
```

### 使用案例
```
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">这是原文：{{title}}</view>
		<view class="text-area">
			<text class="title">这是HmacSHA256：{{title1}}</text>
		</view>
		<view class="text-area">
			<text class="title">这是AES加密：{{title2}}</text>
		</view>
		<view class="text-area">
			<text class="title">这是AES解密：{{title3}}</text>
		</view>
		<view class="text-area">
			<view class="title">在下方输入密码givemeyourmoney5后解密：{{inputValue}}</view>
			<input class="uni-input" @blur="onKeyInput" placeholder="输入密码后点到一边看效果" />
		</view>
	</view>
</template>

<script>
	import akicryptojs from '@/uni_modules/aki-cryptojs/js_sdk/aki-cryptojs'
	export default {
		data() {
			return {
				title: 'Hello',
				title1: '',
				title2: '',
				title3: '',
				key:'givemeyourmoney5',
				iv:'HelloHelloHello1',
				inputValue:''
			}
		},
		onLoad() {
			this.title1 = akicryptojs.EncryptHmacSHA256(this.title,this.key);
			this.title2 = akicryptojs.EncryptAES(this.title,this.key,this.iv);
			this.title3 = akicryptojs.DecryptAES(this.title2,this.key,this.iv);
			console.log(this.title2)
			console.log(this.title3)
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue = akicryptojs.DecryptAES(this.title2,event.target.value,this.iv);
			    console.log(this.inputValue)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		padding: 10rpx 50rpx;
		word-break: break-all;
	}
	.uni-input{
		border: #4CD964 1px solid;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

```
