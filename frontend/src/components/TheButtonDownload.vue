<template lang="">
	<button class="btn primary" @click="exportData">Выгрузить данные</button>
</template>
<script>
import { ref } from 'vue'
// import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import apiClient from '@/use/api-client'

export default {
	props: {
		exportUrl: {
			type: String,
			required: true,
			default: null
		},
		fileName: {
			type: String,
			required: true,
			default: 'file'
		}
	},
	setup(props) {
		const url = ref(props.exportUrl)
		const fileName = ref(props.fileName)
		const exportData = async () => {
			if (url.value) {
				try {
					const response = await apiClient.get(url.value, {
						responseType: 'blob'
					})

					if (response.status === 200) {
						const href = URL.createObjectURL(response.data)
						const link = document.createElement('a')

						link.href = href
						link.setAttribute('download', `${fileName.value}.xlsx`)
						document.body.appendChild(link)
						link.click()

						document.body.removeChild(link)
						URL.revokeObjectURL(href)
					} else {
						console.error('Ошибка при загрузке данных:', response.status)
					}
				} catch (error) {
					console.error('Ошибка при отправке запроса:', error)
				}
			}
		}

		return {
			exportData
		}
	}
}
</script>
<style lang=""></style>
