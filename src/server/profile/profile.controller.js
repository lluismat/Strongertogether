var profile = require('./profile.model.js');

exports.getProfile = function(req, res) {

    profile.getProfile(req.body.user, function(err, user) {
            if (err) {
                return res.send(err);
            }else{
                return res.send(user);
            }

        });
};

exports.saveProfile = function(req, res) {

    profile.saveProfile(req.body.user, function(err, user) {
        if (err) {
            return res.send(err);
        }else{
            return res.send(user);
        }

    });
};

exports.saveAccount = function(req, res) {
    
    profile.saveAccount(req.body, function(err, user) {
        if (err) {
            return res.send(false);
        }else{
            return res.send(user);
        }
    });
};

