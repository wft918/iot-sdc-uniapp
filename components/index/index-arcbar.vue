<!-- 今日园区Pue  进度条 -->
<template>
	<view style="width: 100%;height: 100%;">
		<qiun-data-charts v-if="isShow" type="arcbar" :chartData="chartData" :opts="arcbarOpts" background="none" />
	</view>
</template>

<script>
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';
	export default {
		name: 'index-ring',
		props: {
			titleName: {
				type: String,
				default: '1.3'
			},
			subTitleName: {
				type: String,
				default: 'PUE'
			},
			data: {
				type:String,
				default:0.4
			}
		},
		watch: {
			titleName(newValue) {
				this.arcbarOpts.title.name = newValue
			}, 
			data(newValue) {
				this.chartData.series[0].data = newValue
				this.isShow = true
			},
			subTitleName(newValue) {
				this.arcbarOpts.subtitle.name = newValue
			}
		},
		data() {
			return {
				isShow:false,
				chartData: {
					categories: '',
					series: [{
						// "name": "正确率",
						"data": 0.4,
						"color": "#55bf3b"
					}],
				},
				arcbarOpts: {
					"type": "arcbar",
					"canvasId": "",
					"canvas2d": false,
					"background": "none",
					"animation": true,
					"timing": "easeOut",
					"duration": 1000,
					"color": [
						"#1890FF",
						"#91CB74",
						"#FAC858",
						"#EE6666",
						"#73C0DE",
						"#3CA272",
						"#FC8452",
						"#9A60B4",
						"#ea7ccc"
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
					"title": {
						"name": this.titleName,
						"fontSize": 15,
						"color": "#454545",
						"offsetX": 0,
						"offsetY": 0
					},
					"subtitle": {
						"name": this.subTitleName,
						"fontSize": 15,
						"color": "#454545",
						"offsetX": 0,
						"offsetY": 0
					},
					"extra": {
						"arcbar": {
							"type": "default",
							"width": 15,
							"backgroundColor": "#eeeeee",
							"startAngle": 1,
							"endAngle": 0,
							radius:45,
							"gap": 2,
							"centerX": 0,
							"centerY": 0,
							"linearType": "none"
						}
					}
				}
			}
		},

		methods: {

		}
	}
</script>

<style>
</style>
