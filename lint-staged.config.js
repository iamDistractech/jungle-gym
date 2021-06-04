module.exports = {
	linters: {
		'**/*.+(js|md|ts|css|yml|yaml|html|json|svelte)': ['eslint --fix', 'prettier --write', 'git add']
	}
};
