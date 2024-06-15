import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import deal from './modules/deal.module'
import sidebar from './modules/sidebar.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}

export default createStore({
	plugins: plugins,
	state() {
		return {
			message: null
		}
	},
	getters: {},
	mutations: {
		setMessage(state, message) {
			state.message = message
		},
		clearMessage(state) {
			state.message = null
		}
	},
	actions: {
		setMessage({ commit }, message) {
			commit('setMessage', message)
			setTimeout(() => {
				commit('clearMessage')
			}, 5000)
		}
	},
	modules: {
		auth,
		deal,
		sidebar
	}
})
