var mysql = require ('../config/database');

var messageModel= {};

messageModel.sendMessage = function(mensaje,callback){
    if (mysql.connection) {
        var sql = 'INSERT INTO mensajes (asunto,mensaje,autor,destinatario,leido) values ' +
            '("' + mensaje.asunto + '","' + new Buffer(mensaje.mensaje).toString('base64') + '","' + mensaje.autor + '","' + mensaje.destinatario + '",leido = "'+1+'")';
        mysql.connection.query(sql, function(error, row) {
            if(error){
                callback(null,"error");
            }else{
                callback(null, mensaje);
            }
        });
    }
};

module.exports = messageModel;