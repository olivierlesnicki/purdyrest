const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');
const mock = require('mock-require');
const sinon = require('sinon');

let MongoClient = {};

const mongodb = {
  ObjectID: id => id,
  MongoClient
};

mock('mongodb', mongodb);

const db = require('..');

test('create passes', async t => {

  const insert = sinon.stub();
  const collection = sinon.stub().returns({
    insert: sinon.stub().returns({})
  });

  MongoClient.connect = (uri, callback) => {
    t.is(uri, 'mongodb-uri', 'does not use the correct mongodb uri');
    callback(null, {
      collection
    });
  }

  const service = micro(db('mongodb-uri'));
  const url = await listen(service);
  const body = await request(url + '/models', { method: 'POST', json: true, body: { hello: 'world'}});

  t.deepEqual(JSON.parse(body).test, 'woot')
});
