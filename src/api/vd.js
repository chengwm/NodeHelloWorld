const Joi = require("joi")
const _ = require('lodash')

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
      validate: {
        params: {
          key: Joi.string().required()
        }
      }
    }, 
    handler: function(request, reply){
      let m = getModels(request)
      let key = request.params.key

      m.VDModel.findOne({
        attributes: ['value'],
        where: { key },
        order: [['createdAt', 'DESC']]
      }).then(result => {
        if(result){
          reply(result.toJSON())
        } else {
          reply("No results found")
        }
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