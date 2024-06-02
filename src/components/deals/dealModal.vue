<!-- eslint-disable vue/html-indent -->
<template lang="">
	<form @submit.prevent="onSubmit">
		<!-- Контрагент -->
		<div class="form-control">
			<label for="contractor">Контрагент</label>
			<input
				id="contractor"
				v-model="contractor"
				type="text"
				@blur="contractorBlur"
			/>
			<small v-if="contractorError">{{ contractorError }}</small>
		</div>
		<!-- Наименование сделки -->
		<div class="form-control">
			<label for="deal">Наименование сделки</label>
			<input id="deal" v-model="deal" type="text" @blur="dealBlur" />
			<small v-if="dealError">{{ dealError }}</small>
		</div>
		<!-- Сумма сделки -->
		<div class="form-control">
			<label for="cost">Сумма сделки</label>
			<input id="cost" v-model="cost" type="number" @blur="costBlur" />
			<small v-if="costError">{{ costError }}</small>
		</div>
		<!-- Дата сделки -->
		<div class="form-control">
			<label for="date">Дата сделки</label>
			<input id="date" v-model="date" type="date" @blur="dateBlur" />
			<small v-if="dateError">{{ dateError }}</small>
		</div>
		<!-- Статус -->
		<div class="form-control">
			<label for="status">Статус</label>
			<status-select v-model="status" />
		</div>
		<!-- Добавить -->
		<button class="btn primary" type="submit" :disabled="isSubmitting">
			Добавить
		</button>
	</form>
</template>
<script>
import { useStore } from 'vuex'
import { useDealsForm } from '@/use/deals-form.js'
import StatusSelect from '@/components/ui/deal/StatusSelect.vue'

export default {
	components: { StatusSelect },
	emits: ['createDeal'],
	setup(_, { emit }) {
		const store = useStore()
		const submit = async (values) => {
			await store.dispatch('deal/createDeal', values)
			emit('createDeal')
		}
		return {
			...useDealsForm(submit)
		}
	}
}
</script>
<style lang=""></style>
