var mysql = require('mysql'),

connection = mysql.createConnection({
        // host: '127.0.0.1',
        // user: 'root',
        // password: '',
        // database: 'strongertogether'
        host: 'irkm0xtlo2pcmvvz.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
        user: 'bsqezaf6yhdeby9i',
        password: 'mifct1ziuqfim0r5',
        database: 'asxb09xmxa15mpd4'
      }
);

module.exports.connection = connection;
