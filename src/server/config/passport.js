
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var mysql = require ('./database');
var bcrypt = require('bcrypt-nodejs');
var modelUsers = require ('../users/users.model');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta

// expose this function to our app using module.exports
module.exports = function() {

  passport.serializeUser(function(username, done) {
    done(null, username);
  });

  passport.deserializeUser(function(username, done) {
    done(null, username);
  });

  //process.env.SECRET_KEY
  passport.use(new FacebookStrategy({
    clientID: process.env.ID_FACEBOOK,
    clientSecret: process.env.SECRET_FACEBOOK,
    callbackURL: process.env.CALLBACK_FACEBOOK,
    profileFields: ['name', 'email', 'locale', 'timezone'],
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {

    modelUsers.countUser(profile.name.givenName, function(rows) {
      if (rows[0].userCount === 0) {
        console.log('NO EXISTE CREO NEW USER');

        var newUser = {
          name: profile._json.first_name,
          surname: profile._json.last_name,
          username: profile.name.givenName,
          email: profile._json.email,
          avatar: 'default_user.png',
          tipo: 'usuario',
          password: '',
          activo: '1'
        };
        modelUsers.insertUser(newUser, function(rows) {
          if (rows) {
            return done(null, newUser);
          }
        });
      } else {
        console.log('si existe y devuelvo datos');
        modelUsers.getUser(profile.name.givenName, function(error, rows) {
          if (!rows.length) {

            return done(null, false, 'nouser');

          } else {
            console.log(rows[0]);
            return done(null, rows[0]);
          }
        });
      } //fin del else
    }); //fin de count

  }));

  passport.use(new TwitterStrategy({
    consumerKey: process.env.ID_TWITTER,
    consumerSecret: process.env.SECRET_TWITTER,
    callbackURL: process.env.CALLBACK_TWITTER,
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    modelUsers.countUser(profile.username, function(rows) {
      if (rows[0].userCount === 0) {

        console.log('no existe usuario');
        var newUser = {
          name: profile.name,
          surname: profile.surname,
          username: profile.username,
          avatar: 'default_user.png',
          tipo: 'usuario',
          password: '',
          activo: '1'
        };

        modelUsers.insertUser(newUser, function(rows) {
          if (rows) {
            return done(null, newUser);
          }
        }); //fin de consulta
        //return done(null, rows);
      } else {
        console.log('ya existe');
        modelUsers.getUser(profile.username, function(error, rows) {
          if (!rows.length) {

            return done(null, false, 'nouser');

          } else {

            return done(null, rows[0]);
          }
        });

      } //fin del else
    });
  }
));
  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },

  function(req, username, pass, done) {

    var password = bcrypt.hashSync(pass, null, null);
    var token = Math.floor((Math.random() * 800000) + 1551) + username;

    return modelUsers.signup(username,req.body.email, password, req.body.avatar, req.body.tipo, token,0, done);

  }));
  ///LOCAL LOGIN
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },

  function(req, user, pass, done) { // callback with email and password from our form

    return modelUsers.login(user, pass, done);

  }));

};
