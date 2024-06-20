import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

export function useLoginForm() {
	const MIN_LOGIN = 8
	const MIN_PSWD = 8
	// Сообщения
	const REQUIRED_MESSAGE = 'Поле обязательно для заполнения'
	const PSWD_MESSAGE = `Пароль должен содержать не менее ${MIN_PSWD} символов`
	// const EMAIL_MESSAGE = 'Пожалуйста, введите корректный email'
	const LOGIN_MESSAGE = `Логин должен содержать не менее ${MIN_LOGIN} символов`

	// vuex хранилище
	const store = useStore()
	// роутер
	// eslint-disable-next-line no-unused-vars
	const router = useRouter()
	// Чисто для формы
	const { handleSubmit, isSubmitting, submitCount } = useForm()
	// email
	const {
		value: username,
		errorMessage: usernameError,
		handleBlur: usernameBlur
	} = useField(
		'username',
		yup.string().trim().required(REQUIRED_MESSAGE).min(MIN_LOGIN, LOGIN_MESSAGE)
	)
	// пароль
	const {
		value: password,
		errorMessage: passwordError,
		handleBlur: passwordBlur
	} = useField(
		'password',
		yup.string().trim().required(REQUIRED_MESSAGE).min(MIN_PSWD, PSWD_MESSAGE)
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
	const onSubmit = handleSubmit(async (values) => {
		try {
			await store.dispatch('auth/login', values)
			// router.push({ name: 'Home' })
			// eslint-disable-next-line no-empty
		} catch (error) {}
	})

	return {
		username,
		usernameError,
		usernameBlur,
		password,
		passwordError,
		passwordBlur,
		isSubmitting,
		isManyAttempts,
		onSubmit
	}
}
