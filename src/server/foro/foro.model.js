var mysql = require ('../config/database');

var foroModel= {};

foroModel.crearTema = function(tema,callback){
    if (mysql.connection) {
        var sql = 'INSERT INTO tema (titulo,contenido,autor,categoria,votos) values ("' + tema.titulo + '","' + new Buffer(tema.contenido).toString('base64') + '","' + tema.autor + '","' + tema.categoria + '","'+0+'")';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var sql2 = 'UPDATE categoria SET temas = (temas+"'+1+'") where id = "'+tema.categoria+'"';
                mysql.connection.query(sql2, function(error, row2) {});
                callback(null, tema);
            }
        });
    }
};

foroModel.editarTema = function(tema,callback){
    if (mysql.connection) {
        var sql = 'UPDATE tema SET titulo ="' + tema.titulo + '",contenido ="'+new Buffer(tema.contenido).toString('base64')+'" WHERE id = "'+tema.tema+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                callback(null, tema);
            }
        });
    }
};

foroModel.crearComentario = function(comentario,callback){
    if (mysql.connection) {
        var sql = 'INSERT INTO comentarios (contenido,autor,tema) values ("' + new Buffer(comentario.contenido).toString('base64') + '","' + comentario.autor + '","' + comentario.tema + '")';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var sql2 = 'UPDATE tema SET comentarios = (comentarios+"'+1+'") where id = "'+comentario.tema+'"';
                mysql.connection.query(sql2, function(error, row2) {
                    if(error){
                        callback(null,"error");
                    }
                });
                callback(null, comentario);
            }
        });
    }
};

foroModel.editarComentario = function(comentario,callback){
    if (mysql.connection) {
        var sql = 'UPDATE comentarios SET contenido ="'+new Buffer(comentario.contenido).toString('base64')+'" WHERE id = "'+comentario.comentario+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                callback(null, comentario);
            }
        });
    }
};

foroModel.getTemas = function(categoria,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM tema WHERE categoria = "'+categoria+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                callback(null, row);
            }
        });
    }
};

foroModel.getComentario = function(id,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM comentarios WHERE id = "'+id+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                row[0].contenido = new Buffer(row[0].contenido, 'base64').toString("utf8");
                callback(null, row[0]);
            }
        });
    }
};

foroModel.getTema = function(id,callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM tema WHERE id = "'+id+'"';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var sql2 = 'SELECT * FROM users WHERE username = "'+row[0].autor+'"';
                mysql.connection.query(sql2, function(error, user) {
                    if(error){
                        callback(null,"error");
                    }else{
                        //var sql3 = 'SELECT * FROM comentarios WHERE tema = "'+id+'"';
                        var sql3 = 'SELECT c.*,c.id as comentario,u.id,u.username,u.avatar FROM comentarios c,users u WHERE c.tema = "'+id+'" AND u.username = c.autor ORDER BY c.id';
                        mysql.connection.query(sql3, function(error, coments) {
                            if(error){
                                callback(null,"error");
                            }else{
                                for(var i = 0; i < coments.length;i++){
                                    coments[i].contenido = new Buffer(coments[i].contenido, 'base64').toString("utf8");
                                }
                                row[0].contenido = new Buffer(row[0].contenido, 'base64').toString("utf8");
                                var row2 = {"tema": row[0],"user":user[0],"comentarios":coments};
                                callback(null, row2);
                            }
                        });
                    }
                });
            }
        });
    }
};

foroModel.getCategorias = function(callback){
    if (mysql.connection) {
        var sql = 'SELECT * FROM categoria ORDER BY orden';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                callback(null, row);
            }
        });
    }
};

//AÑADE UN AMIGO
foroModel.addFriend = function(user,callback){
    var add_friend=true;
    var friends = "";
    if (mysql.connection) {
        var sql1 = 'SELECT * FROM users WHERE username = "'+user.username+'"';
        mysql.connection.query(sql1, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var friendsUser = row[0].friends.split(",");

                for(var i = 0; i < friendsUser.length;i++){
                    if(friendsUser[i] == user.friends.toString()){
                        add_friend = false;
                    }
                }
                if(add_friend == true){
                    friends = row[0].friends.toString();
                    friends = user.friends.toString()+","+friends;
                    var sql = 'UPDATE users SET friends ="' + friends + '" WHERE username = "'+user.username+'"';
                    mysql.connection.query(sql, function(error, row2) {
                        if(error){
                            callback(null,"error");
                        }else{
                            callback(null, row2);
                        }
                    });
                }else{
                    callback(null, "errorexist");
                }
            }
        });
    }
};

module.exports = foroModel;