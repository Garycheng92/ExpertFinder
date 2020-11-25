//Filter queries by filter values -> returns user info

var qbySkillCourseIndustry = `SELECT * FROM
									(
									(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
									LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
									INNER JOIN User_Industry ON Users.userID=User_Industry.userID INNER JOIN Industry ON User_Industry.industryID=Industry.industryID 
									WHERE Industry.industryName IN (?) 
									GROUP BY Users.userID
									HAVING COUNT(DISTINCT Industry.industryName)=?)
									UNION ALL
									(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage  FROM Users 
									LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
									INNER JOIN User_Skill ON Users.userID=User_Skill.userID INNER JOIN Skill ON User_Skill.skillID=Skill.skillID 
									WHERE Skill.skillName IN (?)
									GROUP BY Users.userID
									HAVING COUNT(DISTINCT Skill.skillName)=?)
									UNION ALL
									(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
									LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
									INNER JOIN User_Course ON Users.userID=User_Course.userID INNER JOIN Course ON User_Course.courseID=Course.courseID 
									WHERE Course.courseName IN (?) 
									GROUP BY Users.userID
									HAVING COUNT(DISTINCT Course.courseName)=?)
									)skill_course
									GROUP BY userID
									HAVING COUNT(userID)= ?`
									
var qbyCourseIndustry = `SELECT * FROM
						((SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Course ON Users.userID=User_Course.userID INNER JOIN Course ON User_Course.courseID=Course.courseID 
						WHERE Course.courseName IN (?) 
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Course.courseName)=?)
						UNION ALL
						(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage  FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Industry ON Users.userID=User_Industry.userID INNER JOIN Industry ON User_Industry.industryID=Industry.industryID 
						WHERE Industry.industry IN (?)
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Industry.industryName)=?
						))course_industry
						GROUP BY userID
						HAVING COUNT(userID)= ?`

var qbySkillIndustry = `SELECT * FROM
						((SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Skill ON Users.userID=User_Skill.userID INNER JOIN Skill ON User_Skill.skillID=Skill.skillID 
						WHERE Skill.skillName IN (?) 
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Skill.skillName)= ?)
						UNION ALL
						(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage  FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Industry ON Users.userID=User_Industry.userID INNER JOIN Industry ON User_Industry.industryID=Industry.industryID 
						WHERE Industry.industry IN (?)
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Industry.industryName)=?
						))skill_industry
						GROUP BY userID
						HAVING COUNT(userID)= ?`

var qbySkillCourse = `SELECT * FROM
						((SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Course ON Users.userID=User_Course.userID INNER JOIN Course ON User_Course.courseID=Course.courseID 
						WHERE Course.courseName IN (?) 
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Course.courseName)=?)
						UNION ALL
						(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage  FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Skill ON Users.userID=User_Skill.userID INNER JOIN Skill ON User_Skill.skillID=Skill.skillID 
						WHERE Skill.skillName IN (?)
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Skill.skillName)=?
						))skill_course
						GROUP BY userID
						HAVING COUNT(userID)= ?`

var qbyCourse = `(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Course ON Users.userID=User_Course.userID INNER JOIN Course ON User_Course.courseID=Course.courseID 
						WHERE Course.courseName IN (?) 
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Course.courseName)=?)`

var qbyIndustry = `(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Industry ON Users.userID=User_Industry.userID INNER JOIN Industry ON User_Industry.industryID=Industry.industryID 
						WHERE Industry.industryName IN (?) 
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Industry.industryName)=?)`
				  
var qbySkill = `(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage  FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Skill ON Users.userID=User_Skill.userID INNER JOIN Skill ON User_Skill.skillID=Skill.skillID 
						WHERE Skill.skillName IN (?)
						GROUP BY Users.userID
						HAVING COUNT(DISTINCT Skill.skillName)=?)`
			  
var qbyNoFilter = `(SELECT Users.userID, Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage  FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID )`
				   
var qPopulateFilter= `SELECT courseName,'course' FROM Course UNION SELECT industryName,'industry' FROM Industry UNION SELECT skillName,'skill' From Skill`



module.exports.sci = qbySkillCourseIndustry;

module.exports.ci = qbyCourseIndustry;
module.exports.si = qbySkillIndustry;
module.exports.sc = qbySkillCourse

module.exports.i = qbyIndustry

module.exports.c = qbyCourse

module.exports.s = qbySkill

module.exports.nf = qbyNoFilter

module.exports.pf = qPopulateFilter


