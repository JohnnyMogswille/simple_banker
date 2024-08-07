<template lang="">
	<div class="container">
		<app-message />
		<router-view />
	</div>
</template>
<script>
import AppMessage from '@/components/ui/AppMessage.vue'
export default {
	components: { AppMessage },
	setup() {
		document.title = 'Умный банкир'
	}
}
</script>
<style scoped></style>
