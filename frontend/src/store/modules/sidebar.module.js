export default {
	namespaced: true,
	state() {
		return {
			sidebar: false
		}
	},
	getters: {},
	mutations: {
		openSidebar(state) {
			state.sidebar = true
		},
		closeSidebar(state) {
			state.sidebar = false
		}
	},
	actions: {}
}
