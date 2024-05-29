<!-- eslint-disable vue/html-indent -->
<template>
	<app-loader v-if="loading" />
	<app-page v-else title="Сделки">
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppPage from '@/components/ui/AppPage.vue'
import dealTable from '@/components/deals/dealTable.vue'
import AppModal from '@/components/ui/AppModal.vue'
import dealModal from '@/components/deals/dealModal.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

export default {
	components: { AppPage, dealTable, AppModal, dealModal, AppLoader },
	setup() {
		const modal = ref(false)
		const store = useStore()
		const loading = ref(false)

		onMounted(async () => {
			loading.value = true
			await store.dispatch('deal/loadDeal')
			setTimeout(() => {
				loading.value = false
			}, 1000)
		})

		const deals = computed(() => store.getters['deal/deals'])

		return {
			modal,
			deals,
			loading
		}
	}
}
</script>
