<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-self-closing -->
<template>
	<form class="card" @submit.prevent="onSubmit">
		<h1>Вход в систему</h1>
		<div :class="['form-control', { invalid: usernameError }]">
			<label for="username">Логин</label>
			<input
				id="username"
				v-model="username"
				type="text"
				@blur="usernameBlur"
			/>
			<small v-if="usernameError">{{ usernameError }}</small>
		</div>
		<div :class="['form-control', { invalid: passwordError }]">
			<label for="password">Пароль</label>
			<input
				id="password"
				v-model="password"
				type="password"
				@blur="passwordBlur"
			/>
			<small v-if="passwordError">{{ passwordError }}</small>
		</div>
		<button
			class="btn primary"
			type="submit"
			:disabled="isSubmitting || isManyAttempts"
		>
			Войти
		</button>
		<button class="btn primary" type="button" @click="sendRequest">
			Запросить данные
		</button>
		<div v-if="isManyAttempts" class="text-danger">
			Вы слишком часто пытаетесь войти в систему. Попробуйте позже
		</div>
	</form>
</template>
<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useLoginForm } from '@/use/login-form'
import errorAuth from '@/utils/errorAuth'
import apiClient from '@/use/api-client'

export default {
	setup() {
		const route = useRoute()
		const store = useStore()

		if (route.query.message) {
			store.dispatch('setMessage', {
				value: errorAuth(route.query.message),
				type: 'warning'
			})
		}

		const sendRequest = async () => {
			const url = 'api/'

			try {
				const { data } = await apiClient.get(url)

				console.log(data)

				// commit('clearMessage', null, { root: true })
			} catch (e) {
				console.log('Да, в authView есть ошибка')
			}
		}

		return { ...useLoginForm(), sendRequest }
	}
}
</script>
<style lang=""></style>
