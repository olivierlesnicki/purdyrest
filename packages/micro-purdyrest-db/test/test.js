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

const records = [{
  _id: 'record_id',
  foo: 'bar'
}]

const insert = (record) => Promise.resolve(record);
const find = () => ({ toArray: () => Promise.resolve(records) });
const findOne = () => Promise.resolve(records[0]);

const collection = () => ({
  insert,
  find,
  findOne
});

MongoClient.connect = (uri, callback) => {
  callback(null, {
    collection,
    close: () => {}
  });
}

const db = require('..');

test('create passes', async t => {
  const service = micro(db('mongodb-uri'));
  const url = await listen(service);
  const body = await request(url + '/models', { method: 'POST', json: true, body: { foo: 'bar' } });

  t.truthy(body._id, 'does not return an _id');
  t.is(body.foo, 'bar', 'does not return the fields');
});

test('find passes', async t => {
  const service = micro(db('mongodb-uri'));
  const url = await listen(service);
  const body = await request(url + '/models/record_id', { method: 'GET', json: true });

  t.truthy(body._id, 'does not return an _id');
  t.is(body.foo, 'bar', 'does not return the fields');
});

test('filter passes', async t => {
  const service = micro(db('mongodb-uri'));
  const url = await listen(service);
  const body = await request(url + '/models', { method: 'GET', json: true });

  t.truthy(body[0]._id, 'does not return an _id');
  t.is(body[0].foo, 'bar', 'does not return the fields');
});
