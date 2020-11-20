const express = require('express');
const app = express();
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
const CORS=require('cors');
var port = process.argv[2];
var path = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(CORS());
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('mysql', mysql);
app.set('view engine', 'handlebars');

app.set('port', 1234);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log(
    `Express started on http://${process.env.HOSTNAME}:${app.get(
      'port'
    )}; press Ctrl-C to terminate.`
  );
});
