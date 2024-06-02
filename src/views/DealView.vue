<!-- eslint-disable vue/no-unused-components -->
<template lang="">
	<app-loader v-if="loading" />
	<app-page v-else-if="request" title="Заявка" back>
		<p><strong>Контрагент: </strong>{{ request.contractor }}</p>
		<p><strong>Наименование сделки: </strong>{{ request.deal }}</p>
		<p><strong>Сумма сделки: </strong>{{ currency(request.cost) }}</p>
		<p><strong>Дата сделки: </strong>{{ request.date }}</p>
		<p><strong>Статус: </strong><app-status :status="request.status" /></p>
	</app-page>
	<h3 v-else class="text-center text-danger">Заявка с {{ id }} не найдена</h3>
</template>
<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { currency } from '@/utils/currency'
import AppPage from '@/components/ui/AppPage.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppStatus from '@/components/ui/AppStatus.vue'

export default {
	components: { AppPage, AppLoader, AppStatus },
	setup() {
		const loading = ref(true)
		const route = useRoute()
		const store = useStore()
		const request = ref()

		onMounted(async () => {
			request.value = await store.dispatch('deal/loadDealById', route.params.id)

			setTimeout(() => {
				loading.value = false
			}, 500)
		})

		return { loading, request, id: route.params.id, currency }
	}
}
</script>
<style lang=""></style>
