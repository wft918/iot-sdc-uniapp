
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/me/me","pages/workBench/workBench","pages/dataBoard/index","pages/index/index","pages/workBench/inspection/inspection","pages/workBench/inspection/hiddenTtrouble/hiddenTtrouble","pages/workBench/inspection/secContacts/secContacts","pages/workBench/inspection/hiddenTtrouble/questionClassfication/questionClassfication","pages/workBench/inspection/hiddenTtrouble/questionClassfication/queSItemDetail/queSItemDetail","pages/workBench/inspection/onlineIns/onlineIns","pages/workBench/inspection/onlineIns/linePoint/linePoint","pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPoint","pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPointTypeClass/inspPointTypeClass","pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPointTypeClass/inspecific/inspecific","pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPointTypeClass/inspecific/questionsBack/questionsBack","pages/workBench/inspection/abarbeitung/abarbeitung","pages/workBench/inspection/checking/checking","pages/workBench/inspection/abarbeitung/abarDetail/abarDetail","pages/workBench/inspection/uploadInsp/uploadInsp","pages/workBench/inspection/uploadInsp/unloadPointList/unloadPointList","pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClass","pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClassPoint/unloadClassPoint","pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClassPoint/unloadInspecific/unloadInspecific","pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClassPoint/unloadInspecific/unloadQuestion/unloadQuestion","pages/workBench/inspection/myInspectionPlan/index","pages/workBench/inspection/myInspectionProblem/index","pages/workBench/realtimeMonitor/realtimeMonitor","pages/workBench/realtimeMonitor/deviceDetails/deviceDetails","pages/workBench/notice/notice","pages/me/changeavatar/changeavatar","pages/workBench/notice/notice","pages/me/changeavatar/changeavatar","pages/me/about-us/about-us","pages/me/changenick/changenick","pages/me/changeavatar/imgcut/imgcut","pages/me/changepwd/changepwd","pages/me/news-set/news-set","pages/me/help-and-Advice/help-and-Advice","pages/me/help-and-Advice/advice/advice","pages/me/help-and-Advice/advice/advice-detail/advice-detail","pages/me/help-and-Advice/advice/addadvice/addadvice","pages/workBench/alarmMsg/alarmMsg","pages/workBench/alarmMsg/selectRoom/selectRoom","pages/workBench/alarmMsg/deviceDetails/deviceDetails","pages/workBench/alarmStatistics/alarmStatistics","pages/workBench/myAlarm/myAlarm","pages/workBench/videoMonitor/videoMonitor","pages/workBench/videoMonitor/selectCamera/selectCamera","pages/workBench/realtimeMonitor/selectRoom/selectRoom"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#0FA4FA","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#BBBBBB","selectedColor":"#01A0FE","borderStyle":"black","fontSize":"12px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"/static/img/indexOff.png","selectedIconPath":"/static/img/indexOn.png"},{"pagePath":"pages/workBench/workBench","text":"工作","iconPath":"/static/img/workOff.png","selectedIconPath":"/static/img/workOn.png"},{"pagePath":"pages/dataBoard/index","text":"数据","iconPath":"/static/img/contaOff.png","selectedIconPath":"/static/img/contactOn.png"},{"pagePath":"pages/me/me","text":"设置","iconPath":"/static/img/meOff.png","selectedIconPath":"/static/img/meOn.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"智慧园区","compilerVersion":"3.3.5","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"navigationStyle":"custom","titleNView":false}},{"path":"/pages/me/me","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","transparentTitle":"auto","navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/workBench","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"工作台","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/dataBoard/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"数据看板","CryptoJS":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"智慧园区","navigationBarBackgroundColor":"#177cfe","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/inspection","meta":{},"window":{"navigationBarTitleText":"巡检","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/hiddenTtrouble/hiddenTtrouble","meta":{},"window":{"navigationBarTitleText":"隐患排查","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/secContacts/secContacts","meta":{},"window":{"navigationBarTitleText":"选择整改人","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"完成","type":"none","fontSize":"16px","float":"right","right":"20px","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/hiddenTtrouble/questionClassfication/questionClassfication","meta":{},"window":{"navigationBarTitleText":"选择问题分类","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/hiddenTtrouble/questionClassfication/queSItemDetail/queSItemDetail","meta":{},"window":{"navigationBarTitleText":"分类","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"保存","type":"none","fontSize":"16px","float":"right","right":"20px","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/onlineIns/onlineIns","meta":{},"window":{"navigationBarTitleText":"线上巡检","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/onlineIns/linePoint/linePoint","meta":{},"window":{"navigationBarTitleText":"巡检线路","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"提交","type":"none","fontSize":"16px","float":"right","right":"20px","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPoint","meta":{},"window":{"navigationBarTitleText":"巡检点","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPointTypeClass/inspPointTypeClass","meta":{},"window":{"navigationBarTitleText":"分类","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPointTypeClass/inspecific/inspecific","meta":{},"window":{"navigationBarTitleText":"分类详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"","type":"none","fontSrc":"/static/css/iconfont.ttf","fontSize":"22px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/onlineIns/linePoint/inspPoint/inspPointTypeClass/inspecific/questionsBack/questionsBack","meta":{},"window":{"navigationBarTitleText":"问题反馈","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"","type":"none","fontSrc":"/static/css/iconfont.ttf","fontSize":"22px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/abarbeitung/abarbeitung","meta":{},"window":{"navigationBarTitleText":"质量追踪","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"","type":"none","fontSrc":"/static/css/iconfont.ttf","fontSize":"22px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/checking/checking","meta":{},"window":{"navigationBarTitleText":"任务详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/abarbeitung/abarDetail/abarDetail","meta":{},"window":{"navigationBarTitleText":"任务详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"保存","type":"none","fontSize":"16px","float":"right","right":"20px","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/uploadInsp/uploadInsp","meta":{},"window":{"navigationBarTitleText":"巡检","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"","type":"none","fontSrc":"/static/css/iconfont.ttf","fontSize":"22px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/uploadInsp/unloadPointList/unloadPointList","meta":{},"window":{"navigationBarTitleText":"项目巡检记录","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","disableScroll":true,"bounce":"none"}},{"path":"/pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClass","meta":{},"window":{"navigationBarTitleText":"风险类型","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"提交","type":"none","fontSize":"16px","float":"right","right":"20px","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClassPoint/unloadClassPoint","meta":{},"window":{"navigationBarTitleText":"风险点","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClassPoint/unloadInspecific/unloadInspecific","meta":{},"window":{"navigationBarTitleText":"风险源排查","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"保存","type":"none","fontSize":"16px","float":"right","right":"20px","color":"#ffffff"}]}}},{"path":"/pages/workBench/inspection/uploadInsp/unloadPointList/unloadClass/unloadClassPoint/unloadInspecific/unloadQuestion/unloadQuestion","meta":{},"window":{"navigationBarTitleText":"问题反馈","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/inspection/myInspectionPlan/index","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/workBench/inspection/myInspectionProblem/index","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/workBench/realtimeMonitor/realtimeMonitor","meta":{},"window":{"navigationBarTitleText":"实时监控","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/realtimeMonitor/deviceDetails/deviceDetails","meta":{},"window":{"navigationBarTitleText":"设备详情","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/notice/notice","meta":{},"window":{"navigationBarTitleText":"我的公告","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/me/changeavatar/changeavatar","meta":{},"window":{"navigationBarTitleText":"头像","navigationBarTextStyle":"white","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#000000","titleNView":{"buttons":[{"text":"...","fontSize":"20px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/me/about-us/about-us","meta":{},"window":{"navigationBarTitleText":"关于我们","navigationBarTextStyle":"white","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9"}},{"path":"/pages/me/changenick/changenick","meta":{},"window":{"navigationBarTitleText":"修改用户名","navigationBarTextStyle":"white","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","titleNView":{"buttons":[{"text":"保存","fontSize":"16px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/me/changeavatar/imgcut/imgcut","meta":{},"window":{"navigationBarTitleText":"修改用户名","navigationStyle":"custom"}},{"path":"/pages/me/changepwd/changepwd","meta":{},"window":{"navigationBarTitleText":"修改密码","navigationBarTextStyle":"white","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9"}},{"path":"/pages/me/news-set/news-set","meta":{},"window":{"navigationBarTitleText":"消息通知","navigationBarTextStyle":"white","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9"}},{"path":"/pages/me/help-and-Advice/help-and-Advice","meta":{},"window":{"navigationBarTitleText":"帮助和建议","navigationBarTextStyle":"white","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9"}},{"path":"/pages/me/help-and-Advice/advice/advice","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false,"titleNView":{"buttons":[{"text":"","type":"none","fontSrc":"/static/css/iconfont.ttf","fontSize":"22px","float":"right","color":"#ffffff"}]}}},{"path":"/pages/me/help-and-Advice/advice/advice-detail/advice-detail","meta":{},"window":{"navigationBarTitleText":"意见反馈详情","enablePullDownRefresh":false}},{"path":"/pages/me/help-and-Advice/advice/addadvice/addadvice","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/workBench/alarmMsg/alarmMsg","meta":{},"window":{"navigationBarTitleText":"告警信息","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/alarmMsg/selectRoom/selectRoom","meta":{},"window":{"navigationBarTitleText":"房间","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/alarmMsg/deviceDetails/deviceDetails","meta":{},"window":{"navigationBarTitleText":"告警处理","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/alarmStatistics/alarmStatistics","meta":{},"window":{"navigationBarTitleText":"告警统计","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/myAlarm/myAlarm","meta":{},"window":{"navigationBarTitleText":"我的告警","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/videoMonitor/videoMonitor","meta":{},"window":{"navigationBarTitleText":"视频监控","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/videoMonitor/selectCamera/selectCamera","meta":{},"window":{"navigationBarTitleText":"筛选","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}},{"path":"/pages/workBench/realtimeMonitor/selectRoom/selectRoom","meta":{},"window":{"navigationBarTitleText":"筛选","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#0193E9","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
