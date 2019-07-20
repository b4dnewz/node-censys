# node-censys

> An unofficial javascript wrapper for Censys.io API

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

If you are interested to see the official documentation visit the [Censys.io](https://censys.io/api) API page.

## Installation

Install it locally to your project to use it as a node module:

```
npm install censys.io
```

Or globally to use it as a cli tool:

```
npm install --global censys.io
```

Than you should have __censys__ command available on your path, try it out with the _--help_  menu.

```
$ censys --help
```

On the command line tool you can specify the API id and secret as an option before the commands or you can setup environment variables called __CENSYS_ID__ and __CENSYS_SECRET__ that will be used by default.


## Usage

The censys client is promise based and must be instanciated with the API __id__ and __secret__ obtained from the Censys website, like the example below.

```js
import Censys from 'censys.io'

const instance = new Censys({
  apiID: '<your-api-id>',
  apiSecret: '<your-api-secret>'
})

const data = await instance.search('certificates', {
  query: '80.http.get.headers.server: nginx'
})
```

This project is __typescript__ based and provides the module definitions for a better experience.

## Methods

#### [search](https://censys.io/api/v1/docs/search)

The search endpoint allows searches against the current data in the IPv4, Top Million Websites, and Certificates indexes using the same search syntax as the primary site. The endpoint returns a paginated result set of hosts (or websites or certificates) that match the search. Data should be posted as a JSON request document.

```js
const data = await censys.search('ipv4', {
  query: '8.8.8.8'
});
console.log(data);
```

#### [view](https://censys.io/api/v1/docs/view)

The view endpoint fetches the structured data we have about a specific host, website, or certificate once you know the host's IP address, website's domain, or certificate's SHA-256 fingerprint.
report

```js
const data = await censys.view('websites', 'google.com');
console.log(data);
```

#### [report](https://censys.io/api/v1/docs/report)

The report endpoint allows you to determine the aggregate breakdown of a value for the results a query, similar to the "Build Report" functionality available in the primary search interface. For example, if you wanted to determine the breakdown of cipher suites selected by all websites in the Top Million.

```js
const data = censys.report('ipv4', {
  query: '80.http.get.headers.server: nginx',
  field: 'location.country_code'
});
console.log(data);
```

#### [data](https://censys.io/api/v1/docs/data)

The Get Series endpoint returns a data on the types of scans we regularly perform ("series").

```js
const data = await censys.data();
console.log(data);
```

#### [account](https://censys.io/api/v1/docs/account)

The account endpoint returns information about your Censys account.

```js
const data = await censys.account();
console.log(data);
```

---

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
