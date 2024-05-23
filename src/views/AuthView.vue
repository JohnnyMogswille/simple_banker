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
import { useLoginForm } from '@/use/login-form'
export default {
	setup() {
		return { ...useLoginForm() }
	},
}
</script>
<style lang=""></style>
