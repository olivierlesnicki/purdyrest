# purdyrest

## Installation

```
yarn add purdyrest
```

## Super simple to use

**purdyrequest** is designed to be the simplest way to make http calls to
servers that follow **purdyrest** RESTful conventions.

```js
const purdyrest = require('purdyrest');
const { create } = purdyrest('http://my-purdyrest-server.ext');
create({ hello: 'world' });
```

## Methods

### create(body)

```js
const purdyrest = require('purdyrest');
const { create } = purdyrest('http://my-purdyrest-server.ext');
create({ foo: 'bar' });
```

Sends a `POST` request to `http://my-purdyrest-server.ext` with
`{ foo: 'bar' }` as a JSON body.

### destroy(id)

```js
const purdyrest = require('purdyrest');
const { destroy } = purdyrest('http://my-purdyrest-server.ext');
destroy('custom-id');
```

Sends a `DELETE` request to `http://my-purdyrest-server.ext/custom-id`.

### filter(queryParams)

```js
const purdyrest = require('purdyrest');
const { filter } = purdyrest('http://my-purdyrest-server.ext');
filter({ foo: 'bar' });
```

Sends a `GET` request to `http://my-purdyrest-server.ext?foo=bar`.

### find

`find(id)`

```js
const purdyrest = require('purdyrest');
const { find } = purdyrest('http://my-purdyrest-server.ext');
find('custom-id');
```

Sends a `GET` request to `http://my-purdyrest-server.ext/custom=id`.

### replace(id, body)

```js
const purdyrest = require('purdyrest');
const { replace } = purdyrest('http://my-purdyrest-server.ext');
replace('custom-id', { foo: 'bar' });
```

Sends a `PUT` request to `http://my-purdyrest-server.ext/custom=id` with
`{ foo: 'bar' }` as the JSON body.

### update(id, body)

```js
const purdyrest = require('purdyrest');
const { update } = purdyrest('http://my-purdyrest-server.ext');
update('custom-id', { foo: 'bar' });
```

Sends a `PATCH` request to `http://my-purdyrest-server.ext/custom=id` with
`{ foo: 'bar' }` as the JSON body.
