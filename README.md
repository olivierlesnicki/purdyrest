# purdyrest

## Installation

```
yarn add purdyrest
```

## Super simple to use

Purdyrequest is designed to be the simplest way to make RESTful calls.

```js
const purdyrest = require('purdyrest');
const { create } = purdyrest('http://my-purdyrest-server.ext');
create({
  hello: 'world'
});
```

## methods

### create(body)

### destroy(id)

### filter(queryParams)

### find(id)

### replace(id, body)

### update(id, body)
