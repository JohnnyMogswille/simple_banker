<!-- eslint-disable vue/html-indent -->
<template>
	<app-page title="Сделки">
		<template #header>
			<button class="btn primary" @click="modal = true">Создать</button>
		</template>
		<dealTable :deals="deals" />
	</app-page>

	<teleport to="body">
		<app-modal
			v-if="modal"
			modal-title="Добавить сделку"
			@close="modal = false"
		>
			<deal-modal @createDeal="modal = false" />
		</app-modal>
	</teleport>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage.vue'
import dealTable from '@/components/deals/dealTable.vue'
import AppModal from '@/components/ui/AppModal.vue'
import dealModal from '@/components/deals/dealModal.vue'

export default {
	components: { AppPage, dealTable, AppModal, dealModal },
	setup() {
		const modal = ref(false)
		const store = useStore()
		const deals = computed(() => store.getters['deal/deals'])

		return {
			modal,
			deals
		}
	}
}
</script>
