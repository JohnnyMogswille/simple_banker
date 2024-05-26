<template>
	<app-page title="Заявки">
		<template #header>
			<button class="btn primary" @click="modal = true">Создать</button>
		</template>
		<expenseTable :expenses="[]"></expenseTable>
	</app-page>

	<teleport to="body">
		<app-modal modalTitle="Создать заявку" v-if="modal" @close="modal = false">
			<expense-modal></expense-modal>
		</app-modal>
	</teleport>
</template>

<script>
import { ref } from 'vue'
import AppPage from '@/components/ui/AppPage.vue'
import expenseTable from '@/components/expenses/expenseTable.vue'
import AppModal from '@/components/ui/AppModal.vue'
import expenseModal from '@/components/expenses/expenseModal.vue'

export default {
	components: { AppPage, expenseTable, AppModal, expenseModal },
	setup() {
		const modal = ref(false)

		return {
			modal,
		}
	},
}
</script>
