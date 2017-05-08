var email = require('./contact.controller');

module.exports = function(app) {
    app.post('/api/sendmail', email.sendmail);
  };
