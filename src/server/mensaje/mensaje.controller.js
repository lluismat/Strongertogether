var messageModel = require('./mensaje.model');

exports.sendMessage = function(req, res) {

    messageModel.sendMessage(req.body, function(err, mensaje) {
        if (err) {
            return res.send(mensaje);
        }else{
            return res.send(mensaje);
        }
    });
};