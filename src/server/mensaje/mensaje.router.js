var ControllerMessage = require ('./mensaje.controller');

module.exports = function(app) {
    app.post('/api/send_message', ControllerMessage.sendMessage);
    app.post('/api/addfriend',ControllerMessage.addFriend);
    app.post('/api/sendrequest',ControllerMessage.sendRequest);
    app.post('/api/get_mensajes', ControllerMessage.getMensajes);
    app.post('/api/get_requests', ControllerMessage.getRequests);
    app.post('/api/show_message', ControllerMessage.showMensaje);
    app.post('/api/read_message', ControllerMessage.readMessage);
    app.post('/api/refuse_friend', ControllerMessage.refuseFriend);
};