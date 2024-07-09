import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/HomeView.vue'),
		meta: {
			layout: 'main',
			auth: true,
			requiredGroups: ['admins', 'dealStaff']
		}
	},
	{
		path: '/deals/:id',
		name: 'Deal',
		component: () => import('@/views/DealView.vue'),
		meta: {
			layout: 'main',
			auth: true
		}
	},
	{
		path: '/help',
		name: 'Help',
		component: () => import('@/views/HelpView.vue'),
		meta: {
			layout: 'main',
			auth: true
		}
	},
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('@/views/AuthView.vue'),
		meta: {
			layout: 'auth',
			auth: false
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
	const requiredAuth = to.meta.auth

	if (requiredAuth && store.getters['auth/isAuthenticated']) {
		// console.log('Вот тут нужно проверить группы: ', to.meta.requiredGroups)
		// console.log('А у нас такие группы: ', store.getters['auth/userGroups'])
		next()
	} else if (requiredAuth && !store.getters['auth/isAuthenticated']) {
		next('/auth?message=auth')
	} else {
		next()
	}
})

export default router
