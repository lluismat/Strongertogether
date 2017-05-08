
var mysql = require ('../config/database');

var hospitalsModel= {};

hospitalsModel.getHospitals = function (callback){
  if (mysql.connection) {
        mysql.connection.query('SELECT * FROM hospitals ORDER BY id', function(error, rows) {
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

module.exports = hospitalsModel;
