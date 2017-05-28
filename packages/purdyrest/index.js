const handlerDefinition = (name, method, root) => ({
  name,
  method,
  root: !!root
});

// Alias handlerDefinition
const hd = handlerDefinition;

const handlerDefinitions = [
  hd('find', 'GET'),
  hd('filter', 'GET', true),
  hd('update', 'PATCH'),
  hd('replace', 'PUT'),
  hd('destroy', 'DELETE'),
  hd('create', 'POST', true)
];

const purdyrest = (handlers = {}) => req => {
  req.params = {};

  const hd = handlerDefinitions.find(hd => {
    if (req.method === hd.method) {

      if (hd.root && req.url === '/') {
        return true;
      }

      if (!hd.root && req.url !== '/') {
        req.params._id = req.params._id || req.url.replace(/^\//g, '');
        return true;
      }

      return false;

    }
  });

  if (!hd || !handlers[hd.name]) {
    let error = new Error('Method Not Allowed');
    error.statusCode = 405;
    throw error;
  }

  return handlers[hd.name](req);
};

module.exports = purdyrest;
