# node-censys

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> An unofficial javascript wrapper for Censys.io API

## Installation

```sh
$ npm install --save censys.io
```

## Usage

```js
const Censys = require('censys.io');
const censys = new Censys({
  apiID: '',
  apiSecret: ''
});
```
## License

MIT © [Filippo Conti](https://b4dnewz.github.io/)


[npm-image]: https://badge.fury.io/js/censys.io.svg
[npm-url]: https://npmjs.org/package/censys.io
[travis-image]: https://travis-ci.org/b4dnewz/node-censys.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/node-censys
[daviddm-image]: https://david-dm.org/b4dnewz/node-censys.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/node-censys
[coveralls-image]: https://coveralls.io/repos/b4dnewz/node-censys/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/node-censys
