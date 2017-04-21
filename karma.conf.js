// Karma configuration
module.exports = function (config) {
	config.set({
		// ... normal karma configuration
		files: [
			// all files ending in "_test"
			{pattern: 'test/*.spec.js', watched: false},
			{pattern: 'test/**/*.spec.js', watched: false}
			// each file acts as entry point for the webpack configuration
		],

		browsers: ['Chrome'],

		preprocessors: {
			// add webpack as preprocessor
			'test/*.spec.js': ['webpack'],
			'test/**/*.spec.js': ['webpack']
		},

		frameworks: ['mocha'],
		client: {
			mocha: {
				opts: 'test/mocha.opts'

				// // change Karma's debug.html to the mocha web reporter
				// reporter: 'html',
				//
				// // require specific files after Mocha is initialized
				// require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],
				//
				// // custom ui, defined in required file above
				// ui: 'bdd-lazy-var/global',
			}
		},

		webpack: {
			// karma watches the test entry points
			// (you don't need to specify the entry option)
			// webpack watches dependencies

			// webpack configuration
		},

		webpackMiddleware: {
			// webpack-dev-middleware configuration
			// i. e.
			stats: 'errors-only'
		}
	});
};