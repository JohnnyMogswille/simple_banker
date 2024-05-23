<template>
	<form class="card" @submit.prevent="onSubmit">
		<h1>Вход в систему</h1>
		<div :class="['form-control', { invalid: loginError }]">
			<label for="login">Логин</label>
			<input id="login" v-model="login" type="text" @blur="loginBlur" />
			<small v-if="loginError">{{ loginError }}</small>
		</div>
		<div :class="['form-control', { invalid: passwordError }]">
			<label for="password">Пароль</label>
			<input
				id="password"
				v-model="password"
				type="password"
				@blur="passwordBlur" />
			<small v-if="passwordError">{{ passwordError }}</small>
		</div>
		<button
			class="btn primary"
			type="submit"
			:disabled="isSubmitting || isManyAttempts">
			Войти
		</button>
		<div v-if="isManyAttempts" class="text-danger">
			Вы слишком часто пытаетесь войти в систему. Попробуйте позже
		</div>
	</form>
</template>
<script>
import { computed, watch } from 'vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
export default {
	setup() {
		// Сообщения
		const REQUIRED_MESSAGE = 'Поле обязательно для заполнения'
		const MIN_LENGTH_MESSAGE_8 = 'Поле должно содержать не менее 8 символов'
		// Чисто для формы
		const { handleSubmit, isSubmitting, submitCount } = useForm()
		// логин
		const {
			value: login,
			errorMessage: loginError,
			handleBlur: loginBlur,
		} = useField(
			'login',
			yup
				.string()
				.trim()
				.required(REQUIRED_MESSAGE)
				.min(8, MIN_LENGTH_MESSAGE_8)
		)
		// пароль
		const {
			value: password,
			errorMessage: passwordError,
			handleBlur: passwordBlur,
		} = useField(
			'password',
			yup
				.string()
				.trim()
				.required(REQUIRED_MESSAGE)
				.min(8, MIN_LENGTH_MESSAGE_8)
		)
		// Определяем, сколько раз пытался войти
		const isManyAttempts = computed(() => submitCount.value >= 3)

		// Заново включаем
		watch(isManyAttempts, (val) => {
			if (val) {
				setTimeout(() => {
					submitCount.value = 0
				}, 5000)
			}
		})

		// Сабмит формы
		const onSubmit = handleSubmit((values) => {
			console.log('Form: ', values)
		})

		return {
			login,
			loginError,
			loginBlur,
			password,
			passwordError,
			passwordBlur,
			isSubmitting,
			isManyAttempts,
			onSubmit,
		}
	},
}
</script>
<style lang=""></style>
