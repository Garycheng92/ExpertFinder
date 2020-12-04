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
app.set('port',4212);

const fs=require('fs')
const filterQuery=require('./AppModules/sqlF2Filter')
const F3Query=require('./AppModules/sqlF3Filter')
const reformatData=require('./AppModules/reformat')
const filterLogic=require('./AppModules/getFilterQuery')
const search_expert=require('./AppModules/Search')
const expert=require('./AppModules/Expert')

app.get('/', (req, res) => {
  res.render('index',{});
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/home',(req,res)=>{
	res.render('home');
});

app.get('/Feature5_Registration_Page.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/Feature5_Registration_Page.html'));
  console.log("This is the form that shows");
});


app.get('/Feature5_Registration_Page_NewUser.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/Feature5_Registration_Page_NewUser.html'));
  console.log("This is the form that shows");
});

//DELETE skill from POST REQUEST
app.post('/Feature1_delete_skill', (req, res) => {
	q='DELETE FROM User_Skill WHERE userID=? And skillID=(SELECT skillID FROM Skill WHERE skillName=?)'
	console.log('in post delete ' + JSON.stringify(req.body))

	var deleteParams=[req.body.userID, req.body.skillName]
	mysql.pool.query(q,deleteParams,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			console.log('delete succssful')
			res.redirect('Feature1');
		}
	});
});

//DELETE course from POST REQUEST
app.post('/Feature1_delete_course', (req, res) => {
	q='DELETE FROM User_Course WHERE userID=? And userID=(SELECT userID FROM Course WHERE courseName=?)'
	console.log('in post delete ' + JSON.stringify(req.body))

	var deleteParams=[req.body.userID, req.body.courseName]
	mysql.pool.query(q,deleteParams,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			console.log('delete succssful')
			res.redirect('Feature1');
		}
	});
});

//DELETE organization from POST REQUEST
app.post('/Feature1_delete_org', (req, res) => {
	q='DELETE FROM User_Industry WHERE userID=? And userID=(SELECT userID FROM Industry WHERE industryName=?)'
	console.log('in post delete ' + JSON.stringify(req.body))

	var deleteParams=[req.body.userID, req.body.industryName]
	mysql.pool.query(q,deleteParams,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			console.log('delete succssful')
			res.redirect('Feature1');
		}
	});
});


//POST REQUEST TO ADD TO DATABASE - COMES FROM THE FORM WITH ACTION 'Feature1_add_skill'
//Adds Skill to skill table if doesn't exists then assigns skill ID to user
app.post('/Feature1_add_skill', (req, res) => {
	q1='INSERT INTO Skill (skillName) SELECT ? WHERE NOT EXISTS(SELECT skillID FROM Skill WHERE skillName=?)'
	q2='INSERT INTO User_Skill (userID, skillID, yearsExperience) VALUES(?,(SELECT skillID FROM Skill WHERE skillName=?),?)';

	//req.body.skill comes from the form in the Feature1.handlebars where the name=skill. req.body.skill appears twice in insert params so the data replaces the two question marks
	var insertParams1=[req.body.skill,req.body.skill]
	var insertParams2=[req.body.userID,req.body.skill,req.body.experience]
	//nested sql statements for two queries
	//query one. add skill to Skill table if doesn't exists
	mysql.pool.query(q1,insertParams1,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			//query two. assign skill to user in User_Skill table- async so two queries need to be nested
			mysql.pool.query(q2,insertParams2,function (error){
				if(error){
					console.log(error)
					res.render('404')}
				else
				{
					//redirect to Feature1 get request to reload  the data
					res.redirect('Feature1');
					//Note- for your feature you will be using redirect and not render
				}
			});
		}
	});
});


//POST REQUEST TO ADD TO DATABASE - COMES FROM THE FORM WITH ACTION 'Feature1_add_course'
//Adds Course to course table if doesn't exists then assigns course ID to user
app.post('/Feature1_add_course', (req, res) => {
	q1='INSERT INTO Course (courseName) SELECT ? WHERE NOT EXISTS(SELECT courseID FROM Course WHERE courseName=?)'
	q2='INSERT INTO User_Course (userID, courseID, courseSeason, courseYear) VALUES(?,(SELECT courseID FROM Course WHERE courseName=?),?)';

	//req.body.course comes from the form in the Feature1.handlebars where the name=course. 
	//req.body.course appears twice in insert params so the data replaces the two question marks
	var insertParams1=[req.body.course,req.body.course]
	var insertParams2=[req.body.userID,req.body.course,req.body.season,req.body.year]
	//nested sql statements for two queries
	//query one. add course to Course table if doesn't exists
	mysql.pool.query(q1,insertParams1,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			//query two. assign course to user in User_Course table- async so two queries need to be nested
			mysql.pool.query(q2,insertParams2,function (error){
				if(error){
					console.log(error)
					res.render('404')}
				else
				{
					//redirect to Feature1 get request to reload  the data
					res.redirect('Feature1');
					//Note- for your feature you will be using redirect and not render
				}
			});
		}
	});
});


//POST REQUEST TO ADD TO DATABASE - COMES FROM THE FORM WITH ACTION 'Feature1_add_org'
//Adds Organization to industry table if doesn't exists then assigns industry ID to user
app.post('/Feature1_add_org', (req, res) => {
	q1='INSERT INTO Industry (industryName) SELECT ? WHERE NOT EXISTS(SELECT industryID FROM Industry WHERE industryName=?)'
	q2='INSERT INTO User_Industry (userID, industryID, yearsExperience) VALUES(?,(SELECT industryID FROM Industry WHERE industryName=?),?)';

	//req.body.organization comes from the form in the Feature1.handlebars where the name=organization. 
	//req.body.organization appears twice in insert params so the data replaces the two question marks
	var insertParams1=[req.body.organization,req.body.organization]
	var insertParams2=[req.body.userID,req.body.organization,req.body.duration]
	//nested sql statements for two queries
	//query one. add organization to Industry table if doesn't exists
	mysql.pool.query(q1,insertParams1,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			//query two. assign organization to user in User_Industry table- async so two queries need to be nested
			mysql.pool.query(q2,insertParams2,function (error){
				if(error){
					console.log(error)
					res.render('404')}
				else
				{
					//redirect to Feature1 get request to reload  the data
					res.redirect('Feature1');
					//Note- for your feature you will be using redirect and not render
				}
			});
		}
	});
});

//POST REQUEST TO UPDATE THE USER CONTACT INFO
app.post('/Feature1_edit_contact', (req, res) => {
	q='UPDATE Users SET email=?,githubURL=?, facebookURL=?, twitterURL=? WHERE userID=?'
	console.log('rquest body: ' + JSON.stringify(req.body))
	var updateParams=[req.body.email,req.body.githubURL,req.body.facebookURL,req.body.twitterURL, req.body.userID]
	//nested sql statements for two queries
	mysql.pool.query(q,updateParams,function (error){
		if(error){
			console.log(error)
			res.render('404')}
		else
		{
			console.log('data updated')
			res.redirect('Feature1');
		}
	});
});


//LOADS DATA TO FEATURE ONE AND POPULATES PAGE
app.get('/Feature1', function(req, res){
q=`SELECT 'UserInfo',Users.userID, Users.fName, Users.lName
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'UserContact',Users.email, '', ''
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'UserURL',Users.githubURL, Users.facebookURL, Users.twitterURL
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'UserProfile', UserProfile.profileImage, UserProfile.profileBio, UserProfile.profileTitle
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'Courses',Course.courseName, CourseTerms.courseSeason, CourseTerms.courseYear FROM Users
LEFT JOIN User_Course ON Users.userID=User_Course.userID
LEFT JOIN Course ON User_Course.courseID=Course.courseID
LEFT JOIN CourseTerms ON User_Course.CourseTermID=CourseTerms.CourseTermID
WHERE Users.userID=?
UNION ALL
SELECT 'Skills',Skill.skillName,User_Skill.yearsExperience,'' FROM Users
LEFT JOIN User_Skill ON Users.userID=User_Skill.userID
LEFT JOIN Skill ON User_Skill.skillID=Skill.skillID
WHERE Users.userID=?
UNION ALL 
SELECT 'Industry',Industry.industryName,   User_Industry.yearsExperience,'' FROM Users
LEFT JOIN User_Industry ON Users.userID=User_Industry.userID
LEFT JOIN Industry ON User_Industry.industryID=Industry.industryID
WHERE Users.userID=?`
	fs.readFile('./user.json', 'utf8', function (err, results) {
	if (err){res.render('404')}
	else{
		var readData=JSON.parse(results)
		console.log('reading from file: ' + readData)
		console.log('param data: ' + readData[0].userID)
		var data={};
		var userID=readData[0].userID
		let searchParams=new Array(7).fill(userID);

		console.log(searchParams)
		mysql.pool.query(q,searchParams,function (error, results2)
		{
			if(error)
			{
				res.render('404');
			}
			else
			{
				data=reformatData.reformatSQLFT1(results2)
				res.render('Feature1',{data});
			}
		});
	}
  })
});


//open login page
app.get('/login', (req, res) => {
  res.render('login');
});

//req - inputs from the form in login.handlebars
//res - the result of the query
// '/login' the link that the information was sent to from the form in login ie(http://localhost:4212/login)
app.post('/login', (req, res) => {
	//sql query statement
	q='SELECT userID,fName,lName FROM Users WHERE username=? AND password=?'
	//search params of query. these fill in the data for the question marks
	searchParams=[req.body.username,req.body.pass]
  mysql.pool.query(q,searchParams,function (error, results)
	{
		//if connection error
		if(error){
			res.render('404');
		}
		// if result returns an empty query and nothing was found, render login_error handlebars page
		else if(!results.length){
			res.render('login_error');
		}
		else{
			//WRITING USER DATA to store user data while they are nagivating between pages - will store userID, name and lastname
			fs.writeFile('./user.json', JSON.stringify(results), err =>{
				if (err){res.render('404')}
				else{
					//handlebars template (in views) to send the data
					console.log('writing to file: '+ results)
					data=results;
					console.log(data);
					res.render('home',{data});
				}
			})
			
		}
	});
});



//renders intial search for expert page.
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
			res.render('Feature2',{data});
		}
	});
});

//render error page if no results are found
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
			data.search=req.query;
			res.render('Feature2_no_results',{data});
		}
	});
});



// reads temp file to gather data - USED FOR PAGENATION
app.post('/Feature2_expertlist', function(req,res){
	q_pg=req.body.newPage
	var data={}
	fs.readFile('./temp.json', 'utf8', function (err, results) {
		if (err) {res.render('404');}
		else{
			data = JSON.parse(results);
			// if not given a page number, make q_pg equal to the last selected page in file
			if (q_pg === undefined){
				for (var i=0; i < data.pages.length; i++){
					var npg=data.pages[i];
					if (npg.pageNum.selected){q_pg=npg.pageNum.page}
				}	
			}
			else{
				//change which page is currently selected with request new page
				for (var i=0; i < data.pages.length; i++){
					var npg=data.pages[i];
					if (npg.pageNum.page == q_pg){npg.pageNum.selected=true}
					else if (npg.pageNum.selected && npg.pageNum.page != q_pg){delete npg.pageNum.selected}
				}
			}
			var expertPage=[];
			//modify which experts are displayed
			for (var i=0; i < data.experts.length; i++){
				var Exp=data.experts[i]
				if (Exp.newExp.page==q_pg){expertPage.push(Exp)}
			}
			data.experts=expertPage;
			res.render('Feature2_expertlist', {data})
		}
	})
})


//render activities schedule page, prepopulate dropdowns.
app.get('/Feature2_expertlist', function(req, res){
	q=filterQuery.pf
	q_object=filterLogic.getFilterQuery(req.query)
	console.log('inside feature 2 expertlist get')
	mysql.pool.query(q,function (error, results)
	{
		if(error){res.render('404')}
		else
		{
			data=reformatData.reformatSQL1(results)
			data.search=req.query
			mysql.pool.query(q_object.queryString,q_object.searchParams,function (error, results2)
			{
				if(error)
				{
					res.render('404');
				}
				else if (!results2.length)
				{
					res.render('Feature2_no_results',{data});
				}
				else
				{
					let expertList=[]
					for(const i in results2)
					{
						var newResults=results2[i]
						var exp=new expert.Expert(newResults.userID,newResults.fName,newResults.lName,newResults.profileTitle,newResults.profileBio,newResults.profileImage, newResults.frequency)
						expertList.push({newExp:exp})
					}
					//sort by rank for number of occurences if search bar
					expertList.sort((a,b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0))

					// assign pages: 5 per page
					var numPages=0
					expertPage=[]
					for(var j=0; j < expertList.length; j++)
					{
						if (j % 5 == 0){numPages++}
						var exprt=expertList[j];
						exprt.newExp.setPage(numPages);
						if (numPages==1){expertPage.push({newExp:exprt.newExp})}
					}
					//create object for selected page
					pagenation=[];
					for(var j=0; j < numPages; j++)
					{
						var pg = {}
						pg.page=(j+1)
						if (j==0){pg.selected=true}
						pagenation.push({pageNum:pg});
					}
					data.pages=pagenation;
					data.experts=expertList;
					//save all expert data pulled to file and render page
					fs.writeFile('./temp.json', JSON.stringify(data), err =>{
						if (err){
							res.render('404');
						}
						else{
							data.experts=expertPage;
							res.render('Feature2_expertlist',{data});
						}
					})
				}
			})
		}

	})
})

//LOADS DATA TO FEATURE ONE AND POPULATES PAGE
app.get('/Feature3', function(req, res){
	console.log('req.query: ' + JSON.stringify(req.query))
q=`SELECT 'UserInfo',Users.userID, Users.fName, Users.lName
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'UserContact',Users.email, '', ''
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'UserURL',Users.githubURL, Users.facebookURL, Users.twitterURL
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'UserProfile', UserProfile.profileImage, UserProfile.profileBio, UserProfile.profileTitle
FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
WHERE Users.userID=?
UNION ALL
SELECT 'Courses',Course.courseName, CourseTerms.courseSeason, CourseTerms.courseYear FROM Users
LEFT JOIN User_Course ON Users.userID=User_Course.userID
LEFT JOIN Course ON User_Course.courseID=Course.courseID
LEFT JOIN CourseTerms ON User_Course.CourseTermID=CourseTerms.CourseTermID
WHERE Users.userID=?
UNION ALL
SELECT 'Skills',Skill.skillName,User_Skill.yearsExperience,'' FROM Users
LEFT JOIN User_Skill ON Users.userID=User_Skill.userID
LEFT JOIN Skill ON User_Skill.skillID=Skill.skillID
WHERE Users.userID=?
UNION ALL 
SELECT 'Industry',Industry.industryName,   User_Industry.yearsExperience,'' FROM Users
LEFT JOIN User_Industry ON Users.userID=User_Industry.userID
LEFT JOIN Industry ON User_Industry.industryID=Industry.industryID
WHERE Users.userID=?`
		var data={};
		var userID=req.query.user_id;
		let searchParams=new Array(7).fill(userID);
		mysql.pool.query(q,searchParams,function (error, results2)
		{
			if(error)
			{
				res.render('404');
			}
			else
			{
				data=reformatData.reformatSQLFT1(results2)
				res.render('Feature3',{data});
			}
		});
});

app.post('/Feature5_Registration_Page.html', (req, res) => {
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
  		  Username: ${req.body.username}<br>
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
	          <p><a href="http://flip3.engr.oregonstate.edu:4212/login">Click here to login to your account</a></p>`
  });

  console.log("Email sent successfully!");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

main().catch(console.error);

});


app.post('/Feature5_Registration_Page_NewUser.html', (req, res) => {
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
                  Username: ${req.body.username}<br>
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
	          <p><a href="http://flip3.engr.oregonstate.edu:4212/login">Click here to login to your account</a></p>`
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
