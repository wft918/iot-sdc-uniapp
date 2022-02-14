<!-- -->pie组件<--- -->
	<template>
		<view style="width: 100%;height: 100%;">
			<qiun-data-charts v-if="isShow" type="pie" :opts="pie" :chartData="chartData" background="none" />
		</view>
	</template>

	<script>
		import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
		export default {
			props: {
				legend: {
					type:Boolean,
					default:true
				},
				legendPosition: {
					type:String,
					default: 'bottom'
				},
				colorList: {
					type:Array,
					default: () => (["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452"])
				},
				dataList: {
					type:Array,
					default: () => []
				}
			},
			watch: {
				dataList(newValue) {
					this.chartData.series[0].data = newValue
					this.isShow = true
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
									"value": 0
								},
								{
									"name": "二班",
									"value": 0
								},
								{
									"name": "三班",
									"value": 0
								},
								{
									"name": "四班",
									"value": 0
								},
								{
									"name": "五班",
									"value": 0
								}
							]
						}]
					},
					"pie": {
						"type": "pie",
						"canvasId": "",
						"canvas2d": false,
						"background": "none",
						"animation": true,
						"timing": "easeOut",
						"duration": 1000,
						"color": this.colorList,
						"padding": [
							5,
							5,
							5,
							5
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
						"legend": {
							"show": this.legend,
							"position": this.legendPosition,
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
							"pie": {
								"activeOpacity": 0.5,
								"activeRadius": 10,
								"offsetAngle": 0,
								"customRadius": 0,
								"labelWidth": 15,
								"border": true,
					  	"borderWidth": 3,
								"borderColor": "#FFFFFF",
								"linearType": "none"
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
							}
						}
					}
				}
			}
		}
	</script>
