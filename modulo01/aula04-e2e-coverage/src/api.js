const http = require("http");
const { once } = require('events');

const DEFAULT_USER = {
  username: 'flipggs',
  password: '123'
};

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page');
    return response.end();
  },
  //curl -i -X POST --data '{"username": "flipggs", "password": "123"}' http://localhost:3000/login
  '/login:post': async (request, response) => {
    const data = JSON.parse(await once(request, "data"));

    if (data.username !== DEFAULT_USER.username || data.password !== DEFAULT_USER.password) {
      response.writeHead(401);
      response.end('Log in failed');
      return;
    }
    
    return response.end('Log in succeded');
  },
  default(request, response) {
    response.writeHead(404);
    return response.end('not found');
  }
}

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http.createServer(handler)
  .listen(3000, () => console.log('running at 3000'))

module.exports = app;