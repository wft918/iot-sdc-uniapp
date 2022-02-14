<!-- 排行组件 -->
<template>
	<view style="width: 100%;height: 100%;padding: 10rpx;box-sizing: border-box;">
		
		<view v-for="(item,index) in data" :key="item.id" style="width: 100%;height: 20%;display: flex;align-items: center;">
			<view style="width: 8%;font-weight: 700;text-align: center;">
				<text style="font-size: 32rpx;" :style="{color:index == 0?'#EC4200':index == 1?'#DD6524':index == 2?'#FEAE33':index == 3?'#019AFF':index == 4?'#019AFF':'#019AFF'}">0{{index + 1}}</text>
			</view>
			<view :style="{width:centerWidth}">
				<u-line-progress :percent="item.value" :show-percent="showPercent" :round="false" :inactive-color="inactiveColor" :active-color="index == 0?'#EC4200':index == 1?'#DD6524':index == 2?'#FEAE33':index == 3?'#019AFF':index == 4?'#019AFF':'#019AFF'"></u-line-progress>
			</view>
			<view :style="{width:rightWidth}" style="text-align: center;color: #666666;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
				<text>{{item.label}}</text>
				<text style="margin-left: 10rpx;" :style="{color:index == 0?'#EC4200':index == 1?'#DD6524':index == 2?'#FEAE33':index == 3?'#019AFF':index == 4?'#019AFF':'#019AFF'}">{{item.dataValue}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
			// 是否在进度条显示当前的百分比值数值
			showPercent: {
				type:Boolean,
				default:false
			},
			// 进度条的底色
			inactiveColor: {
				type:String,
				default:'#d6d6d6'
			},
			// 布局 --> 中间进度条的宽度
			centerWidth: {
				type:String,
				default:'80%'
			},
			// 布局 --> 右侧名称的宽度
			rightWidth: {
				type:String,
				default:'12%'
			},
			// 所有数据
			data: {
				type:Array,
				default: () => {
					return [
					{
						label:'机房1',
						value:'70',
						id:'0'
					},
					{
						label:'机房2',
						value:'60',
						id:'1'
					},
					{
						label:'机房3',
						value:'50',
						id:'2'
					},
					{
						label:'机房4',
						value:'40',
						id:'3'
					},
					{
						label:'机房5',
						value:'30',
						id:'4'
					}
				]
				}
			}
		},
		// computed: {
		// 	dataProps() {
		// 		return JSON.parse(JSON.stringify(data))
		// 	}
		// }
	}
</script>

<style>
</style>
