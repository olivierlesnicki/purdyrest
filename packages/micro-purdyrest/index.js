const microrouter = require('microrouter');
const microcors = require('micro-cors');
const visualize = require('micro-visualize');
const urljoin = require('url-join');

const callWithOptions = (fn, options) => {
  if (options === true) return fn();
  return fn(options);
};

const handlerDefinition = (method, handlerPath) => ({ method, handlerPath })

const handlerDefinitions = {
  create: handlerDefinition('post', '/'),
  destroy: handlerDefinition('del', '/:id'),
  filter: handlerDefinition('get', '/'),
  find: handlerDefinition('get', '/:id'),
  replace: handlerDefinition('put', '/:id'),
  update: handlerDefinition('patch', '/:id')
};

module.exports = (handlers, { cors, path = '' } = {}) => {
  const fns = [
    visualize
  ];

  // Collect handlers
  handlers = Object.keys(handlers).map(handler => {
    const { method, handlerPath } = handlerDefinitions[handler];

    path = path ? urljoin(path, handlerPath).replace(/\/$/, '') : handlerPath;
    return microrouter[method](path, handlers[handler]);
  });

  handlers.push((req, res) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    throw error;
  });

  // Activate cors
  if (cors) fns.push(callWithOptions(microcors, cors));

  fns.push(fn => (...args) => {

    // Collect the Bearer token
    if (args[0].headers && args[0].headers.authorization) {
      let parts = args[0].headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        args[0].token = parts[1];
      }
    }

    return fn(...args);
  });

  // Build routes
  fns.push(() => microrouter.router(...handlers));

  // Build micro
  return (fns.length === 1) ? fns[0] : fns.reduceRight((f, g) => g(f), fn => fn);
};
