import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import errorAuth from '../../utils/errorAuth'

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
		// eslint-disable-next-line no-unused-vars
		async login({ commit }, payload) {
			const API_KEY = process.env.VUE_APP_FB_KEY
			const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

			try {
				const { data } = await axios.post(url, {
					...payload,
					returnSecureToken: true,
				})

				// console.log(data)

				commit('setToken', data.idToken)
			} catch (e) {
				console.log(errorAuth(e.response.data.error.message))
			}
		},
	},
}
