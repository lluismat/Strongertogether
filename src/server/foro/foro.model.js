var mysql = require ('../config/database');

var foroModel= {};

foroModel.crearTema = function(user,callback){
    if (mysql.connection) {
        var sql = 'INSERT INTO tema (titulo,contenido,autor,categoria) values ("' + user.titulo + '","' + mysql.connection.escape(user.contenido) + '","' + user.autor + '","' + user.categoria + '")';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                var sql2 = 'UPDATE categoria SET temas = (temas+"'+1+'") where id = "'+user.categoria+'"';
                mysql.connection.query(sql2, function(error, row2) {});
                callback(null, user);
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
                        var row2 = {"tema": row[0],"user":user[0]};
                        callback(null, row2);
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