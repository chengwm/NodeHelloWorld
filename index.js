'use strict';

const Hapi = require('hapi');
const api = require('./src/apiSetup.js');
const db = require('./src/dbSetup.js');

const server = new Hapi.Server();
server.connection({ port: ~~process.env.PORT || 3000 });

if(!process.env.DATABASE_URL) {
  throw new Error("No connection string set")
}

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
      reply('Hello world');
  }
});

// load plugins
server.register(api)
.then(() => server.register({
  register: db,
}))
.then(() => {
  server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  })
})


