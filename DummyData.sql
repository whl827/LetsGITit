use KnowItAll;

insert into KUser(username, passwordHash) values 
(
	"User1",
    111421 		# actual password is pwd
);

insert into KUser(username, passwordHash) values
(
	"Joyce",
    111421
);

insert into KUser(username, passwordHash) values
(
	"Summer",
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

insert into KUser(username, passwordHash, isAdmin) values
(
	"Admin1",
    111421,
    true
);

insert into UserNotification(userID, description) values 
(
	7,
    "first notificaiton"
);

insert into UserNotification(userID, description) values 
(
	2,
    "second notification"
);

insert into UserNotification(userID, description) values 
(
	4,
    "third notification"
);

insert into Tag(tagStr) values ("Pizza");
insert into Tag(tagStr) values ("Movie");
insert into Tag(tagStr) values ("USC");
insert into Tag(tagStr) values ("Course");
insert into Tag(tagStr) values ("Food");
insert into Tag(tagStr) values ("CS");
insert into Tag(tagStr) values ("Football");
insert into Tag(tagStr) values ("Study");
insert into Tag(tagStr) values ("Cafe");
insert into Tag(tagStr) values ("Coffee");
insert into Tag(tagStr) values ("Leavey");
insert into Tag(tagStr) values ("UV");
insert into Tag(tagStr) values ("CS310");

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, numLikes, isAnonymous, image) 
values (
	1, 
    true,
	"What is the best pizza place around USC?",
    "",
    "really good cheese pizza place? ",
    59,
    3,
    false,
    "https://i.ytimg.com/vi/1X6OAucemtE/maxresdefault.jpg"
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, numLikes, isAnonymous, image) 
values (
	2, 
    true,
	"What is the best CS course at USC?",
    "USC",
    "I am taking 103 right now, I am curious what other great courses are there!",
    52,
    3,
    true,
    "http://www.austincc.edu/sites/default/files/Computer-Science_10282016.jpg"
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, numLikes, isAnonymous, image)  
values (
	3, 
    true,
	"What movie should I watch?",
    "nothing",
    "I am going on a date with my girlfriend next week, she likes animated movies but she's open to other choices too. any recommendation?",
    35,
    6,
    false,
    "https://cdn-media-1.lifehack.org/wp-content/files/2014/06/Frozen-Free-Wallpaper.jpg"
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, numLikes, isAnonymous, image) 
values (
	4, 
    true,
	"CS Course recommendation",
    "USC",
    "Please help me w my schedule next semester!",
    38, 
    4,
    false,
    "https://previews.123rf.com/images/enotmaks/enotmaks1402/enotmaks140200008/25528506-Flat-illustration-of-programmer-and-process-coding-and-programming-Workflow-and-planning-illustratio-Stock-Vector.jpg"
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, numLikes, isAnonymous, image) 
values (
	5,
    false,
	"USC Football",
    "USC",
    "2017-10-17",
    "How are we doing this year?! ",
    10,
    3,
    false,
    "http://sportsformulator.com/wp-content/uploads/2016/04/USC-Football-1024x576.jpg"
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, numLikes, isAnonymous, image) 
values (
	6,
    true,
	"Study-friendly coffee shops on campus?",
    "USC",
    "2017-10-17",
    "What do u guys think?",
    20,
    4,
    false,
    "https://www.healthline.com/hlcmsresource/images/topic_centers/Food-Nutrition/Coffee1-banner.jpg"
);

insert into Question(userID, isPoll, title, subTitle, endDate, description, totalVotes, numLikes, isAnonymous) 
values (
	1,
    false,
	"Leavey library",
    "USC",
    "2017-10-17",
    "how do u guys think about leavey?",
    20,
    3,
    false
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, numLikes, isAnonymous) 
values (
	1, 
    false,
	"What do u guys think about USC Village?",
    "USC",
    "Good? Bad?",
    20,
    3,
    true
);

insert into Question(userID, isPoll, title, subTitle, description, totalVotes, numLikes, isAnonymous) 
values (
	2, 
    false,
	"Rate CS310",
    "USC",
    "What do you guys think about CS310?",
    20,
    4,
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
    "Papa Johns",
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

-- insert into RatingQuestionOption(questionID, userID, rating) 
-- values (
-- 	6,
--     "Starbucks - Cafe84",
--     0
-- );

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	1,
    5,
    "WoongHee",
    "I like CPK! it's the best",
    false,
    5,
    3
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	1,
    4,
    "Robert",
    "We need another pizza place....",
    false,
    10,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	2,
    3,
    "Summer",
    "Take 310!!!",
    false,
    10,
    5
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	2,
    2,
    "Joyce",
    "I like 360! Good intro to AI and great projects :) ",
    false,
    20,
    5
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	3,
    2,
    "Joyce",
    "Helpful Poll!! I am going to watch despicable me w my friend this weekend",
    false,
    10,
    5
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	3,
    4,
    "Robert",
    "Oh It was pretty good.",
    false,
    7,
    1
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    1,
    "User1",
    "I would take ITP368 for an elective",
    false,
    9,
    2
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	4,
    5,
    "Woonghee",
    "Don't take hard classes w OS",
    false,
    30,
    0
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	5,
    2,
    "Joyce",
    "Go USC",
    false,
    34,
    15
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	5,
    6,
    "Edward",
    "We are doing okay",
    false,
    20,
    10
);


insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	6,
    2,
    "Anonymous",
    "Dulce is coming soon! and I heard it's 24hrs",
    true,
    10,
    3
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	6,
    6,
    "Edward",
    "starbucks at cafe84 is 24hrs as well!",
    false,
    34,
    5
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	7,
    1,
    "User1",
    "Leavey is really packed thesedays due to construction on 4th floor",
    false,
    16,
    4
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	7,
    2,
    "Joyce",
    "I don't goto leavey that much anymore",
    false,
    30,
    1
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	8,
    4,
    "Robert",
    "More option for lunch for sure",
    false,
    20,
    1
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	8,
    5,
    "Woonghee",
    "I love UV!",
    false,
    10,
    1
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	9,
    6,
    "Edward",
    "It's a great class!",
    false,
    10,
    1
);

insert into QuestionComment(questionID, userID, userIDAnnonymous, description, isAnnonymous, commentLikeCount, commentDislikeCount) 
values (
	9,
    1,
    "User1",
    "310 project is alot of work but also you learn alot",
    false,
    20,
    1
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    1,
    1,
    1
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    1,
    2,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    1,
    3,
    1
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    1,
    4,
    0
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    1,
    5,
    0
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    1,
    6,
    0
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    2,
    1,
    0
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    2,
    2,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    2,
    3,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    2,
    4,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    2,
    5,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    2,
    6,
    1
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    3,
    1,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    3,
    2,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    3,
    3,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    3,
    4,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    3,
    5,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    3,
    6,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    4,
    1,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    4,
    2,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    4,
    3,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    4,
    4,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    4,
    5,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    4,
    6,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    5,
    1,
    0
);

insert into QuestionLike(questionID, userID, pollLike) 
values (
    5,
    2,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    5,
    3,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    5,
    4,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    5,
    5,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    5,
    6,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    6,
    1,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    6,
    2,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    6,
    3,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    6,
    4,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    6,
    5,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    6,
    6,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    7,
    1,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    7,
    2,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    7,
    3,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    7,
    4,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    7,
    5,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    7,
    6,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    8,
    1,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    8,
    2,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    8,
    3,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    8,
    4,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    8,
    5,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    8,
    6,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    9,
    1,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    9,
    2,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    9,
    3,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    9,
    4,
    1
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    9,
    5,
    0
);
insert into QuestionLike(questionID, userID, pollLike) 
values (
    9,
    6,
    0
);



# users 1 and 2 follow eachother
insert into userToFollowing(mainUserID, followingUserID)
values(1,2);
insert into userToFollowing(mainUserID, followingUserID)
values(2,1);

update KUser set numFollowers = 1 where userID = 1;
update KUser set numFollowers = 1 where userID = 2;

update KUser 
set bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ultrices ultrices felis cras amet.",
imageURL = "https://i.redd.it/lpj7hm6t9zly.jpg" 
where userID = 2;

update KUser 
set bio = "I'm a computer science major, and I love pho and pigs!",
imageURL = "http://www.critterbabies.com/wp-content/uploads/2014/11/p2.jpg" 
where userID = 3;


insert into UserToQuestion(userID, questionID) values (1, 2);
insert into UserToQuestion(userID, questionID) values (1, 3);
insert into UserToQuestion(userID, questionID) values (2, 1);
insert into UserToQuestion(userID, questionID) values (2, 4);
insert into UserToQuestion(userID, questionID) values (2, 5);
insert into UserToQuestion(userID, questionID) values (3, 6);
insert into UserToQuestion(userID, questionID) values (3, 7);
insert into UserToQuestion(userID, questionID) values (3, 8);
insert into UserToQuestion(userID, questionID) values (3, 9);

insert into TagToQuestion(tagID, questionID) values (1, 1);
insert into TagToQuestion(tagID, questionID) values (5, 1);
insert into TagToQuestion(tagID, questionID) values (3, 2);
insert into TagToQuestion(tagID, questionID) values (4, 2);
insert into TagToQuestion(tagID, questionID) values (6, 2);
insert into TagToQuestion(tagID, questionID) values (2, 3);
insert into TagToQuestion(tagID, questionID) values (3, 4);
insert into TagToQuestion(tagID, questionID) values (4, 4);
insert into TagToQuestion(tagID, questionID) values (6, 4);
insert into TagToQuestion(tagID, questionID) values (3, 5);
insert into TagToQuestion(tagID, questionID) values (7, 5);
insert into TagToQuestion(tagID, questionID) values (8, 6);
insert into TagToQuestion(tagID, questionID) values (9, 6);
insert into TagToQuestion(tagID, questionID) values (10, 6);
insert into TagToQuestion(tagID, questionID) values (8, 7);
insert into TagToQuestion(tagID, questionID) values (11, 7);
insert into TagToQuestion(tagID, questionID) values (3, 8);
insert into TagToQuestion(tagID, questionID) values (12, 8);
insert into TagToQuestion(tagID, questionID) values (13, 9);


insert into QuestionToPollOption(questionID, pollOptionID) values(1, 1);
insert into QuestionToPollOption(questionID, pollOptionID) values(1, 2);
insert into QuestionToPollOption(questionID, pollOptionID) values(2, 3);
insert into QuestionToPollOption(questionID, pollOptionID) values(4, 4);
insert into QuestionToPollOption(questionID, pollOptionID) values(6, 5);
insert into QuestionToPollOption(questionID, pollOptionID) values(6, 6);

