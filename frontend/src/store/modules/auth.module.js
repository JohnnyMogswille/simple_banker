import apiClient from '@/use/api-client'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const JWT_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export default {
	namespaced: true,
	state() {
		return {
			token: localStorage.getItem(JWT_TOKEN),
			isSuperuser: false,
			userGroups: []
		}
	},
	getters: {
		token(state) {
			return state.token
		},
		userGroups(state) {
			return state.userGroups
		},
		isSuperuser(state) {
			return state.isSuperuser
		},
		isAuthenticated(_, getters) {
			return !!getters.token
		},
		hasGroupAccess: (state) => (requiredGroups) => {
			const userGroups = state.userGroups

			return requiredGroups.some((group) => userGroups.includes(group))
		}
	},
	mutations: {
		setToken(state, tokenData) {
			state.token = tokenData.access
			localStorage.setItem(JWT_TOKEN, tokenData.access)
			Cookies.set(REFRESH_TOKEN, tokenData.refresh)
		},
		setUserGroups(state, groups) {
			state.userGroups = groups
		},
		setIsSuperuser(state, isSuperuser) {
			state.isSuperuser = isSuperuser
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
				const decoded = jwtDecode(data.access)

				commit('setToken', data)
				commit('setUserGroups', decoded.groups)
				commit('setIsSuperuser', decoded.is_superuser)
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
