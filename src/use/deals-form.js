import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'

export function useDealsForm(fn) {
	const { handleSubmit, isSubmitting } = useForm()

	// Подрядчик
	const {
		value: contractor,
		errorMessage: contractorError,
		handleBlur: contractorBlur
	} = useField(
		'contractor',
		yup.string().trim().required('Пожалуйста, введите подрядчика')
	)
	// Наименование сделки
	const {
		value: deal,
		errorMessage: dealError,
		handleBlur: dealBlur
	} = useField(
		'deal',
		yup.string().trim().required('Пожалуйста, введите наименование сделки')
	)
	// Сумма сделки
	const {
		value: cost,
		errorMessage: costError,
		handleBlur: costBlur
	} = useField(
		'cost',
		yup
			.number()
			.required('Пожалуйста, введите сумму')
			.min(0, 'Сумма не может быть меньше 0')
	)
	// Дата сделки
	const {
		value: date,
		errorMessage: dateError,
		handleBlur: dateBlur
	} = useField('date', yup.date().required('Пожалуйста, введите дату'))
	// Статус
	const { value: status } = useField('status')

	const onSubmit = handleSubmit(fn)

	return {
		contractor,
		contractorError,
		contractorBlur,
		deal,
		dealError,
		dealBlur,
		cost,
		costError,
		costBlur,
		date,
		dateError,
		dateBlur,
		status,
		isSubmitting,
		onSubmit
	}
}
