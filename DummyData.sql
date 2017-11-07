use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    111421	# actual password is pwd
);

insert into KUser(username, passwordHash) values
(
	"user2",
    111421
);

insert into KUser(username, passwordHash) values
(
	"user3",
    111421
);

insert into Tag(tagStr) values ("t1");
insert into Tag(tagStr) values ("t2");
insert into Tag(tagStr) values ("t3");
insert into Tag(tagStr) values ("t4");

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	1, 
    true,
	"Poll 1",
    "poll subtitle user 1",
    "has tags 1",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	1, 
    true,
	"Poll 2",
    "poll subtitle user 1",
    "has tags 1 and 2",
    0,
    true
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous)  
values (
	1, 
    true,
	"Rating Question 1",
    "subtitle user 1",
    "has tags t2",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, positiveVotes, isAnonymous) 
values (
	2, 
    true,
	"Poll 3",
    "subtitle user 2",
    "has tags 3",
    0, 
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	2,
    false,
	"Rating 2",
    "subtitle user 2",
    "2017-10-17",
    "has NO tags",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	3,
    true,
	"Poll 4",
    "subtitle user 3",
    "2017-10-17",
    "has tags t3",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	3,
    false,
	"Rating 3",
    "subtitle user 3",
    "2017-10-17",
    "has tags t1 t2 t3",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	3, 
    false,
	"Rating 4",
    "subtitle user 3",
    "has NO tags",
    0,
    true
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	3, 
    false,
	"Rating 5",
    "subtitle user 3",
    "has tags t4",
    0,
    false
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "O1",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "O2",
    1
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "O3",
    4
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "O4",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "O5",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "O6",
    1
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    1,
    0,
    "question comment 1",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	9,
    1,
    0,
    "question comment 2",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	5,
    2,
    0,
    "question comment 3",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    2,
    0,
    "question comment 1",
    false,
    0,
    0
);

# users 1 and 2 follow eachother
insert into userToFollowing(mainUserID, followingUserID)
values(1,2);
insert into userToFollowing(mainUserID, followingUserID)
values(2,1);

insert into UserToQuestion(userID, questionID) values (1, 1);
insert into UserToQuestion(userID, questionID) values (1, 2);
insert into UserToQuestion(userID, questionID) values (1, 3);
insert into UserToQuestion(userID, questionID) values (2, 4);
insert into UserToQuestion(userID, questionID) values (2, 5);
insert into UserToQuestion(userID, questionID) values (3, 6);
insert into UserToQuestion(userID, questionID) values (3, 7);
insert into UserToQuestion(userID, questionID) values (3, 8);
insert into UserToQuestion(userID, questionID) values (3, 9);

insert into TagToQuestion(tagID, questionID) values (1, 1);
insert into TagToQuestion(tagID, questionID) values (1, 2);
insert into TagToQuestion(tagID, questionID) values (2, 2);
insert into TagToQuestion(tagID, questionID) values (2, 3);
insert into TagToQuestion(tagID, questionID) values (3, 4);
insert into TagToQuestion(tagID, questionID) values (3, 5);
insert into TagToQuestion(tagID, questionID) values (1, 6);
insert into TagToQuestion(tagID, questionID) values (2, 6);
insert into TagToQuestion(tagID, questionID) values (3, 6);
insert into TagToQuestion(tagID, questionID) values (4, 8);

insert into QuestionToPollOption(questionID, pollOptionID) values(1, 1);
insert into QuestionToPollOption(questionID, pollOptionID) values(1, 2);
insert into QuestionToPollOption(questionID, pollOptionID) values(2, 3);
insert into QuestionToPollOption(questionID, pollOptionID) values(4, 4);
insert into QuestionToPollOption(questionID, pollOptionID) values(6, 5);
insert into QuestionToPollOption(questionID, pollOptionID) values(6, 6);

