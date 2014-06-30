/*!
 * assemble-middleware-buffer <https://github.com/assemble/assemble-middleware-buffer>
 *
 * Copyright (c) 2014 Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var through = require('through2');
var extend = require('xtend');

/**
 * ## buffer
 *
 * Add files to the specified array on Assemble.
 *
 * **Usage**
 *
 * ```js
 * var assemble = require('assemble');
 * var buffer = require('assemble-middleware-buffer')(assemble);
 * var tap = require('gulp-tap');
 *
 * assemble.src('path/to/pages/*.hbs')
 *   .pipe(buffer({type: 'posts'}))
 *   .pipe(tap(function (file) {
 *     console.log('posts', assemble.posts);
 *   });
 * ```
 *
 * @param {Object} `options` object containing options:
 *  * {String} `type` name of the array to store the files in.
 * @return {Stream} stream to continue piping.
 */

module.exports = function (assemble) {

  return function buffer (options) {
    options = extend({type: 'posts'}, options);
    var cache = [];

    var throughput = function throughput (file, enc, callback) {
      cache.push(file);
      callback();
    };
    var flush = function flush (callback) {
      assemble.set(options.type, cache);
      cache.forEach(this.push.bind(this));
      callback();
    };

    return through.obj(throughput, flush);
  };

};