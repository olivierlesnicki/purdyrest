const serverless = require('..');
const assert = require('assert');

describe('serverless-purdyrest', () => {

  it('returns correct response', (done) => {
    const handler = serverless(req => 'Hello World');
    const promise = new Promise(resolve => handler({}, {}, (err, res) => resolve(res)));

    promise.then(res => {
      try {
        assert.deepEqual(res, {
          statusCode: 200,
          headers: {},
          body: JSON.stringify('Hello World')
        }, 'did not return the correct response');
        done();
      } catch(e) {
        done(e);
      }
    });
  });

  it('handles String errors correctly', () => {
    const handler = serverless(req => { throw '[400] Not Found' });
    const promise = new Promise(resolve => handler({}, {}, (err, res) => resolve(err)));

    promise.then(res => {
      try {
        assert.deepEqual(res.message, '[400] Not Found', 'did not handle the error correctly');
        done();
      } catch(e) {
        done(e);
      }
    });
  });

  it('handles Promise errors correctly', () => {
    const handler = serverless(req => { return Promise.reject('[400] Not Found') });
    const promise = new Promise(resolve => handler({}, {}, (err, res) => resolve(err)));

    promise.then(res => {
      try {
        assert.deepEqual(res.message, '[400] Not Found', 'did not handle the error correctly');
        done();
      } catch(e) {
        done(e);
      }
    });
  });

  it('handles Error errors correctly', () => {
    const handler = serverless(req => { throw new Error('[400] Not Found') });
    const promise = new Promise(resolve => handler({}, {}, (err, res) => resolve(err)));

    promise.then(res => {
      try {
        assert.deepEqual(res.message, '[400] Not Found', 'did not handle the error correctly');
        done();
      } catch(e) {
        done(e);
      }
    });
  });

});
