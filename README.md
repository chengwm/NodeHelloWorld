Project Purpose:
Development of a simple API that is able to store key-value pairs, and retrive the value given the key.

Endpoints:
- GET /object/{myKey}?timestamp=000000000
  Retrieves the value given a key, at a specified time
  Params:
  - myKey: String - required. Key of the key-value pair
  - timestamp: UTC Unix Timestamp - optional. Latest value for provided key is received if not provided
  Returns:
  - JSON Object {value: __RetrievedValue___ }

- POST /object
  Adds a key-value pair to the database
  - Payload: JSON Object {__key__: __value__}
  Returns:
  - JSON Object {key: __key__, value:__value__, timestamp:__timestamp__}

Used packages
- Hapi - API Backbone + Testing framework
- Joi - Validation library
- HapiSwagger - API Visualisation package
- Sequelize - Database access mechanism
- Postgres - Database 