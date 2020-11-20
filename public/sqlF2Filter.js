//Filter queries by filter values -> returns user info

var qFilterResults= 'SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage '

var qUserProfile= 'FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID '

var qFilterIndustry = 'INNER JOIN User_Industry ON Users.userID=User_Industry.userID INNER JOIN Industry ON User_Industry.industryID=Industry.industryID '
					   
var qFilterSkill = 'INNER JOIN User_Skill ON Users.userID=User_Skill.userID INNER JOIN Skill ON User_Skill.skillID=Skill.skillID '

var qFilterCourse = 'INNER JOIN User_Course ON Users.userID=User_Course.userID INNER JOIN Course ON User_Course.courseID=Course.courseID '

var qbySkillCourseIndustry = qFilterResults + qUserProfile + qFilterIndustry + qFilterSkill+ qFilterCourse + 'WHERE Course.courseName=? AND Industry.industryName=? AND Skill.skillName=?'
	
var qbyCourseIndustry = qFilterResults + qUserProfile + qFilterIndustry + qFilterCourse+ 'WHERE Course.courseName=? AND Industry.industryName=?'

var qbySkillIndustry = qFilterResults + qUserProfile + qFilterIndustry + qFilterSkill + 'WHERE Skill.skillName=? AND Industry.industryName=?'

var qbySkillCourse = qFilterResults + qUserProfile + qFilterCourse + qFilterSkill + 'WHERE Course.courseName=? AND Skill.skillName=?'

var qbyCourse = qFilterResults + qUserProfile + qFilterCourse + 'WHERE Course.courseName=?'

var qbyIndustry = qFilterResults + qUserProfile + qFilterIndustry + 'WHERE Industry.industryName=?'
				  
var qbySkill = qFilterResults + qUserProfile + qFilterIndustry + ' WHERE Skill.skillName=?'
			  
var qbyNoFilter = qFilterResults + qUserProfile
				   
var qPopulateFilter=`SELECT courseName,'course' FROM Course UNION SELECT industryName,'industry' FROM Industry UNION SELECT skillName,'skill' From Skill`