const util = require('gulp-util');
const through = require('through2');
const path = require('path');

const sceg = require('sceg');

const PLUGIN_NAME = 'gulp-sceg';

module.exports = function (options) {
	const elements = [];
	const config = Object.assign({
		filename: 'index.html',
		type: 'html',
	}, options);
	let counter = 0;
	return through.obj(
		(chunk, enc, cb) => {
			if (chunk.isNull()) {
				return cb(null, chunk);
			}
			if (chunk.isStream()) {
				throw new util.PluginError(PLUGIN_NAME, 'Streaming not supported');
			}
			const sourceCode = chunk.contents.toString(enc);
			const el = sceg.compile(sourceCode, counter++, chunk.path, options);
			elements.push(el);
			cb();
		},
		(cb) => {
			const data = sceg.optimize(config)(elements); // for JSON
			switch (config.type) {
				case 'html': {
					sceg.render(config)(data).then((html) => {
						const output = new util.File({
							base: path.resolve(),
							path: path.resolve(`./${config.filename}`),
							contents: new Buffer(html),
						});
						cb(null, output);
					});
					return;
				}
				case 'json': {
					const json = JSON.stringify(data, null, '\t');
					const output = new util.File({
						base: path.resolve(),
						path: path.resolve(`./${config.filename}`),
						contents: new Buffer(json),
					});
					cb(null, output);
					return;
				}
			}
		}
	);
};
