var usersController = require('./users.controller.js');
var passport = require('passport');

module.exports = function(app){
    //local
    app.post('/api/signup', usersController.signup);
    app.post('/api/login', usersController.login);
    app.post('/api/verify', usersController.verify);
    app.post('/api/recovery', usersController.recoveryPass);
    app.post('/api/changepass', usersController.changePass);

    //facebook
    app.get('/auth/facebook', passport.authenticate('facebook',{
        scope: 'email'}));

     app.get('/auth/facebook/callback', passport.authenticate('facebook',
     { successRedirect: '/socialLogin', failureRedirect: '/' }));

    //twitter
    app.get('/auth/twitter', passport.authenticate('twitter'));

     app.get('/auth/twitter/callback',passport.authenticate('twitter',
     { successRedirect: '/socialLogin', failureRedirect: '/' }),
    function(req, res) {
    res.redirect('/');
    });

    //retorno del cliente para recoger los datos
    app.get('/auth/success', function(req, res) {res.json(req.user);});
};
