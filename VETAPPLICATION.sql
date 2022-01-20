DROP DATABASE IF EXISTS VETAPPLICATION;
CREATE DATABASE VETAPPLICATION;
USE VETAPPLICATION;

DROP TABLE IF EXISTS ANIMAL;
CREATE TABLE ANIMAL(
	AnimalID integer not null auto_increment,
    AnimalName varchar(30),
    Species varchar(30),
    Weight varchar(30),
    TattooNum integer,
    City varchar(30),
    BirthDate varchar(10),
    Breed varchar(20),
    Sex char(1),
    RFID varchar(20),
    Microchip varchar(20),
    AnimalStatus varchar(30),
    Draught_Meat_Diary varchar(30),
    DistinguishingFeatures varchar(30),
    Color varchar(30),
    Image varchar(200),
    primary key (AnimalID)
);

INSERT INTO ANIMAL (
	AnimalName,
    Species,
    Weight,
    TattooNum,
    City,
    BirthDate,
    Breed,
    Sex,
    RFID,
    Microchip,
    AnimalStatus,
    Draught_Meat_Diary,
    DistinguishingFeatures,
    Color,
    Image)
VALUES
('Buttercup', 'Dog','3.6kg','234234','London','2018-08-15','Beagle','M','197839178371','176387613813','Available',null,null,'black and white', "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg"),
('Erika','Dog','10lb','234232','London','2018-07-15','Beagle','F','197832178371','176687613813','Available',null,null,'brown', "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"),
('Kody','Horse','68kg','564543','Paris','2018-03-31','Quarter Horse','M','8987498979390','5672876189197','Injured',null,null,'black',"https://uk.mypetandi.com/sites/g/files/adhwdz331/files/styles/paragraph_image/public/2018-03/ragdoll_cat_01401.jpg?itok=GLukk3cG"),
('Simon','Cow','127kg','981733','India','2018-02-29','Abigar','M','83612863189','812381931998','Sick','Dairy',null,'black and white',"https://www.thesprucepets.com/thmb/Jv7OsGKXXrUpXOTY0lRqe2cTbao=/1881x1411/smart/filters:no_upscale()/BlueBritishShorthairwithGoldEyes-4734bd8247b04451b6da1994a3f62ae7.jpg");

DROP TABLE IF EXISTS ANIMALSTATUS;
CREATE TABLE ANIMALSTATUS(
	AnimalID integer,
    Date varchar(10),
    Description varchar(200),
    Location varchar(15),
	Status varchar(50)
);

INSERT INTO ANIMALSTATUS(AnimalID, Date, Description, Location, Status)
VALUES
('1','2021/12/12',null,'In Campus','Available'),
('2','2021/01/11','Her foot is injured','Hospital','Injured');

DROP TABLE IF EXISTS EXAMHISTORY;
CREATE TABLE EXAMHISTORY(
	RecordID integer not null auto_increment,
    Date varchar(10),
    Measurement varchar(30),
    MeasurementValue varchar(30),
    UserID integer,
    AnimalID integer,
    primary key(RecordID)
);

INSERT INTO EXAMHISTORY(Date,  Measurement, MeasurementValue,  UserID, AnimalID)
VALUES
('2019/04/23','Weight',null,2,1),
('2019/04/26','Blood concentration',null,3,1),
('2018/11/21','Heart beat',null,2,2),
('2019/04/23','temperature',null,3,2),
('2019/04/24','Dental status',null,2,3);


DROP TABLE IF EXISTS IMAGES;
CREATE TABLE IMAGES(
	ImageID integer not null auto_increment,
    UserID integer,
    Date varchar(10),
    FileLocation varchar(200),
    AnimalID integer,
    primary key (ImageID)
);

INSERT INTO IMAGES (UserID, Date, FileLocation, AnimalID)
VALUES
(1,'2021/03/08','image1.png',1),
(4,'2021/03/09','image2.png',2),
(4,'2021/03/10','image3.png',1),
(3,'2021/03/11','image4.png',1);

DROP TABLE IF EXISTS ALERT;
CREATE TABLE ALERT(
	AlertID integer not null auto_increment,
    AnimalID integer,
    Description varchar(30),
    Severity int,
    Date varchar(10),
	primary key (AlertID)
);

INSERT INTO ALERT(AnimalID, Description, Severity, Date)
VALUES
(1, 'injury', 1, "1999-01-25"),
(2, 'Treatment', 2, "2000-02-27"),
(3, 'injury',3, "2001-05-25"),
(4, 'injury',4, "2020-01-24");


DROP TABLE IF EXISTS ANIMALSTATUSIMAGE;
CREATE TABLE ANIMALSTATUSIMAGE(
	AnimalID integer,
    Status_History integer not null,
    ImageID integer not null
);

INSERT INTO ANIMALSTATUSIMAGE(AnimalID,Status_History,ImageID)
VALUES
(1,1,1),
(2,2,1),
(3,3,3);


DROP TABLE IF EXISTS USERS;
CREATE TABLE USERS(
	UserId integer not null auto_increment,
    Username varchar(15),
    Password varchar(30),
    UserType varchar(20),
    Email varchar(30),
    Activation_Date varchar(10),
    Name varchar(50),
    Banned int,
    primary key(UserId)
);
INSERT INTO USERS(Username, password, UserType,Email,  Activation_Date, Name)
VALUES
('user1','123456a','admin','admin@ucalgary.ca','2021/03/04', "Jack"),
('user2','qweasd','animal technician','a.technician@ucalgary.ca','2021/03/04', "Tyler"),
('user3','iopjkl','teacher','teacher@ucalgary.ca','2021/04/05', "Cole"),
('user4','hjkl','student','student1@ucalgary.ca','2021/03/19', "Logitech"),
('user5', 'abcd', 'care attendant', 'attendant@ucalgary.ca', '2021/12/09', "Razer");


DROP TABLE IF EXISTS ANIMALCOMMENT;
CREATE TABLE ANIMALCOMMENT(
	CommentID integer not null auto_increment,
    UserID integer,
    AnimalID integer,
    Date varchar(10),
    Description varchar(30),
    primary key(CommentID)
);

INSERT INTO ANIMALCOMMENT(UserID, AnimalID,Description, Date)
VALUES
(1,1,'Animal presents as ill.', '2021-10-02'),
(1,2,'Evident injury.', '2021-11-03'),
(2,3,'Animal presents with pain.', '2021-09-05');


DROP TABLE IF EXISTS TREATMENTMETHOD;
CREATE TABLE TREATMENTMETHOD(
	ID integer not null auto_increment,
	Treatment_Type varchar(30),
	primary key(ID)
);
INSERT INTO TREATMENTMETHOD( Treatment_Type)
VALUES
('Physical exam'),
('Blood work'),
('Bordetella vaccine'),
('Dental cleaning'),
('Deworming'),
('Rabies Vaccination'),
('Chemo Treatment');


DROP TABLE IF EXISTS PRESCRIPTIONRECORDS;
CREATE TABLE PRESCRIPTIONRECORDS(
	ScriptRecord integer not null auto_increment,
    Initiator integer,
	AnimalID integer,
    RecordDate varchar(10),
	Instructions integer,
	DrugID integer,
    Dosage varchar(100),
    Delivery_Method varchar(20), 
    Drug_Name varchar(20),
    RequestID int,
    Comment varchar(500),
	primary key(ScriptRecord)
);

INSERT INTO PRESCRIPTIONRECORDS(Initiator, AnimalID, RecordDate, Instructions, DrugID, Dosage, Delivery_Method, Drug_Name, RequestID, Comment)
VALUES
('3','1','2021-08-12',1,2,null,null,null,1, null),
('3','2','2021-09-12',2,1,null,null,null,1, null),
('3','3','2021-10-12',3,4,null,null,null,1, null);

CREATE TABLE TEACHINGREQUESTS(
	RequestID integer NOT NULL auto_increment,
	Initiator integer,
    Animal integer,
    Stage integer,
	reason varchar(500),
    primary key(RequestID)
);

INSERT INTO TEACHINGREQUESTS(
Initiator, 
Animal,
Stage,
reason)
VALUES
(1, 1, 0, "for demonstration"),
(2,1,0, "taking out for a walk"),
(3,3,0, "taking out to pet");

DROP TABLE IF EXISTS TREATMENTREQUESTS;
CREATE TABLE TREATMENTREQUESTS(
	ID integer not null auto_increment,
    Request varchar(50),
    AnimalID integer,
    Initiator integer,
    ApproveBy integer,
    Stage integer,
    primary key(ID)
);

INSERT INTO TREATMENTREQUESTS(Request, AnimalID, Initiator, ApproveBy, Stage)
VALUES
('Animal looks sick',1,2,3,1),
('Animal is injured',2,1,3,2),
("test", 2, 5, null, 0),
("test", 1, 5, null, 0),
("test", 3, 5, null, 0);

DROP TABLE IF EXISTS MEDICALRECORDS;
CREATE TABLE MEDICALRECORDS(
	ID integer not null auto_increment,
	MR_Type varchar(20), 
    primary key(Id)
);
INSERT INTO MEDICALRECORDS(MR_Type)
VALUES
('XRAY'),
('DICOm'),
('SOAP'),
('FORM'),
('IMAGE'),
('NOTE'),
('LAB'),
('LINK'),
('RECHECKS'),
('DX'),
('SURGERY'),
('XRAY'),
('TRANSFERS'),
('STUDENT SOAP'),
('PROB'),
('INVOICE'),
('PRODUCT NOTE');

DROP TABLE IF EXISTS DRUGS;
CREATE TABLE DRUGS(
	ID integer not null auto_increment,
	DrugType varchar(20), 
    primary key(Id)
);
INSERT INTO DRUGS(DrugType) VALUES
("albendazole"),
("cefpodoxime"),
("cimetidine"),
("clavaseptin"),
("gabapentine"),
('ivermectine');




ALTER TABLE ANIMALSTATUS
ADD foreign key(AnimalID) references ANIMAL(AnimalID) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE ALERT
ADD foreign key(AnimalID) references ANIMAL(AnimalID) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE EXAMHISTORY
ADD foreign key(UserID) references USERS(UserId) ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(AnimalID) references ANIMAL(AnimalID)ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE IMAGES
ADD foreign key (UserID) references USERS(UserId) ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(AnimalID) references ANIMAL(AnimalID)ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE ANIMALSTATUSIMAGE
ADD foreign key(AnimalID) references ANIMAL(AnimalID) ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(Status_History) references EXAMHISTORY(RecordID),
ADD foreign key(ImageID) references IMAGES(ImageID);

ALTER TABLE ANIMALCOMMENT
ADD foreign key(AnimalID) references ANIMAL(AnimalID) ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(UserID) references  USERS(UserId) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE PRESCRIPTIONRECORDS
ADD foreign key(AnimalID) references ANIMAL(AnimalID)ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(Initiator) references  USERS(UserId) ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key (Instructions) references TREATMENTMETHOD(ID)ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(DrugID) references MEDICALRECORDS(ID)ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE TEACHINGREQUESTS
ADD foreign key(Animal) references ANIMAL(AnimalID)ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(Initiator) references  USERS(UserId) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE TREATMENTREQUESTS
ADD foreign key(AnimalID) references ANIMAL(AnimalID)ON DELETE SET NULL ON UPDATE CASCADE,
ADD foreign key(Initiator) references USERS(UserId) ON DELETE SET NULL ON UPDATE CASCADE;

