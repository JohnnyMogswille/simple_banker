import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/HomeView.vue'),
		meta: {
			layout: 'main',
		},
	},
	{
		path: '/help',
		name: 'Help',
		component: () => import('@/views/HelpView.vue'),
		meta: {
			layout: 'main',
		},
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('@/views/AuthView.vue'),
		meta: {
			layout: 'auth',
		},
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
