<!-- eslint-disable vue/html-indent -->
<template>
	<app-loader v-if="loading" />
	<app-page v-else title="Сделки">
		<template #header>
			<button class="btn primary" @click="modal = true">Создать</button>
		</template>
		<deal-filter v-model="filter" />
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage.vue'
import DealTable from '@/components/deals/DealTable.vue'
import AppModal from '@/components/ui/AppModal.vue'
import DealModal from '@/components/deals/DealModal.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import DealFilter from '@/components/deals/DealFilter.vue'

export default {
	components: {
		AppPage,
		DealTable,
		AppModal,
		DealModal,
		AppLoader,
		DealFilter
	},
	setup() {
		const modal = ref(false)
		const store = useStore()
		const loading = ref(false)
		const filter = ref({})

		onMounted(async () => {
			loading.value = true
			await store.dispatch('deal/loadDeals')
			setTimeout(() => {
				loading.value = false
			}, 1000)
		})

		const deals = computed(() =>
			store.getters['deal/deals']
				.filter((deal) => {
					if (filter.value?.contractor) {
						return deal.contractor.includes(filter.value.contractor)
					}
					return deal
				})
				.filter((deal) => {
					if (filter.value?.status) {
						return filter.value.status === deal.status
					}
					return deal
				})
		)

		return {
			modal,
			deals,
			loading,
			filter
		}
	}
}
</script>
