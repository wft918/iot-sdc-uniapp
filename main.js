import Vue from 'vue'
import App from './App'
import { http } from'./common/http.js'
import { HClick } from './common/HClick.js'
// import store from './store'
import uView from "uview-ui";
import dictUtils from './common/dictUtils.js'


Vue.use(uView);

// Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$http = http
Vue.prototype.$HClick = HClick;
// Vue.prototype.$url="http://10.128.193.2:9080"
Vue.prototype.$dictUtils = dictUtils
Vue.prototype.$url="http://114.242.26.182:21080"
Vue.prototype.$videoUrl="http://114.242.26.182"
// Vue.prototype.$videoUrl = 'http://10.128.193.2'

const app = new Vue({
    ...App,
		// store
})
app.$mount()
