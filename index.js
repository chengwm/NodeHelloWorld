'use strict';

const Hapi = require('hapi');
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const api = require('./src/apiSetup.js');
const db = require('./src/dbSetup.js');

const server = new Hapi.Server();
server.connection({ port: ~~process.env.PORT || 3000 });

if(!process.env.DATABASE_URL) {
  throw new Error("No connection string set")
}

// load plugins
server.register([
  Inert, Vision, {
    register: HapiSwagger,
    options: {
      documentationPath: "/",
      info: {
        title: "VD API"
      }
    }
  }
])
.then(() => server.register(api))
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
}).catch(err => console.log(err))


