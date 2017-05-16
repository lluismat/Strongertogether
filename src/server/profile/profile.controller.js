var profile = require('./profile.model.js');

exports.getProfile = function(req, res) {

    profile.getProfile(req.body.user, function(err, user) {
            if (err) {
                return res.send(err);
            }else{
                return res.send(user);
            }

        });
};

exports.getMensajes = function(req, res) {

    profile.getMensajes(req.body.user, function(err, meensajes) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(meensajes);
        }

    });
};

exports.showMensaje = function(req, res) {

    profile.showMensaje(req.body, function(err, mensaje) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(mensaje);
        }

    });
};

exports.readMessage = function(req, res) {

    profile.readMessage(req.body, function(err, mensaje) {
        if (err) {
            return res.send("error");
        }else{
            return res.send(mensaje);
        }

    });
};

exports.saveProfile = function(req, res) {

    profile.saveProfile(req.body.user, function(err, user) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(user);
        }

    });
};

exports.saveAccount = function(req, res) {
    
    profile.saveAccount(req.body, function(err, user) {
        if (err) {
            return res.send(false);
        }else{
            return res.send(user);
        }
    });
};

