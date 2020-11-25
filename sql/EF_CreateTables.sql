

CREATE TABLE Users (
    userID INT AUTO_INCREMENT, 
    fName VARCHAR(255) NOT NULL,
    lName VARCHAR(255) NOT NULL,
    facebookURL VARCHAR(255),
	githubURL VARCHAR(255),
	twitterURL VARCHAR(255),
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
    PRIMARY KEY (userID)
);



CREATE TABLE UserProfile(
	userID INT,
	profileImage VARCHAR(255),
	profileTitle VARCHAR(255),
	profileBio VARCHAR(255),
	FOREIGN KEY(userID) REFERENCES Users(userID)
);

CREATE TABLE CourseTerms(
	courseTermID INT AUTO_INCREMENT,
	courseSeason VARCHAR(255) NOT NULL,
	courseYear VARCHAR(255) NOT NULL,
	PRIMARY KEY (courseTermID)

);

CREATE TABLE Skill (
    skillID INT AUTO_INCREMENT,
    skillName VARCHAR(255),
    PRIMARY KEY (skillID)
);

CREATE TABLE Industry (
    industryID INT AUTO_INCREMENT,
    industryName VARCHAR(255),
    PRIMARY KEY (industryID)
);

CREATE TABLE Course (
    courseID INT AUTO_INCREMENT,
    courseName VARCHAR(255),
    PRIMARY KEY (courseID)
);

CREATE TABLE User_Skill (
    userID INT,
	skillID INT ,
	yearsExperience INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY (skillID) REFERENCES Skill(skillID)
);

CREATE TABLE User_Industry (
	userID INT,
    industryID INT ,
	yearsExperience INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY (industryID) REFERENCES Industry(industryID)
);

CREATE TABLE User_Course (
	userID INT,
    courseID INT ,
    courseTermID INT,
	FOREIGN KEY(courseTermID) REFERENCES CourseTerms(courseTermID),
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY (courseID) REFERENCES Course(courseID)
);


