var should = require('should');
var join = require('path').join;
require('mocha');

var assemble = require('assemble');
var buffer = require('../')(assemble);


describe('assemble-middleware-buffer', function(){
  it('should return a stream', function(done) {
    var stream = buffer();
    should.exist(stream);
    should.exist(stream.on);
    done();
  });
  it('should buffer files to an array named `posts` on the assemble context', function(done) {
    var stream = assemble.src(join(__dirname, "./fixtures/pages/*.hbs")).pipe(buffer());
    stream.on('error', done);
    stream.on('data', function () {});
    stream.on('end', function () {
      should.exist(assemble.context['posts']);
      done();
    });
  });
  it('should buffer files to an array named `test-files` on the assemble context', function(done) {
    var stream = assemble.src(join(__dirname, "./fixtures/pages/*.hbs")).pipe(buffer({type: 'test-files'}));
    stream.on('error', done);
    stream.on('data', function () {});
    stream.on('end', function () {
      should.exist(assemble.context['test-files']);
      done();
    });
  });
});