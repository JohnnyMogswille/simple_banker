const ERROR_CODES = {
	EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
}

export default function errorAuth(code) {
	return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}
