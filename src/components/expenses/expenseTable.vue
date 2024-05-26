<template lang="">
	<h4 v-if="expenses.length === 0" class="text-center">Заявок нет</h4>
	<table v-else class="table">
		<thead>
			<tr>
				<th>№</th>
				<th>Наименование</th>
				<th>Количество</th>
				<th>Цена за единицу</th>
				<th>Сумма</th>
				<th>Статус</th>
				<th>Действия</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td />
				<td />
				<td />
				<td />
				<td />
				<td />
				<td />
			</tr>
		</tbody>
	</table>
</template>
<script>
export default {
	props: ['expenses'],
}
</script>
<style lang=""></style>
