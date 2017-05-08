var mysql = require ('../config/database');
var bcrypt = require('bcrypt-nodejs');

var modelUsers = {};

modelUsers.signup = function(username, email, pass1, avatar, tipo, token, activo, done) {

  if (mysql.connection) {
    mysql.connection.query('select * from users where username = "' + username + '" or email = "' + email + '"',function(err, rows) {

        if (err) {
          return done(err);
        }
        if (rows.length) {
          return done(null, false, 'El usuario ya existe');
        }else {
          //create the user
          var newUserMysql = {};

            newUserMysql.username = username;
            newUserMysql.email = email;
            newUserMysql.password = pass1;
            newUserMysql.tipo = tipo;
            newUserMysql.activo = activo;
            newUserMysql.avatar = avatar;
            newUserMysql.token = token;

            var insertQuery = 'INSERT INTO users (username, email, password, avatar, tipo, activo, token) values ("' + username + '","' + email + '","' + pass1 + '","' + avatar + '","' + tipo + '","' + activo + '","' + token + '")';
          //console.log("insertQuery"+ insertQuery);
             mysql.connection.query(insertQuery,function(err,rows) {
            newUserMysql.id = rows.insertId;
            console.log(newUserMysql);
            return done(null, newUserMysql, true);
          });
        }
     });
  }
};

//local login

modelUsers.getUser = function (id, callback) {
    if (mysql.connection) {
      mysql.connection.query("SELECT * FROM users WHERE username like '" + id + "'",
        function (error, row) {
            if (error) {
              throw error;
            } else {
              callback(null, row);
            }
          });
    }
  };

modelUsers.getEmail = function (id, callback) {
    if (mysql.connection) {
        mysql.connection.query("SELECT * FROM users WHERE email like '" + id + "'",
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    var token = Math.floor((Math.random() * 800000) + 1551) + row[0].username;
                    var sql = 'UPDATE users set token = "' + token + '" where username ="' + row[0].username + '"';
                    mysql.connection.query(sql, function(error, user) {
                        if(error){
                            throw error;
                        }else{
                            row[0].token = token;
                            callback(null, row);
                        }
                    });
                    //callback(null, row);
                }
            });
    }
};

modelUsers.verify = function (id, callback) {
    if (mysql.connection) {
        mysql.connection.query("SELECT * FROM users WHERE token like '" + id + "'",
            function (error, row) {
                if (error) {
                    throw error;
                } else if(row[0] != null){
                    var sql = 'UPDATE users set token = "' +"Autentificado"+'",activo = "'+ 1 +'" where username ="' + row[0].username + '"';
                    mysql.connection.query(sql, function(error, user) {
                        if(error){
                            throw error;
                        }else{
                            callback(null, row[0]);
                        }
                    });
                }else{
                    callback(null, row);
                }
            });
    }
};

modelUsers.changePass = function (id, pass, callback) {
    if (mysql.connection) {
        mysql.connection.query("SELECT * FROM users WHERE token like '" + id + "'",
            function (error, row) {
                if (error) {
                    throw error;
                } else if(row[0] != null){
                    var sql = 'UPDATE users set password = "' + pass + '", token = "' +"Autentificado"+'" where token ="' + id + '"';
                    mysql.connection.query(sql, function (error, row) {
                        if (error) {
                            throw error;
                        } else{
                            console.log(row);
                            callback(null, row);
                        }
                    });
                }else{
                    callback(null, row);
                }
            });
    }
};

modelUsers.login = function(user, pass, done) {
    console.log('login model');
    if (mysql.connection) {
      mysql.connection.query('select * from users where activo = "' + 1 + '" and username = "' + user + '" or email = "' + user + '"',function(err, rows) {

        if (err) {
          return done(err);
        }

        // if no user is found, return the message
        if (!rows.length) {
          console.log('usuario no encontrado');
          return done(null, false, 'Usuario no encontrado');
        }

        if (!bcrypt.compareSync(pass, rows[0].password)) {
          return done(null, false, 'El password utilizado no es valido');

          // all is well, return user
        }else {
          return done(null, rows[0], 'Welcom again to Strongertogether');
        }
      });
    }
  };

modelUsers.countUser = function (id, callback) {

    if (mysql.connection) {
      mysql.connection.query("SELECT COUNT(*) AS userCount FROM users WHERE username like '" + id + "'",
        function (error, rows) {
            if (error) {
              throw error;
            } else {
              callback(rows);
            }
          });
    }
  };

modelUsers.insertUser = function (userData, callback) {

    if (mysql.connection) {
      mysql.connection.query('INSERT INTO users SET ?', userData, function (err, result) {
            if (err) {
              throw err;
            } else {
              callback(result);
            }
          });
    }
  };

module.exports = modelUsers;
