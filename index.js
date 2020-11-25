const express = require('express');
const app = express();
const CORS=require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const env = require('dotenv').config();

var mysql = require('./AppModules/dbcon.js');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'AppModules')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(CORS());
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('mysql', mysql);
app.set('view engine', 'handlebars');
app.set('port',1234);

const filterQuery=require('./AppModules/sqlF2Filter');
const reformatData=require('./AppModules/reformat');
const filterLogic=require('./AppModules/getFilterQuery');
const search_expert=require('./AppModules/Search');
const expert=require('./AppModules/Expert');

//for testing purpose only...should link to handlebar
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//for testing purpose only...should  link to handlebar
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//for testing purpose only...should link to handlebar
app.get('/Feature3.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/Feature3.html'));
});

//for testing purpose only... should link to handlebar
app.get('/Feature5.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/Feature5.html'));
  console.log("This is the form that shows")
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


//renders intial search for expert page.
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
			res.render('Feature2',{data});
		}
	});
});


//render activities schedule page, prepopulate dropdowns.
app.get('/Feature2_expertlist', function(req, res)
{
	q=filterQuery.pf
	q_object=filterLogic.getFilterQuery(req.query)
	

	console.log(q_object)
	console.log(req.query)
	
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
			data.search=req.query
			mysql.pool.query(q_object.queryString,q_object.searchParams,function (error, results2) 
			{
				if(error)
				{
					console.log(error)
					res.render('404');
				}
				else if (!results2.length)
				{
					console.log(results2)
					res.render('Feature2_no_results',{data});
				}
				else
				{	let expertList=[]
					for(const i in results2)
					{
						var newResults=results2[i]
						var exp=new expert.Expert(newResults.fName,newResults.lName,newResults.profileTitle,newResults.profileBio,newResults.profileImage)
						expertList.push({newExp:exp})
					}
				
					data.experts=expertList
					console.log(data)
					res.render('Feature2_expertlist',{data});
				}
			});
		}

	});
});


//render activities schedule page, prepopulate dropdowns.
app.get('/Feature2_no_results', function(req, res)
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
			res.render('Feature2_no_results',{data});
		}
	});
});

app.post('/Feature5.html', (req, res) => {
  "use strict";

// async..await is not allowed in global scope, must use a wrapper
async function main() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // true for 465, false for other ports
    auth: {
      user: 'expertFinder123123@gmail.com', // generated ethereal user
      pass: '123456789!@#' // generated ethereal password
    }
  });

  //*******login to gmail account.
  //       go to account
  //       turn ON Less secure app access
  //       after this when you try to send mail from your app you will get error .
  //       than go to Security issues found ( it's first option in security tab of google account )
  //****** here you need to verify that last activities is verified and its you .
   
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'expertFinder123123@gmail.com', // sender address 
    to: `${req.body.email}`, // email based on user input 
    subject: "Verify your expertFinder registration", // Subject line
    html: `<h1> Welcome to expertFinder!<h1>
    	   <p>You are receiving this email because it was used to sign up for expertFinder.</p>	
	       <p>Signed Up As: ${req.body.signup}<br>
	          First Name: ${req.body.firstname}<br>
     		  Last Name: ${req.body.lastname}<br>
       		  Gender: ${req.body.gender}<br>
       		  Phone: ${req.body.phone}<br>
	          Email: ${req.body.email}<br>
       		  Tech Skillset: ${req.body.techskillset}<br>
       		  Past Courses: ${req.body.pastcourses}<br>
       		  Industry/Organization: ${req.body.industry}<br>
	          Github: ${req.body.github}<br>
                  Twitter: ${req.body.twitter}<br>
                  LinkedIn: ${req.body.LinkedIn}</p>
                  <!--better way to link??-->
		  <p><a href="http://flip1.engr.oregonstate.edu:1234/Feature3.html">Click here to activate your account</a></p>`
  });

  console.log("Email sent successfully!");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);  

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
