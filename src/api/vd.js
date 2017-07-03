const Joi = require("joi")
const _ = require('lodash')
const Boom = require('boom')

exports.register = function (server, options, next) {
  server.route({
    method: "GET",
    path: "/test",
    handler: function(request, reply){
      reply("Test worked")
    }
  })

  // Get value given a key
  server.route({
    method: "GET",
    path: "/object/{key}",
    config: {
      tags: ["api"],
      description: `Retrieve value matched to a provided key from 
      database, matching time it was provided in the database`,
      validate: {
        params: {
          key: Joi.string().required(),
        },
        query: {
          timestamp: Joi.date().timestamp('unix').optional()
        }
      }
    }, 
    handler: function(request, reply){
      let m = getModels(request)
      let key = request.params.key
      let timestamp = request.query.timestamp

      let queryOptions = {
        attributes: ['value'],
        where: { key },
        order: [['createdAt', 'DESC']]
      }

      if(timestamp){
        queryOptions.where.createdAt = {
          $lt: timestamp
        }
      }

      m.VDModel.findOne(queryOptions).then(result => {
        if(result){
          reply(result.toJSON())
        } else {
          reply(Boom.notFound())
        }
      }).catch(err => reply(err))
    }
  })

  server.route({
    method: "POST",
    path: "/object",
    config: {
      tags: ["api"],
      description: "Post new Key-Value Pair into database",
      validate: {
        payload: Joi.object().length(1).required()
      }
    }, 
    handler: function(request, reply){
      let m = getModels(request)
      let pairs = _.toPairs(request.payload)

      let [ key, value ] = pairs[0]
      m.VDModel.create({
        key, value
      }).then(result => {
        reply({
          key: result.key,
          value: result.value,
          timestamp: Math.floor(new Date(result.createdAt).getTime() / 1000)
        })
      }).catch(err => reply(err))
      
    }
  })


function getDB(request){
  return request.server.plugins["dbSetup"].db
}

function getModels(request){
  return request.server.plugins["dbSetup"].models
}

  next()
}

exports.register.attributes = {
  name: "api-vg"
}