/* eslint-disable no-unused-vars */
import apiClient from '@/use/api-client'
import { getFormData } from '@/use/api-client'

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
			const formData = getFormData(payload)
			try {
				const { data } = await apiClient.post('api/banker/deals/', formData)

				commit('addDeal', data)
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
		async loadDeals({ commit, dispatch }) {
			try {
				const { data } = await apiClient.get('api/banker/deals/')

				commit('setDeal', data)
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.response.data.detail,
						type: 'danger'
					},
					{ root: true }
				)
			}
		},
		async loadDealById({ dispatch }, id) {
			try {
				const { data } = await apiClient.get(`api/banker/deals/${id}`)

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
				await apiClient.delete(`api/banker/deals/${id}`)
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
			const formData = getFormData(payload)

			try {
				const { data } = await apiClient.put(
					`api/banker/deals/${payload.id}/`,
					formData
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
				console.log(e)
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
