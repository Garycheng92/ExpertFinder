--Skills Table
--Add Skill Name to Skill table and Years Experience 
INSERT INTO Skill (skillName,yearsExperience) VALUES (:skillName, :skillYears);

--Remove Skill from table
DELETE FROM Skill WHERE skillName = :skillName;

--Edit Skill (updates Skill Name and Years Experience)
UPDATE Skill SET skillName = :skillName, yearsExperience = :skillYears WHERE skillID = :skillID 



--Courses Table
--Add Course Name and Term to Table
INSERT INTO Course (courseName,courseTerm) VALUES (:courseName, :courseTerm);

--Remove Course from TABLE
DELETE FROM Course WHERE courseName = :courseName;

--Edit Course (name and term)
UPDATE Course SET courseName = :courseName, courseTerm = :courseTerm WHERE courseID = :courseID 



--Industry Table
--Add Organization and Duration 
INSERT INTO Industry (industryName,industryYears) VALUES (:industryName, :industryYears);

--Remove Organization
DELETE FROM Industry WHERE industryName = :industryName;

--Edit (organization and duration)
UPDATE Industry SET industryName = :industryName, industryYears = :industryYears WHERE industryID = :industryID 
