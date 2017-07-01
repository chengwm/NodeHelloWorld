module.exports = (server, options, next) => {
  server.register([
    require("./api/vd"),
  ]).then(next, (err) => {
    console.log(err);
    next(err);
  })
}

module.exports.attributes = { name: "apiSetup" }