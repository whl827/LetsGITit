drop database if exists KnowItAll;
create database KnowItAll;
use KnowItAll;

create table KUser (
	userID int(8) primary key auto_increment,
    username varchar(8) not null,
    passwordHash int(12) not null
);  

create table Question (
	questionID int(8) primary key auto_increment,
    userID int(8) not null,
    isPoll boolean not null,
    title varchar(50) not null,
    subTitle varchar(50),
    description varchar(500),
    startDate datetime not null default now(),
    endDate datetime,
    totalVotes int(8) not null,
    positiveVotes int(8),			 #only for rating question
    isAnonymous boolean not null,
    foreign key fk1(userID) references KUser(userID)
);

create table QuestionComment (
	questionCommentID int(8) primary key auto_increment,
    questionID int(8) not null,
    userID int(8) not null,
    userIDAnnonymous varchar(8) not null,
    description varchar(500),
    isAnnonymous boolean not null,
    foreign key fk1(questionID) references Question(questionID),
    foreign key fk2(userID) references KUser(userID)
);

create table PollOption (
	pollOptionID int(8) primary key auto_increment,
    questionID int(8) not null,
    title varchar(20) not null,
    votes int(8) not null,
	foreign key fk1(questionID) references Question(questionID)
);

create table RatingQuestionOption (
	ratingQuestionOptionID int(8) primary key auto_increment,
    userID int(8) not null,
    questionID int(8) not null,
    rating int(3) not null,		# MUST be between 1 - 5 !!
    foreign key fk1(userID) references KUser(userID),
    foreign key fk2(questionID) references Question(questionID)
);

create table Tag(
	tagID int(8) primary key auto_increment,
    tagStr varchar(50) not null
);

create table TagToQuestion (
	tagID int(8) not null,
    questionID int (8) not null,
    foreign key fk1(tagID) references Tag(tagID),
    foreign key fk2(questionID) references Question(questionID)
);

create table UserToQuestion (
	userID int(8) not null,
    questionID int(8) not null,
    foreign key fk1(userID) references KUser(userID),
    foreign key fk2(questionID) references Question(questionID)
);

create table QuestionToComment (
	questionID int(8) not null,
    questionCommentID int(8) not null,
    foreign key fk1(questionID) references Question(questionID),
    foreign key fk2(questionCommentID) references QuestionComment(questionCommentID)
);

create table QuestionToPollOption (
	questionID int(8) not null,
    pollOptionID int(8) not null,
    foreign key fk1(questionID) references Question(questionID),
    foreign key fk2(pollOptionID) references PollOption(pollOptionID)
);

create table QuestionLike (
	questionLikeID int(8) primary key auto_increment,
    questionID int(8) not null,
    userID int(8) not null,
    pollLike boolean not null,
    foreign key fk1(questionID) references Question(questionID),
    foreign key fk2(userID) references KUser(userID)
);

create table userToFollowing(
	mainUserID int(8) not null,
    followingUserID int(8) not null,
    foreign key fk1(mainUserID) references KUser(userID),
    foreign key fk2(followingUserID) references KUser(userID)
);

create table userToFollowers(
	mainUserID int(8) not null,
    followerUserID int(8) not null,
    foreign key fk1(mainUserID) references KUser(userID),
    foreign key fk2(followerUserID) references KUser(userID)
);

-- I need to insert one dummy tag in order for my SQL command to work
insert into tag (tagStr) 
values('dummy');