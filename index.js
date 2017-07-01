'use strict';

const Hapi = require('hapi');
const api = require('./src/apiSetup.js');

const server = new Hapi.Server();
server.connection({ port: ~~process.env.PORT || 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Hello world');
    }
});

server.register(api)
.then(() => {
  server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  })
})


