use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"user1",
    111421 		# actual password is pwd
);

insert into KUser(username, passwordHash) values
(
	"JoyceWang",
    111421
);

insert into KUser(username, passwordHash) values
(
	"SummerSeo",
    111421
);

insert into KUser(username, passwordHash) values
(
	"Robert",
    111421
);


insert into KUser(username, passwordHash) values
(
	"WoongHee",
    111421
);


insert into KUser(username, passwordHash) values
(
	"Edward",
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
    "California Pizza Kitchen",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "Pizza Studio",
    16
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "Domino",
    23
);

insert into PollOption(questionID, title, votes) 
values (
	1,
    "Papa john's",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS310",
    20
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS104",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS201",
    14
);

insert into PollOption(questionID, title, votes) 
values (
	2,
    "CS360",
    8
);



insert into PollOption(questionID, title, votes) 
values (
	3,
    "Frozen",
    6
);

insert into PollOption(questionID, title, votes) 
values (
	3,
    "Thor, Ragnarok",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	3,
    "It",
    2
);

insert into PollOption(questionID, title, votes) 
values (
	3,
    "Despicable Me 3",
    17
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "CS103",
    10
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "CS104",
    8
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "CS109",
    7
);

insert into PollOption(questionID, title, votes) 
values (
	4,
    "ITP115",
    13
);


insert into PollOption(questionID, title, votes) 
values (
	6,
    "Starbucks next to leavey",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "Nature's Brew",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "Startbucks - UV",
    0
);

insert into PollOption(questionID, title, votes) 
values (
	6,
    "Starbucks - Cafe84",
    0
);


insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	1,
    5,
    "WoongHee",
    "I like CPK! it's the best",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	1,
    4,
    "Robert",
    "We need another pizza place....",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	2,
    3,
    "SummerSeo",
    "Take 310!!!",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	3,
    2,
    "JoyceWang",
    "Helpful Poll!!",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    1,
    "user1",
    "Hey! I like this poll",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	5,
    2,
    "JoyceWang",
    "Go USC",
    false,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	6,
    2,
    "Anonymous",
    "Dulce is coming soon!",
    true,
    0,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	6,
    2,
    "Edward",
    "starbucks at cafe84 is 24hrs!",
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

