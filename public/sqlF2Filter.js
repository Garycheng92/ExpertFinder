//Filter queries by filter values -> returns user info

var qbySkillCourseIndustry = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
							  LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
							  INNER JOIN User_Industry ON Users.userID=User_Industry.userID 
							  INNER JOIN Industry ON User_Industry.industryID=Industry.industryID
							  INNER JOIN User_Course ON Users.userID=User_Course.userID 
							  INNER JOIN Course ON User_Course.courseID=Course.courseID
							  INNER JOIN User_Skill ON Users.userID=User_Skill.userID 
							  INNER JOIN Skill ON User_Skill.skillID=Skill.skillID
							  WHERE Course.courseName=? AND Industry.industryName=? AND Skill.skillName=?`

var qbyCourseIndustry = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						 LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						 INNER JOIN User_Industry ON Users.userID=User_Industry.userID 
						 INNER JOIN Industry ON User_Industry.industryID=Industry.industryID
						 INNER JOIN User_Course ON Users.userID=User_Course.userID 
						 INNER JOIN Course ON User_Course.courseID=Course.courseID
						 WHERE Course.courseName=? AND Industry.industryName=?`

var qbySkillIndustry = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
						INNER JOIN User_Industry ON Users.userID=User_Industry.userID 
						INNER JOIN Industry ON User_Industry.industryID=Industry.industryID
						INNER JOIN User_Skill ON Users.userID=User_Skill.userID 
						INNER JOIN Skill ON User_Skill.skillID=Skill.skillID
						WHERE Skill.skillName=? AND Industry.industryName=?`

var qbySkillCourse = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
					  LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
					  INNER JOIN User_Course ON Users.userID=User_Course.userID 
					  INNER JOIN Course ON User_Course.courseID=Course.courseID 
					  INNER JOIN User_Skill ON Users.userID=User_Skill.userID 
					  INNER JOIN Skill ON User_Skill.skillID=Skill.skillID
					  WHERE Course.courseName=? AND Skill.skillName=?`

var qbyCourse = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
				 LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
				 INNER JOIN User_Course ON Users.userID=User_Course.userID 
				 INNER JOIN Course ON User_Course.courseID=Course.courseID 
				 WHERE Course.courseName=?`

var qbyIndustry = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users 
				  LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
				  INNER JOIN User_Industry ON Users.userID=User_Industry.userID 
				  INNER JOIN Industry ON User_Industry.industryID=Industry.industryID 
				  WHERE Industry.industryName=?`
				  
var qbySkill = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users LEFT JOIN UserProfile ON Users.userID=UserProfile.userID 
			    INNER JOIN User_Skill ON Users.userID=User_Skill.userID 
			    INNER JOIN Skill ON User_Skill.skillID=Skill.skillID 
			    WHERE Skill.skillName=?`
			  
var qbyNoFilter = `SELECT Users.fName, Users.lName, UserProfile.profileTitle, UserProfile.profileBio, UserProfile.profileImage FROM Users
				   LEFT JOIN UserProfile ON Users.userID=UserProfile.userID`
