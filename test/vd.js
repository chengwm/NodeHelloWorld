const Lab = require("lab");
const lab = exports.lab = Lab.script();

const Code = require("code");
const expect = Code.expect;
const _ = require('lodash');
const {db, m} = require("../src/dbschema.js")();

var server = require("../src/index.js");

lab.experiment("VD Endpoints", function(){
  lab.test('Endpoint test', function(){
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()

    let key1 = randomString()
    let value1 = randomString()
    let value2 = randomString()

    let item1 = server.inject({
      method: 'POST',
      url: '/object',
      payload: {
        key: key1,
        value: value1,
        createdAt: dateToUnix(new Date(year-2, month, day))
      }
    }).then(response => {
      expect(response.statusCode).equal(200)
      expect(response.result.key).equal(value1)

      return response.result
    })

    let check1 = item1.then(server.inject({
      method: 'GET',
      url: '/object/'+key1,
    }).then(response => {
      expect(response.statusCode).equal(200);
      expect(response.result.value).equal(value1)
    }))

    let item2 = check1.then(server.inject({
      method: 'POST',
      url: '/object',
      payload: {
        key: key1,
        value: value2,
        createdAt: dateToUnix(new Date(year, month, day))
      }
    }).then(response => {
      expect(response.statusCode).equal(200)
      expect(response.result.key).equal(value2)

      return response.result
    }))

    let check2 = item2.then(server.inject({
      method: 'GET',
      url: '/object/'+key1,
    }).then(response => {
      expect(response.statusCode).equal(200);
      expect(response.result.value).equal(value2)
    }))

    let check3 = item2.then(server.inject({
      method: 'GET',
      url: '/object/'+key1+'?timestamp='+dateToUnix(new Date(year-1, month, day)),
    }).then(response => {
      expect(response.statusCode).equal(200);
      expect(response.result.value).equal(value1)
    }))

  })
})

function randomString(){
  return Math.random().toString(36).substring(2,5);
}

function dateToUnix(date){
  return Math.floor(date.getTime() / 1000)
}
