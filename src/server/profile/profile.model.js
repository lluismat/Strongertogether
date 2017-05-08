var mysql = require ('../config/database');
var bcrypt = require('bcrypt-nodejs');

var profileModel = {};

profileModel.getProfile = function(user,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM users WHERE username = "'+user+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                throw error;
            }else{
                callback(null, row[0]);
            }
        });
    }
};

profileModel.saveProfile = function(user,callback){
    if (mysql.connection) {
        var sql = 'UPDATE users set name = "' + user.name + '", surname = "' + user.surname + '", city = "' + user.city + '"' +
            ', country = "' + user.country + '", avatar = "' + user.avatar + '", description = "' + user.description + '"'+
            'where username ="' + user.username + '"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                throw error;
            }else{
                callback(null, user);
            }
        });
    }
};


profileModel.saveAccount = function (user, callback) {
    var password ="";
    var sql ="";

    if (mysql.connection) {
        mysql.connection.query("SELECT * FROM users WHERE username like '" + user.username + "'",
            function (error, row) {
            console.log(row);
                if (error) {
                    throw error;
                } else {
                    if (!bcrypt.compareSync(user.actualPass, row[0].password)) {
                        callback(null, "passfail");
                    }else{
                        if(user.email == "" && user.newpass != ""){
                            console.log("no email");
                            password = bcrypt.hashSync(user.newpass, null, null);
                            sql = 'UPDATE users set password = "' + password + '" where username ="' + row[0].username + '"';

                        }else if(user.newpass == "" && user.email != ""){
                            console.log("no pass");
                            sql = 'UPDATE users set email = "' + user.email + '" where username ="' + row[0].username + '"';

                        }else if(user.newpass != "" && user.email != ""){
                            console.log("todo");
                            password = bcrypt.hashSync(user.newpass, null, null);
                            sql = 'UPDATE users set email = "' + user.email + '", password = "' + password + '" where username ="' + row[0].username + '"';
                        }

                        if(user.newpass == "" && user.email == "") {
                            console.log("nada");
                            callback(null, "nochange");
                        }else{
                            mysql.connection.query(sql, function(error, row2) {
                                if(error){
                                    callback(null, "error");
                                }else{
                                    callback(null, row);
                                }
                            });
                        }

                    }
                }
        });
    }
};

module.exports = profileModel;