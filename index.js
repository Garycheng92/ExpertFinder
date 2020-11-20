const express = require('express');
const app = express();
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
const CORS=require('cors');
var port = process.argv[2];
var path = require('path');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(CORS());
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('mysql', mysql);
app.set('view engine', 'handlebars');
app.set('port',1234);

const filterQuery=require('./sqlF2Filter')
const reformatData=require('./reformat')

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});


//render activities schedule page, prepopulate dropdowns
app.get('/Feature2', function(req, res)
{
	q=filterQuery.pf
	mysql.pool.query(q,function (error, results) 
	{
		if(error)
		{
			console.log(results);
			res.render('404');
		}
		else
		{	
			data=reformatData.reformatSQL1(results)
			res.render('Feature2',{data:obj});
		}
	});
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
