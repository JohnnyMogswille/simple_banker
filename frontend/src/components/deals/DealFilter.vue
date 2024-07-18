<!-- eslint-disable vue/html-indent -->
<template lang="">
	<div class="filter">
		<div class="form-control">
			<input v-model="contractor" type="text" placeholder="Поиск по сделкам" />
		</div>
		<status-select v-model="status" />
		<button v-if="isActive" class="btn warning" @click="resetFilter">
			Очистить
		</button>
		<the-button-download
			:export-url="'api/deals/export/'"
			:file-name="'Сделки'"
		/>
	</div>
</template>
<script>
import { ref, watch, computed } from 'vue'
// import { useStore } from 'vuex'
import StatusSelect from '../ui/deal/StatusSelect.vue'

export default {
	components: { StatusSelect },
	props: ['modelValue'],
	emits: ['update:modelValue'],
	setup(_, { emit }) {
		const status = ref()
		const contractor = ref()

		watch([contractor, status], (values) => {
			emit('update:modelValue', {
				contractor: values[0],
				status: values[1]
			})
		})

		const isActive = computed(() => status.value || contractor.value)

		return {
			status,
			contractor,
			isActive,
			resetFilter: () => {
				status.value = null
				contractor.value = ''
			}
		}
	}
}
</script>
<style lang=""></style>
