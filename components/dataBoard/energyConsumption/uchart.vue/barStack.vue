<!-- 柱状图  4条-->
<template>
	<view style="width: 100%;height: 100%;">
		<qiun-data-charts v-if="isShow" type="column" :opts="column" :chartData="chartData" background="none" />
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	export default {
		props:{
			colorList: {
				type:Array,
				default: () => ['#019aff','#67c8ff','#feae33','#fe7b33']
			},
			ConsumeInWeekList: {
				type:Object,
				default: () => ({xAxis:[],series:[]})
			}
		},
		watch: {
			ConsumeInWeekList(newValue) {
				newValue.xaxis = newValue.xaxis.map(item => item.split('-').slice(1).join('-'))
				newValue.series.forEach(item => {
					item.data = item.data.map(arr => parseFloat(arr))
				})
				// console.log(newValue,'newValue---------->各设备周能耗')
				this.chartData.categories = newValue.xaxis
				this.chartData.series = newValue.series
				this.isShow = true
			}
		},
		data() {
			return {
				chartData: {
					categories: this.ConsumeInWeekList.xAxis,
					series: this.ConsumeInWeekList.series,
				},
				isShow:false,
				"column": {
					"color": this.colorList,
					"fontColor": "#666666",
					"dataLabel": false,
					"yAxis": {
						"disabled": false,
						"disableGrid": false,
						"splitNumber": 5,
						"gridType": "dash", // solid实线 dash虚线
						"dashLength": 8,
						"gridColor": "#CCCCCC",
						"padding": 10,
						min: 0,
						"showTitle": false,
						"data": []
					},
					"legend": {
						"show": true,
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
			}
		}
	}
</script>

<style>
</style>
