const currencyFormat = new Intl.NumberFormat('ru-RU', {
	currency: 'RUB',
	style: 'currency'
})

export function currency(value) {
	return currencyFormat.format(value)
}
