<!-- 区域图 -->
<template>
	<view style="width: 100%;height: 100%;">
		<qiun-data-charts v-if="isShow" style="width: 100%;height: 100%;" type="area" :opts="area" :chartData="chartData" background="none" />
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	export default {
		props: {
			xValue: {
				type:Array,
				default: () => ['10-12','10-13','10-14','10-15','10-16']
			},
			yValue: {
				type:Array,
				default: () => [20,40,50,70,40,10]
			}
		},
		watch: {
			xValue(newValue) {
				this.chartData.categories = newValue
				this.isShow = true
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
					"categories": this.xValue,
					"series": [{
							"name": "数量趋势",
							"data": this.yValue
						}
					]
				},
				"area": {
					"type": "area",
					"canvasId": "",
					"canvas2d": false,
					"background": "none",
					"animation": true,
					"timing": "easeOut",
					"duration": 1000,
					"color": [
						"#ffe4bc",
					],
					"padding": [
						15,
						15,
						15,
						15
					],
					"rotate": false,
					"errorReload": true,
					"fontSize": 13,
					"fontColor": "#666666",
					"enableScroll": false,
					"touchMoveLimit": 60,
					"enableMarkLine": false,
					"dataLabel": true,
					"dataPointShape": true,
					"dataPointShapeType": "solid",
					"tapLegend": true,
					"xAxis": {
						"disabled": false,
						"axisLine": true,
						"axisLineColor": "#CCCCCC",
						"calibration": false,
						"fontColor": "#666666",
						"fontSize": 13,
						"rotateLabel": true,
						"itemCount": 5,
						"boundaryGap": "center",
						"disableGrid": true,
						"gridColor": "#CCCCCC",
						"gridType": "solid",
						"dashLength": 4,
						"gridEval": 1,
						"scrollShow": false,
						"scrollAlign": "left",
						"scrollColor": "#A6A6A6",
						"scrollBackgroundColor": "#EFEBEF",
						"format": ""
					},
					"yAxis": {
						"disabled": false,
						"disableGrid": false,
						"splitNumber": 5,
						"gridType": "dash",
						"dashLength": 2,
						"gridColor": "#CCCCCC",
						"padding": 10,
						"showTitle": false,
						"data": []
					},
					"legend": {
						"show": false,
						"position": "bottom",
				 	"float": "center",
						"padding": 5,
						"margin": 5,
						"backgroundColor": "rgba(0,0,0,0)",
						"borderColor": "rgba(0,0,0,0)",
						"borderWidth": 0,
						"fontSize": 13,
						"fontColor": "#666666",
						"lineHeight": 11,
						"hiddenColor": "#CECECE",
						"itemGap": 10
					},
					"extra": {
						"area": {
							"type": "straight",
							"opacity": 0.2,
							"addLine": true,
							"width": 2,
							"gradient": false
						},
						"tooltip": {
							"showBox": true,
							"showArrow": true,
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
						},
						"markLine": {
							"type": "solid",
							"dashLength": 4,
							"data": []
						}
					}
				}
			}
		}
	}
</script>

<style>
</style>
