const url = require('url');
const querystring = require('querystring');

require('isomorphic-fetch');

const http = (url, {
  method,
  headers = {},
  body
}) => {
  return fetch(url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw res.statusText;
      }
    });
};

const methods = [ 'get', 'delete', 'patch', 'post', 'put' ].reduce((methods, method) => {
  methods[method] = (url, { headers, body }) => purdyrest.__http(url, { method, headers, body });
  return methods;
}, {});

const build = (name, method, options = {}) => ({ name, method, options });

const builds = [
  build('create', 'post', { hasBody: true }),
  build('filter', 'get'),
  build('find', 'get', { hasId: true }),
  build('replace', 'put', { hasId: true, hasBody: true }),
  build('update', 'patch', { hasId: true, hasBody: true }),
  build('destroy', 'delete', { hasId: true })
].reduce((builds, build) => {
  builds[build.name] = (baseUrl, { headers }) => (...args) => {
    const methodOptions = { headers };
    const { options } = build;
    let filter;
    let body;

    if (options.hasId) {
      const id = args[0];

      baseUrl = url.resolve(baseUrl, `${String(id)}`);

      if (options.hasBody) {
        body = args[1];
        filter = args[2];
      } else {
        filter = args[1];
      }
    } else {
      if (options.hasBody) {
        body = args[0];
        filter = args[1];
      } else {
        filter = args[0];
      }
    }

    if (body) {
      methodOptions.body = body;
    }

    if (filter) {
      baseUrl = baseUrl + '?' + querystring.stringify(filter);
    }

    return methods[build.method](baseUrl, methodOptions);
  };

  return builds;
}, {});


const purdyrest = (url, { headers }) => Object.keys(builds).reduce((fns, build) => {
  fns[build] = builds[build](url, { headers });
  return fns;
}, {});

purdyrest.__http = http;

module.exports = purdyrest;
