import apiClient from '@/use/api-client'
import Cookies from 'js-cookie'
// import errorAuth from '../../utils/errorAuth'

const JWT_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export default {
	namespaced: true,
	state() {
		return {
			token: localStorage.getItem(JWT_TOKEN)
		}
	},
	getters: {
		token(state) {
			return state.token
		},
		isAuthenticated(_, getters) {
			return !!getters.token
		}
	},
	mutations: {
		setToken(state, tokenData) {
			state.token = tokenData.access
			localStorage.setItem(JWT_TOKEN, tokenData.access)
			Cookies.set(REFRESH_TOKEN, tokenData.refresh)
		},
		dropToken(state) {
			state.token = null
			localStorage.removeItem(JWT_TOKEN)
			Cookies.remove(REFRESH_TOKEN)
		}
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		async login({ commit, dispatch, getters }, payload) {
			const url = 'auth/api/token/'

			try {
				const { data } = await apiClient.post(url, {
					...payload
				})

				commit('setToken', data)

				commit('clearMessage', null, { root: true })
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.response.data.detail,
						type: 'danger'
					},
					{ root: true }
				)

				// throw new Error(e)
			}
		},
		async logout({ commit, dispatch }) {
			commit('dropToken')
			dispatch(
				'setMessage',
				{
					value: 'Вы вышли из системы. Возвращайтесь(',
					type: 'primary'
				},
				{ root: true }
			)
		}
	}
}
