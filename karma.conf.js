module.exports = function (config) {
	config.set({
		files: [
			// Watch src files for changes but
			// don't load them into the browser.
			{pattern: 'src/**/*.js', included: false},
			'test/**/*.spec.js',
		],

		browsers: ['Chrome'],

		preprocessors: {
			'src/**/*.js': ['rollup'],
			'test/**/*.spec.js': ['rollup'],
		},

		rollupPreprocessor: {
			plugins: [
				require('rollup-plugin-buble')(),
			],
			format: 'umd', // Helps prevent naming collisions.
			moduleName: 'sketchbook', // Required for 'iife' format.
			sourceMap: 'inline', // Sensible for testing.
		},

		customPreprocessors: {
			// Clones the base preprocessor, but overwrites
			// its options with those defined below.
			rollupBabel: {
				base: 'rollup',
				options: {
					// In this case, to use
					// a different transpiler:
					plugins: [
						require('rollup-plugin-babel')(),
					],
				}
			}
		}


		// frameworks: ['mocha'],
		// client: {
		// 	mocha: {
		// 		opts: 'test/mocha.opts'
		//
		// 		// // change Karma's debug.html to the mocha web reporter
		// 		// reporter: 'html',
		// 		//
		// 		// // require specific files after Mocha is initialized
		// 		// require: [require.resolve('bdd-lazy-var/bdd_lazy_var_global')],
		// 		//
		// 		// // custom ui, defined in required file above
		// 		// ui: 'bdd-lazy-var/global',
		// 	}
		// }
	});
};