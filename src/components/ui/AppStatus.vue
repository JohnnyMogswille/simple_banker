<template lang="">
	<span :class="['badge', className]">{{ classText }}</span>
</template>
<script>
import { ref } from 'vue'

export default {
	props: {
		status: {
			type: String,
			required: true,
			validator(value) {
				return ['active', 'done', 'cancelled', 'pending'].includes(value)
			}
		}
	},
	setup(props) {
		const classesMap = {
			active: 'primary',
			done: 'primaty',
			cancelled: 'danger',
			pending: 'warning'
		}
		const textMap = {
			active: 'Активен',
			done: 'Завершен',
			cancelled: 'Отменен',
			pending: 'Выполняется'
		}

		const className = ref(classesMap[props.status])
		const classText = ref(textMap[props.status])
		return {
			className,
			classText
		}
	}
}
</script>
<style lang=""></style>
