const purdyrest = require('..');
const assert = require('assert');

describe('purdyrest', () => {

  it('works', () => {
    const app = purdyrest({
      find: ({params: {_id}}) => `found/${_id}`,
      filter: req => 'filtered',
      replace: ({params: {_id}}) => `replaced/${_id}`,
      update: ({params: {_id}}) => `updated/${_id}`,
      destroy: ({params: {_id}}) => `destroyed/${_id}`,
      create: ({params: {_id}}) => `created`
    });

    assert.equal(app({ url: '/my-id', method: 'GET' }), 'found/my-id', 'did not call find correctly');
    assert.equal(app({ url: '/', method: 'GET' }), 'filtered', 'did not call filter correctly');
    assert.equal(app({ url: '/my-id', method: 'PUT' }), 'replaced/my-id', 'did not call replace correctly');
    assert.equal(app({ url: '/my-id', method: 'PATCH' }), 'updated/my-id', 'did not call update correctly');
    assert.equal(app({ url: '/my-id', method: 'DELETE' }), 'destroyed/my-id', 'did not call destroy correctly');
    assert.equal(app({ url: '/', method: 'POST' }), 'created', 'did not call create correctly');
  })

  it('throws error correctly', () => {
    const app = purdyrest();
    assert.throws(() => app({ url: '/my-id', method: 'GET' }), /\[405\] Method Not Allowed/, 'did not throw correct error');
  });

});
