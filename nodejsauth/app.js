var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql = require('mysql');
var bodyParser=require("body-parser");

var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'etgcoin'
            });
 
//connection.connect();
connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });
 
global.db = connection;

// var session = require('express-session');
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000 }
// }))


 
// all environments
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',routes.index);
app.get('/login', routes.index);
app.get('/signup',user.signup);
//call for signup page
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);
app.get('/home/logout',user.login);
//call for signup post

// Middleware
//app.listen(8080)
app.listen(3000, function () {
console.log("Express server listening on port 3000");
});