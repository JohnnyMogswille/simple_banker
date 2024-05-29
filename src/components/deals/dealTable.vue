<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template lang="">
	<table v-if="deals && deals.length" class="table">
		<thead>
			<tr>
				<th>№</th>
				<th>Контрагент</th>
				<th>Наименование</th>
				<th>Сумма, руб</th>
				<th>Дата покупки</th>
				<th>Статус</th>
				<th>Действия</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in deals" :key="item.id">
				<td>{{ index + 1 }}</td>
				<td>{{ item.contractor }}</td>
				<td>{{ item.deal }}</td>
				<td>{{ item.cost }}</td>
				<td>{{ item.date }}</td>
				<td>{{ item.status }}</td>
				<td>
					Действия
					<!-- <router-link
						v-slot="{ navigate }"
						custom
						:to="{ name: 'Deal', params: { id: item.id } }"
					>
						<button class="btn primary" @click="navigate">Перейти</button>
					</router-link> -->
				</td>
			</tr>
		</tbody>
	</table>
	<h4 v-else class="text-center">Сделок нет</h4>
</template>
<script>
export default {
	props: {
		deals: {
			type: Array
		}
	}
}
</script>
<style lang=""></style>
