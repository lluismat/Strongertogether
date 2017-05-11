var mysql = require ('../config/database');

var foroModel= {};

foroModel.crearTema = function(tema,callback){
    if (mysql.connection) {
        var sql = 'INSERT INTO tema (titulo,contenido,autor,categoria) values ("' + tema.titulo + '","' + new Buffer(tema.contenido).toString('base64') + '","' + tema.autor + '","' + tema.categoria + '")';
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

foroModel.crearComentario = function(comentario,callback){
    console.log(comentario);
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
                        var sql3 = 'SELECT c.*,u.id,u.username,u.avatar FROM comentarios c,users u WHERE c.tema = "'+id+'" AND u.username = c.autor';
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

module.exports = foroModel;