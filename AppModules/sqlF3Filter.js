var qProfileSkill = `(SELECT Users.userID, Skill.skillName, User_Skill.yearsExperience FROM expertfinderdb.Users
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID
						INNER JOIN User_Skill ON Users.UserID=User_Skill.userID
						INNER JOIN Skill ON User_Skill.skillID=Skill.skillID);`

var qProfileCourse = `(SELECT Users.userID, Course.courseName, CourseTerms.courseSeason, CourseTerms.courseYear
						FROM expertfinderdb.Users
						INNER JOIN User_Course ON Users.UserID=User_Course.userID
						INNER JOIN Course ON User_Course.courseID=Course.courseID
						INNER JOIN CourseTerms ON User_Course.courseTermID=CourseTerms.courseTermID);`

var qProfileIndustry = `(SELECT Users.userID, Industry.industryName, User_Industry.yearsExperience
						FROM expertfinderdb.Users
						INNER JOIN User_Industry ON Users.UserID=User_Industry.userID
						INNER JOIN Industry ON User_Industry.industryID=Industry.industryID);`

var qCombined = `(SELECT Users.userID AS id, Skill.skillName AS title, User_Skill.yearsExperience AS exp, NULL AS season FROM expertfinderdb.Users
					LEFT JOIN UserProfile ON Users.userID=UserProfile.userID
					INNER JOIN User_Skill ON Users.UserID=User_Skill.userID
					INNER JOIN Skill ON User_Skill.skillID=Skill.skillID
					UNION
					SELECT Users.userID, Course.courseName, CourseTerms.courseYear, CourseTerms.courseSeason
					FROM expertfinderdb.Users
					INNER JOIN User_Course ON Users.UserID=User_Course.userID
					INNER JOIN Course ON User_Course.courseID=Course.courseID
					INNER JOIN CourseTerms ON User_Course.courseTermID=CourseTerms.courseTermID
					UNION
					SELECT Users.userID, Industry.industryName, User_Industry.yearsExperience, NULL AS Col4
					FROM expertfinderdb.Users
					INNER JOIN User_Industry ON Users.UserID=User_Industry.userID
					INNER JOIN Industry ON User_Industry.industryID=Industry.industryID);`

// Export queries for use in route
module.exports.qProfileSkill = qProfileSkill;
module.exports.qProfileCourse = qProfileCourse;
module.exports.qProfileIndustry = qProfileIndustry;

module.exports.qCombined = qCombined;