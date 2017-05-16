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
                        var row3 = {"user": row[0],"temas":row2};
                        callback(null, row3);
                    }
                });
            }
        });
    }
};

profileModel.getMensajes = function(user,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM mensajes WHERE destinatario = "' + user + '" ORDER BY id DESC';
        mysql.connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            var sql2 = 'SELECT m.*,u.avatar FROM mensajes m,users u WHERE m.destinatario = "' + user + '" AND u.username = m.autor AND leido = "' + 0 + '" ORDER BY m.id DESC';
            mysql.connection.query(sql2, function (error, row2) {
                if (error) {
                    throw error;
                }
                var sql3 = 'SELECT * FROM mensajes WHERE destinatario = "' + user + '" AND leido = "' + 1 + '" ORDER BY id DESC';
                mysql.connection.query(sql3, function (error, row3) {
                    if (error) {
                        throw error;
                    } else {

                        for (var i = 0; i < row.length; i++) {
                            row[i].mensaje = new Buffer(row[i].mensaje, 'base64').toString("utf8");
                        }

                        for (var i = 0; i < row2.length; i++) {
                            row2[i].mensaje = new Buffer(row2[i].mensaje, 'base64').toString("utf8");
                        }
                        var noleidos = row2.length;
                        var row4 = {"leidos": row3, "noleidos": row2, "mensajes": noleidos, "todos": row};
                        callback(null, row4);
                    }
                });
            });
        });
    }
};

profileModel.showMensaje = function(message,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM mensajes WHERE destinatario = "'+message.destinatario+'" AND id = "'+message.id+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                throw error;
            }else{
                row[0].mensaje = new Buffer(row[0].mensaje, 'base64').toString("utf8");
                callback(null, row[0]);
            }
        });
    }
};

profileModel.readMessage = function(message,callback){
    if (mysql.connection) {
        var sql = 'UPDATE mensajes set leido = "' + 1 + '" where destinatario ="' + message.destinatario + '" AND id = "'+message.id+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                throw error;
            }else{
                callback(null, row);
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