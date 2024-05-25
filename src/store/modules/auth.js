import axios from 'axios'
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
		async login({ commit, dispatch }, payload) {
			const API_KEY = process.env.VUE_APP_FB_KEY
			const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

			try {
				const { data } = await axios.post(url, {
					...payload,
					returnSecureToken: true,
				})

				commit('setToken', data.idToken)
				commit('clearMessage', null, { root: true })
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: errorAuth(e.response.data.error.message),
						type: 'danger',
					},
					{ root: true }
				)

				throw new Error()
			}
		},
	},
}
