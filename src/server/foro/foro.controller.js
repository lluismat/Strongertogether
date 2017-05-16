var foroModel = require('./foro.model');

exports.crearTema = function(req, res) {

    foroModel.crearTema(req.body, function(err, tema) {
        if (err) {
            return res.send(tema);
        }else{
            return res.send(tema);
        }

    });
};

exports.editarTema= function(req, res) {

    foroModel.editarTema(req.body, function(err, tema) {
        if (err) {
            return res.send(tema);
        }else{
            return res.send(tema);
        }

    });
};

exports.getTemas = function(req, res) {

    foroModel.getTemas(req.body.categoria, function(err, temas) {
        if (err) {
            return res.send(tema);
        }else{
            return res.send(temas);
        }

    });
};

exports.getTema = function(req, res) {

    foroModel.getTema(req.body.id, function(err, tema) {
        if (err) {
            return res.send(tema);
        }else{
            return res.send(tema);
        }

    });
};

exports.getCategorias = function(req, res) {

    foroModel.getCategorias(function(err, categorias) {
        if (err) {
            return res.send(tema);
        }else{
            return res.send(categorias);
        }

    });
};

exports.crearComentario = function(req, res) {

    foroModel.crearComentario(req.body, function(err, comentario) {
        if (err) {
            return res.send(comentario);
        }else{
            return res.send(comentario);
        }

    });
};

exports.getComentario = function(req, res) {

    foroModel.getComentario(req.body.id, function(err, tema) {
        if (err) {
            return res.send(tema);
        }else{
            return res.send(tema);
        }

    });
};

exports.editarComentario = function(req, res) {

    foroModel.editarComentario(req.body, function(err, comentario) {
        if (err) {
            return res.send(comentario);
        }else{
            return res.send(comentario);
        }

    });
};


exports.addFriend = function(req, res) {
    foroModel.addFriend(req.body, function(err, user) {
        if (err) {
            return res.send(user);
        }else{
            return res.send(user);
        }

    });
};