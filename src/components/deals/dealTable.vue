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
