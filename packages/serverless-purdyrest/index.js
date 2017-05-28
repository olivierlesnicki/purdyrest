module.exports = purdyrest => (req, context, callback) => {
  (new Promise((resolve, reject) => {
    try {
      Promise
        .resolve(purdyrest(req))
        .then(resolve, reject);
    } catch(e) {
      reject(e);
    }
  }))
    .then(
      res => {
        callback(null, {
          statusCode: 200,
          headers: {},
          body: res && JSON.stringify(res)
        });
      },
      err => {
        callback(err instanceof Error ? err : new Error(err));
      }
    );
};
