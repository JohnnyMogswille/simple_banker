/* eslint-disable no-unused-vars */
import axios from '../../axios/request'
import store from '../index'

export default {
	namespaced: true,
	state() {
		return {
			deals: []
		}
	},
	getters: {
		deals: (state) => state.deals
	},
	mutations: {
		setDeal(state, deal) {
			state.deals = deal
		},
		addDeal(state, deal) {
			state.deals.push(deal)
		}
	},
	actions: {
		async createDeal({ commit, dispatch }, payload) {
			try {
				const token = store.getters['auth/token']

				const { data } = await axios.post('/deals.json?auth=' + token, payload)

				commit('addDeal', { ...payload, id: data.name })
				dispatch(
					'setMessage',
					{
						value: 'Сделка успешна создана',
						type: 'primary'
					},
					{ root: true }
				)
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.message,
						type: 'danger'
					},
					{ root: true }
				)
			}
		},
		async loadDeals({ commit, dispatch }, payload) {
			try {
				const token = store.getters['auth/token']
				const { data } = await axios.get(`/deals.json?auth=${token}`)
				const deals = Object.keys(data).map((key) => ({
					...data[key],
					id: key
				}))

				commit('setDeal', deals)
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.message,
						type: 'danger'
					},
					{ root: true }
				)
			}
		},
		async loadDealById({ dispatch }, id) {
			try {
				const token = store.getters['auth/token']
				const { data } = await axios.get(`/deals/${id}.json?auth=${token}`)

				return data
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.message,
						type: 'danger'
					},
					{ root: true }
				)
			}
		},
		async removeDeal({ dispatch }, id) {
			try {
				const token = store.getters['auth/token']

				await axios.delete(`/deals/${id}.json?auth=${token}`)
				dispatch(
					'setMessage',
					{
						value: 'Сделка успешна удалена',
						type: 'primary'
					},
					{ root: true }
				)
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.message,
						type: 'danger'
					},
					{ root: true }
				)
			}
		},
		async updateDeal({ commit, dispatch }, payload) {
			try {
				const token = store.getters['auth/token']
				const { data } = await axios.put(
					`/deals/${payload.id}.json?auth=${token}`,
					payload
				)

				dispatch(
					'setMessage',
					{
						value: 'Сделка успешна обновлена',
						type: 'primary'
					},
					{ root: true }
				)
				return { ...data, id: payload.id }
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.message,
						type: 'danger'
					},
					{ root: true }
				)
			}
		}
	}
}
