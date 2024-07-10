import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import './theme.css'
import AppBtnDownload from '@/components/ui/AppBtnDownload.vue'
import TheButtonDownload from '@/components/TheButtonDownload.vue'

const app = createApp(App)

app
	.use(store)
	.use(router)
	.component('AppBtnDownload', AppBtnDownload)
	.component('TheButtonDownload', TheButtonDownload)
	.mount('#app')
