const JWT_TOKEN = 'jwt-token'

export default {
	namespaced: true,
	state() {
		return {
			token: localStorage.getItem(JWT_TOKEN),
		}
	},
	getters: {
		token(state) {
			return state.token
		},
		isAuthenticated(_, getters) {
			return !!getters.token
		},
	},
	mutations: {
		setToken(state, token) {
			state.token = token
			localStorage.setItem(JWT_TOKEN, token)
		},
		logout(state) {
			state.token = null
			localStorage.removeItem(JWT_TOKEN)
		},
	},
	actions: {
		async login({ commit }, payload) {
			console.log(payload)
			commit('setToken', 'SET TOKEN')
		},
	},
}
