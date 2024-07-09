import axios from 'axios'
import Cookies from 'js-cookie'
import store from '@/store'
import router from '@/router'
import { jwtDecode } from 'jwt-decode'

const baseURL = process.env.VUE_APP_REST_API_URL

const apiClient = axios.create({
	baseURL: baseURL
})

// Функция для обновления токена
const updateToken = async () => {
	try {
		// Получаем refresh токен
		const refreshToken = Cookies.get('refresh_token')
		// Если нет refresh токена, то выходим из системы
		if (!refreshToken) {
			console.error('В cookies нет refresh токена')
			router.push({ name: 'Auth' })

			return null
		}
		// Пытаемся обновить токен
		const url = `${baseURL}/auth/api/token/refresh/`
		const response = await axios.post(url, {
			refresh: refreshToken
		})
		// Если все хорошо, то возвращаем новый токен
		if (response.status === 200) {
			const decoded = jwtDecode(response.data.access)

			console.log(decoded)
			store.commit('auth/setToken', response.data)
			store.commit('auth/setUserGroups', decoded.groups)

			return response.data.access
		}
	} catch (error) {
		console.error('С refresh токеном возникла ошибка:', error)

		store.dispatch('auth/logout')

		return null
	}
}

// Интерсептор для добавления токена в заголовки запросов
apiClient.interceptors.request.use(
	(config) => {
		// Получаем токен из хранилища
		const authToken = store.getters['auth/token']
		// Если есть токен, то добавляем его в заголовки
		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Интерсептор для обработки ответов и ошибок
apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		// Получаем статус ошибки
		const status = error.response ? error.response.status : null

		// Если статус 401, то обновляем токен
		if (status === 401) {
			// Пытаемся обновить токен
			const newAccessToken = await updateToken()

			if (newAccessToken) {
				// Повторить запрос с новым токеном
				error.config.headers.Authorization = `Bearer ${newAccessToken}`

				return axios(error.config)
			}
		} else if (status === 404) {
			console.warn('Post not found')
		} else {
			console.error('An error occurred:', error)
		}

		return Promise.reject(error)
	}
)

export default apiClient
