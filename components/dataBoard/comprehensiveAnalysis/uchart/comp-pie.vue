<!-- 圆环图 -->
<template>
	<view style="width: 100%;height: 100%;">
		<qiun-data-charts v-if="isShow" type="ring" style="width: 100%;height: 100%;" :opts="ring" :chartData="chartData"
			:errorShow="false" background="none" />
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	export default {
		props: {
			value: {
				type: String,
				default: '300'
			},
			colorList: {
				type: Array,
				default: () => ['#009afb','#f14200']
			},
			subTitle: {
				// type: String,
				default: ''
			},
			ringWidth: {
				type: Number,
				default:15
			},
			titleFontSize: {
				type:Number,
				default:25
			},
			subTitleFontSize: {
				type:Number,
				default:15
			},
			deviceData: {
				type:Array,
				default:() => []
			}
		},
		watch: {
			'deviceData': {
				handler(newValue) {
					// console.log(newValue,'ppie------------>>>>')
					this.chartData.series[0].data = newValue
					this.isShow = true
				},
				deep:true,
				// immediate:true
			},
			subTitle(newValue) {
				this.ring.subtitle.name = newValue
			},
			value(newValue) {
				this.ring.title.name = newValue
			}
		},
		data() {
			return {
				isShow:false,
				chartData: {
					categories: [],
					"series": [{
						"data": [{
								"name": "一班",
								"value": 50
							},
							{
								"name": "二班",
								"value": 30
							}
						]
					}]
				},
				"ring": {
					"type": "ring",
					"color": this.colorList,
					"rotate": false,
					"errorReload": true,
					"fontSize": 13,
					"fontColor": "#666666",
					"dataLabel": false,
					"legend": {
						"show": false
					},
					"title": {
						"name": this.value,
						"fontSize": this.titleFontSize,
						"color": "#666666",
						"offsetX": 0,
						"offsetY": -5
					},
					"subtitle": {
						"name": this.subTitle,
						"fontSize": this.subTitleFontSize,
						"color": "#a9a9a9",
						"offsetX": 0,
						"offsetY": 0
					},
					"extra": {
						"ring": {
							"ringWidth": this.ringWidth,//
							"centerColor": "#FFFFFF",
							"activeOpacity": 0.5,
							"activeRadius": 5,
							"offsetAngle": 0,
							"customRadius": 0,
							"labelWidth": 10,
							"border": true,
							"borderWidth": 3,
							"borderColor": "#FFFFFF",
							"linearType": "none"
						},
						"tooltip": {
							"showBox": false,
							"showArrow": false,
							"showCategory": false,
							"borderWidth": 0,
							"borderRadius": 0,
							"borderColor": "#000000",
							"borderOpacity": 0.7,
							"bgColor": "#000000",
							"bgOpacity": 0.7,
							"gridType": "solid",
							"dashLength": 4,
							"gridColor": "#CCCCCC",
							"fontColor": "#FFFFFF",
							"splitLine": true,
							"horizentalLine": false,
							"xAxisLabel": false,
							"yAxisLabel": false,
							"labelBgColor": "#FFFFFF",
							"labelBgOpacity": 0.7,
							"labelFontColor": "#666666"
						}
					}
				}
			}
		}
	}
</script>

<style>
</style>
