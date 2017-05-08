var passport = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var modelUsers = require ('../users/users.model');
var bcrypt = require('bcrypt-nodejs');

//Local
module.exports.signup = signup;
module.exports.login = login;
module.exports.verify = verify;
module.exports.changePass = changePass;
module.exports.recoveryPass = recoveryPass;

function signup(req, res, next) {

  passport.authenticate('local-signup', function(err, user, info) {
    console.log(err,user,info);
    if (err) {
      return res.send('err');
    }
    if (!user) {
      return res.send('signuperror');
    }
    emailVerification(user);
    return res.send(true);
  })(req, res, next);
}

function login(req, res, next) {

  passport.authenticate('local-login', function(err, user, info) {
    console.log(err,user,info);
    if (err) {
      return res.send('err');
    }
    if (!user) {
      return res.send('loginerror');
    }
    return res.send(user);
  })(req, res, next);
}

function verify(req, res) {
    modelUsers.verify(req.body.token.id, function(error, rows) {
        if (error) {
            return res.send('err');
        } else {
            console.log(rows);
            return res.send(rows);
        }
    });

}

function changePass(req, res) {
    var id = req.body.id.id;
    var pass = bcrypt.hashSync(req.body.pass, null, null);
    modelUsers.changePass(id,pass,function(error, rows) {
        if (error) {
            return res.send('err');
        } else {
            return res.send(rows);
        }
    });

}

function emailVerification(user){

    url = "http://localhost:3000/verify?id="+user.token;
    var email = {
        from: 'Strongertogetherdaw@gmail.com',
        to: user.email,
        subject: 'Verificación de la cuenta de Strongertogether',
        html: 'Por favor, para verificar la cuenta, haz click el siguiente link: <a href="'+ url+'">Verificar Cuenta</a>'
    };

    //Input APIKEY Sendgrid
    var options = {
        auth: {
            api_key: process.env.SECRET_KEY
        }
    };
    var mailer = nodemailer.createTransport(sgTransport(options));

    mailer.sendMail(email, function(error, info) {});
}

function recoveryPass(req,res){

    modelUsers.getEmail(req.body.email, function(error, rows) {
        if (error) {
            return res.send('err');
        } else {
            url = "http://localhost:3000/recovery?id="+rows[0].token;
            var email = {
                from: 'Strongertogetherdaw@gmail.com',
                to: req.body.email,
                subject: 'Restauración de la contraseña de Strongertogether',
                html: 'Por favor, para cambiar la contraseña, haz click el siguiente link: <a href="'+ url+'">Cambiar Contraseña</a>'
            };

            //Input APIKEY Sendgrid
            var options = {
                auth: {
                    api_key: process.env.SECRET_KEY
                }
            };
            var mailer = nodemailer.createTransport(sgTransport(options));

            mailer.sendMail(email, function(error, info) {});

            return res.send(rows[0]);
        }
    });

}
