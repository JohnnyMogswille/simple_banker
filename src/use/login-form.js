import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'

export function useLoginForm() {
	// Сообщения
	const REQUIRED_MESSAGE = 'Поле обязательно для заполнения'
	const MIN_LENGTH_MESSAGE_8 = 'Поле должно содержать не менее 8 символов'
	// vuex хранилище
	const store = useStore()
	// роутер
	const router = useRouter()
	// Чисто для формы
	const { handleSubmit, isSubmitting, submitCount } = useForm()
	// логин
	const {
		value: login,
		errorMessage: loginError,
		handleBlur: loginBlur,
	} = useField(
		'login',
		yup.string().trim().required(REQUIRED_MESSAGE).min(8, MIN_LENGTH_MESSAGE_8)
	)
	// пароль
	const {
		value: password,
		errorMessage: passwordError,
		handleBlur: passwordBlur,
	} = useField(
		'password',
		yup.string().trim().required(REQUIRED_MESSAGE).min(8, MIN_LENGTH_MESSAGE_8)
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
		await store.dispatch('auth/login', values)
		router.push({ name: 'Home' })
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
}
