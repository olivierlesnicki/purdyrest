const micropurdyrest = require('micro-purdyrest');
const shortid = require('shortid');
const { ObjectID, MongoClient: { connect }} = require('mongodb');

module.exports = (MONGODB_URI, options = {}) => {

  options.path = (options.path || '') + '/:collectionName';

  const db = fn => async (req, res) => {
    const end = res.end;
    const db = await new Promise((resolve, reject) => {
      connect(MONGODB_URI, (err, db) => {
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
      return Object.assign({}, record.data, { _id: record._id });
    }
  };

  const create = async (req, res) => {
    const { db: { records } } = req;
    const { collectionName } = req.params;
    const data = await json(req);
    const _id = shortid.generate();
    const collection = db.collection(collectionName);

    const result = await collection.insert(data);

    return Object.assign({}, data, { _id });
  };

  const find = async (req, res) => {
    const { db: { records } } = req;
    const { collectionName, id } = req.params;
    const collection = db.collection(collectionName);

    const record = await collection.findOne({ _id: id });

    if (!record) throw createError(404);

    return serialize(record);
  };

  const filter = async (req, res) => {
    const { db } = req;
    const { filter } = req.query;
    const { collectionName, id } = req.params;
    const collection = db.collection(collectionName);

    const records = await collection.find(JSON.parse(filter)).toArray();

    return serialize(records);
  };

  return db(micropurdyrest({
    create,
    find,
    filter
  }, options));
};
