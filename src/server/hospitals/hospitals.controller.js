var hospitals = require('./hospitals.model');

exports.getHospitals = function(req, res){
  hospitals.getHospitals(
    function (err, hospitals) {
      if(err){
        res.send(err);
      }
      res.json(hospitals);
    });
};
