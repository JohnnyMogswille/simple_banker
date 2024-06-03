<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable vue/html-indent -->
<template lang="">
	<app-loader v-if="loading" />
	<app-page v-else-if="deal" title="Заявка" back>
		<p><strong>Контрагент: </strong>{{ deal.contractor }}</p>
		<p><strong>Наименование сделки: </strong>{{ deal.deal }}</p>
		<p><strong>Сумма сделки: </strong>{{ currency(deal.cost) }}</p>
		<p><strong>Дата сделки: </strong>{{ deal.date }}</p>
		<p><strong>Статус: </strong><app-status :status="deal.status" /></p>
		<button class="btn">Обновить</button>
		<button class="btn danger" @click="modal = true">Удалить</button>
	</app-page>
	<h3 v-else class="text-center text-danger">Заявка с {{ id }} не найдена</h3>

	<teleport to="body">
		<app-confirm
			v-if="modal"
			:modal-title="deal.deal"
			@close="modal = false"
			@remove="remove"
		/>
	</teleport>
</template>
<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppPage from '@/components/ui/AppPage.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppStatus from '@/components/ui/AppStatus.vue'
import AppConfirm from '@/components/ui/AppConfirm.vue'

export default {
	components: { AppPage, AppLoader, AppStatus, AppConfirm },
	setup() {
		const loading = ref(true)
		const route = useRoute()
		const router = useRouter()
		const store = useStore()
		const deal = ref()
		const modal = ref(false)

		onMounted(async () => {
			deal.value = await store.dispatch('deal/loadDealById', route.params.id)

			setTimeout(() => {
				loading.value = false
			}, 500)
		})

		const remove = async () => {
			await store.dispatch('deal/removeDeal', route.params.id)
			router.push({ name: 'Home' })
		}

		const update = async () => {
			const data = await store.dispatch('deal/removeDeal', route.params.id)
			console.log(data)
		}

		return {
			loading,
			deal,
			id: route.params.id,
			modal,
			currency,
			remove,
			update
		}
	}
}
</script>
<style lang=""></style>
