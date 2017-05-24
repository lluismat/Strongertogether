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
                var sql = 'SELECT t.*,c.nombre FROM tema t,categoria c WHERE t.autor = "'+user+'" AND t.categoria = c.id ';
                mysql.connection.query(sql, function(error, row2) {
                    if(error){
                        throw error;
                    }else{
                        for(var i = 0; i < row2.length;i++){
                            row2[i].contenido = new Buffer(row2[i].contenido, 'base64').toString("utf8");
                        }
                        var str2 = row[0].friends.split(",");
                        var str3 = str2.slice(0,-1);
                        for(var j = 0; j < str3.length;j++){
                            str3[j] = '"'+str3[j]+'"';
                        }
                        var sql = 'SELECT * FROM users WHERE username IN ('+str3+')';
                        mysql.connection.query(sql, function(error, row3) {
                            if(error){
                                throw error;
                            }else{
                                var row4 = {"user": row[0],"temas":row2, "amigos":row3};
                                callback(null, row4);
                            }
                        });
                    }
                });
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
                if (error) {
                    throw error;
                } else {
                    if (!bcrypt.compareSync(user.actualPass, row[0].password)) {
                        callback(null, "passfail");
                    }else{
                        if(user.email == "" && user.newpass != ""){

                            password = bcrypt.hashSync(user.newpass, null, null);
                            sql = 'UPDATE users set password = "' + password + '" where username ="' + row[0].username + '"';

                        }else if(user.newpass == "" && user.email != ""){

                            sql = 'UPDATE users set email = "' + user.email + '" where username ="' + row[0].username + '"';

                        }else if(user.newpass != "" && user.email != ""){

                            password = bcrypt.hashSync(user.newpass, null, null);
                            sql = 'UPDATE users set email = "' + user.email + '", password = "' + password + '" where username ="' + row[0].username + '"';
                        }

                        if(user.newpass == "" && user.email == "") {

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