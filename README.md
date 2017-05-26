# purdyrest

[![npm package](https://nodei.co/npm/purdyrequest.png)](https://nodei.co/npm/purdyrequest/)

## Super simple to use

**purdyrequest** is designed to be the simplest way to make http calls to
servers that follow **purdyrest** RESTful conventions.

```js
const purdyrest = require('purdyrest');
const { create } = purdyrest('http://my-purdyrest-server.ext');
create({ hello: 'world' });
```

## Methods

### Create

`create(body)`

```js
const purdyrest = require('purdyrest');
const { create } = purdyrest('http://my-purdyrest-server.ext');
create({ foo: 'bar' });
```

Sends a `POST` request to `http://my-purdyrest-server.ext` with
`{ foo: 'bar' }` as the body in JSON format.

### Destroy

`destroy(id)`

```js
const purdyrest = require('purdyrest');
const { destroy } = purdyrest('http://my-purdyrest-server.ext');
destroy('custom-id');
```

Sends a `DELETE` request to `http://my-purdyrest-server.ext/custom-id`.

### Filter

`filter(queryParams)`

```js
const purdyrest = require('purdyrest');
const { filter } = purdyrest('http://my-purdyrest-server.ext');
filter({ foo: 'bar' });
```

Sends a `GET` request to `http://my-purdyrest-server.ext?foo=bar`.

### Find

`find(id)`

```js
const purdyrest = require('purdyrest');
const { find } = purdyrest('http://my-purdyrest-server.ext');
find('custom-id');
```

Sends a `GET` request to `http://my-purdyrest-server.ext/custom=id`.

### Replace

`replace(id, body)`

```js
const purdyrest = require('purdyrest');
const { replace } = purdyrest('http://my-purdyrest-server.ext');
replace('custom-id', { foo: 'bar' });
```

Sends a `PUT` request to `http://my-purdyrest-server.ext/custom=id` with
`{ foo: 'bar' }` as the body in JSON format.

### Update

`update(id, body)`

```js
const purdyrest = require('purdyrest');
const { update } = purdyrest('http://my-purdyrest-server.ext');
update('custom-id', { foo: 'bar' });
```

Sends a `PATCH` request to `http://my-purdyrest-server.ext/custom=id` with
`{ foo: 'bar' }` as the body in JSON format.
