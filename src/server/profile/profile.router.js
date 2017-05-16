var ControllerProfile = require ('./profile.controller');

module.exports = function(app) {
    app.post('/api/profile', ControllerProfile.getProfile);
    app.post('/api/save_profile', ControllerProfile.saveProfile);
    app.post('/api/save_account', ControllerProfile.saveAccount);
    app.post('/api/get_mensajes', ControllerProfile.getMensajes);
    app.post('/api/show_message', ControllerProfile.showMensaje);
    app.post('/api/read_message', ControllerProfile.readMessage);
};