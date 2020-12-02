var qProfileSkill = `(SELECT Users.userID, Skill.skillName, User_Skill.yearsExperience FROM expertfinderdb.Users
						LEFT JOIN UserProfile ON Users.userID=UserProfile.userID
						INNER JOIN User_Skill ON Users.UserID=User_Skill.userID
						INNER JOIN Skill ON User_Skill.skillID=Skill.skillID);`

var qProfileCourse = ``

var qProfileIndustry = ``