import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'

export function useDealsForm(fn, initialValues = {}) {
	const { handleSubmit, isSubmitting } = useForm()

	// Подрядчик
	const {
		value: contractor,
		errorMessage: contractorError,
		handleBlur: contractorBlur
	} = useField(
		'contractor',
		yup.string().trim().required('Пожалуйста, введите подрядчика'),
		{ initialValue: initialValues.contractor }
	)
	// Наименование сделки
	const {
		value: deal,
		errorMessage: dealError,
		handleBlur: dealBlur
	} = useField(
		'deal',
		yup.string().trim().required('Пожалуйста, введите наименование сделки'),
		{ initialValue: initialValues.deal }
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
			.min(0, 'Сумма не может быть меньше 0'),
		{ initialValue: initialValues.cost }
	)
	// Дата сделки
	const {
		value: date,
		errorMessage: dateError,
		handleBlur: dateBlur
	} = useField('date', yup.date().required('Пожалуйста, введите дату'), {
		initialValue: initialValues.date
	})
	// Статус
	const { value: status } = useField('status', yup.string().default('active'), {
		initialValue: initialValues.status
	})

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
