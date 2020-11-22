const express = require('express');
const app = express();
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
const CORS=require('cors');
var path = require('path');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.use(bodyParser.urlencoded({extended:false}));
app.use(CORS());
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('mysql', mysql);
app.set('view engine', 'handlebars');
app.set('port',1234);

const filterQuery=require('./sqlF2Filter')
const reformatData=require('./reformat')

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name']);

    if (!profile)
      return res.status(400).json({msg: 'Profile not Found'});

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({msg: 'Profile not Found'})
    }
    res.status(500).send('Server Error');
  }
});


//render activities schedule page, prepopulate dropdowns
app.get('/Feature2', function(req, res)
{
	q=filterQuery.pf
	mysql.pool.query(q,function (error, results)
	{
		if(error)
		{
			res.render('404');
		}
		else
		{
			data=reformatData.reformatSQL1(results)
			res.render('Feature2',{data:obj});
		}
	});
});


//render expert data and prepopulate dropdowns.
app.get('/Feature2_expertlist', function(req, res)
{
	q=filterQuery.pf
	q2=filterQuery.s
	search=[req.query.skillset]
	mysql.pool.query(q,function (error, results)
	{
		if(error)
		{
			res.render('404');
		}
		else
		{
			data=reformatData.reformatSQL1(results)
			mysql.pool.query(q2,search,function (error, results2)
			{
				if(error)
				{
					res.render('404');
				}
				else
				{	temp=[]
					for(const i in results2)
					{
						var newResults=results[i]
						temp.push(newResults)
					}
					data.experts=temp
					res.render('Feature2_expertlist',{data:obj});
				}
			});
		}
	});
});


//render expert data and prepopulate dropdowns.
app.get('/Feature2_no_results', function(req, res)
{
	q=filterQuery.pf
	mysql.pool.query(q,function (error, results)
	{
		if(error)
		{
			res.render('404');
		}
		else
		{
			data=reformatData.reformatSQL1(results)
			data.errorMsg="Error! No results were found. Try again using the filters to narrow down your search."
			res.render('Feature2_no_results',{data:obj});
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
