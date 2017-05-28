/*jshint node:true*/
'use strict';
require('dotenv').load();
var express = require('express');
var session  = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors'); //cal per a signin fb
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var cookieParser = require('cookie-parser');
var multer = require('multer');

var environment = process.env.NODE_ENV;
app.use(cookieParser());

app.use(favicon(__dirname + '/favicon.png'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());

// required for passport
require('./config/passport.js')(passport);

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'strongertogether',
	cookie: { secure: false }
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(cors());                 //cal per a signin fb

require('./config/routes.js').init(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function(req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});


////////////////////UPLOAD/////////////////////////

var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function (req, file, cb) {
        if(req.body.type =='avatar'){
            cb(null, './src/server/uploads/avatars');
        }else{
            cb(null, './src/server/uploads/images');
        }

    },
    filename: function (req, file, cb) {
        if(req.body.type =='avatar'){
            cb(null, req.body.user + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }else{
            cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }

    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:null,'path':req.file.destination+'/', 'filename':req.file.filename});
    });
});
////////////////FIN UPLOAD////////////////////