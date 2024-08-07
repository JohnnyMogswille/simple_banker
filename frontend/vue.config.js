// eslint-disable-next-line quotes
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	// Указываем, что зависимости должны быть транспилированы для совместимости с разными браузерами.
	transpileDependencies: true,
	// Конфигурация devServer, который используется для разработки.
	devServer: {
		// Настраиваем прокси-серверы для различных путей, чтобы избежать проблем с CORS и облегчить взаимодействие фронтенда и бекенда.
		proxy: {
			'/media': {
				// Проксируем все запросы, начинающиеся с /media, на сервер Nginx, который работает на порту 80.
				target: 'http://localhost:80',
				changeOrigin: true,
				secure: false
			}
		},
		// Добавляем заголовки CORS ко всем ответам сервера разработки.
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	}
	// mode: 'production'
})
