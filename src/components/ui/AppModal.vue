<template lang="">
	<div class="modal-backdrop" @click="$emit('close')" />
	<div class="modal">
		<h3>{{ modalTitle }}</h3>
		<slot />
	</div>
</template>
<script>
export default {
	props: {
		modalTitle: {
			type: String,
		},
	},
	emits: ['close'],
}
</script>
<style lang=""></style>
