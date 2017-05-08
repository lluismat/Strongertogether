var mysql = require('mysql'),

connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'strongertogether'
      }
);

module.exports.connection = connection;
