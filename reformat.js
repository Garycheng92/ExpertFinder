
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