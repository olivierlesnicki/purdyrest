const { json } = require('micro');
const microrouter = require('microrouter');
const microcors = require('micro-cors');
const visualize = require('micro-visualize');
const urljoin = require('url-join');

const callWithOptions = (fn, options) => {
  if (options === true) return fn();
  return fn(options);
};

const handlerDefinition = (method, handlerPath, hasBody = false) => ({ method, handlerPath, hasBody })

const handlerDefinitions = {
  create: handlerDefinition('post', '/', true),
  destroy: handlerDefinition('del', '/:id'),
  filter: handlerDefinition('get', '/'),
  find: handlerDefinition('get', '/:id'),
  replace: handlerDefinition('put', '/:id', true),
  update: handlerDefinition('patch', '/:id', true)
};

const parseBody = fn => async (req, res) => {
  if (!req.body) {
    req.body = await json(req);
  }

  return fn(req, res);
};

module.exports = (handlers, { cors, visualize, path = '' } = {}) => {
  const fns = [];

  // Collect handlers
  handlers = Object.keys(handlers).map(handlerName => {
    const { method, handlerPath, hasBody } = handlerDefinitions[handlerName];
    const fullpath = path ? urljoin(path, handlerPath).replace(/\/$/, '') : handlerPath;

    let handler = handlers[handlerName];
    if (hasBody) handler = parseBody(handler);

    return microrouter[method](fullpath, handler);
  });

  // Activate visualize
  if (visualize) fns.push(visualize);

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
