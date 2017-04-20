import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";
import istanbul from "rollup-plugin-istanbul";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
// import uglify from 'rollup-plugin-uglify'

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
	entry: 'src/index.js',
	plugins: [
		babel(babelrc()),
		istanbul({
			exclude: ['test/**/*', 'node_modules/**/*']
		}),
		globals(),
		builtins(),
		nodeResolve({
			module: true,
			jsnext: true,
			main: true,
			browser: true,
			extensions: ['.js']
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		//uglify(),
	],
	external: external,
	targets: [
		{
			dest: pkg.main,
			format: 'umd',
			moduleName: 'sketchbook',
			sourceMap: true
		},
		{
			dest: pkg.module,
			format: 'es',
			sourceMap: true
		}
	]
};
