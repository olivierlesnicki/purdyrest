const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');

const micropurdyrest = require('..');

test('create passes', async t => {
  const service = micro(micropurdyrest({
    create: (req, res) => ({ foo: 'bar' })
  }));
  const url = await listen(service);
  const body = await request(url, { method: 'POST', json: true, body: { hello: 'world'}});

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});

test('destroy passes', async t => {
  const service = micro(micropurdyrest({
    destroy: (req, res) => ({ foo: 'bar' })
  }));
  const url = await listen(service);
  const body = await request(url + '/id', { method: 'DELETE', json: true });

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});

test('filter passes', async t => {
  const service = micro(micropurdyrest({
    filter: (req, res) => ({ foo: 'bar' })
  }));
  const url = await listen(service);
  const body = await request(url, { method: 'GET', json: true });

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});

test('find passes', async t => {
  const service = micro(micropurdyrest({
    find: (req, res) => ({ foo: 'bar' })
  }));
  const url = await listen(service);
  const body = await request(url + '/id', { method: 'GET', json: true });

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});

test('replace passes', async t => {
  const service = micro(micropurdyrest({
    replace: (req, res) => ({ foo: 'bar' })
  }));
  const url = await listen(service);
  const body = await request(url + '/id', { method: 'PUT', json: true, body: { foo: 'bar' }});

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});

test('replace passes', async t => {
  const service = micro(micropurdyrest({
    update: (req, res) => ({ foo: 'bar' })
  }));
  const url = await listen(service);
  const body = await request(url + '/id', { method: 'PATCH', json: true, body: { foo: 'bar' }});

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});

test('cors passes', async t => {
  const service = micro(micropurdyrest({
    update: (req, res) => ({ foo: 'bar' })
  }, { cors: true }));
  const url = await listen(service);
  const headers = await request(url + '/id', { method: 'PATCH', json: true, transform: (body, { headers }) => headers });

  t.is(headers['access-control-allow-origin'], '*', 'does not return correct correct access-control-allow-origin header');
  t.is(headers['access-control-max-age'], '86400', 'does not return correct correct access-control-max-age header');
  t.is(headers['access-control-allow-methods'], 'POST,GET,PUT,DELETE,OPTIONS', 'does not return correct correct access-control-allow-methods header');
  t.is(headers['access-control-allow-headers'], 'X-Requested-With,Access-Control-Allow-Origin,X-HTTP-Method-Override,Content-Type,Authorization,Accept', 'does not return correct correct access-control-allow-headers header');
  t.is(headers['access-control-allow-credentials'], 'true', 'does not return correct correct access-control-allow-credentials header');
});

test('path passes', async t => {
  const service = micro(micropurdyrest({
    create: (req, res) => ({ foo: 'bar' })
  }, { path: '/bob' }));
  const url = await listen(service);
  const body = await request(url + '/bob', { method: 'POST', json: true, body: { hello: 'world'}});

  t.deepEqual(body, {
    foo: 'bar'
  }, 'does not return correct body');
});
