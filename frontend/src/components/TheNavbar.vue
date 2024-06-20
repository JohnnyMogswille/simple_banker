<template lang="">
	<nav class="navbar">
		<h3>Умный банкир</h3>
		<ul class="navbar-menu">
			<li>
				<router-link :to="{ name: 'Home' }"> Сделки </router-link>
			</li>
			<li>
				<router-link :to="{ name: 'Help' }"> Помощь </router-link>
			</li>
			<li>
				<a href="#" @click.prevent="openSidebar">Сообщения</a>
			</li>
			<li>
				<a href="#" @click.prevent="logout">Выход</a>
			</li>
		</ul>
	</nav>
</template>
<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
	setup() {
		const router = useRouter()
		const store = useStore()
		return {
			logout: () => {
				store.dispatch('auth/logout')
				router.push({ name: 'Auth' })
			},
			openSidebar: () => store.commit('sidebar/openSidebar')
		}
	}
}
</script>
<style lang=""></style>
