module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'n8n-nodes-base'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/community',
	],
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
	},
	env: {
		node: true,
		es2022: true,
	},
	ignorePatterns: ['dist/**/*', 'node_modules/**/*'],
};
