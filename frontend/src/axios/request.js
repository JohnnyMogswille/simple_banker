import axios from 'axios'
import router from '@/router'

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_FB_URL
})

axiosInstance.interceptors.response.use(null, (error) => {
	if (error.response.status === 401) {
		router.push('/auth?message=auth')
	}

	return Promise.reject(error)
})

export default axiosInstance
