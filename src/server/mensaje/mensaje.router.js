var ControllerMessage = require ('./mensaje.controller');

module.exports = function(app) {
    app.post('/api/send_message', ControllerMessage.sendMessage);
};