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
		}
	}
}
