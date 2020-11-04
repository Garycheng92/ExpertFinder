var express = require('express');

var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:false }));
app.use(express.json());

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
