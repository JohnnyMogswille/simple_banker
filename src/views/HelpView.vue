<!-- eslint-disable vue/html-indent -->
<template>
	<app-page title="Помощь">
		<question-item
			v-for="(item, index) in questions"
			:key="index"
			:question="item"
		/>
	</app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue'
import QuestionItem from '@/components/questions/QuestionItem.vue'

export default {
	components: { AppPage, QuestionItem },
	setup() {
		const questions = [
			{
				title: 'Что такое Vue?',
				text: 'Vue.js — это прогрессивный фреймворк для разработки пользовательских интерфейсов и одностраничных веб-приложений на языке JavaScript'
			},
			{
				title: 'Что такое Vuex?',
				text: 'Vuex — это стандартное хранилище состояний для Vue.js, которое позволяет нам хранить данные в виде объектов'
			}
		]

		return { questions }
	}
}
</script>
