var Sequelize = require('sequelize')
const fs = require('fs')

exports.register = function(server, options, next) {
  let dbschema = require('./dbschema.js')
  var {db, models} = dbschema();

  server.expose("db", db)
  server.expose("models", models)

  next();
}

exports.register.attributes = {
  name: "dbSetup"
}