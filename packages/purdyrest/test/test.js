const purdyrest = require('..');
const test = require('ava');

test(t => {

  const app = purdyrest({
    find: ({params: {_id}}) => `found/${_id}`,
    filter: req => 'filtered',
    replace: ({params: {_id}}) => `replaced/${_id}`,
    update: ({params: {_id}}) => `updated/${_id}`,
    destroy: ({params: {_id}}) => `destroyed/${_id}`,
    create: ({params: {_id}}) => `created`
  });

  t.deepEqual(app({ url: '/my-id', method: 'GET' }), 'found/my-id', 'does not call find correctly');
  t.deepEqual(app({ url: '/', method: 'GET' }), 'filtered', 'does not call filter correctly');
  t.deepEqual(app({ url: '/my-id', method: 'PUT' }), 'replaced/my-id', 'does not call replace correctly');
  t.deepEqual(app({ url: '/my-id', method: 'PATCH' }), 'updated/my-id', 'does not call update correctly');
  t.deepEqual(app({ url: '/my-id', method: 'DELETE' }), 'destroyed/my-id', 'does not call destroy correctly');
  t.deepEqual(app({ url: '/', method: 'POST' }), 'created', 'does not call create correctly');

});

test(t => {
  const app = purdyrest();
  const error = t.throws(() => app({ url: '/my-id', method: 'GET' }), Error);
  t.is(error.message, 'Method Not Allowed', 'does not throw the correct message');
  t.is(error.statusCode, 405, 'does not throw the correct status code');
});
