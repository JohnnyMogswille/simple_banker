<template lang="">
	<div v-if="sidebar" class="sidebar">
		<span class="sidebar-close" @click="closeSidebar">&times;</span>
		<div class="sidebar-content">
			В этот мини проекте закрепил знания по vuex, router, compositionAPI.
			Дальше вместо firebase прикручу django rest, может быть попытаюсь еще и
			vuetify.
		</div>
	</div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
	setup() {
		const store = useStore()
		const sidebar = computed(() => store.state.sidebar.sidebar)

		return { sidebar, closeSidebar: () => store.commit('sidebar/closeSidebar') }
	}
}
</script>
<style lang=""></style>
