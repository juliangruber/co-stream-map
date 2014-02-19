var map = require('./');
var test = require('gap');

test('map', function*(t){
  var source = (function twice(str){
    var i = 0;
    return function*(end){
      if (end) return;
      if (++i <3) return str;
    }
  })('bar');

  var read = map(source, function* chars(str){
    return function*(end){
      if (end) return;
      var first = str[0];
      str = str.slice(1);
      return first;
    }
  });

  t.equal('b', yield read());
  t.equal('a', yield read());
  t.equal('r', yield read());
  t.equal('b', yield read());
  t.equal('a', yield read());
  t.equal('r', yield read());
  t.notOk(yield read());
});

test('abort', function*(t){
  var sourceEnded = false;
  var source = (function twice(str){
    var i = 0;
    return function*(end){
      if (end) return sourceEnded = true;
      if (++i <3) return str;
    }
  })('bar');

  var subEnded = false;
  var read = map(source, function* chars(str){
    return function*(end){
      if (end) return subEnded = true;
      var first = str[0];
      str = str.slice(1);
      return first;
    }
  });

  t.equal('b', yield read());
  t.notOk(yield read(true));
  t.ok(sourceEnded);
  t.ok(subEnded);
});

