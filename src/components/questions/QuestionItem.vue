<template lang="">
	<div class="question">
		<div class="question-title" @click="isOpen = !isOpen">
			{{ question.title }}
		</div>
		<div v-if="isOpen" class="question-body">
			{{ question.text }}
		</div>
	</div>
</template>
<script>
import { ref } from 'vue'

export default {
	props: ['question'],
	setup() {
		return {
			isOpen: ref(false)
		}
	}
}
</script>
<style lang=""></style>
