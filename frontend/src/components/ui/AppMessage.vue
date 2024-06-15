<template lang="">
	<div v-if="message" :class="['alert', message.type]">
		<p v-if="title" class="alert-title">
			{{ title }}
		</p>
		<p>{{ message.value }}</p>
		<span class="alert-close" @click="close">&times;</span>
	</div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
	setup() {
		const TITLE_MAP = {
			primary: 'Успешно',
			danger: 'Ошибка',
			warning: 'Внимание',
			info: 'Информация',
		}
		const store = useStore()

		const message = computed(() => store.state.message)
		const title = computed(() =>
			message.value ? TITLE_MAP[message.value.type] : null
		)

		return { message, title, close: () => store.commit('clearMessage') }
	},
}
</script>
<style lang=""></style>
