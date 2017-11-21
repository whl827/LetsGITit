drop database if exists KnowItAll;
create database KnowItAll;
use KnowItAll;

create table KUser (
	userID int(8) primary key auto_increment,
    username varchar(12) not null,
    email varchar(100),
    numFollowers int(8) default 0 not null,
    passwordHash int(12) not null,
    isAdmin boolean default false,
    deactivated boolean default false,
    bio varchar(105),
    imageURL varchar(2000),
    notifyHourly boolean default false
);  

create table UserNotification (
	userNotificaitonID int(8) primary key auto_increment,
    userID int(8) not null,
    description varchar(200),
    creationDate datetime not null default now(),
    isRead boolean default false,
    isEmailed boolean default false
);

create table Question (
	questionID int(8) primary key auto_increment,
    userID int(8) not null,
    isPoll boolean not null,
    title varchar(200) not null,
    subTitle varchar(200),
    description varchar(500),
    startDate datetime not null default now(),
    endDate datetime,
    totalVotes int(8) not null,
    positiveVotes int(8),			 #only for rating question
    numLikes int(8) default 0 not null,
    isAnonymous boolean not null,
    isFlagged boolean default false,
    image varchar(20000) default null,
    deactivated boolean default false,
    foreign key fk1(userID) references KUser(userID) ON DELETE CASCADE
);

create table QuestionComment (
	questionCommentID int(8) primary key auto_increment,
    questionID int(8) not null,
    userID int(8) not null,
    userIDAnnonymous varchar(10) not null,
    description varchar(500),
    isAnnonymous boolean not null,
    commentLikeCount int(8) not null,
    commentDislikeCount int(8) not null,
	isFlagged boolean default false,
    image varchar(20000) default null,
    deactivated boolean default false,
    foreign key fk1(questionID) references Question(questionID) ON DELETE CASCADE,
    foreign key fk2(userID) references KUser(userID) ON DELETE CASCADE
);

create table PollOption (
	pollOptionID int(8) primary key auto_increment,
    questionID int(8) not null,
    title varchar(200) not null,
    votes int(8) not null,
	foreign key fk1(questionID) references Question(questionID) ON DELETE CASCADE
);

create table RatingQuestionOption (
	ratingQuestionOptionID int(8) primary key auto_increment,
    userID int(8) not null,
    questionID int(8) not null,
    rating int(3) not null,		# MUST be between 1 - 5 !!
    foreign key fk1(userID) references KUser(userID) ON DELETE CASCADE,
    foreign key fk2(questionID) references Question(questionID) ON DELETE CASCADE
);

create table Tag(
	tagID int(8) primary key auto_increment,
    tagStr varchar(200) not null
);

create table TagToQuestion (
	tagID int(8) not null,
    questionID int (8) not null,
    foreign key fk1(tagID) references Tag(tagID) ON DELETE CASCADE,
    foreign key fk2(questionID) references Question(questionID) ON DELETE CASCADE
);

create table UserToQuestion (
	userID int(8) not null,
    questionID int(8) not null,
    foreign key fk1(userID) references KUser(userID) ON DELETE CASCADE,
    foreign key fk2(questionID) references Question(questionID) ON DELETE CASCADE
);

create table QuestionToPollOption (
	questionID int(8) not null,
    pollOptionID int(8) not null,
    foreign key fk1(questionID) references Question(questionID) ON DELETE CASCADE,
    foreign key fk2(pollOptionID) references PollOption(pollOptionID) ON DELETE CASCADE
);

create table QuestionLike (
	questionLikeID int(8) primary key auto_increment,
    questionID int(8) not null,
    userID int(8) not null,
    pollLike boolean not null,
    foreign key fk1(questionID) references Question(questionID) ON DELETE CASCADE,
    foreign key fk2(userID) references KUser(userID) ON DELETE CASCADE
);

create table CommentLike (
    CommentLikeID int(8) primary key auto_increment,
    questionCommentID int(8) not null,
    userID int(8) not null,
    pollLike boolean not null,
    foreign key fk1(questionCommentID) references QuestionComment(questionCommentID) ON DELETE CASCADE,
    foreign key fk2(userID) references KUser(userID) ON DELETE CASCADE
);

create table userToFollowing(
	mainUserID int(8) not null,
    followingUserID int(8) not null,
    foreign key fk1(mainUserID) references KUser(userID) ON DELETE CASCADE,
    foreign key fk2(followingUserID) references KUser(userID) ON DELETE CASCADE
);

create table userToFollowers(
	mainUserID int(8) not null,
    followerUserID int(8) not null,
    foreign key fk1(mainUserID) references KUser(userID) ON DELETE CASCADE,
    foreign key fk2(followerUserID) references KUser(userID) ON DELETE CASCADE
);