<template lang="">
	<span :class="['badge', className]">{{ classText }}</span>
</template>
<script>
import { ref, watch } from 'vue'

export default {
	props: {
		status: {
			type: String,
			required: true,
			validator(value) {
				return ['active', 'done', 'canceled', 'pending'].includes(value)
			}
		}
	},
	setup(props) {
		const classesMap = {
			active: 'primary',
			done: 'primaty',
			canceled: 'danger',
			pending: 'warning'
		}
		const textMap = {
			active: 'Активен',
			done: 'Завершен',
			canceled: 'Отменен',
			pending: 'Выполняется'
		}

		const className = ref(classesMap[props.status])
		const classText = ref(textMap[props.status])

		watch(props, (value) => {
			className.value = classesMap[value.status]
			classText.value = textMap[value.status]
		})

		return {
			className,
			classText
		}
	}
}
</script>
<style lang=""></style>
