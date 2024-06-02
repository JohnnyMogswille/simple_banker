<template lang="">
	<select id="status" @change="updateStatus" v-model="selectedStatus">
		<option disabled selected>Выберите статус</option>
		<option value="done">Завершено</option>
		<option value="canceled">Отменено</option>
		<option value="active">Активно</option>
		<option value="pending">Выполняется</option>
	</select>
</template>
<script>
import { toRefs, computed } from 'vue'

export default {
	props: {
		modelValue: {
			type: String,
			required: true
		}
	},
	setup(props, { emit }) {
		const { modelValue } = toRefs(props)

		const selectedStatus = computed({
			get: () => modelValue.value,
			set: (value) => emit('update:modelValue', value)
		})

		const updateStatus = (event) => {
			selectedStatus.value = event.target.value
		}

		return {
			selectedStatus,
			updateStatus
		}
	}
}
</script>
<style lang=""></style>
