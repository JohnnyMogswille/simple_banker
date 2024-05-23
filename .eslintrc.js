module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-strongly-recommended',
		'eslint:recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		quotes: ['error', 'single'],
		'vue/multi-word-component-names': ['error', { ignores: ['Home', 'Help'] }],
		'vue/html-indent': [
			'error',
			'tab',
			{
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: [],
			},
		],
	},
}
