<!-- 条状图 -->
<template>
	<view style="width: 100%;height: 100%;">
		<qiun-data-charts v-if="isShow" type="column" :opts="column" :chartData="chartData" background="none" />
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	export default {
		props: {
			xValue: {
				type: Array,
				default: () => ['机房一', '机房二', '机房三', '机房四', '机房五']
			},
			yValueOne: {
				type: Array,
				default: () => [2, 2, 2, 3, 4]
			},
			yValueTwo: {
				type: Array,
				default: () => [3, 4, 2, 3, 4]
			},
			nameOne: {
				type:String,
				default:'在线'
			},
			nameTwo: {
				type:String,
				default:'告警'
			},
			colorList: {
				type:Array,
				default: () => ['#177cfe','#feae33']
			},
			rotateLabel: {
				type:Boolean,
				default: false
			},
			legend: {
				type: Boolean,
				default: true
			},
			data: {
				type:Array,
				default: () => []
			},
			yTitle: {
				type:String,
				default:''
			},
			showBox: {
				type:Boolean,
				default: false
			}
		},
		watch: {
			xValue(newValue) {
				// console.log(newValue,'x------------------------>')
				this.chartData.categories = newValue
			},
			yValueOne(newValue) {
				// console.log(newValue,'y1------------------------>')
				this.chartData.series[0].data = newValue
				this.isShow = true
			},
			yValueTwo(newValue) {
				// console.log(newValue,'y2------------------------>')
				this.chartData.series[1].data = newValue
				this.isShow = true
			}
		},
		data() {
			return {
				isShow:false,
				chartData: {
					categories: this.xValue,
					series: [{
							"name": this.nameOne,
							"data": this.yValueOne,
						},
						{
							"name": this.nameTwo,
							"data": this.yValueTwo
						}
					],
				},
				"column": {
					"padding": [0,0,20,0],
					"color": this.colorList,
					"fontColor": "#666666",
					"dataLabel": false,
					"yAxis": {
						"disabled": false,
						"disableGrid": false,
						"splitNumber": 5,
						"gridType": "dash",// solid实线 dash虚线
						"dashLength": 8,
						"gridColor": "#CCCCCC",
						"showTitle": true,
						"data": [
							{
								"position": "left",
								"title": this.yTitle,
								min:0,
							}
						]
					},
					xAxis: {
						rotateLabel:this.rotateLabel
					},
					"legend": {
						"show": this.legend,
						"position": "top",
						"fontColor": "#666666",
					},
					"extra": {
						"column": {
							"type": "stack",
							"width": 20,
							"seriesGap": 2,
							"categoryGap": 3,
							"barBorderCircle": false,
							"linearType": "none",
							"linearOpacity": 1,
							"colorStop": 0,
							"meterBorder": 1,
							"meterFillColor": "#FFFFFF",
							"activeBgColor": "#000000",
							"activeBgOpacity": 0.08,
							"meterBorde": 1
						},
						"tooltip": {
							"showBox": this.showBox,
							"showArrow": true,
							"showCategory": false,
							"borderWidth": 0,
							"borderRadius": 0,
							"borderColor": "#000000",
							"borderOpacity": 0.7,
							"bgColor": "#000000",
							"bgOpacity": 0.7,
							"gridType": "solid",
							"dashLength": 2,
							"gridColor": "#CCCCCC",
							"fontColor": "#FFFFFF",
							"splitLine": true,
							"horizentalLine": false,
							"xAxisLabel": false,
							"yAxisLabel": false,
							"labelBgColor": "#FFFFFF",
							"labelBgOpacity": 0.7,
							"labelFontColor": "#666666"
						},
						"markLine": {
							"type": "solid",
							"dashLength": 4,
							"data": []
						}
					}
				}
				// chartData: {
				// 	"categories": this.categories,
				// 	"series": [{
				// 			"name": "在线",
				// 			"data": this.yValue1
				// 		},
				// 		{
				// 			"name": "离线",
				// 			"data": this.yValue2
				// 		}
				// 	]
				// },
				// "bar": {
				// 	"type": "bar",
				// 	"canvasId": "",
				// 	"canvas2d": false,
				// 	"background": "none",
				// 	"animation": true,
				// 	"timing": "easeOut",
				// 	"duration": 1000,
				// 	"color": [
				// 		"#1890FF",
				// 		"#91CB74",
				// 		"#FAC858",
				// 		"#EE6666",
				// 		"#73C0DE",
				// 		"#3CA272",
				// 		"#FC8452",
				// 		"#9A60B4",
				// 		"#ea7ccc"
				// 	],
				// 	"padding": [
				// 		15,
				// 		30,
				// 		0,
				//  	5
				//  ],
				// 	"rotate": false,
				// 	"errorReload": true,
				// 	"fontSize": 13,
				// 	"fontColor": "#666666",
				// 	"enableScroll": false,
				// 	"touchMoveLimit": 60,
				// 	"enableMarkLine": false,
				// 	"dataLabel": true,
				// 	"dataPointShape": true,
				// 	"dataPointShapeType": "solid",
				// 	"tapLegend": true,
				// 	"xAxis": {
				// 		"disabled": false,
				// 		"axisLine": false,
				// 		"axisLineColor": "#CCCCCC",
				// 		"calibration": false,
				// 		"fontColor": "#666666",
				// 		"fontSize": 13,
				// 		"rotateLabel": false,
				// 		"itemCount": 5,
				// 		"boundaryGap": "justify",
				// 		"disableGrid": false,
				// 		"gridColor": "#CCCCCC",
				// 		"gridType": "solid",
				// 		"dashLength": 4,
				// 		"gridEval": 1,
				// 		"scrollShow": false,
				// 		"scrollAlign": "left",
				// 		"scrollColor": "#A6A6A6",
				// 		"scrollBackgroundColor": "#EFEBEF",
				// 		"min": 0,
				// 		"format": ""
				// 	},
				// 	"yAxis": {
				// 		"disabled": false,
				// 		"disableGrid": false,
				// 		"splitNumber": 5,
				// 		"gridType": "solid",
				// 		"dashLength": 8,
				// 		"gridColor": "#CCCCCC",
				// 		"padding": 10,
				// 		"showTitle": false,
				// 		"data": []
				// 	},
				// 	"legend": {
				// 		"show": true,
				// 		"position": "bottom",
				// 		"float": "center",
				// 		"padding": 5,
				// 		"margin": 5,
				// 		"backgroundColor": "rgba(0,0,0,0)",
				// 		"borderColor": "rgba(0,0,0,0)",
				// 		"borderWidth": 0,
				// 		"fontSize": 13,
				// 		"fontColor": "#666666",
				// 		"lineHeight": 11,
				// 		"hiddenColor": "#CECECE",
				// 		"itemGap": 10
				// 	},
				// 	"extra": {
				// 		"bar": {
				// 			"type": "group",
				//    "width": 30,
				// 			"seriesGap": 2,
				// 			"categoryGap": 3,
				// 			"barBorderCircle": false,
				// 			"linearType": "none",
				// 			"linearOpacity": 1,
				// 			"colorStop": 0,
				// 			"activeBgColor": "#000000",
				// 			"activeBgOpacity": 0.08,
				// 			"meterBorde": 1,
				// 			"meterFillColor": "#FFFFFF"
				// 		},
				// 		"tooltip": {
				// 			"showBox": true,
				// 			"showArrow": true,
				// 			"showCategory": false,
				// 			"borderWidth": 0,
				// 			"borderRadius": 0,
				// 			"borderColor": "#000000",
				// 			"borderOpacity": 0.7,
				// 			"bgColor": "#000000",
				// 			"bgOpacity": 0.7,
				// 			"gridType": "solid",
				// 			"dashLength": 4,
				// 			"gridColor": "#CCCCCC",
				// 			"fontColor": "#FFFFFF",
				// 			"splitLine": true,
				// 			"horizentalLine": false,
				// 			"xAxisLabel": false,
				// 			"yAxisLabel": false,
				// 			"labelBgColor": "#FFFFFF",
				// 			"labelBgOpacity": 0.7,
				// 			"labelFontColor": "#666666"
				// 		},
				// 		"markLine": {
				// 			"type": "solid",
				// 			"dashLength": 4,
				// 			"data": []
				// 		}
				// 	}
				// }

			}
		},

		methods: {

		}
	}
</script>

<style>
</style>
