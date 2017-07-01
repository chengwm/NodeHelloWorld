exports.register = function (server, options, next) {
  server.route({
    method: "GET",
    path: "/test",
    handler: function(request, reply){
      reply("Test worked")
    }
  })
  next()
}

exports.register.attributes = {
  name: "api-vg"
}