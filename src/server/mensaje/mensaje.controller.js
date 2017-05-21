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

exports.addFriend = function(req, res) {
    messageModel.addFriend(req.body, function(err, user) {
        if (err) {
            return res.send(user);
        }else{
            return res.send(user);
        }

    });
};

exports.refuseFriend = function(req, res) {
    messageModel.refuseFriend(req.body, function(err, user) {
        if (err) {
            return res.send(user);
        }else{
            return res.send(user);
        }

    });
};

exports.sendRequest = function(req, res) {
    messageModel.sendRequest(req.body, function(err, user) {
        if (err) {
            return res.send(user);
        }else{
            return res.send(user);
        }

    });
};

exports.getMensajes = function(req, res) {

    messageModel.getMensajes(req.body.user, function(err, mensajes) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(mensajes);
        }

    });
};

exports.getRequests = function(req, res) {

    messageModel.getRequests(req.body.user, function(err, mensajes) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(mensajes);
        }

    });
};

exports.showMensaje = function(req, res) {

    messageModel.showMensaje(req.body, function(err, mensaje) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(mensaje);
        }

    });
};

exports.readMessage = function(req, res) {

    messageModel.readMessage(req.body, function(err, mensaje) {
        if (err) {
            return res.send("error");
        }else{
            return res.send(mensaje);
        }

    });
};