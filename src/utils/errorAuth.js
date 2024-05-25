const ERROR_CODES = {
	EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
	auth: 'Необходимо авторизоваться в систему',
}

export default function errorAuth(code) {
	console.log(code)
	return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
