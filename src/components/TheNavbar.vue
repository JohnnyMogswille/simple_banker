<template lang="">
	<nav class="navbar">
		<h3>Умный банкир</h3>
		<ul class="navbar-menu">
			<li>
				<router-link :to="{ name: 'Home' }"> Заявки клиентов </router-link>
			</li>
			<li>
				<router-link :to="{ name: 'Help' }"> Помощь </router-link>
			</li>
			<li><a href="#">Сообщения</a></li>
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
				store.commit('auth/logout')
				router.push({ name: 'Auth' })
			},
		}
	},
}
</script>
<style lang=""></style>
