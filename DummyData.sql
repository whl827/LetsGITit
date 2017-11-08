use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    111421 		# actual password is pwd
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
	"Best Pizza",
    "around USC",
    "What's the best pizza around the campus?",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	1, 
    true,
	"Best CS Course",
    "USC",
    "What is the best CS Course you've taken?",
    0,
    true
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous)  
values (
	1, 
    true,
	"Movie to watch",
    "nothing",
    "Which movie should I watch?",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, positiveVotes, isAnonymous) 
values (
	2, 
    true,
	"CS Course recommendation",
    "USC",
    "Please help me w my schedule next semester!",
    0, 
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	2,
    false,
	"USC Football",
    "USC",
    "2017-10-17",
    "How are we doing this year?! ",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	3,
    true,
	"The most study friendly coffee shop around campus",
    "USC",
    "2017-10-17",
    "What do u guys think?",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, isAnonymous) 
values (
	3,
    false,
	"Leavey library",
    "USC",
    "2017-10-17",
    "how do u guys think about leavey?",
    0,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	3, 
    false,
	"What do u guys think about USC Village?",
    "USC",
    "Good? Bad?",
    0,
    true
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, isAnonymous) 
values (
	3, 
    false,
	"Rate CS310",
    "USC",
    "What do you guys think about CS310?",
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
    "Helpful Poll!!",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	9,
    1,
    0,
    "Helpful",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	5,
    2,
    0,
    "Helpful",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    2,
    0,
    "Thanks!",
    false,
    0,
    0
);

# users 1 and 2 follow eachother
insert into userToFollowing(mainUserID, followingUserID)
values(1,2);
insert into userToFollowing(mainUserID, followingUserID)
values(2,1);

update KUser set numFollowers = 1 where userID = 1;
update KUser set numFollowers = 1 where userID = 2;

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

