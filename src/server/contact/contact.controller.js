var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
//var sg = require('sendgrid')(process.env.SECRET_KEY);

exports.sendmail = function(req,res) {

  switch (req.body.type) {

  case 'user':
    req.body.to = req.body.from;
    var body = '<body>' +
    '<div id="contact-email">' +
    '<div> <h1>Contacto con strongertogether</h1> <h4>Sugerencia: ' + req.body.subject +
    '</h4></div>' +
    '<section>' +
    'Nombre:<p>' + req.body.name + '</p>' +
    'Email: <p>' + req.body.from + '</p>' +
    'Mensaje:<p>' + req.body.text + '</p></section>' +
    '</div>' +
    ' </body>';
  break;

  case 'admin':
    req.body.to = 'strongertogetherdaw@gmail.com';
    body = '<body>' +
    '<div id="contact-email">' +
    '<div> <h1>Contacto con strongertogether</h1> <h4>Sugerencia: ' + req.body.subject +
    '</h4></div>' +
    '<section>' +
    'Nombre:<p>' + req.body.name + '</p>' +
    'Email: <p>' + req.body.from + '</p>' +
    'Mensaje:<p>' + req.body.text + '</p></section>' +
    '</div>' +
    ' </body>';
  break;
}
  var template =
    '<html>' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '<style>' +
        '* {' +
        'margin: 0;' +
        'padding: 0;' +
        'text-align: center;}' +
        'body {' +
        'margin: 0 auto;' +
        'width: 600px;' +
        'height: 300px;}' +
        'header {' +
        'padding: 20 px;' +
        'background-color: blue;' +
        'color: white;' +
        'padding-left: 20px;' +
        'font-size: 25px;}' +
        'section {' +
        'padding-top: 50px;' +
        'padding-left: 50px;' +
        'margin-top: 3px;' +
        'margin-bottom: 3px;' +
        'height: 100px;' +
        'background-color: ghostwhite;}' +
        'footer {' +
        'padding: 5px;' +
        'padding-left: 20px;' +
        'background-color: blue;' +
        'color: white;}' +
    '</style>' +
    '</head>' + body + '</html>';

  var email = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    html: template
  };
  console.log(email);

  //Input APIKEY Sendgrid
  var options = {
    auth: {
      api_key: process.env.SECRET_KEY
    }
  };
  var mailer = nodemailer.createTransport(sgTransport(options));

  mailer.sendMail(email, function(error, info) {
    if (error) {
      res.status('401').json({
        err: info
      });
    } else {
      res.status('200').json({
        success: true
      });
    }
  });
};
