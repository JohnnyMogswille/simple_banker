<template lang="">
	<div class="modal-backdrop" />
	<div class="modal">
		<h3>Вы уверены что хотите удалить {{ modalTitle }}?</h3>
		<button class="btn danger" @click="$emit('remove')">Да</button>
		<button class="btn" @click="$emit('close')">Нет</button>
	</div>
</template>
<script>
export default {
	props: {
		modalTitle: {
			type: String
		}
	},
	emits: ['close', 'remove']
}
</script>
<style lang=""></style>
