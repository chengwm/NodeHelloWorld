var Sequelize = require('sequelize')
const fs = require('fs')

module.exports = function (){
  var sequelizeOptions = {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }

  if(!process.env.DATABASE_URL) {
    throw new Error("No connection string set")
  }

  var db = new Sequelize(process.env.DATABASE_URL, sequelizeOptions)
  db.authenticate()
    .catch(err => {
      console.log(err)
      process.exit(1)
    })

  // get models

  var models = {}
  fs.readdirSync('./src/models/').forEach(fileName => {
    let modelName = fileName.slice(0, -3)
    let modelDefinition = require('./models/' + fileName)
    models[modelName] = modelDefinition.generateModel(db)
  })

  return {db, models}
}