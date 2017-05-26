const purdyrest = require('..');
const assert = require('assert');
const sinon = require('sinon');

const calledWith = (purdyrest, ...args) => {
  assert.deepEqual(purdyrest.__http.args[0], [...args]);
}

describe('purdyrest(url, { headers })', function() {

  describe('.create(body)', function() {
    it('calls purdyrest.__http with the correct argument', function() {
      purdyrest.__http = sinon.stub();

      purdyrest('https://test.url', { headers: { foo: 'bar'} })
        .create({ fee: 'baz' });

      calledWith(purdyrest, 'https://test.url', {
        method: 'post',
        headers: { foo: 'bar'},
        body: { fee: 'baz' }
      });
    });
  });

  describe('.filter(query)', function() {
    it('calls purdyrest.__http with the correct argument', function() {
      purdyrest.__http = sinon.stub();

      purdyrest('https://test.url', { headers: { foo: 'bar'} })
        .filter({ fee: 'baz' });

      calledWith(purdyrest, 'https://test.url?fee=baz', {
        body: undefined,
        method: 'get',
        headers: { foo: 'bar'}
      });

    });
  });

  describe('.find(id)', function() {
    it('calls purdyrest.__http with the correct argument', function() {
      purdyrest.__http = sinon.stub();

      purdyrest('https://test.url', { headers: { foo: 'bar'} })
        .find("abc");

      calledWith(purdyrest, 'https://test.url/abc', {
        body: undefined,
        method: 'get',
        headers: { foo: 'bar'}
      });

    });
  });

  describe('.replace(id, body)', function() {
    it('calls purdyrest.__http with the correct argument', function() {
      purdyrest.__http = sinon.stub();

      purdyrest('https://test.url', { headers: { foo: 'bar'} })
        .replace("abc", { fee: 'baz' });

      calledWith(purdyrest, 'https://test.url/abc', {
        body: { fee: 'baz' },
        method: 'put',
        headers: { foo: 'bar'}
      });

    });
  });

  describe('.update(id, body)', function() {
    it('calls purdyrest.__http with the correct argument', function() {
      purdyrest.__http = sinon.stub();

      purdyrest('https://test.url', { headers: { foo: 'bar'} })
        .update("abc", { fee: 'baz' });

      calledWith(purdyrest, 'https://test.url/abc', {
        body: { fee: 'baz' },
        method: 'patch',
        headers: { foo: 'bar'}
      });

    });
  });

  describe('.destroy(id)', function() {
    it('calls purdyrest.__http with the correct argument', function() {
      purdyrest.__http = sinon.stub();

      purdyrest('https://test.url', {})
        .destroy("abc");

      calledWith(purdyrest, 'https://test.url/abc', {
        body: undefined,
        method: 'delete',
        headers: undefined
      });

    });
  });

});
