# node-censys

> An unofficial javascript wrapper for Censys.io API

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

If you are interested to see the official documentation visit the [Censys.io](https://censys.io/api) API page.

## Installation

Install it locally to your project to use it as a node module:

```
npm install --save censys.io
```

Or globally to use it as a cli tool:

```
npm install --global censys.io
```

Than run the __censys__ command to see the help menu:

```
$ censys --help

Usage: censys [options] [command]

Options:
  -V, --version                             output the version number
  --api-id <id>                             The Censys Api ID obtained in your account page.
  --api-secret <secret>                     The Censys Api Secret obtained in your account page.
  -h, --help                                output usage information

Commands:
  search [options] <index> <query>          Searches against Censys indexes using the same search syntax as the main site.
  view <index> <id>                         Fetches the structured data about a specific host, website, or certificate by host IP address,
  report [options] <index> <query> <field>  Determine the aggregate breakdown of a value for the results a query.
  data                                      Exposes metadata on raw data that can be downloaded from Censys.
  account                                   The account endpoint returns information about your Censys account.
```

## Usage

The censys client can be used either with promises or callbacks, so all of the examples below will work.

```js
const Censys = require('censys.io')
const censys = new Censys({
  apiID: '',
  apiSecret: ''
})

censys.search('ipv4', {
  query: '8.8.8.8'
}, (err, result) => {
  // handle error
  // do something with response
})
```

With promises and async await:

```js
censys.search('ipv4', {
  query: '8.8.8.8'
}).then(console.log)
  .catch(console.log)

(async () => {
  console.log(await censys.search('ipv4', {query: '8.8.8.8'}));
})().catch(console.log)
```

## Methods

#### [search](https://censys.io/api/v1/docs/search)

__Signature:__ `search(index, query, callback?)`

The search endpoint allows searches against the current data in the IPv4, Top Million Websites, and Certificates indexes using the same search syntax as the primary site. The endpoint returns a paginated result set of hosts (or websites or certificates) that match the search. Data should be posted as a JSON request document.

```js
censys.search('ipv4', {
  query: '8.8.8.8'
}, (err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})
```

#### [view](https://censys.io/api/v1/docs/view)

__Signature:__ `view(index, id, callback?)`

The view endpoint fetches the structured data we have about a specific host, website, or certificate once you know the host's IP address, website's domain, or certificate's SHA-256 fingerprint.
report

```js
censys.view('ipv4', '8.8.8.8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})
```

#### [report](https://censys.io/api/v1/docs/report)

__Signature:__ `report(index, options, callback?)`

The report endpoint allows you to determine the aggregate breakdown of a value for the results a query, similar to the "Build Report" functionality available in the primary search interface. For example, if you wanted to determine the breakdown of cipher suites selected by all websites in the Top Million.

```js
censys.report('ipv4', {}, (err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})
```

#### [data](https://censys.io/api/v1/docs/data)

__Signature:__ `data(callback?)`

The Get Series endpoint returns a data on the types of scans we regularly perform ("series").

```js
censys.data((err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})
```

#### [account](https://censys.io/api/v1/docs/account)

__Signature:__ `account(callback?)`

The account endpoint returns information about your Censys account.

```js
censys.account((err, result) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(result)
})
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
