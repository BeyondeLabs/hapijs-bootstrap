
const Hapi = require('hapi');
const good = require('good');

const routes = require('./routes');

// create a server with a host and port
const server = new Hapi.Server();

let port = process.env.PORT
  || (process.env.NODE_ENV === 'test') ? 8010 : 8000;

server.connection({
  host: 'localhost',
  port,
});

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply({ message: 'hello, world' });
  }
});

server.route(routes);

// set up logging
const options = {
  ops: {
    interval: 100000,
  },
  reporters: {
    consoleReporters: [
      { module: 'good-console' },
      'stdout',
    ],
  },
};

server.register({
  register: good,
  options,
}, (err) => {
  if (err) return console.error(err);

  // Start the server
  server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
  });
});

module.exports = server;
