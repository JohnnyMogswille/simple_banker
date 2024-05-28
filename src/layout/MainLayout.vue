<template lang="">
	<the-navbar />
	<div class="container with-nav">
		<app-message />
		<router-view />
	</div>
</template>
<script>
import TheNavbar from '@/components/TheNavbar.vue'
import AppMessage from '@/components/ui/AppMessage.vue'

export default {
	components: { TheNavbar, AppMessage }
}
</script>
<style scoped></style>
