const express = require('express');
const app = express();
const CORS=require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const env = require('dotenv').config();
const filterQuery=require('./sqlF2Filter')
const reformatData=require('./reformat')

var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({extended:false}));
app.use(CORS());
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('mysql', mysql);
app.set('view engine', 'handlebars');
app.set('port',1234);

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
