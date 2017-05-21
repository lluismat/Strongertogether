var mysql = require ('../config/database');

var messageModel= {};

messageModel.sendMessage = function(mensaje,callback){
    if (mysql.connection) {
        var sql = 'INSERT INTO mensajes (asunto,mensaje,autor,destinatario,tipo,leido) values ' +
            '("' + mensaje.asunto + '","' + new Buffer(mensaje.mensaje).toString('base64') + '","' + mensaje.autor + '","' + mensaje.destinatario + '","'+'mensaje'+'","'+0+'")';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                callback(null, mensaje);
            }
        });
    }
};
//ENVIA UNA PETICIÓN DE AMISTAT
messageModel.sendRequest = function(user,callback){
    var add_friend=true;
    if (mysql.connection) {
        var sql1 = 'SELECT * FROM users WHERE username = "'+user.username+'"';
        mysql.connection.query(sql1, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var friendsUser = row[0].friends.split(",");

                for(var i = 0; i < friendsUser.length;i++){
                    if(friendsUser[i] == user.destinatario.toString()){
                        add_friend = false;
                    }
                }
                if(add_friend == true){
                    var sql2 = 'SELECT * FROM mensajes WHERE autor = "'+user.username+'" AND destinatario ="'+user.destinatario+'" AND tipo = "'+"peticion"+'"';
                    mysql.connection.query(sql2, function(error, row3) {
                        if (error) {
                            callback(null, "error");
                        } else {
                            if(row3.length == 0) {

                                var asunto = "Petición de amistad de " + user.username;
                                var mensaje = "El usuario " + user.username + " quiere ser tu amigo.<br>¿Quieres añadirle a tu lista de amigos?";
                                var sql = 'INSERT INTO mensajes (asunto,mensaje,autor,destinatario,tipo,leido) values ' +
                                    '("' + asunto + '","' + new Buffer(mensaje).toString('base64') + '","' + user.username + '","' + user.destinatario + '","'+"peticion"+'","'+0+ '")';
                                mysql.connection.query(sql, function (error, row2) {
                                    if (error) {
                                        callback(null, "error");
                                    } else {
                                        callback(null, row2);
                                    }
                                });
                            }else{
                                callback(null, "alreadysend");
                            }
                        }
                    });
                }else{
                    callback(null, "errorexist");
                }
            }
        });
    }
};

//AÑADE UN AMIGO
messageModel.addFriend = function(user,callback){
    var add_friend=true;
    var friends = "";
    var add_friend2=true;
    var friends2 = "";
    if (mysql.connection) {
        //SACA LOS DATOS DEL USUARIO QUE HA ACEPTADO LA PETICION DE AMISTAT
        var sql1 = 'SELECT * FROM users WHERE username = "'+user.username+'"';
        mysql.connection.query(sql1, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var friendsUser = row[0].friends.split(",");

                //RECORRE EL BUCLE COMPARANDO LOS AMIGOS QUE TIENE EL USUARO CON EL USUARIO QUE QUIERE AGREGAR
                for(var i = 0; i < friendsUser.length;i++){
                    if(friendsUser[i] == user.friends.toString()){
                        add_friend = false;
                    }
                }
                //COMPRUEBA SI YA TIENE AL USUARIO COMO AMIGO
                if(add_friend == true){
                    if(row[0].friends !=""){
                        friends = row[0].friends.toString();
                    }
                    //AÑADIMOS EL NUEVO AMIGO AL STRING PARA GUARDARLO EN BASE DE DATOS
                    friends = user.friends.toString()+","+friends;
                    //ACTUALIZAMOS EL USUARIO QUE HA ACEPTADO LA PETICION CON EL NUEVO AMIGO
                    var sql2 = 'UPDATE users SET friends ="' + friends + '" WHERE username = "'+user.username+'"';
                    mysql.connection.query(sql2, function(error, row2) {
                        if(error){
                            callback(null,"error");
                        }else{
                            //SACA LOS DATOS DEL USUARIO QUE ENVIO LA PETICION
                            var sql3 = 'SELECT * FROM users WHERE username = "'+user.friends+'"';
                            mysql.connection.query(sql3, function(error, row3) {
                                if(error){
                                    callback(null,"error");
                                }else{
                                    //CONVIERTE EL STRING EN ARRAY
                                    var friendsUser2 = row3[0].friends.split(",");

                                    for(var i = 0; i < friendsUser2.length;i++){
                                        if(friendsUser2[i] == user.username.toString()){
                                            add_friend2 = false;
                                        }
                                    }
                                    if(add_friend2 == true){
                                        if(row3[0].friends !=""){
                                            friends2 = row3[0].friends.toString();
                                        }
                                        friends2 = user.username.toString()+","+friends2;
                                        var sql4 = 'UPDATE users SET friends ="' + friends2 + '" WHERE username = "'+user.friends+'"';
                                        mysql.connection.query(sql4, function(error, row4) {
                                            if(error){
                                                callback(null,"error");
                                            }else{
                                                var sql5 = 'DELETE FROM mensajes WHERE id = "'+user.id+'"';
                                                mysql.connection.query(sql5, function (error, row5) {
                                                    if (error) {
                                                        callback(null, "error");
                                                    } else {

                                                    }
                                                    callback(null, row2);
                                                });
                                            }
                                        });
                                    }else{
                                        callback(null, "errorexist");
                                    }
                                }
                            });
                        }
                    });
                }else{
                    callback(null, "errorexist");
                }
            }
        });
    }
};

messageModel.getRequests = function(user,callback){
    if (mysql.connection) {
        var sql = 'SELECT m.*,u.avatar FROM mensajes m,users u WHERE m.destinatario = "' + user + '" AND u.username = m.autor AND m.tipo = "'+"peticion"+'" ORDER BY m.id DESC';
        mysql.connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            else {
                for (var i = 0; i < row.length; i++) {
                    row[i].mensaje = new Buffer(row[i].mensaje, 'base64').toString("utf8");
                }
                var count = row.length;
                var row2 = {"requests": row, "count": count};
                callback(null, row2);
            }
        });
    }
};

messageModel.refuseFriend = function(id,callback){
    if (mysql.connection) {
        var sql = 'DELETE FROM mensajes WHERE id = "'+id.id+'"';
        mysql.connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            else {
                for (var i = 0; i < row.length; i++) {
                    row[i].mensaje = new Buffer(row[i].mensaje, 'base64').toString("utf8");
                }
                var count = row.length;
                var row2 = {"requests": row, "count": count};
                callback(null, row2);
            }
        });
    }
};


messageModel.getMensajes = function(user,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM mensajes WHERE destinatario = "' + user + '" AND tipo = "'+'mensaje'+'" ORDER BY id DESC';
        mysql.connection.query(sql, function (error, row) {
            if (error) {
                throw error;
            }
            var sql2 = 'SELECT m.*,u.avatar FROM mensajes m,users u WHERE m.destinatario = "' + user + '" AND u.username = m.autor AND m.tipo = "'+"mensaje"+'" AND leido = "' + 0 + '" ORDER BY m.id DESC';
            mysql.connection.query(sql2, function (error, row2) {
                if (error) {
                    throw error;
                }
                var sql3 = 'SELECT * FROM mensajes WHERE destinatario = "' + user + '" AND tipo = "'+'mensaje'+'" AND leido = "' + 1 + '" ORDER BY id DESC';
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

messageModel.showMensaje = function(message,callback){
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

messageModel.readMessage = function(message,callback){
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

module.exports = messageModel;