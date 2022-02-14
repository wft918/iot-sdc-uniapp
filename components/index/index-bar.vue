<!-- 今日能耗统计  柱状图组件 -->
<template>
	<view style="width: 100%;height: 100%;">
		<qiun-data-charts v-if="isShow" type="column" :opts="column" :chartData="chartData" background="none" />
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	export default {
		name: 'index-ring',
		props: {
			xValue: {
				type: Array,
				default: () => ['机房一', '机房二', '机房三', '机房四', '机房五', '机房六']
			},
			yValue: {
				type: Array,
				default: () => [35,36,31,33,13,34]
			},
			yTitle: {
				type:String,
				default: 'KW'
			},
			rotateLabel: {
				type:Boolean,
				default:false
			},
			name: {
				type:String,
				default:''
			}
		},
		watch: {
			xValue(newValue) {
				this.chartData.categories = newValue
			},
			yValue(newValue) {
				this.chartData.series[0].data = newValue
				this.isShow = true
			}
		},
		data() {
			return {
				isShow:false,
				chartData: {
					categories: this.xValue,
					series: [{
						"name": this.name,
						"data": this.yValue
					}],
				},
				column: {
					"color": ["#30bbfe"],
					"padding":[10,0,20,0],
					"fontColor": "#494949",
					"dataLabel": false,
					"yAxis": {
						"padding": 10,
						"showTitle": true,
						"data": [
							{
								"position": "left",
								"title": this.yTitle,
								min:0,
							}
						]
					},
					 "xAxis": {
						"disabled": false,
						"axisLine": true,
						"axisLineColor": "#dfdfdf",
						"rotateLabel": this.rotateLabel,
					},
					"extra": {
						"column": {
							"width": 15,
							"linearType": "custom",
							"linearOpacity": 0.8,
							"customColor": ['#0571f5', '#21a1fb', '#35c6ff']
						}
					},
					"legend": {
						"show": false
					}
				},
			}
		},
		
		methods: {

		}
	}
</script>

<style>
</style>
