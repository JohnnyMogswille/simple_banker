<template>
	<button v-if="doc" class="btn" @click="downloadDocs">Загрузить</button>
	<span v-else>Нет данных</span>
</template>
<script>
import { ref } from 'vue'

export default {
	props: {
		docs: {
			type: String,
			required: false,
			default: null
		}
	},
	setup(props) {
		const doc = ref(props.docs)
		const downloadDocs = async () => {
			if (doc.value) {
				try {
					const response = await fetch(doc.value)
					const blob = await response.blob()
					const url = window.URL.createObjectURL(blob)
					const link = document.createElement('a')
					link.href = url

					// Декодируем имя файла
					const decodedFileName = decodeURIComponent(doc.value.split('/').pop())
					link.download = decodedFileName

					document.body.appendChild(link)
					link.click()
					document.body.removeChild(link)
					window.URL.revokeObjectURL(url) // освободить память
				} catch (error) {
					console.error('Ошибка при скачивании файла', error)
				}
			}
		}

		return {
			doc,
			downloadDocs
		}
	}
}
</script>
<style lang=""></style>
