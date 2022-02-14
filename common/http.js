//引用request.js
var request = require('./request.js')

//调用方法 👇 我把url放在单独的js 这样方面后续管理
function http() {};
// 登录
// http.login = function(e) {
// 	return request.postRequest('/api/v1/system/mobilelogin', e);
// };
http.login = function(username, password, code, randomStr) {
	return request.loginRequest(username, password, code, randomStr, '/auth/oauth/token');
};
// 刷新token
http.refreshToken = function(refresh_token) {
	return request.refreshToken(refresh_token, '/auth/oauth/token');
};
// 退出登录
http.logOut = function(refresh_token) {
	return request.headerRequest('DELETE', '/auth/token/logout');
};

//个人中心

// 获取用户信息
http.userInfo = function(e) {
	return request.getRequest('/admin/user/info', e);
};
//修改用户名
http.uplateAvatar = function(e) {
	return request.postHeaderRequest('/admin/user/uplateAvatar', e,true);
};
http.userEdit = function(e) {
	return request.putHeaderRequest('/admin/user/edit', e,true);
};

//获取菜单信息
http.menuInfo= function(e) {
	return request.getRequest('/admin/menu', e);
};
http.feedbackAdd= function(e) {
	return request.postHeaderRequest('/admin/feedback/add', e);
};
//获取我的反馈信息
http.feedbackMe= function(e) {
	return request.getRequest('/admin/feedback/list', e);
};
//获取常见反馈信息
http.listFAQ= function(e) {
	return request.getRequest('/admin/feedback/listFAQ', e);
};
http.versionCheck=function(e){
	return request.getRequest('/admin/appVersion/isUpdate',e);
}

// 首页 -- 接口 

// 获取园区id
http.getYqId = function() {
	return request.getRequest('/site-sdc/sdcsite/page',{type:'P00'});
};
// 根据园区查方案
http.getConfig = function(params) {
	return request.getRequest('/site-sdc/sdcpueconfig/getConfig/',params);
};
// 设备运行状态监视
http.getDeviceStatusStatistic = function(params) {
	return request.getRequest('/stats/dashboard/deviceOverview/',params);
};
// 告警处理状态监视
http.getAlarmHandleSituation = function(params) {
	return request.getRequest('/stats/app/powerring/alarmHandleSituation/',params);
};
// 今日园区pue
http.getPueAndConsume = function(params) {
	return request.getRequest('/stats/sdcdevicepowerlog/getPueAndConsume/',params);
};
// 今日能耗统计
http.getPowerRank = function(params) {
	return request.getRequest('/stats/app/sdcdevicepowerlog/getPowerRank/',params);
};


// 数据看板   -- >  能耗数据


// 当前pue排行
http.getPueRank = function(params) {
	return request.getRequest('/stats/sdcdevicepowerlog/getPueRank/',params);
};
// 各项设备周能耗
http.getConsumeInWeek = function(params) {
	return request.getRequest('/stats/sdcdevicepowerlog/powerTrend/',params);
};


// 数据看板 -- >  动环数据

// 设备类型统计
http.getDeviceTypeStatisticApp = function(params) {
	return request.getRequest('/stats/app/powerring/deviceTypeStatistic/',params);
};
// 近7日机房告警数量排行
http.getRoomAlarmNumRank = function(params) {
	return request.getRequest('/stats/powerring/roomAlarmNumRank/',params);
};
// 近7日机房告警数量趋势
http.getAlarmTrend = function(params) {
	return request.getRequest('/stats/powerring/alarmTrend/',params);
};



// 数据看板  =----  ->>  综合分析

// 设备统计
http.getDeviceStatistic = function(params) {
	return request.getRequest('/stats/app/dashboard/deviceStatistic/',params);
};
// 能耗统计
http.getPowerStatistic = function(params) {
	return request.getRequest('/stats/app/dashboard/powerStatistic/',params);
};
// 告警统计
http.getAlarmStatistic = function(params) {
	return request.getRequest('/stats/app/dashboard/alarmStatistic/',params);
};
// 巡查统计
http.getInspectStatisticApp = function(params) {
	return request.getRequest('/stats/app/dashboard/inspectStatisticApp/',params);
};

// 各机房设备在线率
http.getRoomDeviceOnlineRank = function(params) {
	return request.getRequest('/stats/app/dashboard/roomDeviceOnlineRank/',params);
};
// 数据中心告警统计
// http.getDataCenterAlarmStatistic = function(params) {
// 	return request.getRequest('/stats/app/dashboard/dataCenterAlarmStatistic/',params);
// };
// 左
http.getSjzxLeft = function(params) {
	return request.getRequest('/stats/app/powerring/alarmHandleSituation/',params);
};
// 右
http.getSjzxRight = function(params) {
	return request.getRequest('/stats/app/dashboard/dataCenterAlarmStatistic/',params);
};
// 能耗数据统计
http.getPowerDataStatistic = function(params) {
	return request.getRequest('/stats/app/dashboard/powerDataStatistic/',params);
};


// 我的公告 ----------------------------------------------

// 查询公告列表
http.getNoticeData = function(params) {
	return request.getRequest('/announcement-sdc/sdcannouncementsend/page',params);
};
// 查询公告详情
http.getSdcannouncement = function(id) {
	return request.getRequest('/announcement-sdc/sdcannouncement/' + id);
};


// 告警信息----------------------------------------------------------------------

// 告警信息查询
http.getSdcsimulatoralarmPage = function(params) {
	return request.getRequest('/stats/app/alarm/page/',params);
};

// 房间筛选  ----  树形结构
http.getTree = function(params) {
	return request.getRequest('/site-sdc/sdcsite/tree/',params);
};

// 巡检
http.listByUser = function(e) {
	return request.getRequest('/check/iot/tsg/projectInfo/listByUser', e);
};
http.inspectonline = function(e) {
	return request.getRequest('/check/inspect/inspectRecord/count/online', e);
};
http.inspectRecord = function(e) {
	return request.getRequest('/check/inspect/inspectRecord/list', e);
};
http.inspectRouteQueryById = function(e) {
	return request.getRequest('/check/inspect/inspectRoute/queryById', e);
};
http.inspectSitereeList = function(e) {
	return request.getRequest('/check/inspect/inspectSite/tree/list', e);
};
http.sdcdeviceindicator = function(e) {
	return request.getRequest('/epm-sdc/sdcdeviceindicator/page', e);
};
http.inspectResultSave = function(e) {
	return request.postHeaderRequest('/check/inspect/inspectResult/save', e);
};
http.inspectResultProblemSave = function(e) {
	return request.postHeaderRequest('/check/inspect/inspectProblem/save', e);
};
http.inspectUpdateState = function(e) {
	return request.postHeaderRequest('/check/inspect/inspectRecord/updateState', e);
}
http.inspectIsFinished = function(e) {
	return request.getRequest('/check/inspect/inspectRecord/get/isFinished', e);
};

//问题追踪
http.inspectProblemList = function(e) {
	return request.getRequest('/check/inspect/inspectProblem/list', e);
};
http.inspectProblemQueryById = function(e) {
	return request.getRequest('/check/inspect/inspectProblem/queryById', e);
};
http.handleRecordSave = function(e) {
	return request.postHeaderRequest('/check/inspect/handleRecord/save', e);
};
http.projectInfoList = function(e) {
	return request.getRequest('/check/iot/tsg/projectInfo/list', e);
};
http.inspectRiskTree = function(e) {
	return request.getRequest('/check/inspect/riskTree/list', e);
};




// 实时监控 -----------------------------------------------------------------------

// 获取房间  --  大图片
http.getBySiteSys = function(params) {
	return request.getRequest('/epm-sdc/sdcsitemanage/getBySiteSys',params);
};

// 获取房间中的 -- 小设备
http.getSdcdevicePage = function(params) {
	return request.getRequest('/site-sdc/sdcdevice/page',params);
};

// 设备详情 --历史事件
http.getSdcdeviceeventlogPage = function(params) {
	return request.getRequest('/epm-sdc/sdcdeviceeventlog/page',params);
};
// // 设备详情 --告警历史  同告警信息查询
// http.getSdcsimulatoralarmPage = function(params) {
// 	return request.getRequest('/api-sdc/sdcsimulatoralarm/page',params);
// };
// 设备详情 --tab页签
http.getSdcdeviceindicatorPage = function(params) {
	return request.getRequest('/epm-sdc/sdcdeviceindicator/page',params);
};



// 视频监控 -----------------------------------------------------------------------

// 获取摄像头树形列表
http.getTreeByTopType = function() {
	return request.getRequest('/site-sdc/sdcdevice/treeByTopType',{topTypeCode: 'ipc'});
};


// 告警统计--------------------------------------------------------------------

// 今日告警分析
http.getAlarmHandleSituationApp = function(params) {
	return request.getRequest('/stats/app/powerring/alarmHandleSituation/',params);
};
// 近七天告警条数分析
http.getAlarmNum = function(params) {
	return request.getRequest('/stats/app/alarm/alarmNum/',params);
};
// 机房告警处理 TOP 5
http.getRoomAlarmDealRank = function(params) {
	return request.getRequest('/stats/app/alarm/roomAlarmDealRank/',params);
};
// 设备告警处理 TOP 5
http.getDeviceAlarmRank = function(params) {
	return request.getRequest('/stats/app/alarm/deviceAlarmRank/',params);
};
// 今日设备类型占比
http.getDeviceTypePec = function(params) {
	return request.getRequest('/stats/app/alarm/deviceTypePec/',params);
};
// 今日设备告警等级占比
http.getAlarmLevel = function(params) {
	return request.getRequest('/stats/app/alarm/alarmLevel/',params);
};























export {
	http
}
// module.exports = {
// 	Http
// }
