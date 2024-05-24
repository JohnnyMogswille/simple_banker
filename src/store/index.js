import { createStore, createLogger } from 'vuex'
import auth from './modules/auth'

const plugins = []

if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger())
}

export default createStore({
	plugins: plugins,
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
	},
})
