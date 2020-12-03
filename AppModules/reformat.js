
//this feature remformats the query for populating the drop downs
module.exports.reformatSQL1=function(data)
{
	obj={}
	skills=[]
	industries=[]
	courses=[]
	for (var i=0; i < data.length; i++)
	{
		var item=data[i];
		if (item.course=='course')
		{
			courses.push(item.courseName)
		}
		else if (item.course =='skill')
		{
			skills.push(item.courseName)
		}
		else
		{
			industries.push(item.courseName)
		}
	}
	obj.skillList=skills
	obj.courseList=courses
	obj.indList=industries
	return obj
}

//this feature remformats the query for populating the drop downs
module.exports.reformatSQLFT1=function(results2)
{
	user={};
	user.Courses=[];
	user.Skills=[];
	user.Industry=[];

	for (var i=0; i<results2.length;i++){
		var info=results2[i];
		if (info.UserInfo=='Courses'){
			var course={}
			course.name=info.userID
			course.season=info.fName
			course.year=info.lName
			user.Courses.push(course)
		}
		else if (info.UserInfo=='Skills'){
			var skill={}
			skill.name=info.userID
			skill.experience=info.fName
			user.Skills.push(skill)

		}
		else if (info.UserInfo=='Industry'){
			var industry={}
			industry.name=info.userID
			industry.experience=info.fName
			user.Industry.push(industry)
		}
		else if (info.UserInfo=='UserInfo'){
			user.userID=(info.userID)
			user.fName=(info.fName)
			user.lName=(info.lName)
		}
		else if (info.UserInfo=='UserContact'){
			user.email=(info.userID)
		}
		else if (info.UserInfo=='UserURL'){
			user.githubURL=(info.userID)
			user.facebookURL=(info.fName)
			user.twitterURL=(info.lName)
		}
		else if (info.UserInfo=='UserProfile'){
			user.img=(info.userID)
			user.profileBio=(info.fName)
			user.profileTitle=(info.lName)
		}
	}
	return user
}