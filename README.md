# purdyrest

## Installation

```
yarn add purdyrest
```

## Super simple to use

**purdyrequest** is designed to be the simplest way to make http calls to servers that follow **purdyrest** RESTful conventions.

```js
const purdyrest = require('purdyrest');
const { create } = purdyrest('http://my-purdyrest-server.ext');
create({ hello: 'world' }); 
```

## methods

### create(body)

### destroy(id)

### filter(queryParams)

### find(id)

### replace(id, body)

### update(id, body)
