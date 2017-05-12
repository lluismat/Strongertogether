var foroController = require('./foro.controller');

module.exports = function(app){
    app.post('/api/nuevo_tema',foroController.crearTema);
    app.post('/api/temas',foroController.getTemas);
    app.post('/api/tema',foroController.getTema);
    app.post('/api/categorias',foroController.getCategorias);
    app.post('/api/nuevo_comentario',foroController.crearComentario);
    app.post('/api/addfriend',foroController.addFriend);
};