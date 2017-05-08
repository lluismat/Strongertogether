var hospitalsController = require('./hospitals.controller');

module.exports = function(app){
  app.get('/api/hospitals', hospitalsController.getHospitals);
};
