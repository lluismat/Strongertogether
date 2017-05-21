var ControllerProfile = require ('./profile.controller');

module.exports = function(app) {
    app.post('/api/profile', ControllerProfile.getProfile);
    app.post('/api/save_profile', ControllerProfile.saveProfile);
    app.post('/api/save_account', ControllerProfile.saveAccount);
};