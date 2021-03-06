// .eslintrc.js
module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'eslint:recommended',
  'rules': {
    "indent": [2, 2],
    "linebreak-style": 0,
    // 'quotes': [
    // 	'error',
    // 	'single',
    // 	{ "allowTemplateLiterals": true }
    // ],
    'semi': [
      'error',
      'always'
    ],
    'no-console': 0
  },
  'parserOptions': {
    'sourceType': 'module'
  }
};
