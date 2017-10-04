drop database if exists KnowItAll;
create database KnowItAll;
use KnowItAll;

create table User (
	userID int(8) primary key auto_increment,
    username varchar(8) not null,
    passwordHash int(12) not null
);

create table Poll (
	pollID int(8) primary key auto_increment,
    userID int(8) not null,
    title varchar(20) not null,
    subTitle varchar(50),
    description varchar(500) not null,
    totalVotes int(8) not null,
    foreign key fk1(userID) references User(userID)
);

create table PollOption (
	pollOptionID int(8) primary key auto_increment,
    pollID int(8) not null,
    title varchar(20) not null,
    description varchar(80) not null,
    votes int(8) not null,
	foreign key fk1(pollID) references Poll(pollID)
);

create table PollComment (
	pollCommentID int(8) primary key auto_increment,
    pollID int(8) not null,
    userID int(8) not null,
    description varchar(500), 
    foreign key fk1(pollID) references Poll(pollID),
    foreign key fk2(userID) references User(userID)
);

create table RankingQuestion (
	rankingQuestionID int(8) primary key auto_increment,
    userID int(8) not null,
    title varchar(20) not null,
    subTitle varchar(50) not null,
    description varchar(500),
    totalRating int(8) not null,
    totalPossibleRating int(8) not null,
    foreign key fk1(userID) references User(userID)
);

create table RankingOption (
	rankingOptionID int(8) primary key auto_increment,
    userID int(8) not null,
    rankingQuestionID int(8) not null,
    rating int(3) not null,
    foreign key fk1(userID) references User(userID),
    foreign key fk2(rankingQuestionID) references RankingQuestion(rankingQuestionID)
);

create table RankingComment (
	rankingCommentID int(8) primary key auto_increment,
    userID int(8) not null,
    rankingQuestionID int(8) not null,
    title varchar(20) not null,
    description varchar(20) not null,
    foreign key fk1(userID) references User(userID),
    foreign key fk2(rankingQuestionID) references RankingQuestion(rankingQuestionID)
);

create table UserToPoll (
	userID int(8) not null,
    pollID int(8) not null,
    foreign key fk1(userID) references User(userID),
    foreign key fk2(pollID) references Poll(pollID)
);

create table UserToRatingQuestion (
	userID int(8) not null,
    ratingQuestionID int(8) not null,
    foreign key fk1(userID) references User(userID),
    foreign key fk2(ratingQuestionID) references RatingQuestion(ratingQuestionID)
);

create table PollToCommentOption (
	pollID int(8) not null,
    pollCommentID int(8) not null,
    pollOptionID int(8) not null,
    foreign key fk1(pollID) references Poll(pollID),
    foreign key fk2(pollCommentID) references PollComment(pollCommentID),
    foreign key fk3(pollOptionID) references PollOption(pollOptionID)
);

create table RatingQuestionToCommentOption (
	ratingQuestionID int(8) not null,
    ratingQuestionCommentID int(8) not null,
    ratingQuestionOptionID int(8) not null,
    foreign key fk1(ratingQuestionID) references RatingQuestion(ratingQuestionID),
    foreign key fk2(ratingQuestionCommentID) references RatingQuestionComment(ratingQuestionCommentID),
    foreign key fk3(ratingQuestionOptionID) references RatingQuestionOption(ratingQuestionOptionID)
);

