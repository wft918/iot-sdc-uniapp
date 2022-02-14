import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
			isLogin: false,
			loginInfo: {}
		},
    mutations: {
			mLogin(state,provider) {
				state.isLogin = true
				state.loginInfo.access_token = provider.access_token
				// state.loginInfo.refresh_token = provider.refresh_token
				state.loginInfo.dept_id = provider.dept_id
				state.loginInfo.tenant_id = provider.tenant_id
				state.loginInfo.expires_in = provider.expires_in
				uni.setStorageSync('ACCESS_TOKEN', state.loginInfo.access_token)
				// uni.setStorageSync('REFRESH_TOKEN', state.loginInfo.refresh_token)
				uni.setStorageSync('EXPIRES_IN', state.loginInfo.expires_in)
				uni.setStorageSync('TENANT_ID', state.loginInfo.tenant_id)
				uni.setStorageSync('DEPT_ID', state.loginInfo.dept_id)
			},
			mLogout(state) {
				state.isLogin = false
				state.loginInfo = {}
				uni.setStorageSync('ACCESS_TOKEN', '')
				// uni.setStorageSync('REFRESH_TOKEN', '')
				uni.setStorageSync('EXPIRES_IN', '')
				uni.setStorageSync('TENANT_ID', '')
				uni.setStorageSync('DEPT_ID', '')
			}
		},
    actions: {}
})
export default store