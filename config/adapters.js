module.exports.adapters = {
  'default': 'mongo',

  // sails v.0.9.0
  mongo: {
    module   : 'sails-mongo',
    host     : 'localhost',
    port     : 27017,
    user     : '',
    password : '',
    database : 'myapp'

    // // OR
    // module   : 'sails-mongo',
    // url      : 'mongodb://USER:PASSWORD@HOST:PORT/DB'
  }
};