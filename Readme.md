
# co-stream-map

  Map a [co stream](https://github.com/juliangruber/co-stream) over each chunk
  of another co stream.

  [![build status](https://secure.travis-ci.org/juliangruber/co-stream-map.png)](http://travis-ci.org/juliangruber/co-stream-map)

## Example

  Given a stream `twice` that emits strings and a stream
  `chars` the emits a string's chars, map `chars` over `twice`:

```js
var map = require('co-stream-map');

// a stream that emits `str` twice

function twice(str){
  var i = 0;
  return function*(end){
    if (end) return;
    if (++i <3) return str;
  }
}

// a stream that emits `str` split up into chars

function chars(str){
  return function*(end){
    if (end) return;
    var first = str[0];
    str = str.slice(1);
    return first;
  }
}

var source = twice('bar');
var read = map(source, chars);

assert.equal('b', yield read());
assert.equal('a', yield read());
assert.equal('r', yield read());
assert.equal('b', yield read());
assert.equal('a', yield read());
assert.equal('r', yield read());
assert(!(yield read()));
```

## API

### map(stream, fn)

  For every chunk `stream` emits, call `fn` with that chunk and read from the
  returned stream.

  Returns a readable stream.

## Installation

```bash
$ npm install co-stream-map
```

## License

  MIT

