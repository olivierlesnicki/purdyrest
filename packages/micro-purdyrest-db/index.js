const { json } = require('micro');
const micropurdyrest = require('micro-purdyrest');
const shortid = require('shortid');
const { ObjectID, MongoClient } = require('mongodb');

module.exports = (MONGODB_URI, options = {}) => {

  options.path = (options.path || '') + '/:collectionName';

  const db = fn => async (req, res) => {
    const db = await new Promise((resolve, reject) => {
      MongoClient.connect(MONGODB_URI, (err, db) => {
        if (err) { reject(err); }
        resolve(db);
      });
    });

    // Expose the connection
    req.db = db;

    // Close the connection
    res.on('finish', () => {
      db.close();
    });

    return fn(req, res);
  }

  const serialize = (record) => {
    if (Array.isArray(record)) {
      return record.map(serialize);
    } else {
      return Object.assign({}, record, { _id: record._id });
    }
  };

  const create = db(async (req, res) => {
    const { db } = req;
    const { collectionName } = req.params;
    const data = await json(req);
    const _id = shortid.generate();
    const collection = db.collection(collectionName);

    const result = await collection.insert(data);

    return Object.assign({}, data, { _id });
  });

  const find = db(async (req, res) => {
    const { db } = req;
    const { collectionName, id } = req.params;
    const collection = db.collection(collectionName);

    const record = await collection.findOne({ _id: id });

    if (!record) {
      let error = new Error('Not Found');
      error.statusCode = 404;
      throw error;
    }

    return serialize(record);
  });

  const filter = db(async (req, res) => {

    const { db } = req;
    const { collectionName } = req.params;
    const collection = db.collection(collectionName);
    let { filter } = req.query;

    filter = filter ? JSON.parse(filter) : {};

    const records = await collection.find(filter).toArray();

    return serialize(records);
  });

  return micropurdyrest({
    create,
    find,
    filter
  }, options)
};
