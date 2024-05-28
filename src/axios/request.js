import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_FB_URL
})

export default axiosInstance
