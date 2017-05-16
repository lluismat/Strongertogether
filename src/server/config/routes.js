'use strict';

module.exports.init = init;

function init(app) {
  require('../contact/contact.router.js')(app);
  require('../hospitals/hospitals.router.js')(app);
  require('../users/users.router.js')(app);
  require('../profile/profile.router.js')(app);
  require('../foro/foro.router.js')(app);
  require('../mensaje/mensaje.router.js')(app);

}
