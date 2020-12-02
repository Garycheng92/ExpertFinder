var qProfileSkill = `(SELECT Users.userID, Skill.skillName, User_Skill.yearsExperience FROM expertfinderdb.Users
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID
						INNER JOIN User_Skill ON Users.UserID=User_Skill.userID
						INNER JOIN Skill ON User_Skill.skillID=Skill.skillID);`

var qProfileCourse = `(SELECT Users.userID, Course.courseName, CourseTerms.courseSeason, CourseTerms.courseYear
						FROM expertfinderdb.Users
						INNER JOIN User_Course ON Users.UserID=User_Course.userID
						INNER JOIN Course ON User_Course.courseID=Course.courseID
						INNER JOIN CourseTerms ON User_Course.courseTermID=CourseTerms.courseTermID);`

var qProfileIndustry = ``